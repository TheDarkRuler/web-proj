import { addComment, dislike, like, showComment } from './interaction-manager.js';
import { updatePostsStats, manageAllLikes } from "./post.js";

// function to update the posts in the personal page 
function update_posts(user_id, n_posts, loadMore) {
    const username = document.getElementById('username').innerHTML;

    $.ajax({
        url: '../../backend/post-get-limit.php',
        type: 'POST',
        datatype: 'json',
        data: { id: user_id.trim(), limit: n_posts },
        success: result => {
            const container = document.querySelector('.posts-list');
            container.innerHTML = "";

            result = JSON.parse(result);

            if (result.length != n_posts) {
                loadMore.remove();
            }

            for (let i = 0; i < result.length; i++) {
                let resultImage;
                $.ajax({
                    url: '../../backend/post-get-limit.php',
                    async: false,
                    type: 'POST',
                    data: { id: result[i][0], func: 'get-image' },
                    success: image => {
                        resultImage = image;
                    },
                }).done(() => {
                    container.innerHTML += `
                             <div class="post">
                                 <div class="image-section">
                                     <p class="post-creator">
                                         ` + username + `
                                     </p>
                                     ` + resultImage + `
                                     <div class="icons">
                                         <p class='hidden-id' hidden>` + result[i][0] + `</p>
                                         <span class='like-icon'>
                                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtElEQVR4nO2aWYhOYRjHf8iSMdkztrGOZSxRskwSqWlEQors3NjiSuSCiAt3bpTliiwJxYUbucCFCYVkKWMZy+CzlSzZjd56Tz09zvm+8505Z3znzPnVqVPf877P+3/O877nfM/7QkpKSkpKSkNoBfQCugHNiJ5m1lcv67vRGQRsAC4Cb4B6cf0EXgCngKVA1xD8dQQWAMeB58AP5fMdcAnYCJQTISOAE8p5rssMdj/QI4C/zsAu4GuePi8Dk8MUXgwcBf54OPwOPANeZxnUF5s1fqfIeuCjR19OltXZey+fZ2wQG8QA4I7LUz0JLAJKlH1LmymbgRsugzoCtMniz/x2yKXdeWCNHY8MornvD6wGzrk8pMfAqKDiy4H3ojPT+TE7CL/MAu6pQVUD7V1s29vfpK1ZZybk4W8ccMEl+yoIsPA8EJ18tU88CK2Bw2pQ14FOSvwVFWwz/5sH8GeyYhPwW/SXAXrn08E50fgDMCbAQHSfO1UQrgId7HVVTbF5NJyFKgjXgBZ+07beXr+AKsJjm0sQtPg5IfrbovytyNWgBXBXNNhO+OggRCXeybzzwsezHIsws9W8aUc0bGsE8Q6j1VRYls34oDA0X1ZRslV8R0Ql3uG00GXuPdP/rTAcSPSMtO/xqFkkdH32mgaDhNF9kkUnNQ3GuxlNEgZnSR4Zoc+8Iv9hvjA4QPK4KfStzTVP9pI85PfGKjeDqeqfVNKoE/pmuhkMEwYmXZJEG1VIGetl9NkamBWzO8lhmhD/zdY4XJEfDCtJDvuELvNHz5PlwrDGFjjiTg9bE3B0rctmXAS8FMam0hJ39gs9n1QdwpXVooGpyw0nvsxRZbIdfhq1BG6LRo9CKm83NqPFou5M6bZ+G/dVNf97LgXQQmYI8EplsnnN58UU9e68BXSh8BmuHp6pas0I2tl0+96MSyYMVou4Eb8kjIXkh+j0xv/ak/NRxs8o8UEr2TmDUEZhMVTN+VDFO8ywu0R7KLwF72XU4guVMrtPGOqcj5P4uqYqfmBTFt8HqE3F0/SefKnd72+SaV8aJ/EV9rhMdcCzQX7mfEG/5w+oHaaeIT/5ghZvmKhOdtXYM3350tvWImIl3qFSBaHW1hj8YgL2UIlfTMyoVEF4AvTzKf5B3MUHDUKJOlUWa/FeQXjqcSagWxLFO1SpIGTsSbBie811+baPzYIXNAjOFpw8uJBY8bLQ+k4JrlfVW3NQK9GUALtVymdspSnI90KsKcq2U5uSkpKSkpKSQoT8BbZdy8lHIqGOAAAAAElFTkSuQmCC"
                                                 alt="like">
                                                 <figcaption></figcaption>
                                         </span>
                                         <span class='dislike-icon'>
                                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADs0lEQVR4nO2aSWgUQRSGv5jENa6QEdEguEUlalCDCEYEET14iBpEET14c0MkUS+K6EEEL0ZwAVEJURBz0INe3A6uQQUlMehBI7hF4ooaY0zMSME/UMSe6emeng38oaCn36v3+u/qelXv1QDcBB4CIbIc94Ew0JTtZAqBRpF5Cowii1H4n0yGovD/yGQoQopidjQbC1QD14F3QKdaK3AD2AvM8OCjFNinvq2y9UMB5yqwA5gUNJnPQI+u3dotYH4MuwuA23HaCgPXgFlBkjHtIlAJTAAGAf2BImApcFSEwyJ9HBhg2TLXJyxbn4Aj6lskW4OAYqACONXL3mEgzysBY7DcgcwTl0WzANgNdEj/LjAcGAE06N5PYJd03TAU2K8+kdEZFi8Jw/qyHmaRDzIG04EW6d8RIXP9AijBO2YDbywycY3MIXV4D4y37nslMwZ4aX1KLbrnF2MsMjVuyibqdCuCOE0wr2RKNbIdHiNaNJTJ1h9gZlQthVbzkAdj6HglU6UWFA7ItwnRjhgnha/AEBdjXsjkqgWFYVY0m+iksFPC2izYzpyW3+1OwhsSmhgeL7x+ZkFhmXxecRK2SjjFo9F0kCmWv2dOwk4JB/swnOrPrEC+vsci0s+n8VSSGSg/7U7CDxKaB/KLVH1mRfLx2kkYeZtm0SHDyZTJ/iMn4TkJ1wfgKNlkNsZaKqokrAvIWTLJnJFdQ+gflEj4EeibwWQGaPdhbE6OptQshVUEh6DJrJGtB7GUtkrJVB9zyDwyfYDHsrPJbaFpk+IKgkUQZFar/9teabQjtkn5lc9VPllkhluJleMk7408xWcvO+FUkDmrPg1e0oJpqjGFA06K/JLZbBUuokaqaFipMoxJfZeQPjKLgS7prU00rfzmUnRLFpkF2hi6pd+uyLVW0XarPJQKMgu1TQ8rIzShNyEYAydl8BewnOST2WClFXVB5vyGzDGrfLkn4AXTqTwbVv0q4ZFwQrUmv3FyIY5qSyJk2pKdNpsI9sWqHs4LwOacKOXZpmSTmWidBner0Jzvw06+zlW6NP/K00EmT7Ww33LYqOJ1vBhnnZP0aD70S2fdbC7w3Fp5t7gEghyt1JGjgpcx1qhQKkcmUtWosaKNqcuOdtAbCVyy9M5rM5hxFc0KHUdEMk1zuhVBpe5Fjiz8VjSbUlXRNG+w3nrrtWqR3/U+S06hdJAxWGftoMO6NvcSQShdZKaqDtCs6yAQSheZIUneATRl+7+aQhYZszhnNQwZ86e5e38BPMqCTuwGZHAAAAAASUVORK5CYII="
                                                 alt="dislike">
                                                 <figcaption></figcaption>
                                         </span>
                                         <span class='comment-icon'>
                                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTUlEQVR4nO2a/WtOYRjHP4wxw2aSKMS8DaGIElLKH4DGzOYn5SWNyMuI+E2iRfwkWVqIhkXyMpGXKHkfm9cotlh+MbaRTXd9T53WeR7P9jznOfep51OnVtd9rvt7P+d+ue7rGqRIkSJZDAeWAPuAc8BT4B3QqMf8/QSoVJt8YBiWMBrYA7wA2iM8P/REsj8DdgO5QQxgDnAZ+OsSZH7tg0AhMB3I8XgvR7blwCF9Ned94+sSMCsZA8hVZ07n74FtwMg4fI4CSoEPLr9VcfqMSDdgPfBTHdVpPXRPYB/GVwHwWn00AesS6J++wBk5b9YX6IF/9AS2Ay3q8xSQGa9TM6fvy6H5pSaRPCYDb9T3PSC7q476AY/k6CaQRfLJBm5Jw0PNjk6Rpl3JOLgKZBAcfYBqabkobTGzQy+a7bE/wZMFPJemrbG+NAX4rUNsDPYwTrtma6xr9bpGvgb7KJG2K/9rOE8Na3zeYuPZml9J49xoDSvVyIQZtlIsjaejbXVmbXwF0rGXXoqmWyNtRPka6THs57i0LvYylsm4FPtZJq0HvIzOoZOH/UyU1mtexjoZbV4fDr2ltRYPGoBfhIdmoN7LUK/QOSy0AF+8DDX6XCZIC/XUqpbRxDShXux7ZSzCfgqjbb8LZTyK/ZRL6yIvY6Yu/N8VBti8Phq12M0t1pOKEASNK6TxZLRG04A2HY62hvG1Gsjs/zU+r4bmEmMbG6TN5BNiyvw16ZQfjz3kSVOLtt+YWKuRm+T0AIIn23Vgb+5sirTcldMK8rTPlAaj5UJX0rTprtPeZPoGEsyXuC0ND+JJnWYoKeakTE1JIFlMBd6q7zuJyHSaLe+wHJo7/Rb8JR3Y6UpiVyQiie2mQI5NcsIPzLlVpBKdU+la5VeRx5mriS7fmRTtJ/lvUw1yBD5HnEci2EtVTlsJzAAGe8Rsg2Qr1nSt6VB6qwJm4jNOyW2Bx5RwMjBeT7MO2Ej2x8Auv0ptHRkC/AE+dkjrjwVuSFCDynHmwDoB3AVe6gr9TXPf1FvO6u5jQvChJJkyiV3tmiL7le1rVz7WpnDGkwkSbKbHRgWVzgCccDrivcAW0nQYec1tUxKbT0go0Y3xs/5DwcQ6m0KSjUxBkPwDzwIGrMKmHgUAAAAASUVORK5CYII="
                                                 alt="comment">
                                                 <figcaption></figcaption>
                                         </span>
                                     </div>
                                     <div id="comment-section" class="comment-section">
                                        <div class="comment-header">
                                            <span>Comments</span>
                                            <button class="close-btn">X</button>
                                        </div>
                                        <div id="comment-list" class="comment-list">
                                        </div>
                                        <div id="comment-input" class="comment-input">
                                            <input type="text" class="comment-text" id="comment-text" placeholder="Write your comment" />
                                            <button class="comment-send">Send</button>
                                        </div>
                                    </div>
                                 </div>
                                 <div class="description-section">
                                     <p>
                                         ` + result[i][2] + `
                                     </p>
                                 </div>
                             </div>`;

                    manageAllLikes();

                    const likeButtons = document.querySelectorAll('.like-icon');
                    const dislikeButtons = document.querySelectorAll('.dislike-icon');
                    const commentButtons = document.querySelectorAll('.comment-icon');
                    const commentSection = document.querySelectorAll('.comment-section');
                    const commentsClose = document.querySelectorAll('.close-btn');
                    const commentButton = document.querySelectorAll('.comment-send');

                    // adding the handler for the like button
                    likeButtons.forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            event.stopImmediatePropagation();
                            like(btn);
                        });
                    });
                    // adding handler for the dislike button
                    dislikeButtons.forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            event.stopImmediatePropagation();
                            dislike(btn);
                        });
                    });

                    // adding handlers for comments buttons
                    for (let i = 0; i < commentButtons.length; i++) {
                        commentButtons[i].addEventListener('click', (event) => {
                            event.stopImmediatePropagation();

                            commentSection.forEach((temp) => {
                                temp.style.display = "none";
                            })

                            commentSection[i].style.display = 'block';

                            commentsClose[i].addEventListener('click', () => {
                                commentSection[i].style.display = "none";
                            });

                            // adding and updating the comments on send click
                            commentButton[i].addEventListener('click', () => {
                                let text = document.querySelectorAll('.comment-text');
                                addComment(text[i].value, commentButtons[i]);
                                showComment(commentButtons[i], i);
                                document.querySelector('.comment-text').value = '';
                            });

                            showComment(commentButtons[i], i);
                        });
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let n_posts = 4;
    const loadMore = document.querySelector(".loadMoreText");
    const posts = document.querySelector(".post-container");
    const containerHeader = document.querySelector(".container");
    let loadingMore = true;
    update_posts(document.getElementById("ref_userid").innerHTML, n_posts, loadMore);
    let haederHeight = ((window.innerWidth <= 600)) ? containerHeader.clientHeight : 0;


    posts.addEventListener("scroll", () => {
        if (loadMore.offsetTop >= posts.scrollTop + 1 &&
            loadMore.offsetTop + loadMore.clientHeight + 2 - haederHeight <= posts.scrollTop + posts.clientHeight &&
            loadingMore) {
            loadingMore = false;
            n_posts += 4;
            update_posts(document.getElementById("ref_userid").innerHTML, n_posts, loadMore);
            setTimeout(() => {
                loadingMore = true;
            }, 1500);
        }
    });

    document.addEventListener('click', (event) => {
        const commentSection = document.querySelectorAll('.comment-section');
        const commentButtons = document.querySelectorAll('.comment-icon');
        for (let i = 0; i < commentButtons.length; i++) {
            let isInside = false;
            commentSection[i].childNodes.forEach((e) => {
                if (e == event.target.parentElement) {
                    isInside = true;
                }
            });
            if (commentSection[i].style.display === 'block' && event.target.parentElement !== commentSection[i] && !isInside) {
                commentSection[i].style.display = 'none';
            }
        }
    });

    setInterval(updatePostsStats, 5000);
});
