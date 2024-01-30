function update_users(n_users, loadMore, search_in) {
    $.ajax({
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

document.addEventListener('DOMContentLoaded', (event) => {

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

    searchInput.addEventListener("input", () => {
        filter = searchInput.value;
        (filter == "") ?
            setTimeout(() => {
                update_users(n_users, loadMore, filter);
            }, 500) :
            update_users(n_users, loadMore, filter);
    }) 

});