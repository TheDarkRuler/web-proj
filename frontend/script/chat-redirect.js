function chatClick() {
    let chatUser = document.querySelector('.direct-user');

    if (chatUser != null) {
        let chatId = chatUser.innerHTML.split('#')[1];

        $.ajax({
            url: '../../backend/chat_redirect.php',
            type: 'POST',
            data: { chat_id: chatId },
            success: function () {
            },
        });
    }
}