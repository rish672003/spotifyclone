console.log("Welcome to spotify");
//Insitilize the variables
let songIndex = 0;
let audioElement = new Audio('pach.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBaar = document.getElementById('myProgressBaar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: " panchi sur me gaate hai", filepath : "pach.mp3", coverPath: "musc.jpg"},
    {songName: " putt jat da", filepath : "2.mp3", coverPath: "musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"},
    {songName: " panchi sur me gaate hai", filepath : "song/panch.mp3", coverPath: "covers/musc.jpg"}
]

songItems.forEach = (element,i)=>{
    console.log(element,i);
element.getByTagName("img ")[0].src = songs[i].coverpath;
element.getByClassName("songName")[0].innerText = songs[i].filepath;


}

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
//Handle play/pause click
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
        gif.style.opacity = 0;
    }
})
//Listen o Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbaar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBaar.value = progress;
})
myProgressBaar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBaar.value*audioElement.duration/100;

})
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.remove('fa-pause-circle');
    })
}