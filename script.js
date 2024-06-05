// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songTimer = document.getElementById('songTimer')

let songs = [
    { songName: "Warriyo - Mortals (feat. Laura Brehm) [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma - Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release] - 320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release] - 320k", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyan- Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Update cover images, song names, and durations for each song item
songItem.forEach((element, i) => {
    let songImage = element.getElementsByTagName("img")[0];
    let songName = element.getElementsByClassName("songName")[0];
    let timestamp = element.getElementsByClassName("timestamp")[0];
    
    songImage.src = songs[i].coverPath;
    songName.innerText = songs[i].songName;
    
    // Load each song to get its duration
    let tempAudio = new Audio(songs[i].filePath);
    tempAudio.addEventListener('loadedmetadata', () => {
        let durationMinutes = Math.floor(tempAudio.duration / 60);
        let durationSeconds = Math.floor(tempAudio.duration % 60);
        if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
        timestamp.innerText = `${durationMinutes}:${durationSeconds}`;
    });
});

// Handle master play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        syncContainerPlayPause(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
    updateTimer();
});

// Update seekbar and timer as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    updateTimer();
});

// Seek to different part of the song when progress bar is changed
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    updateTimer();
});

// Function to reset all play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Function to sync play/pause button in the song list with master play/pause button
const syncContainerPlayPause = (index) => {
    makeAllPlays();
    document.getElementById(index).classList.remove('fa-circle-play');
    document.getElementById(index).classList.add('fa-circle-pause');
};

// Handle individual song play/pause button click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let targetIndex = parseInt(e.target.id);
        if (audioElement.src.includes(songs[targetIndex].filePath) && !audioElement.paused) {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
        } else {
            makeAllPlays();
            songIndex = targetIndex;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            syncContainerPlayPause(songIndex);
            updateTimer();
        }
    });
});

// Handle previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    syncContainerPlayPause(songIndex);
    updateTimer();
});

// Handle next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    syncContainerPlayPause(songIndex);
    updateTimer();
});

// Update timer display
function updateTimer() {
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime % 60);
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration % 60);

    if (currentSeconds < 10) { currentSeconds = '0' + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }

    songTimer.innerText = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

// Reset timer and play button when the song ends
audioElement.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    songTimer.innerText = '0:00 / 0:00';
});
