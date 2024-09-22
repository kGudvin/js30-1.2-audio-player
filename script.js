const audio = new Audio()
const playPauseButton = document.getElementById('play-pause')
const nextButton = document.getElementById('next')
const prevButton = document.getElementById('prev')
const progressBar = document.getElementById('progress-bar')
const currentTimeDisplay = document.getElementById('current-time')
const durationDisplay = document.getElementById('duration')
const trackTitle = document.getElementById('track-title')
const trackArtist = document.getElementById('track-artist')
const trackCover = document.getElementById('track-cover')

let isPlaying = false
let currentTrackIndex = 0

const tracks = [
	{
		title: `Don't Hurt Yourself`,
		artist: 'Beyonce',
		src: './assets/audio/beyonce.mp3',
		cover: './assets/img/lemonade.png',
	},
	{
		title: `Don't Start Now`,
		artist: 'Dua Lipa',
		src: './assets/audio/dontstartnow.mp3',
		cover: './assets/img/dontstartnow.png',
	},
]

function loadTrack(trackIndex) {
	const track = tracks[trackIndex]
	audio.src = track.src
	trackTitle.textContent = track.title
	trackArtist.textContent = track.artist
	trackCover.src = track.cover

	document.getElementById(
		'player'
	).style.backgroundImage = `url(${track.cover})`

	document.body.style.setProperty('--background-image', `url(${track.cover})`)
}

function playPauseTrack() {
	if (isPlaying) {
		audio.pause()
		playPauseButton.innerHTML = `<img
		src="./assets/svg/play.png"
		alt="play-pause"
		class="control-button"
	/>`
	} else {
		audio.play()
		playPauseButton.innerHTML = `<img
						src="./assets/svg/pause.png"
						alt="pause"
						class="control-button"
					/>`
	}
	isPlaying = !isPlaying
}

function nextTrack() {
	currentTrackIndex = (currentTrackIndex + 1) % tracks.length
	loadTrack(currentTrackIndex)
	if (isPlaying) {
		audio.play()
	}
}

function prevTrack() {
	currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
	loadTrack(currentTrackIndex)
	if (isPlaying) {
		audio.play()
	}
}

function updateProgress() {
	progressBar.value = (audio.currentTime / audio.duration) * 100
	currentTimeDisplay.textContent = formatTime(audio.currentTime)
	durationDisplay.textContent = formatTime(audio.duration)
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)
	return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

function seek(event) {
	const seekTime = (event.target.value / 100) * audio.duration
	audio.currentTime = seekTime
}

playPauseButton.addEventListener('click', playPauseTrack)
nextButton.addEventListener('click', nextTrack)
prevButton.addEventListener('click', prevTrack)
audio.addEventListener('timeupdate', updateProgress)
progressBar.addEventListener('input', seek)

// Загрузка первого трека при старте
loadTrack(currentTrackIndex)
