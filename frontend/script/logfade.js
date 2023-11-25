document.addEventListener('DOMContentLoaded', function () {
    var popupForm = document.getElementById('logForm');
    var scrollPositionToShowForm = 500; // Adjust this value as needed

    window.addEventListener("scroll", () => {
        console.log(document.documentElement.scrollTop);
        document.documentElement.scrollTop > scrollPositionToShowForm ?
            popupForm.style.animation = 'fadeIn 1s forwards' : popupForm.style.animation = 'fadeOut 1s forwards';
    });
});