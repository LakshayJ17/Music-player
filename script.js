// Initialize the variables 
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

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

// Cover images & text 
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
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
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to make all play buttons to play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Function to sync container play/pause buttons with master play/pause
const syncContainerPlayPause = (index) => {
    makeAllPlays();
    document.getElementById(index).classList.remove('fa-circle-play');
    document.getElementById(index).classList.add('fa-circle-pause');
};

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
        }
    });
});

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
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
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
});


