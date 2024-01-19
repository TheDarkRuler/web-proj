document.addEventListener("DOMContentLoaded", function () {
    let chats = this.querySelectorAll('.chat-box');
    let leftContainer = document.querySelector('.left-container');
    let rightContainer = document.querySelector('.right-container');
    let receivers = [];

    for (let i = 0; i < chats.length; i++) {
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

            let user_id = document.getElementById('user_id');
            let rec_id = chats[i].children[1].children[0].children[0].innerHTML.split('#')[1];

            $.ajax({
                url: '../../backend/chat_switch.php',
                type: 'POST',
                data: { sender: user_id.innerHTML, receiver: rec_id },
                success: function (result) {
                    let container = document.querySelector('.chat-container');
                    container.innerHTML = "";
                    for (let i = 0; i < result.length; i++) {
                        // console.log(result[i]);
                        container.innerHTML += `<div class='message-box ` + ((result[i][2] != rec_id) ? `friend-message` : `my-message`) + `'>
                            <p>
                            ` + result[i][3] + `<br><span>07:43</span>
                            </p>
                            </div >`;
                    }
                },
                error: function () {
                    console.log('error');
                },
                dataType: 'json'
            });

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

            let chatForm = document.querySelector('.chatbox-input');

            if (chatForm.classList.contains('hidden')) {
                chatForm.classList.remove('hidden');
            }

            let sendBtn = document.getElementById('send-icon');

            sendBtn.addEventListener('click', function () {
                let message = document.getElementById('message-i');

                let current_rec = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];

                if (message.value != '' && rec_id == current_rec) {
                    $.ajax({
                        url: '../../backend/send_message.php',
                        type: 'post',
                        data: { receiver: rec_id, message: message.value },
                        success: function () {
                            message.value = '';
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