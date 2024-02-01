function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function to remove the 'red dot' on the notifications after 2 secs
function manageTimout(notifications) {
    sleep(2000).then(() => {
        for (let i = 0; i < notifications.length; i++) {
            $.ajax({
                url: '../../backend/manage_notification.php',
                type: 'POST',
                data: { type: 'set', notification: notifications[i][3] },
                success: () => {
                    // taking the span and removing if present
                    let redNotification = document.querySelector('.red-dot');
                    if (redNotification != null) {
                        redNotification.style.display = 'none';
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus + " - Error: " + errorThrown);
                },
                dataType: 'json'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const openNotificationsBtn = document.querySelector('.notification-icon');
    const notificationPopup = document.getElementById('notification-popup');
    const redNotification = `<span class='red-dot'></span>`;
    let notificationOpen = false;

    // listener to remove the notification pop-up on the click of the page 
    document.addEventListener('click', (event) => {
        if (event.target !== notificationPopup.firstChild && event.target !== openNotificationsBtn.firstElementChild) {
            notificationOpen = false;
            notificationPopup.style.display = 'none';
        }
    });

    // listener to open the pop-up on the notification's icon click 
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
                    // adding all the notification in the notification pop-up
                    notificationSection.innerHTML = '';
                    for (let i = 0; i < result.length; i++) {
                        notifications.push(result[i]);
                        notificationSection.innerHTML += `<p class="notification">`;
                        // if the notification is not seen (value bool), should add the red dot
                        if (result[i][4] < 1) {
                            notificationSection.innerHTML += redNotification;
                        }
                        notificationSection.innerHTML += result[i][0] + ` has ` + result[i][1];
                        // change the text depending on the type of interaction
                        if (result[i][1] == 'follow') {
                            notificationSection.innerHTML += `ed you</p>`;
                        } else {
                            notificationSection.innerHTML += `d your post</p>`;
                        }
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