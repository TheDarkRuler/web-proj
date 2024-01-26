document.addEventListener('DOMContentLoaded', function () {

    let settingsButton = this.querySelector('.save-button');

    settingsButton.addEventListener('click', () => {
        document.getElementById('update-form').submit();
    });
});
