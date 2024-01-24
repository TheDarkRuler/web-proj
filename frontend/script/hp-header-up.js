document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var scrollDown = 0;
    var scrollDirection = false; // true == down | false == top
    var scrollPositionToShow = 10;
    const posts = document.getElementsByTagName("main")[0];


    posts.addEventListener('scroll', function () {
        if (scrollDown > scrollPositionToShow + 10) {
            header.style.top = '-10%';
        } else {
            header.style.top = '0';
        }

        if (scrollDown > posts.scrollTop) {
            if (!scrollDirection) {
                scrollDirection = true;
                scrollPositionToShow = posts.scrollTop;
            } else {
                scrollDown = posts.scrollTop;
            }
        } else {
            if (!scrollDirection) {
                scrollDown = posts.scrollTop;
            } else {
                scrollDirection = false;
                scrollPositionToShow = posts.scrollTop;
            }
        }
    });

    $.ajax({
        url: '../../backend/chat_preview.php',
        type: 'POST',
        data: {},
        success: function (result) {
            let container = document.querySelector('.direct-container');
            container.innerHTML = "";
            let image = '';
            for (let i = 0; i < result.length; i++) {
                $.ajax({
                    url: '../../backend/load_head.php',
                    type: 'POST',
                    data: { user_id: result[i][0] },
                    success: function (new_res) {
                        image = new_res;
                    },
                }).done(() => {
                    container.innerHTML += `<div class="direct" onclick="chatClick()">` + image + `<p class='direct-user'>` + result[i][1] + `#` + result[i][0] + `</p></div>`;
                });
            }
        },
        dataType: 'json'
    });
});