document.addEventListener('DOMContentLoaded', function () {
    const popupForm = document.getElementById('popupForm');
    let scrollPositionToShowForm = 10;

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > scrollPositionToShowForm
            || document.documentElement.scrollTop > scrollPositionToShowForm) {
            popupForm.style.display = 'block';
        } else {
            popupForm.style.display = 'none';
        }
    });
});
