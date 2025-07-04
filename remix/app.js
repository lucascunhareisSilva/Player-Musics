const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");

const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

//objeto para as musicas
const allSongs = [{
  //arquivo da musica e dados do artista
  id :0,
  title:"Faded",
  artist:"Alan Walker",
  duration:"3:32",
  img:"img-artista/faded.jpeg",
  src:"Musics/Alan Walker - Faded - YouTube.mp3"
},{
  //arquivo da musica e dados do artista
  id: 1,
  title: "Tired",
  artist: "Alan Walker",
  duration: "3:36",
  img:"img-artista/tired.png",
  src: "Musics/Alan Walker ft Gavin James - Tired - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 2,
  title: "Tiesto Edit",
  artist: "Dzeko Torres",
  duration: "2:45",
  img:"img-artista/tiesto.png",
  src: "Musics/Dzeko Torres - LAmour Toujours feat Delaney Jane Tiesto Edit Off.mp3"
},{
   //arquivo da musica e dados do artista
  id: 3,
  title: "Stereo Love",
  artist: "Edward Maya",
  duration: "4:12",
  img:"img-artista/stereo-love.png",
  src: "Musics/Edward Maya Vika Jigulina - Stereo Love Official Music Video - Y.mp3"
},{
   //arquivo da musica e dados do artista
  id: 4,
  title: "American Dream",
  artist: "Gabbie June",
  duration: "3:37",
  img:"img-artista/american.jpeg",
  src: "Musics/Gabbie June - American Dream Not Your Dope Remix - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 5,
  title: "Infinity",
  artist: "Guru Josh",
  duration: "3:14",
  img:"img-artista/infinty.png",
  src: "Musics/Guru Josh Project - Infinity Klaas Vocal Mix Ultra Records - You.mp3"
},{
   //arquivo da musica e dados do artista
  id: 6,
  title: "Lost Sky - Fearless pt II",
  artist: "Lost Sky",
  duration: "3:14",
  img:"img-artista/fearlesspt2.png",
  src: "Musics/Lost Sky - Fearless pt II feat Chris Linton - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 7,
  title: "Fearless pt I",
  artist: "Lost Sky",
  duration: "3:14",
  img:"img-artista/fearlesspt1.png",
  src: "Musics/Lost Sky - Fearless Trap NCS - Copyright Free Music - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 8,
  title: "Careless",
  artist: "NEFFEX",
  duration: "4:56",
  img:"img-artista/careless.png",
  src: "Musics/NEFFEX - Careless Copyright Free No 19 - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 9,
  title: "Grato",
  artist: "NEFFEX",
  duration: "3:02",
  img:"img-artista/grato.png",
  src: "Musics/NEFFEX - Grato Copyright Gratis - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 10,
  title: "Ruthless",
  artist: "NEFFEX",
  duration: "3:46",
  img:"img-artista/ruthless.png",
  src: "Musics/NEFFEX - Ruthless Copyright-Free No 149 - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 11,
  title: "Poker Face - Remix",
  artist: "Lady Gaga",
  duration: "5:04",
  img:"img-artista/poker-face.png",
  src: "Musics/PSYTRANCE Lady Gaga - Poker Face Klaus Kaylah Remix - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 12,
  title: "Renegade",
  artist: "Bomot",
  duration: "3:36",
  img:"img-artista/renegade.png",
  src: "Musics/Renegade - YouTube.mp3"
},{
   //arquivo da musica e dados do artista
  id: 13,
  title: "Nevada",
  artist: "Vicetone",
  duration: "3:29",
  img:"img-artista/nevada.png",
  src: "Musics/Vicetone - Nevada feat Cozi Zuehlsdorff Monstercat Official Musi.mp3"
}
];

//variavel para iniciar api da musica 
const audio = new Audio();
let userData = {
  songs:[...allSongs],
  currentSong: null,
  songCurrentTime:0
};
//funcao para reproduzir as musicas
const playSong = (id)=>{
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if(userData?.currentSong === null || userData?.currentSong.id !== song.id){
    audio.currentTime = 0;
  }else{
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  //chamada da funcao para destacar a musica
  highlightCurrentSong();

  //chamada da funcao para destacar a musica na tela do player
  setPlayerDisplay();

  //chamada da funcao para reproduzir as musicas quando voltar ao inicio
  setPlayButtonAccessibleText();
  audio.play();
}

//funcao para pausar a musica
const pauseSong = ()=>{
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
}
/*const printGreeting = ()=>{
  console.log("Hello there!");
}
printGreeting();
const printMessage = org =>{
  console.log(`${org} is awesome!`);
}
printMessage("freeCodeCamp");
const addTwoNumbers = (num1,num2)=> num1 + num2;
console.log(addTwoNumbers(3,4));*/

//funcao para ir pra proxima musica
const playNextSong = ()=>{
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id);
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const isLastSong = currentSongIndex === userData?.songs.length - 1;
    const nextIndex = isLastSong ? 0 : currentSongIndex + 1;
    const nextSong = userData?.songs[nextIndex];
    playSong(nextSong.id);
  }
}
//funcao para voltar para musica anterior
const playPreviousSong = ()=> {
  if(userData?.currentSong === null){
    return;
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }

}

//funcao para embaralhar as musicas
const shuffle = ()=>{
  userData?.songs.sort(()=> Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
}


//funcao para excluir musica e redefinir
const deleteSong = (id)=>{

  if(userData?.currentSong?.id === id){
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();

  }

  userData.songs = userData?.songs.filter((song)=> song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();
}

//funcao para exibir o título da música atual e o artista na tela do player
const setPlayerDisplay = ()=>{
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  //variavel para img
  const songImg = document.querySelector(".img-art");


  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  //current para  img 
  const currentImg = userData?.currentSong?.img;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
  //condicional para img
  if(currentImg){
    songImg.src = currentImg;
    songImg.alt = `${currentTitle} cover art`;
  }else{
    songImg.src = "img-artista/principal.jpeg";
    songImg.alt = "Cover Art"
  }

  //exibindo imagens via segundo plano
  if('mediaSession' in navigator && userData?.currentSong){
    navigator.mediaSession.metadata = new MediaMetadata({
      title:userData.currentSong.title,
      artist:userData.currentSong.artist,
      album:"Player Music",
      artwork:[
        {
          src: userData.currentSong.img,
          sizes: "512x512",
          type: userData.currentSong.img.endsWith('.png') ? 'image/png' : 'image/jpeg'
        }
      ]
    });
    //funcionalidade dos buttons com a imagem
    navigator.mediaSession.setActionHandler('play', ()=>{
      playSong(userData.currentSong.id);
    });
    navigator.mediaSession.setActionHandler('pause',()=>{
      pauseSong();
    });
    navigator.mediaSession.setActionHandler('previoustrack',()=>{
      playPreviousSong();
    });
    navigator.mediaSession.setActionHandler('nexttrack',()=>{
      playNextSong();
    });
  }
}

//funcao para destarcar a musica na playlist
const highlightCurrentSong = ()=>{
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
  //percorrendo as musicas
  playlistSongElements.forEach((songEl)=> {
  songEl.removeAttribute("aria-current");
  });
  if(songToHighlight){
    songToHighlight.setAttribute("aria-current","true");
  }
}


const renderSongs = (array)=>{
  const songsHTML = array.map((song)=> {
    return `
      <li id="song-${song.id}" class="playlist-song" onclick="playSong(${song.id})">
      <button class="playlist-song-info">
      <span class="playlist-song-title">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
      <span class="playlist-song-duration">${song.duration}</span>
      </button>

      <button class="playlist-song-delete" onclick="deleteSong(${song.id})" aria-label="Delete ${song.title}">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
      </button>
      </li>
    `;
  }).join("");
  playlistSongs.innerHTML = songsHTML;

  //continuar na proxima aula
  if(userData?.songs.length === 0){
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);
    //funcionalidade do button de deletar
    resetButton.addEventListener("click",()=>{
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }

};

//funcao para reproduzir as musicas reprodução descreva a música atual ou a primeira música da playlist
const setPlayButtonAccessibleText = ()=>{
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");

}



//funcao para ir para a proxima musica
const getCurrentSongIndex = ()=>{
  return userData?.songs.indexOf(userData?.currentSong);
}

//funcao para iniciar as musicas
playButton.addEventListener("click",()=>{
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id); //primeira musica
  }else{
    playSong(userData?.currentSong.id);
  }
});
//funcao para pausar as musicas
pauseButton.addEventListener("click", pauseSong);
//funcao para proxima musica
nextButton.addEventListener("click",playNextSong);
//funcao para voltar para musica anterior
previousButton.addEventListener("click",playPreviousSong);
//funcao para embaralhar as musicas
shuffleButton.addEventListener("click",shuffle);

//funcao para reproduzir quando a musica acabar
audio.addEventListener("ended",()=>{
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  if(nextSongExists){
    playNextSong();
  }else{
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

const sortSongs = ()=>{
  userData?.songs.sort((a,b)=>{
    if(a.title < b.title){
      return -1
    }
    if(a.title > b.title){
      return 1;
    }
    return 0;
  });
  return userData?.songs;
}
renderSongs(sortSongs());
setPlayButtonAccessibleText();

//funcao para voltar
function voltarPage(){
  if(document.referrer !== ""){
    window.history.back();
  }else{
    window.location.href = "../index.html"
  }
}