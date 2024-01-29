function manageTimout(notifications) {
    setTimeout(() => {
        for (let i = 0; i < notifications.length; i++) {
            $.ajax({
                url: '../../backend/manage_notification.php',
                type: 'POST',
                data: { type: 'set', notification: notifications[i][3] },
                success: function (result) {
                    console.log(result);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus + " - Error: " + errorThrown);
                },
                dataType: 'json'
            });
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const openNotificationsBtn = document.querySelector('.notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    let notificationOpen = false;

    document.addEventListener('click', (event) => {
        if (event.target !== notificationPopup.firstChild && event.target !== openNotificationsBtn.firstElementChild) {
            notificationOpen = false;
            notificationPopup.style.display = 'none';
        }
    });

    openNotificationsBtn.addEventListener('click', function () {
        const notificationSection = document.getElementById('notification-popup');
        notificationOpen = !notificationOpen;
        notificationPopup.style.display = notificationOpen ? 'block' : 'none';

        if (notificationOpen) {
            let notifications = [];
            $.ajax({
                url: '../../backend/manage_notification.php',
                type: 'POST',
                data: { type: 'get' },
                success: function (result) {
                    notificationSection.innerHTML = '';
                    for (let i = 0; i < result.length; i++) {
                        notifications.push(result[i]);
                        notificationSection.innerHTML += `<p class="notification">` + result[i][0] + ` has ` + result[i][1] + `d your post</p>`;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus + " - Error: " + errorThrown);
                },
                dataType: 'json'
            }).done(() => {
                manageTimout(notifications);
            });
        }
    });
});