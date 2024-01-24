export function like(button) {
    let postId = button.parentElement.children[0].innerHTML;
    let val = 1;

    $.ajax({
        url: '../../backend/check_interaction.php',
        type: 'POST',
        data: { column: 'n_like', postId: postId },
        success: function (result) {
            val *= result == 0 ? 1 : -1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    }).done(() => {
        $.ajax({
            url: '../../backend/post_interaction.php',
            type: 'POST',
            data: { column: 'n_like', postId: postId, value: val },
            success: function () {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + " - Error: " + errorThrown);
            }
        });
    });

}

export function dislike(button) {
    let postId = button.parentElement.children[0].innerHTML;
    let val = 1;

    $.ajax({
        url: '../../backend/check_interaction.php',
        type: 'POST',
        data: { column: 'n_dislike', postId: postId },
        success: function (result) {
            val *= result == 0 ? 1 : -1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    }).done(() => {
        $.ajax({
            url: '../../backend/post_interaction.php',
            type: 'POST',
            data: { column: 'n_dislike', postId: postId, value: val },
            success: function (result) {
            },
            dataType: 'json'
        });
    });
}

export function showComment(button) {
    let postId = button.parentElement.children[0].innerHTML;
    let commentList = document.getElementById('comment-list');

    $.ajax({
        url: '../../backend/comment_manager.php',
        type: 'POST',
        data: { type: 'show', postId: postId },
        success: function (result) {
            commentList.innerHTML = '';
            for (let i = 0; i < result.length; i++) {
                commentList.innerHTML += `<div class='comment'><p class='comment-content'>` + result[i][2] + `</p></div>`;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        },
        dataType: 'json'
    });
}

export function addComment(content, button) {
    let postId = button.parentElement.children[0].innerHTML;

    $.ajax({
        url: '../../backend/comment_manager.php',
        type: 'POST',
        data: { type: 'insert', postId: postId, content: content },
        success: function (result) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });
}