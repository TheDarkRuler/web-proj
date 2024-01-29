document.addEventListener("DOMContentLoaded", function () {
    let follow_but = document.getElementById('follow-button');
    let unfollow_but = document.getElementById('unfollow-button');

    if (follow_but != null) {
        follow_but.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            let user_id = document.getElementById('user_id');
            let ref_userid = document.getElementById('ref_userid');
            $.ajax({
                url: '../../backend/follower_manager.php',
                type: 'POST',
                data: { follower: parseInt(user_id.innerHTML), following: parseInt(ref_userid.innerHTML), type: 'follow' }
            });
        });
    }

    if (unfollow_but != null) {
        unfollow_but.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            let user_id = document.getElementById('user_id');
            let ref_userid = document.getElementById('ref_userid');
            $.ajax({
                url: '../../backend/follower_manager.php',
                type: 'POST',
                data: { follower: parseInt(user_id.innerHTML), following: parseInt(ref_userid.innerHTML), type: 'unfollow' },
            });
        })
    }
});