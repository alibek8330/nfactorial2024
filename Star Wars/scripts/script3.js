document.addEventListener('DOMContentLoaded', function() {
    adjustVideoSize();
    window.addEventListener('resize', adjustVideoSize); 
});

function adjustVideoSize() {
    var video = document.getElementById('video');
    var content = document.querySelector('main');


    video.style.minHeight = content.offsetHeight + "px";

    if (content.offsetWidth / content.offsetHeight < video.videoWidth / video.videoHeight) {
        video.style.minWidth = "auto"; 
        video.style.width = "100%";
    } else {
        video.style.minWidth = "100%";
        video.style.width = "auto";
    }
}