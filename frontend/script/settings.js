document.addEventListener('DOMContentLoaded', function () {

    const settingsButton = this.querySelector('.save-button');
    const goBackButton = this.querySelector('.goBackButton');

    goBackButton.addEventListener('click', () => {
        history.go(-1);
    });

    settingsButton.addEventListener('click', () => {
        document.getElementById('update-form').submit();
    });
});
