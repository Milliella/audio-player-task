console.log("hello world");


const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const playPause = document.getElementById("play-pause");
const seekBar = document.getElementById("seek-bar");
const audio = new Audio()
const volumeControl = document.getElementById("volume-control");
const button = document.getElementById("button");
const track1button = document.getElementById("track1");
const track2button = document.getElementById("track2");
const track3button = document.getElementById("track3");
const painting = document.getElementById("painting");
console.log(painting)

let isSeeking = false;

// listens for when the play / pause button is clicked. if the pause symbol is showing, play the audio
playPause.onclick = function(){
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
// listens for when each track button is clicked, updates song and seek bar value accordingly 
}
track1button.onclick = function(){
    audio.src = "audio/Dantes-Seventh-Hell.webm"
}
track2button.onclick = function(){
    audio.src = "audio/Slaughterhouse-Mistress.webm"
}
track3button.onclick = function(){
    audio.src = "audio/Where-I-Find-Strength.webm"
}

// the audio duration that the seek bar displays, listens for when the selected audio is fully loaded 
audio.oncanplaythrough = function(){
    seekBar.disabled = false;
}
// click the play button, it then displays the pause button to indicate that the audio is playing and you can pause it.
// listens for when its clicked
audio.onplay = function(){
    playPause.src = "images/pause.svg";
}
// displays the play button to indicate the audio is paused, listens for when the pause button is clicked
audio.onpause = function(){
    playPause.src = "images/play.svg";
}
// takes the total time element and the current time element and applys whats currently happing to them :
// the current time signiture of the track and the total length of the track, uses that to control the audio when the seek bar is used
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
// when the audio ends display the play button to indicate the track has ended and you can play it again, if the song ending is true- display the play button
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    playPause.src = "images/play.svg";

}
// event listener: listens for interaction with seek bar 
seekBar.oninput = function(){
    isSeeking = true;
}
// when the seek bar is moved right or left, take the position of the seek bar and the time signiture it represents and apply that to the track- changing the part of the song you're listening to
seekBar.onchange = function(){
    audio.currentTime = seekBar.value;
    isSeeking = false;
}
// listens for when the volume slider is interacted with, changes volume acordingly, event listener
volumeControl.onchange = function(){
    audio.volume = volumeControl.value/100;
}
// controls the current time that is displayed on the player 
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






