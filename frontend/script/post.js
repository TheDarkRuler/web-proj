export function updatePostsStats() {
    let stats = document.querySelectorAll('.hidden-id');

    stats.forEach(s => {
        let post = s.parentElement;
        let text = post.children;

        $.ajax({
            url: '../../backend/post_stats.php',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: { postId: parseInt(s.innerHTML) },
            success: (result) => {
                for (let i = 1; i < 3; i++) {
                    text[i].children[1].innerHTML = result[i - 1];
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + " - Error: " + errorThrown);
            }
        });
    });
}

export function manageAllLikes() {
    const likeBtn = document.querySelectorAll('.like-icon');
    const dislikeBtn = document.querySelectorAll('.dislike-icon');

    for (let i = 0; i < likeBtn.length; i++) {
        manageLikes(likeBtn[i], dislikeBtn[i]);
    }
}

export function manageLikes(likeBtn, dislikeBtn) {
    const likeIconActive = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAADxklEQVR4nO2Y328UVRTHr+KDxmiC+mZ80Cc1MRLU2JBNtjtz7zl3HxrDkgKhbVIisCktgYDpIoHUhhZowm4ffIEH/wCJ/4AY5aF05t4RA0hawo8CQqolWCi7szv8aHfIqVQNu233Z4eHfpOTbDJ7z/3MOeeeOTOMLWtZz7G0ab5pcd7lINpaiEnbNKcV5w8cxGs2wDEViXyymI9h0/xMARzXUl6nteSDfDlSWkqITgvgjbLB/J6eF5UQX2shMhfb2rITiYSfPnTIzyaTfvrwYf/vAwf8sW3bZhxETyP+bBnG28/6cADe0VL+oqX0xuLxGVpDa+d8kM/R1tYs7aE5T9CeJcGdE+JVLeVP59etc6f6+nxvcHBey6VSBPpYC3Hfbmz8fM6H4rxBC5Gma/SfhXzQHrSXRjxJey8aOYIbbW31csnkgo7/bxOJhE+RsDn/QBnGhwrAndi7t+T1dBO0p4P444KRpFCfj8XccuC8p/ZHV1feAbisEa/c2LEjX+56gjwbi7kK4KuicFSsFIXF0jqvpVL+heZml4x+V+LjXl8fZSI9FAqtLACkE3WxpcWtCG7wv3qq+AafGjHYnHcUAP4q5TDVUjXOvRrYRHe370SjQ4X1J8QkHf+gAe/39/sa8U5hijl/TD0qaMBsMukTSyEgwFRmYCBwQHdgYLZlFQA60agqp3fVyyZ7eijFV4ud4vjIpk3ZoAFvdHZOa8RvCwGlfF0DpKlIgwQ809SUtk2zsUirnj3J34wGGMU7+/f7DsB1n7EXigKeCodf1gB/BlKLqZR/bu3atOK8rSjcv6mORAyN6GWOHFlSwPHdu/MacaSksUsD9P++fn2m0meqV6ZR3SsAT3P+KStFs2MX4tBYPP6o3nC5f1Kb04i9rBzNTjcAtyn09QQc27r1gQNgnWhuXsHK1WkhVlFXp3G9HnA3d+6cpkNJ7z6sUlFPUoju3d7emsL91d2dp8frMMD7rFop0/xCI+buHTxYs36nAaZUJPIxq5VsIdq1lNlqB9Lb+/bRic3Q6yirtZRhfOlEoy6N5lWk1bU5D7F6yTLNFo2YLbcmb+3aNaMRJy3DWM3qLZvzmJbSpdGoFLirW7Y8dABuKSHeZUslFYmABshQ2uYDyx496o9s3Og6AGfPhMNvsaWWxflHCuDutY6O6Wfh6MT/1tRE77nfWw0Nr7Cg5Jjme7YQNy9t3uzNfeYY37MnrwE8W4jt7HnQUCi0UgkxfGHDhsyl9nb6oDRelzZSjU6Fwy/ZiN8pxB9Or1nzWtA8y1oWq5GeAGmQcZm54tOjAAAAAElFTkSuQmCC" alt="like">
    <figcaption></figcaption>`;
    const dislikeIconActive = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEg0lEQVR4nO2YS0xcVRjHr4/4iEaj7kx042PhykUZm4i53PN9984MwyXNkAl0gtLntCW2mVRrgkAJj5I20GlsoybaRJuJLrp00bhjAb3nXB4FeVSLhRhd+KjQYhnqPK/5BgeBGYaZgWlJ7D/5lue7v/ud73HOkaT7+r9pW1mFLG1VvSG7ymxleqKkrOKotFVlk3W/rUy33pT1ZqEojAM0c4BzHOBrg7HPOGPvmYjb8vF50eN5SDCmcMYaOcB58sUZO2sw9iFHLO2R5YdzdtYjy08eUZzfEmS74rAGysvD37nd4ateb3zM44maDkeEA1gCccoAqKOPr+XL2L79cYOxDzjiDVoz4HL9PV5dHZ3YuTM+4naHB5zO8L++Zg3G/OMezyNZ4fo17QWuqtdMVY19Uv22RZDnD/mtO2fOrLA/m5ut72trEwZAQqjqkAnwahocYzYOMC00LTJ98KA1d+JEmh+ym21t1pTPZxmICaFpore09Jk1/1ao6uSQrkfnOjuTi4PvHl0Tkmy2tdUa0vWYQLxtIC4Vl0B0cYDweE1N9PbJkxnXZvLV73DEuKryjLtiAHRQ5FJwKVsPcr6ry5rweuMCcaFPVV+/DFBCcNfq6uILgUBOcMshOUCctjstehxx7qf6+owL14MMnT5tjbjdFMnrQlWnRj2eaL5wKbu+b58lVPW3FYUjFEWjZF0dvXwgb3V0ULITZGytfMvFKCeThcPYW0uAHKCJqnW9xetB/nz4cNIKhUtZv9MZoepfDvjpWHV1NJfF2SAXAoGkbRSQUsRg7OP/ABn7asLrTeTqYL1I3tmgEQsxLQc8O1pVFcnHSTEhR6uqaBicW77FR0y7Pe/KCxYJst/pDK/IwT5FeYkq54/GxrydBTcZ8mZ7e7KKaRKt6IUCcXDC640V4jS4iZA0Fml2Wy0tD64GpPGUnLP3CnK+q8sy7faIAdCQNuosSXpAIPZeqayMhrq77wnk9IED1Oz/GkR8OuOBgSO+whHDk7t3FxyFYIGQs21ti5MIwJcRbmmrAXy01b8eO3bXIEPd3dYVXQ8LxMtpubdGJC/QyWbm+PHiQwYC1tXaWprhM32Iz0u56JLD8aihqr2m3R6j4V1MyCmfj9pKZPl5MidRogqAsUGnM7KR00kwCyQVhcEYjbUaqRAZmvYsBxjuLy+PbHYkp1NwiPuljUg4HE9xRJO2e6alZcOQnx/yWz/u3ZvgALGCI7daI6r6hEDsMTUt+ntDQ8GQF+r9SchWxRG7DFAhbaaocDjilxwgUcih9FZHhzVcWRnpVOwhgrTJevq02AwJRXmfLjY/7NoVp7tILnDUUyn6BuJIL+KLqceB4kEuzu354R07InT6yNaAJ/fsWbxjAHzRI8uPpXwUHdKQ5ZeFqo5yxPgv/vQWcqOpie7MUQMgZAC8k8lH0SEvUUNn7COKEN2N50+dSkYt+VJArw6IJv1INh9FhyRRRdIZjvrloMsV5Yghunxne7e565AmwHMc4CIH+IbeePJdT09+JXJFzMYqX5O2qmxbGe6+pCLpH66ubopcE0LAAAAAAElFTkSuQmCC" alt="like">
    <figcaption></figcaption>`;
    const likeIconNonActive = `<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtElEQVR4nO2aWYhOYRjHf8iSMdkztrGOZSxRskwSqWlEQors3NjiSuSCiAt3bpTliiwJxYUbucCFCYVkKWMZy+CzlSzZjd56Tz09zvm+8505Z3znzPnVqVPf877P+3/O877nfM/7QkpKSkpKSkNoBfQCugHNiJ5m1lcv67vRGQRsAC4Cb4B6cf0EXgCngKVA1xD8dQQWAMeB58AP5fMdcAnYCJQTISOAE8p5rssMdj/QI4C/zsAu4GuePi8Dk8MUXgwcBf54OPwOPANeZxnUF5s1fqfIeuCjR19OltXZey+fZ2wQG8QA4I7LUz0JLAJKlH1LmymbgRsugzoCtMniz/x2yKXdeWCNHY8MornvD6wGzrk8pMfAqKDiy4H3ojPT+TE7CL/MAu6pQVUD7V1s29vfpK1ZZybk4W8ccMEl+yoIsPA8EJ18tU88CK2Bw2pQ14FOSvwVFWwz/5sH8GeyYhPwW/SXAXrn08E50fgDMCbAQHSfO1UQrgId7HVVTbF5NJyFKgjXgBZ+07beXr+AKsJjm0sQtPg5IfrbovytyNWgBXBXNNhO+OggRCXeybzzwsezHIsws9W8aUc0bGsE8Q6j1VRYls34oDA0X1ZRslV8R0Ql3uG00GXuPdP/rTAcSPSMtO/xqFkkdH32mgaDhNF9kkUnNQ3GuxlNEgZnSR4Zoc+8Iv9hvjA4QPK4KfStzTVP9pI85PfGKjeDqeqfVNKoE/pmuhkMEwYmXZJEG1VIGetl9NkamBWzO8lhmhD/zdY4XJEfDCtJDvuELvNHz5PlwrDGFjjiTg9bE3B0rctmXAS8FMam0hJ39gs9n1QdwpXVooGpyw0nvsxRZbIdfhq1BG6LRo9CKm83NqPFou5M6bZ+G/dVNf97LgXQQmYI8EplsnnN58UU9e68BXSh8BmuHp6pas0I2tl0+96MSyYMVou4Eb8kjIXkh+j0xv/ak/NRxs8o8UEr2TmDUEZhMVTN+VDFO8ywu0R7KLwF72XU4guVMrtPGOqcj5P4uqYqfmBTFt8HqE3F0/SefKnd72+SaV8aJ/EV9rhMdcCzQX7mfEG/5w+oHaaeIT/5ghZvmKhOdtXYM3350tvWImIl3qFSBaHW1hj8YgL2UIlfTMyoVEF4AvTzKf5B3MUHDUKJOlUWa/FeQXjqcSagWxLFO1SpIGTsSbBie811+baPzYIXNAjOFpw8uJBY8bLQ+k4JrlfVW3NQK9GUALtVymdspSnI90KsKcq2U5uSkpKSkpKSQoT8BbZdy8lHIqGOAAAAAElFTkSuQmCC"
    alt="like">
    <figcaption></figcaption>`;
    const dislikeIconNonActive = `<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADs0lEQVR4nO2aSWgUQRSGv5jENa6QEdEguEUlalCDCEYEET14iBpEET14c0MkUS+K6EEEL0ZwAVEJURBz0INe3A6uQQUlMehBI7hF4ooaY0zMSME/UMSe6emeng38oaCn36v3+u/qelXv1QDcBB4CIbIc94Ew0JTtZAqBRpF5Cowii1H4n0yGovD/yGQoQopidjQbC1QD14F3QKdaK3AD2AvM8OCjFNinvq2y9UMB5yqwA5gUNJnPQI+u3dotYH4MuwuA23HaCgPXgFlBkjHtIlAJTAAGAf2BImApcFSEwyJ9HBhg2TLXJyxbn4Aj6lskW4OAYqACONXL3mEgzysBY7DcgcwTl0WzANgNdEj/LjAcGAE06N5PYJd03TAU2K8+kdEZFi8Jw/qyHmaRDzIG04EW6d8RIXP9AijBO2YDbywycY3MIXV4D4y37nslMwZ4aX1KLbrnF2MsMjVuyibqdCuCOE0wr2RKNbIdHiNaNJTJ1h9gZlQthVbzkAdj6HglU6UWFA7ItwnRjhgnha/AEBdjXsjkqgWFYVY0m+iksFPC2izYzpyW3+1OwhsSmhgeL7x+ZkFhmXxecRK2SjjFo9F0kCmWv2dOwk4JB/swnOrPrEC+vsci0s+n8VSSGSg/7U7CDxKaB/KLVH1mRfLx2kkYeZtm0SHDyZTJ/iMn4TkJ1wfgKNlkNsZaKqokrAvIWTLJnJFdQ+gflEj4EeibwWQGaPdhbE6OptQshVUEh6DJrJGtB7GUtkrJVB9zyDwyfYDHsrPJbaFpk+IKgkUQZFar/9teabQjtkn5lc9VPllkhluJleMk7408xWcvO+FUkDmrPg1e0oJpqjGFA06K/JLZbBUuokaqaFipMoxJfZeQPjKLgS7prU00rfzmUnRLFpkF2hi6pd+uyLVW0XarPJQKMgu1TQ8rIzShNyEYAydl8BewnOST2WClFXVB5vyGzDGrfLkn4AXTqTwbVv0q4ZFwQrUmv3FyIY5qSyJk2pKdNpsI9sWqHs4LwOacKOXZpmSTmWidBner0Jzvw06+zlW6NP/K00EmT7Ww33LYqOJ1vBhnnZP0aD70S2fdbC7w3Fp5t7gEghyt1JGjgpcx1qhQKkcmUtWosaKNqcuOdtAbCVyy9M5rM5hxFc0KHUdEMk1zuhVBpe5Fjiz8VjSbUlXRNG+w3nrrtWqR3/U+S06hdJAxWGftoMO6NvcSQShdZKaqDtCs6yAQSheZIUneATRl+7+aQhYZszhnNQwZ86e5e38BPMqCTuwGZHAAAAAASUVORK5CYII="
    alt="dislike">
    <figcaption></figcaption>`;

    $.ajax({
        url: '../../backend/post_check_interaction.php',
        type: 'POST',
        data: { postId: parseInt(likeBtn.parentElement.children[0].innerHTML) },
        success: result => {
            let val = parseInt(result);

            if (val % 10 == 1) {
                dislikeBtn.innerHTML = dislikeIconActive;
            } else {
                dislikeBtn.innerHTML = dislikeIconNonActive;
            }

            if (parseInt(val / 10) > 0) {
                likeBtn.innerHTML = likeIconActive;
            } else {
                likeBtn.innerHTML = likeIconNonActive;
            }
        },
        dataType: 'json'
    });
}