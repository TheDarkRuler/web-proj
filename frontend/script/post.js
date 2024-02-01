export function updatePostsStats() {
    let stats = document.querySelectorAll('.hidden-id');

    stats.forEach(s => {
        let post = s.parentElement;
        let text = post.children;

        $.ajax({
            url: '../../backend/post_stats.php',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {postId: parseInt(s.innerHTML)},
            success: (result) => {
                for (let i = 1; i < 3; i++) {
                    text[i].children[1].innerHTML = result[i - 1];
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + " - Error: " + errorThrown);
            }
        });
    });
}