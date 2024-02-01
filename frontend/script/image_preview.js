function previewImage() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(document.getElementById('upload-image').files[0]);

    fileReader.onload = e => {
        document.getElementById('preview-image').src = e.target.result;
    }
}