/**
 * Function to update all messages in the chat with a specific user (receiver)
 */
function update_messages() {
    // if currently there is an active chat, the function will load all the messages
    if (document.querySelector('.active') != null) {
        // getting the receiver id (the id of the one who will receive the messages)
        const rec_id = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];

        $.ajax({
            url: '../../backend/chat_switch.php',
            type: 'POST',
            data: {receiver: rec_id},
            /**
             * @param result array containing all the messages between the user and the receiver
             */
            success: result => {
                let container = document.querySelector('.chat-container');
                container.innerHTML = "";
                for (let i = 0; i < result.length; i++) {
                    // getting the hour and minute of the message
                    const date = new Date(result[result.length - 1 - i][4]);
                    const minutes = date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes();
                    // creating the paragraph containing the message and the time of it
                    const paragraph = document.createElement('p');
                    paragraph.innerHTML = result[result.length - 1 - i][3] + `<br><span>` + date.getHours() + `:` + minutes + `</span>`;
                    // creating div containing the paragraph if the id of the receiver of the message is different from
                    // the current receiver id it means it is his message, otherwise is mine
                    const div = document.createElement('div');
                    div.classList.add('message-box');
                    if (result[result.length - 1 - i][2] !== parseInt(rec_id)) {
                        div.classList.add('friend-message');
                    } else {
                        div.classList.add('my-message');
                    }
                    div.appendChild(paragraph);
                    container.appendChild(div);
                    /*
                    container.innerHTML += `<div class='message-box ` + ((result[result.length - 1 - i][2] != rec_id) ? `friend-message` : `my-message`) + `'>
                    <p>
                    ` + result[result.length - 1 - i][3] + `<br><span>` + date.getHours() + `:` + minutes + `</span>
                    </p>
                    </div >`;
                    */
                }
                container.scrollTop = container.scrollHeight;
            },
            error: () => {
                console.log('error');
            },
            dataType: 'json'
        });
    }
}

function recreateNode(el, withChildren) {
    if (withChildren) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    } else {
        let newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
}

/**
 * Function to attach a handler to send messages on the input field of a chat
 * @param rec_id id of the user that should receive the message
 */
function attachSendHandler(rec_id) {
    recreateNode(document.getElementById('send-button'));
    const sendBtn = document.getElementById('send-button');

    sendBtn.addEventListener('click', event => {
        event.stopImmediatePropagation();
        const current_rec = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];
        let message = document.getElementById('message-i');

        // sending the message
        if (message.value !== '' && parseInt(rec_id) === parseInt(current_rec)) {
            $.ajax({
                url: '../../backend/send_message.php',
                type: 'post',
                data: {receiver: rec_id, message: message.value},
                success: () => {
                    message.value = '';
                    update_messages();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus + " - Error: " + errorThrown);
                }
            });
        }
    });
}

/**
 * Function to load the header of the chat (basically the profile picture and the username)
 * @param rec_id id of the user that should receive the message
 */
function loadHeader(rec_id) {
    $.ajax({
        url: '../../backend/load_head.php',
        type: 'post',
        data: {user_id: rec_id},
        /**
         * @param result contains piece of HTML to show the profile image
         */
        success: result => {
            const container = document.querySelector('.user-img');
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
        data: {user_id: rec_id},
        /**
         * @param result contains the username of the re
         */
        success: function (result) {
            const container = document.getElementById('receiver_username');
            container.innerHTML = '';
            container.innerHTML += `
                <a href="personal_page.html?ref_username=` + result + `&ref_id=` + rec_id + `">
                    ` + result + `
                </a> 
            `;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        },
        dataType: 'json'
    });
}

const chatsLoad = async (n_users, loadMore, search_in) => {
    await $.ajax({
        url: '../../backend/chat_load_redirect.php',
        type: 'POST',
        datatype: 'json',
        data: {limit: n_users, filter: search_in},
        success: function (result) {
            const container = document.querySelector(".chat-list");
            result = JSON.parse(result);
            if (result.length != n_users) {
                loadMore.remove();
            }
            container.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                $.ajax({
                    url: '../../backend/chat_load_redirect.php',
                    type: 'POST',
                    async: false,
                    data: {id: result[i][0], func: 'get-image'},
                    success: function (image) {
                        result[i][2] == null ?
                            container.innerHTML += `
                            <div class="chat-box">
                                <span class="img-box">
                                    ` + image + `
                                </span>
                                <div class="chat-details">
                                    <div class="text-head">
                                        <p id="chat-user">
                                            ` + result[i][1] + ` #` + result[i][0] + `
                                        </p> 
                                    </div>
                                </div>
                            </div>` :
                            container.innerHTML += `
                        <div class="chat-box">
                            <span class="img-box">
                                ` + image + `
                            </span>
                            <div class="chat-details">
                                <div class="text-head">
                                    <p id="chat-user">
                                        ` + result[i][1] + ` #` + result[i][0] + `
                                    </p> 
                                    <p class="time">
                                        ` + result[i][2][0][1] + `
                                    </p>
                                </div>
                                <div class="text-message">
                                    <p>
                                        ` + result[i][2][0][0] + `
                                    </p>
                                </div>
                            </div>
                        </div>`
                    },
                })
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });
}

const chat_box_lis = () => {
    const chats = document.querySelectorAll('.chat-box');

    for (let i = 0; i < chats.length; i++) {
        const userStr = chats[i].children[1].children[0].children[0].innerHTML;
        const userId = userStr.split('#')[1];
        let activeId = -1;

        // Ajax call to get the chat should be active currently
        $.ajax({
            url: '../../backend/chat_redirect.php',
            type: 'POST',
            data: {},
            success: result => {
                activeId = result;
            },
        }).done(() => {
            // if it matches with the current id
            if (parseInt(userId) === parseInt(activeId)) {
                chats[i].classList.add('active');
                const chatForm = document.querySelector('.chatbox-input');

                if (chatForm.classList.contains('hidden')) {
                    chatForm.classList.remove('hidden');
                }
                update_messages();
                loadHeader(activeId);
                attachSendHandler(activeId);
            }
        });

        chats[i].addEventListener('click', () => {

            // switching the active chatbox
            let oldActiveChat = document.querySelector('.active');
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
            attachSendHandler(rec_id);
        });
    }
}

async function waitUntil(condition, time = 100) {
    while (!condition()) {
        await new Promise((resolve) => setTimeout(resolve, time));
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("goBack").addEventListener('click', () => {
        history.back();
    });

    //loadChat on left container
    let n_users = 8;

    const loadMore = document.querySelector(".loadMoreText");
    let loadingMore = true;
    let filter = "";

    chatsLoad(n_users, loadMore, filter).then(() => {
        chat_box_lis();
    });

    loadMore.addEventListener("click", () => {
        if (loadingMore) {
            loadingMore = false;
            n_users += 8;
            chatsLoad(n_users, loadMore, filter).then(() => {
                chat_box_lis();
            });
            setTimeout(() => {
                loadingMore = true;
            }, 1500);
        }
    });

    const searchInput = document.getElementById("search-input");
    let timeOut = true;

    callUpdateUser = () => {
        timeOut = false;
        chatsLoad(n_users, loadMore, filter).then(() => {
            chat_box_lis();
            timeOut = true;
        });
    }

    //setup before functions
    let typingTimer;                //timer identifier
    let doneTypingInterval = 200;  //time in ms (0.2 seconds)

    //on keyup, start the countdown
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //user is "finished typing,"
    async function doneTyping() {
        filter = searchInput.value;
        if (timeOut) {
            callUpdateUser();
        } else {
            await waitUntil(() => timeOut === true);
            callUpdateUser();
        }
    }

    let leftContainer = document.querySelector('.left-container');
    let rightContainer = document.querySelector('.right-container');
    let user_id = document.getElementById('user_id');

    setInterval(update_messages, 5000);

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