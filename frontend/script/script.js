console.log("Js connected properly!");

document.addEventListener('DOMContentLoaded', function () {
    var popupForm = document.getElementById('container');
    var scrollPositionToShowForm = 10;

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > scrollPositionToShowForm
            || document.documentElement.scrollTop > scrollPositionToShowForm) {
            popupForm.style.display = 'block';
        } else {
            popupForm.style.display = 'none';
        }
    });
});
