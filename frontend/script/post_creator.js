document.addEventListener('DOMContentLoaded', function () {

    let sendButton = this.querySelector('.send-form');
    let resetButton = this.querySelector('.reset-button');

    sendButton.addEventListener('click', () => {
        let form = this.querySelector('.post-form');

        form.submit();
    });

    resetButton.addEventListener('click', () => {
        let form = this.querySelector('.post-form');

        form.reset();
    });
});