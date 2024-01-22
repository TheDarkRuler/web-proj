document.addEventListener('DOMContentLoaded', (event) => {
    $.ajax({
        url: '../../backend/post_load.php',
        type: 'post',
        data: { limit: 3 },
        success: function (result) {
            console.log(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus + " - Error: " + errorThrown);
        },
        dataType: 'json'
    });

});