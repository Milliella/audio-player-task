console.log("hello world");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const playPause = document.getElementById("play-pause");
const seekBar = document.getElementById("seek-bar");
const audio = new Audio("audio/Dantes-Seventh-Hell.webm");
const volumeControl = document.getElementById("volume-conrol");
const obj = document.createElement("audio");
console.log(obj.volume); //1
obj.value = 1;
let isSeeking = false;

playPause.onclick = function(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }

}
audio.oncanplaythrough = function(){
    seekBar.disabled = false;
}
audio.onplay = function(){
    playPause.src = "images/pause.svg";
}
audio.onpause = function(){
    playPause.src = "images/play.svg";
}
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    seekBar.max = Math.floor(audio.duration);
}
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime);
    if(!isSeeking){
        seekBar.value = Math.floor(audio.currentTime);
    }

}
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    playPause.src = "images/play.svg";

}
seekBar.oninput = function(){
    isSeeking = true;
}
seekBar.onchange = function(){
    audio.currentTime = seekBar.value;
    isSeeking = false;
}


function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}






