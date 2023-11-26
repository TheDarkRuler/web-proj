document.addEventListener('DOMContentLoaded', function () {
    var popupForm = document.getElementById('container');
    var scrollPositionToShowForm = 10; // Adjust this value as needed
    let switched = false;

    window.addEventListener("scroll", () => {
        let scroll = document.documentElement.scrollTop;
        console.log(scroll);
        scroll > scrollPositionToShowForm ?
            popupForm.style.animation = 'fadeIn 1s forwards' : popupForm.style.animation = 'fadeOut 1s forwards';

    });

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const linkToSwitchUp = document.getElementById('switchToSignUp');
    const singUpPanel = document.querySelector('.sign-up-container');
    const signInPanel = document.querySelector('.sign-in-container');

    linkToSwitchUp.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        if (window.innerWidth <= 600) {
            singUpPanel.style.visibility = 'visible';
            signInPanel.style.visibility = 'hidden';
        }
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
});
