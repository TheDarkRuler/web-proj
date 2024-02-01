async function update_users(n_users, loadMore, search_in) {
    await $.ajax({
        url: '../../backend/search_redirect.php',
        type: 'POST',
        datatype: 'json',
        data: { limit: n_users, filter: search_in },
        success: function (result) {
            const container = document.querySelector(".users-container");
            result = JSON.parse(result);
            if (result.length != n_users) {
                loadMore.remove();
            }
            container.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                $.ajax({
                    url: '../../backend/search_redirect.php',
                    type: 'POST',
                    data: { id: result[i][0], func: 'get-image' },
                    success: function (image) {
                        container.innerHTML += `
                            <div class="user">
                                <a href="personal_page.html?ref_username=` + result[i][1] + `&ref_id=` + result[i][0] + `">
                                    ` + image + `
                                    <p>` + result[i][1] + `</p>
                                    <p>#` + result[i][0] + `</p>
                                </a>
                            </div>`;
                    },
                })
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        }
    });
}

async function waitUntil(condition, time = 100) {
    while (!condition()) {
        await new Promise((resolve) => setTimeout(resolve, time));
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("goBack").addEventListener('click', () => {
        history.back();
    });

    let n_users = 8;

    const loadMore = document.querySelector(".loadMoreText");
    let loadingMore = true;
    let filter = "";

    update_users(n_users, loadMore, filter);

    loadMore.addEventListener("click" , () => {
        if(loadingMore) {
            loadingMore = false;
            n_users += 8;
            update_users(n_users, loadMore, filter);
            setTimeout(() => {
                loadingMore = true;
            }, 1500);
        }
    });

    const searchInput = document.getElementById("search-input");
    let timeOut = true;

    callUpdateUser = () => {
        timeOut = false;
        update_users(n_users, loadMore, filter).then(() => {
            timeOut = true;
        });
    }

    //setup before functions
    let typingTimer;                //timer identifier
    const doneTypingInterval = 200;  //time in ms (0.2 seconds)

    //on keyup, start the countdown
    searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //user is "finished typing,"
    async function doneTyping () {
        filter = searchInput.value;
        if (timeOut) {
            callUpdateUser();
        } else {
            await waitUntil(() => timeOut === true);
            callUpdateUser();
        }
    } 

});