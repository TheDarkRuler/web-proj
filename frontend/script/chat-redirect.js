/**
 * Function to manage the click on the chat icon in the homepage
 * @param btn element which generated the click
 */
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

/**
 * Function to manage the click on the message icon in the profile page
 */
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