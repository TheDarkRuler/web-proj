document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var scrollDown = 0;
    var scrollDirection = false; // true == down | false == top
    var scrollPositionToShow = 10;

    window.addEventListener('scroll', function () {
        if (scrollDown > scrollPositionToShow + 10) {
            header.style.top = '-10%';
        } else {
            header.style.top = '0';
        }

        if (scrollDown > this.document.documentElement.scrollTop) {
            if (!scrollDirection) {
                scrollDirection = true;
                scrollPositionToShow = this.document.documentElement.scrollTop;
            } else {
                scrollDown = this.document.documentElement.scrollTop;
            }
        } else {
            if (!scrollDirection) {
                scrollDown = this.document.documentElement.scrollTop;
            } else {
                scrollDirection = false;
                scrollPositionToShow = this.document.documentElement.scrollTop;
            }
        }
    });
});