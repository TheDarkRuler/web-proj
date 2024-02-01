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

function recreateNode(el, withChildren) {
    if (withChildren) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    }
    else {
        var newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
}

function attachSendHandler(rec_id) {

    recreateNode(document.getElementById('send-button'));
    const sendBtn = document.getElementById('send-button');

    sendBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        let message = document.getElementById('message-i');
        let current_rec = document.querySelector('.active').children[1].children[0].children[0].innerHTML.split('#')[1];

        if (message.value != '' && parseInt(rec_id) == parseInt(current_rec)) {
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

const chatsLoad = async (n_users, loadMore, search_in) => {
    await $.ajax({
        url: '../../backend/chat_load_redirect.php',
        type: 'POST',
        datatype: 'json',
        data: { limit: n_users, filter: search_in },
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
                    data: { id: result[i][0], func: 'get-image' },
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
                                            ` +  result[i][1] + ` #` + result[i][0] + `
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
                                        ` +  result[i][1] + ` #` + result[i][0] + `
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

    loadMore.addEventListener("click" , () => {
        if(loadingMore) {
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
    async function doneTyping () {
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