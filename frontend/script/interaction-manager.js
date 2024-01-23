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