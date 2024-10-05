
let currentSongs = new Audio();
let songs;

function convertSecondsToMinutes(seconds) {
    if(isNaN(seconds) || seconds < 0){
        return "Invalid input";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds) .padStart(2,'0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs() {

    


    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }

    return songs
}

const playMusic = (track, pause = false) => {
   currentSongs.src = "/songs/" + track
   if(!pause){
    currentSongs.play()
    play.src = "images/pause.svg"
   }
   
   document.querySelector(".songinfo").innerHTML = decodeURI(track)
   document.querySelector(".songtime").innerHTML = "00:00/00:00"

}

async function main() {

    //get the list of all the songs
     songs = await getSongs();
    playMusic(songs[0], true)
    

    //show all the song in playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class=" invert" src="images/music.svg" alt="">
              <div class="info">
                <div> ${song.replaceAll("%20", " ")}</div>
                <div>Song Artist</div>
              </div>
              <div class="playnow">
                <span> Play Now </span>              
                  <img class="invert" src="images/play.svg" alt="">
              </div>
     </li>`;
    }

    //attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //attach an event listner to play, next and previos

    play.addEventListener("click",()=>{
        if(currentSongs.paused){
            currentSongs.play()
            play.src = "images/play.svg"
        }
        else{
            currentSongs.pause()
            play.src = "images/pause.svg"
        }
    })
    //Listen for timeupdate event 

    currentSongs.addEventListener("timeupdate", ()=>{
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSongs.
            currentTime)} / ${convertSecondsToMinutes(currentSongs.duration)}`
        document.querySelector(".circle").style.left = (currentSongs.currentTime/ currentSongs.
            duration)*100 + "%";
    })
    //add a event listner to seekbar 
    document.querySelector(".seekbar ").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)* 100;
        document.querySelector(".circle").style.left = percent + "%";
         currentSongs.currentTime = ((currentSongs.duration)* percent)/100
    })

 //Add an event listner for hamburger
 document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0"
 })
  //Add an event listner for hamburger for close button
  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-120%"
 })

 //add an event listner for previous 
 previous.addEventListener("click", ()=>{
    console.log("previous clicked")
    let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
    console.log(songs,index)
    if((index)-1 >= 0 ){

        playMusic(songs[index-1])
    }

 })

  //add an event listner for previous 
  next.addEventListener("click", ()=>{
    console.log("next")
    let index = songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
    console.log(songs,index)
    if((index)+1 > length){

        playMusic(songs[index+1])
    }
 })

 //add an event to volumr{
 document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    console.log("Setting volume to",e.target.value,"/100")
    currentSongs.volume = parseInt(e.target.value)/100
})



}


main()