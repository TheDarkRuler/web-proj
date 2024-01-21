document.addEventListener('DOMContentLoaded', function () {

    let settingsButton = this.querySelector('.save-button');

    settingsButton.addEventListener('click', () => {
        console.log("caisd");
        document.getElementById('update-form').submit();
    });
});
