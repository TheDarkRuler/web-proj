document.addEventListener('DOMContentLoaded', () => {
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
})