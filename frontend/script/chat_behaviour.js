document.addEventListener("DOMContentLoaded", function () {
    let chats = this.querySelectorAll('.chat-box');
    let leftContainer = document.querySelector('.left-container');
    let rightContainer = document.querySelector('.right-container');

    for (let i = 0; i < chats.length; i++) {
        chats[i].addEventListener('click', () => {

            // switching the active chatbox
            let oldActiveChat = this.querySelector('.active');
            oldActiveChat.classList.remove('active');
            chats[i].classList.add('active');

            // for the mobile version, clicking the chat should remove the chatlist
            // and show the right container (the one with the chat)
            if (window.innerWidth <= 600) {
                leftContainer.classList.add('invisible');
                rightContainer.classList.remove('invisible');
            }

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