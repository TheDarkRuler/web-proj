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
                    data: {user_id: result[i][0]},
                    success: function (new_res) {
                        image = new_res;
                    },
                }).done(() => {
                    const div = document.createElement('div');
                    div.classList.add('direct');
                    div.innerHTML = image + `<p class='direct-user'>` + result[i][1] + `#` + result[i][0] + `</p>`;
                    container.appendChild(div);
                    div.addEventListener('click', () => {
                        chatClick(div);
                    })
                });
            }
        },
        dataType: 'json'
    });
})