document.addEventListener("DOMContentLoaded", () => {
    const follow_but = document.getElementById('follow-button');
    const unfollow_but = document.getElementById('unfollow-button');

    if (follow_but != null) {
        follow_but.addEventListener('click', event => {
            event.stopPropagation();
            const user_id = document.getElementById('user_id');
            const ref_userid = document.getElementById('ref_userid');
            $.ajax({
                url: '../../backend/follower_manager.php',
                type: 'POST',
                data: {
                    follower: parseInt(user_id.innerHTML),
                    following: parseInt(ref_userid.innerHTML),
                    type: 'follow'
                },
            }).done(() => {
                location.reload();
            });
        }, { once: true });
    }

    if (unfollow_but != null) {
        unfollow_but.addEventListener('click', event => {
            event.stopPropagation();
            const user_id = document.getElementById('user_id');
            const ref_userid = document.getElementById('ref_userid');
            $.ajax({
                url: '../../backend/follower_manager.php',
                type: 'POST',
                data: {
                    follower: parseInt(user_id.innerHTML),
                    following: parseInt(ref_userid.innerHTML),
                    type: 'unfollow'
                },
            }).done(() => {
                location.reload();
            });
        }, { once: true })
    }
});