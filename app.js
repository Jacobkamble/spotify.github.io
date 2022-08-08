console.log("welcome to spotify");
// intailize array for songs
let songList = [
  {
    songName: "Unstoppable by Sia",
    path: "songs/1",
    cover: "covers/1.jpg",
    timeDuration: "04:06",
  },
  {
    songName: "Lo Safar by Arjit Singh",
    path: "songs/2",
    cover: "covers/2.jpg",
    timeDuration: "04:42",
  },
  {
    songName: "Let Me Love You  By Justin Bieber",
    path: "songs/3",
    cover: "covers/3.jpg",
    timeDuration: "03:26",
  },
  {
    songName: "Hawayein by Arjit Singh",
    path: "songs/4",
    cover: "covers/4.jpg",
    timeDuration: "04:50",
  },
  {
    songName: "Besabriyaan by Arman Malik",
    path: "songs/5",
    cover: "covers/5.jpg",
    timeDuration: "04:15",
  },
  {
    songName: "Kabira by Arjit Singh",
    path: "songs/6",
    cover: "covers/6.jpg",
    timeDuration: "04:12",
  },
  {
    songName: "Humdard by Arjit Singh",
    path: "songs/7",
    cover: "covers/7.jpg",
    timeDuration: "04:20",
  },
  {
    songName: "Tum Hi Ho by Arjit Singh",
    path: "songs/8",
    cover: "covers/8.jpg",
    timeDuration: "04:22",
  },
  {
    songName: "Agar Tum Sath ho by Arjit Singh",
    path: "songs/9",
    cover: "covers/9.jpg",
    timeDuration: "05:41",
  },
  {
    songName: "Kesariya by Arjit Singh",
    path: "songs/10",
    cover: "covers/10.jpg",
    timeDuration: "04:28",
  },
];
// initialize variable
const songsName = document.getElementById("songsName");
const progressbar = document.getElementById("myprogressbar");
const songContainer = document.getElementById("songitemcontainer");

// function to song list
function showSong() {
  let html = "";

  songList.forEach((element, index) => {
    html += `<div class="songitem">
    <img src=${element.cover} alt="${index + 1}">
    <span>${element.songName}</span>
    <span class="songlistplay">
        <span  style="font-size: 1em; color: black;"><span>${
          element.timeDuration
        }</span>
            <button id=${index + 1} class="btnA">Play
            
            </button>
            
        </span>
    </span>
</div>`;
  });
  songContainer.innerHTML = html;
}

showSong();

// current playing song
let currentSongIndex = 0;
// audio object
let audioElement = new Audio("songs/1.mp3");

// hide and show playing gif
const gif = document.getElementById("gif");
// show time
const time = document.getElementById("time");

// initailze buttons
const next = document.getElementById("next");
const play = document.getElementById("play");
const previous = document.getElementById("previous");

// initialize plays buttons in list
let playBtn = Array.from(document.getElementsByClassName("btnA"));
playBtn.forEach((ele, ind) => {
  ele.addEventListener("click", (e) => {
    currentSongIndex = parseInt(e.target.id);
    audioElement.src = `songs/${e.target.id}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    play.innerText = "Pause";
    gif.style.opacity = 1;
    songsName.innerText = songList[currentSongIndex - 1].songName;
  });
});

// add eventListener to play button in bottom to play & pause song
play.addEventListener("click", function () {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    play.innerText = "Pause";
    audioElement.play();
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    play.innerText = "Play";
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  // show progress
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressbar.value = progress;

  // show time
  let totalMin = 0;
  let totalSec = 0;
  let currentMin = 0;
  let currentSec = 0;
  totalMin = parseInt(audioElement.duration / 60);
  totalSec = parseInt(audioElement.duration % 60);

  currentMin = parseInt(audioElement.currentTime / 60);
  currentSec = parseInt(audioElement.currentTime % 60);

  time.innerText = `${currentMin}:${currentSec}/${totalMin}:${totalSec}`;
});

// seekbar
progressbar.addEventListener("change", () => {
  audioElement.currentTime = (progressbar.value * audioElement.duration) / 100;
});

// next button
next.addEventListener("click", (e) => {
  if (currentSongIndex >= 10) {
    currentSongIndex = 1;
  } else {
    currentSongIndex = parseInt(currentSongIndex) + 1;
  }
  audioElement.src = `songs/${currentSongIndex}.mp3`;
  audioElement.currentTime = 0;
  songsName.innerText = songList[currentSongIndex - 1].songName;
  audioElement.play();
});

// previous button
previous.addEventListener("click", (e) => {
  if (currentSongIndex <= 1) {
    currentSongIndex = 1;
  } else {
    currentSongIndex = parseInt(currentSongIndex) - 1;
  }
  audioElement.src = `songs/${currentSongIndex}.mp3`;
  audioElement.currentTime = 0;
  songsName.innerText = songList[currentSongIndex - 1].songName;
  audioElement.play();
});
