document.addEventListener('DOMContentLoaded', () => {

    const sendButton = document.querySelector('.send-form');
    const resetButton = document.querySelector('.reset-button');

    document.getElementById("goBack").addEventListener('click', () => {
        history.back();
    });

    sendButton.addEventListener('click', () => {
        const form = document.querySelector('.post-form');
        form.submit();
    });

    resetButton.addEventListener('click', () => {
        const form = document.querySelector('.post-form');
    
        document.getElementById('preview-image').src = "";
        form.reset();
    });
});