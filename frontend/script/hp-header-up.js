document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var scrollDown = 0;
    var scrollDirection = false; // true == down | false == top
    var scrollPositionToShow = 10;

    window.addEventListener('scroll', function () {
        if (scrollDown > scrollPositionToShow + 10) {
            header.style.top = '-10%';
        } else {
            header.style.top = '0';
        }

        if (scrollDown > this.document.documentElement.scrollTop) {
            if (!scrollDirection) {
                scrollDirection = true;
                scrollPositionToShow = this.document.documentElement.scrollTop;
            } else {
                scrollDown = this.document.documentElement.scrollTop;
            }
        } else {
            if (!scrollDirection) {
                scrollDown = this.document.documentElement.scrollTop;
            } else {
                scrollDirection = false;
                scrollPositionToShow = this.document.documentElement.scrollTop;
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
                    container.innerHTML += `<div class="direct">` + image + `<p>` + result[i][1] + `</p></div>`;
                });
            }
        },
        dataType: 'json'
    });
});