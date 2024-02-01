function chatClick(btn) {
    const chatUser = btn.children[1];

    if (chatUser != null) {
        const chatId = chatUser.innerHTML.split('#')[1];
        $.ajax({
            url: '../../backend/chat_redirect.php',
            type: 'POST',
            data: {chat_id: parseInt(chatId)},
            success: () => {
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
        data: {pageId: 1},
        success: function (result) {
            console.log(result);
        },
    }).done(() => {
        window.location.assign('../pages/chat.html');
    });
}