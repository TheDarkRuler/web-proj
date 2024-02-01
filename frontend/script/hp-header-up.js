document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const posts = document.getElementsByTagName("main")[0];
    let scrollDown = 0;
    let scrollDirection = false; // true == down | false == top
    let scrollPositionToShow = 10;


    posts.addEventListener('scroll', () => {
        if (scrollDown > scrollPositionToShow + 10) {
            header.style.top = '-10%';
        } else {
            header.style.top = '0';
        }

        if (scrollDown > posts.scrollTop) {
            if (!scrollDirection) {
                scrollDirection = true;
                scrollPositionToShow = posts.scrollTop;
            } else {
                scrollDown = posts.scrollTop;
            }
        } else {
            if (!scrollDirection) {
                scrollDown = posts.scrollTop;
            } else {
                scrollDirection = false;
                scrollPositionToShow = posts.scrollTop;
            }
        }
    });
});