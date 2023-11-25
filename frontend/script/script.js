console.log("Js connected properly!");

document.addEventListener('DOMContentLoaded', function () {
    var popupForm = document.getElementById('popupForm');
    var scrollPositionToShowForm = 10; // Adjust this value as needed

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > scrollPositionToShowForm || document.documentElement.scrollTop > scrollPositionToShowForm) {
            popupForm.style.display = 'block';
        } else {
            popupForm.style.display = 'none';
        }
    });
});
