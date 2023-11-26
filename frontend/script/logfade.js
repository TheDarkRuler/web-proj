document.addEventListener('DOMContentLoaded', function () {
    var popupForm = document.getElementById('container');
    var scrollPositionToShowForm = 10; // Adjust this value as needed

    window.addEventListener("scroll", () => {
        console.log(document.documentElement.scrollTop);
        document.documentElement.scrollTop > scrollPositionToShowForm ?
            popupForm.style.animation = 'fadeIn 1s forwards' : popupForm.style.animation = 'fadeOut 1s forwards';
    });
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});