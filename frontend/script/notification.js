document.addEventListener('DOMContentLoaded', () => {
    const openNotificationsBtn = document.querySelector('.notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    let notificationOpen = false;

    openNotificationsBtn.addEventListener('click', function () {
        const notificationSection = document.getElementById('notification-popup');
        notificationOpen = !notificationOpen;
        notificationPopup.style.display = notificationOpen ? 'block' : 'none';

        if (notificationOpen) {
            $.ajax({
                url: '../../backend/manage_notification.php',
                type: 'POST',
                data: {},
                success: function (result) {
                    console.log(result);
                    notificationSection.innerHTML = '';
                    for (let i = 0; i < result.length; i++) {
                        notificationSection.innerHTML += `<p class="notification">` + result[i][0] + ` has ` + result[i][1] + `d your post</p>`;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus + " - Error: " + errorThrown);
                },
                dataType: 'json'
            });
        }
    });
});