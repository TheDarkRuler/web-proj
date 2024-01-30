document.addEventListener('DOMContentLoaded', function () {

    const settingsButton = this.querySelector('.save-button');

    settingsButton.addEventListener('click', () => {
        document.getElementById('update-form').submit();
    });
});
