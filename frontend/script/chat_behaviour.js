function update_messages() {
    if (document.querySelector('.active') != null) {
        let rec_id = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];

        $.ajax({
            url: '../../backend/chat_switch.php',
            type: 'POST',
            data: { receiver: rec_id },
            success: function (result) {
                let container = document.querySelector('.chat-container');
                container.innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    let date = new Date(result[result.length - 1 - i][4]);
                    let minutes = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();
                    container.innerHTML += `<div class='message-box ` + ((result[result.length - 1 - i][2] != rec_id) ? `friend-message` : `my-message`) + `'>
                    <p>
                    ` + result[result.length - 1 - i][3] + `<br><span>` + date.getHours() + `:` + minutes + `</span>
                    </p>
                    </div >`;
                }
                container.scrollTop = container.scrollHeight;
            },
            error: function () {
                console.log('error');
            },
            dataType: 'json'
        });
    }
}

function loadHeader(rec_id) {
    $.ajax({
        url: '../../backend/load_head.php',
        type: 'post',
        data: { user_id: rec_id },
        success: function (result) {
            let container = document.querySelector('.user-img');
            container.innerHTML = '';
            container.innerHTML += result;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });

    $.ajax({
        url: '../../backend/load_user.php',
        type: 'post',
        data: { user_id: rec_id },
        success: function (result) {
            let container = document.getElementById('receiver_username');
            container.innerHTML = '';
            container.innerHTML += result;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        },
        dataType: 'json'
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let chats = this.querySelectorAll('.chat-box');
    let leftContainer = document.querySelector('.left-container');
    let rightContainer = document.querySelector('.right-container');
    let user_id = document.getElementById('user_id');

    setInterval(update_messages, 5000);

    for (let i = 0; i < chats.length; i++) {
        let userStr = chats[i].children[1].children[0].children[0].innerHTML;
        let userId = userStr.split('#')[1];
        let activeId = -1;

        $.ajax({
            url: '../../backend/chat_redirect.php',
            type: 'POST',
            data: {},
            success: function (result) {
                activeId = result;
            },
        }).done(() => {
            if (parseInt(userId) == parseInt(activeId)) {
                chats[i].classList.add('active');
                let chatForm = document.querySelector('.chatbox-input');

                if (chatForm.classList.contains('hidden')) {
                    chatForm.classList.remove('hidden');
                }
                update_messages();
                loadHeader(activeId);
            }
        });

        chats[i].addEventListener('click', () => {

            // switching the active chatbox
            let oldActiveChat = this.querySelector('.active');
            if (oldActiveChat != null) {
                oldActiveChat.classList.remove('active');
            }
            chats[i].classList.add('active');

            // for the mobile version, clicking the chat should remove the chatlist
            // and show the right container (the one with the chat)
            if (window.innerWidth <= 600) {
                leftContainer.classList.add('invisible');
                rightContainer.classList.remove('invisible');
            }

            let rec_id = chats[i].children[1].children[0].children[0].innerHTML.split('#')[1];

            update_messages();

            loadHeader(rec_id);

            let chatForm = document.querySelector('.chatbox-input');

            if (chatForm.classList.contains('hidden')) {
                chatForm.classList.remove('hidden');
            }

            let sendBtn = document.getElementById('send-button');

            sendBtn.addEventListener('click', function (event) {
                let message = document.getElementById('message-i');
                let current_rec = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];

                if ((!event.detail || event.detail == 1) && message.value != '' && rec_id == current_rec) {
                    last_message = message.value;
                    $.ajax({
                        url: '../../backend/send_message.php',
                        type: 'post',
                        data: { receiver: rec_id, message: message.value },
                        success: function () {
                            message.value = '';
                            update_messages();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("Status: " + textStatus + " - Error: " + errorThrown);
                        }
                    });
                }
            });
        });
    }

    let returnButtons = document.querySelectorAll('.return-button');

    for (let i = 0; i < returnButtons.length; i++) {
        returnButtons[i].addEventListener('click', function () {
            if (window.innerWidth <= 600) {
                leftContainer.classList.remove('invisible');
                rightContainer.classList.add('invisible');
            }
        });
    }

});