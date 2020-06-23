// javascript created second
// elements we will use need grab from DOM

const musicContainer = document.getElementById("music-container");

const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Titles (make sure images and music are set to the same names.)
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
//  ex. start at ukulele song in array
let songIndex = 2;

// Initially loads song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  // song plays when we add 'play' to 'movie-container' class dynamically based off css.
  musicContainer.classList.add("play");
  // when play button is clicked, remove play icon, and change it to  pause icon.
  playButton.querySelector("i.fa").classList.remove("fa-play");
  playButton.querySelector("i.fa").classList.add("fa-pause");

  //to play song, just call html audio api play method.
  audio.play();
}

// Pause song
function pauseSong() {
  // song will pause, when we remove 'play' from 'movie-container' class based off css.
  musicContainer.classList.remove("play");
  // when pause button is clicked, it adds play icon, and changes it  back to play icon.
  playButton.querySelector("i.fa").classList.remove("fa-pause");
  playButton.querySelector("i.fa").classList.add("fa-play");

  //to pause song, just call html audio api pause method.
  audio.pause();
}

// Previous song
function prevSong() {
  // to target previous song, decrease songs array by 1.
  songIndex--;
  if (songIndex < 0) {
    // take song length minus 1 to revert back to last song (index 2) in songs array.
    songIndex = songs.length - 1;
  }
  // then load initial song function.
  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  // takes in event because its part of an event parameter.
  // we can get the duration/current time of song through srcElement.
  const { duration, currentTime } = e.srcElement;
  //   console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  //   console.log(progressPercent);
  //   console.log(progresPercent) will give use the percentage of duration in song.
  //   now set it to the width of the progress bar (i.e progress class in CSS);
  progress.style.width = `${progressPercent}%`;
}

//  Set progress bar
function setProgress(event) {
  const width = this.clientWidth;
  //   console.log(width);
  //   will get us the total width of song (216)
  //    use offsetX mouse event to get position where you click
  const clickX = event.offsetX;
  //   console.log(clickX);
  //   now get complete duration of song through audio api
  const duration = audio.duration;
  //   then you want to get the current time of audio to the current position

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners

playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song event
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

// Time/song update event
// timeupdate keeps updating as the song plays.
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song Ends
// we dont have to call another function, it will already play the next song through audio api.
audio.addEventListener("ended", nextSong);
