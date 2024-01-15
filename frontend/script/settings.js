function previewImage() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById('upload-image').files[0]);

    fileReader.onload = function (e) {
        document.getElementById('preview-image').src = e.target.result;
    }
}

function saveForms() {
    // document.getElementById('text-info-form').submit();
    // document.getElementById('image-form').submit();
}