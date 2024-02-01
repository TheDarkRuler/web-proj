document.addEventListener('DOMContentLoaded', () => {

    const sendButton = this.querySelector('.send-form');
    const resetButton = this.querySelector('.reset-button');

    document.getElementById("goBack").addEventListener('click', () => {
        history.back();
    });

    sendButton.addEventListener('click', () => {
        const form = this.querySelector('.post-form');
        form.submit();
    });

    resetButton.addEventListener('click', () => {
        const form = this.querySelector('.post-form');
        form.reset();
    });
});