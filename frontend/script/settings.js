function previewImage() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById('upload-image').files[0]);

    fileReader.onload = function (e) {
        document.getElementById('preview-image').src = e.target.result;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let button = document.querySelector('.save-button');

    console.log(button);

    button.addEventListener('click', () => {
        console.log('Hello from save forms');

        document.getElementById('text-info-form').submit();
        document.getElementById('image-form').submit();
    });
});
