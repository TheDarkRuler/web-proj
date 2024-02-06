import { manageLikes } from "./post.js";

/**
 * Function to like a post
 * @param button like button
 */
export function like(button) {
    const postId = button.parentElement.children[0].innerHTML;
    let val = 1;

    $.ajax({
        url: '../../backend/check_interaction.php',
        type: 'POST',
        data: { column: 'n_like', postId: postId },
        success: result => {
            val *= parseInt(result) === 0 ? 1 : -1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    }).done(() => {
        $.ajax({
            url: '../../backend/post_interaction.php',
            type: 'POST',
            data: { column: 'n_like', postId: postId, value: val },
            success: () => {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + " - Error: " + errorThrown);
            }
        }).done(() => {
            manageLikes(button, button.parentElement.children[2]);
        });
    });
}

/**
 * Function to dislike a post
 * @param button dislike button
 */
export function dislike(button) {
    const postId = button.parentElement.children[0].innerHTML;
    let val = 1;

    $.ajax({
        url: '../../backend/check_interaction.php',
        type: 'POST',
        data: { column: 'n_dislike', postId: postId },
        success: result => {
            val *= parseInt(result) === 0 ? 1 : -1;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    }).done(() => {
        $.ajax({
            url: '../../backend/post_interaction.php',
            type: 'POST',
            data: { column: 'n_dislike', postId: postId, value: val },
            success: result => {
            },
            dataType: 'json'
        }).done(() => {
            manageLikes(button.parentElement.children[1], button);
        });
    });
}

/**
 * Show comment function
 * @param button comment button
 * @param j html item's index
 */
export function showComment(button, j) {
    const postId = button.parentElement.children[0].innerHTML;
    const commentList = document.querySelectorAll('.comment-list');

    $.ajax({
        url: '../../backend/comment_manager.php',
        type: 'POST',
        data: { type: 'show', postId: postId },
        success: result => {
            commentList[j].innerHTML = '';
            for (let i = 0; i < result.length; i++) {
                commentList[j].innerHTML += `
                    <fieldset>
                        <legend>
                            <a href="personal_page.html?ref_username=` + result[i][1] + `&ref_id=` + result[i][2] + `">
                                ` + result[i][1] + `
                            </a>
                        </legend>
                        <p class='comment'>` + result[i][0] + `</p>
                    </fieldset>`;
            }
            commentList[j].scrollTop = commentList[j].scrollHeight;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        },
        dataType: 'json'
    });
}

/**
 * Function to add a comment in a post
 * @param content content of the comment
 * @param button comment button
 */
export function addComment(content, button) {
    const postId = button.parentElement.children[0].innerHTML;
    $.ajax({
        url: '../../backend/comment_manager.php',
        type: 'POST',
        data: { type: 'insert', postId: postId, content: content },
        success: result => {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });
}