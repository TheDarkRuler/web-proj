document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var scrollDown = 0;
    var scrollDirection = false; // true == down | false == top
    var scrollPositionToShow = 10;
    const posts = document.getElementsByTagName("main")[0];


    posts.addEventListener('scroll', function () {
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