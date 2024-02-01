document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("goBack").addEventListener('click', () => {
        history.back();
    });

    const settingsButton = this.querySelector('.save-button');

    settingsButton.addEventListener('click', () => {
        document.getElementById('update-form').submit();
    });
});
