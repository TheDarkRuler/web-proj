document.addEventListener('DOMContentLoaded', () => {

    let likeBtn = document.getElementById('like-icon');
    let dislikeBtn = document.getElementById('dislike-icon');

    likeBtn.addEventListener('click', () => {
        let postId = likeBtn.parentElement.children[0].innerHTML;
        let val = 1;

        $.ajax({
            url: '../../backend/check_interaction.php',
            type: 'POST',
            data: { column: 'n_like', postId: postId },
            success: function (result) {
                val *= result ? 1 : -1;
            }
        }).done(() => {
            $.ajax({
                url: '../../backend/post_interaction.php',
                type: 'POST',
                data: { column: 'n_like', postId: postId, value: val },
                success: function (result) {
                    console.log(result);
                },
                dataType: 'json'
            });
        });
    });

    dislikeBtn.addEventListener('click', () => {
        let postId = likeBtn.parentElement.children[0].innerHTML;
        let val = 1;

        $.ajax({
            url: '../../backend/check_interaction.php',
            type: 'POST',
            data: { column: 'n_dislike', postId: postId },
            success: function (result) {
                val *= result ? 1 : -1;
            }
        }).done(() => {
            $.ajax({
                url: '../../backend/post_interaction.php',
                type: 'POST',
                data: { column: 'n_dislike', postId: postId, value: val },
                success: function (result) {
                    console.log(result);
                },
                dataType: 'json'
            });
        });
    });
});