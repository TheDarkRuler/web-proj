document.addEventListener("DOMContentLoaded", function () {
    let follow_but = document.getElementById('follow-button');
    let unfollow_but = document.getElementById('unfollow-button');

    follow_but.addEventListener('click', () => {

        let user_id = document.getElementById('user_id');
        let ref_userid = document.getElementById('ref_userid');
        $.ajax({
            url: '../../backend/follower_manager.php',
            type: 'POST',
            data: { follower: user_id.innerHTML, following: ref_userid.innerHTML, type: 'follow' }
        });
    });

    unfollow_but.addEventListener('click', () => {
        console.log("ciao");
        let user_id = document.getElementById('user_id');
        let ref_userid = document.getElementById('ref_userid');
        $.ajax({
            url: '../../backend/follower_manager.php',
            type: 'POST',
            data: { follower: user_id.innerHTML, following: ref_userid.innerHTML, type: 'unfollow' }
        });
    })
});