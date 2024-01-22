function chatClick() {
    let chatUser = document.querySelector('.direct-user');

    if (chatUser != null) {
        let chatId = chatUser.innerHTML.split('#')[1];

        $.ajax({
            url: '../../backend/chat_redirect.php',
            type: 'POST',
            data: {
                chat_id: chatId
            },
            success: function () {
            },
        }).done(() => {
            window.location.assign('../pages/chat.html');
        });
    }
}

function messageClick() {
    $.ajax({
        url: '../../backend/chat_redirect.php',
        type: 'POST',
        data: { pageId: 1 },
        success: function (result) {
            console.log(result);
        },
    }).done(() => {
        window.location.assign('../pages/chat.html');
    });
}