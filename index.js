console.log("Welcome to spotify");
//Insitilize the variables
let songIndex = 0;
let audioElement = newAudio('2.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBaar = document.getElementById('myProgressBar');
let gif = document.getElementById('myProgessBaar');

let songs = [
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"},
    {songName: " putt jat da", filepath : "song/2.mp3", coverPath: "covers/musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"}
]



// audioElement.play();
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 1;

    }
    }
)
//Listen o Events
myProgressBaar.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //Update Seekbaar
})