document.addEventListener('DOMContentLoaded', () => {
    const popupForm = document.getElementById('container');
    const scrollDownMess = document.getElementById('scrollDown');
    const scrollPositionToShowForm = 10; // Adjust this value as needed
    let switched = false;

    const upsize = document.getElementById('upsize');
    const insize = document.getElementById('insize');

    upsize.value = screen.width;
    insize.value = screen.width;

    window.addEventListener("resize", () => {
        upsize.value = screen.width;
        insize.value = screen.width;
    })


    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > scrollPositionToShowForm) {
            popupForm.style.animation = 'fadeIn 1s forwards'
            scrollDownMess.style.visibility = 'hidden';
        } else {
            popupForm.style.animation = 'fadeOut 1s forwards';
            scrollDownMess.style.visibility = 'visible';
        }
    });

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const linkToSwitchUp = document.getElementById('switchToSignUp');
    const linkToSwitchIn = document.getElementById('switchToSignIn');
    const singUpPanel = document.querySelector('.sign-up-container');
    const signInPanel = document.querySelector('.sign-in-container');

    linkToSwitchUp.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            container.classList.add("right-panel-active");
            signInPanel.style.visibility = 'hidden';
            singUpPanel.style.visibility = 'visible';
            singUpPanel.style.marginLeft = '-100%';
        }
    });

    linkToSwitchIn.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            container.classList.remove("right-panel-active");
            signInPanel.style.visibility = 'visible';
            singUpPanel.style.visibility = 'hidden';
            singUpPanel.style.marginLeft = '0';
        }
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const alertBtn = document.querySelector('.closebtn');

    alertBtn.addEventListener('click', () => {
        const alert = document.querySelector('.alert');
        alert.style.display = 'none';
    })
});
