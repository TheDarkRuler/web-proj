function previewImage() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById('upload-image').files[0]);

    fileReader.onload = function (e) {
        document.getElementById('preview-image').src = e.target.result;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    let sendButton = this.querySelector('.send-form');
    let resetButton = this.querySelector('.reset-button');
    let settingsButton = this.querySelector('.save-button');

    sendButton.addEventListener('click', () => {
        let form = this.querySelector('.post-form');

        form.submit();
    });

    resetButton.addEventListener('click', () => {
        let form = this.querySelector('.post-form');

        form.reset();
    });

    settingsButton.addEventListener('click', () => {
        document.getElementById('update-form').submit();
    });
});
