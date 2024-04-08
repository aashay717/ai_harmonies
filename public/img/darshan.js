var music=new Audio('audio/1.mp3');
//onmouseout =e =>{
 //   const ctx =new AudioContext('audio/1.mp3');
 //   const osc=ctx.createOscillator();
   // osc.connect(ctx.destination);
    //osc.start(0);
   // osc.stop(1);

// music.play();
 const songs=[
   {
    id: "1",
    songName:`Ashq Na Ho <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/1.jpg"
   },
   {
    id: "2",
    songName:`Khariyat <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/2.jpg"
   },
   {
    id: "3",
    songName:`Desh Mere<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/3.jpg"
   },
   {
    id: "4",
    songName:`Dhokha <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/4.jpg"
   },
   {
    id: "5",
    songName:` Tera Yaar hu<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/5.jpg"
   },
   {
    id: "6",
    songName:`Chunar<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/6.jpg"
   },
   {
    id: "7",
    songName:`Galti Se Mistake <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/7.jpg"
   },
   {
    id: "8",
    songName:`Hamari adhuri Kahani<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/8.jpg"
   },
   {
    id: "9",
    songName:`Naki ki rah<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/9.jpg"
   },
   {
    id: "10",
    songName:`Humdard <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/10.jpg"
   },
   {
    id: "11",
    songName:`Mere Yaara  <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/11.jpg"
   },
   {
    id: "12",
    songName:`Nashe se chad gayi<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/12.jpg"
   },
   {
    id: "13",
    songName:`Ae watan <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/13.jpg"
   },
   {
    id: "14",
    songName:`Agar Tum Saath ho <br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/14.jpg"
   },
   {
    id: "15",
    songName:`Pachtaoge<br>
    <div class="subtitle">Darshan</div>`,
    poster:"img/darshan/15.jpg"
   },

 ]

Array.from(document.getElementsByClassName('songItem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src=songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML=songs[i].songName;
});

let masterPlay= document.getElementById('masterPlay');
let  wave= document.getElementById('wave');
masterPlay.addEventListener('click',()=>{
    if(music.paused || music.currentTime <=0){
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    }
    else{
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});
 const makeAllplays = () =>{
   Array.from(document.getElementsByClassName('playListPlay')).forEach((el)=>{
         el.classList.add('bi-play-fill');
        el.classList.remove('bi-pause-fill');
  })
 }
const makeAllBackground = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
          el.style.background = 'rgb(105,105,105,.0)';
   })
}
let index=0;
let pic= document.getElementById('pic');
let download =document.getElementById('download');
let title= document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index= el.target.id;
      music.src=`audio/darshan/${index}.mp3`;
      pic.src =`img/darshan/${index}.jpg`; 
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');

      download.href=`audio/darshan/${index}.mp3`;
      let songTitle = songs.filter((els) =>{
        return els.id == index;
      });

      songTitle.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download.setAttribute('download',songName);
      });
      makeAllBackground();
      Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
      makeAllplays();
      el.target.classList.add('bi-pause-fill');
      el.target.classList.remove('bi-play-fill');
      wave.classList.add('active1');
    })
}
)

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    let min1=Math.floor(music_dur / 60);
    let sec1=Math.floor(music_dur % 60);
    if(sec1 < 10)
    {
        sec1=`0${sec1}`;
    }
    currentEnd.innerText =`${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if(sec2 < 10)
    {
        sec2=`0${sec2}`;
    }
    currentStart.innerText =`${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur)*100);
    seek.value =progressBar ;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});
seek.addEventListener('change',() => {
 music.currentTime = seek.value* music.duration /100 ;
});
let vol_icon =document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar=document.getElementsByClassName('vol_bar')[0];
let vol_dot=document.getElementById('vol_dot');

vol.addEventListener('change',() => {
let vol_a = vol.value;
vol_bar.style.width =`${vol_a}%`;
vol_dot.style.left =`${vol_a}%`;
music.volume =vol_a /100 ;

});
let back= document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', ()=>{
    index -=1;
    if(index <1)
    {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src=`audio/darshan/${index}.mp3`;
      pic.src =`img/darshan/${index}.jpg`; 
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');

      let songTitle = songs.filter((els) =>{
        return els.id == index;
      });

      songTitle.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
      });
      makeAllBackground();
      Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
      makeAllplays();
      el.target.classList.add('bi-pause-fill');
      el.target.classList.remove('bi-play-fill');
      wave.classList.add('active1');

})
next.addEventListener('click',()=>{
    index +=1;
    if(index < Array.from(document.getElementsByClassName('songItem')).length);
    {
        index = 1;
    }
    music.src=`audio/darshan/${index}.mp3`;
      pic.src =`img/darshan/${index}.jpg`; 
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');

      let songTitle = songs.filter((els) =>{
        return els.id == index;
      });

      songTitle.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
      });
      makeAllBackground();
      Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
      makeAllplays();
      el.target.classList.add('bi-pause-fill');
      el.target.classList.remove('bi-play-fill');
      wave.classList.add('active1');

})
let pop_song_left=document.getElementById('pop_song_left');
let pop_song_right=document.getElementById('pop_song_right');
let pop_song =document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click',()=>{
    pop_song.scrollLeft +=400;
});
pop_song_left.addEventListener('click',()=>{
    pop_song.scrollLeft -=400;
});

let pop_art_left=document.getElementById('pop_art_left');
let pop_sart_right=document.getElementById('pop_art_right');
let item =document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click',()=>{
    item.scrollLeft +=330;
});
pop_art_left.addEventListener('click',()=>{
    item.scrollLeft -=330;
});

let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', ()=>{
  let a =shuffle.innerHTML;
  switch(a)
  {
    case "next":
      shuffle.classList.add('bi-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML='repeat';
      break;

      case "repeat":
        shuffle.classList.remove('bi-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.add('bi-shuffle');
      shuffle.innerHTML='random';
        break;
      case "random":
        shuffle.classList.remove('bi-repeat');
       shuffle.classList.add('bi-music-note-beamed');
       shuffle.classList.remove('bi-shuffle');
       shuffle.innerHTML='next';
  }
});


const next_music =() =>{
  //index++;
  if(index == songs.length)
  {
    index=1;
  }
  else{
    index++;
  }
      music.src=`audio/darshan/${index}.mp3`;
      pic.src =`img/darshan/${index}.jpg`; 
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');

      download.href=`audio/darshan/${index}.mp3`;
      let songTitle = songs.filter((els) =>{
        return els.id == index;
      });

      songTitle.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download.setAttribute('download',songName);
      });
      makeAllBackground();
      Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
      makeAllplays();
      el.target.classList.add('bi-pause-fill');
      el.target.classList.remove('bi-play-fill');
      wave.classList.add('active1');
}
const repeat_music =()=>{
  index;
  music.src=`audio/darshan/${index}.mp3`;
  pic.src =`img/darshan/${index}.jpg`; 
  music.play();
  masterPlay.classList.remove('bi-play-fill');
  masterPlay.classList.add('bi-pause-fill');

  download.href=`audio/darshan/${index}.mp3`;
  let songTitle = songs.filter((els) =>{
    return els.id == index;
  });

  songTitle.forEach(elss =>{
    let {songName} = elss;
    title.innerHTML = songName;
    download.setAttribute('download',songName);
  });
  makeAllBackground();
  Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
  makeAllplays();
  el.target.classList.add('bi-pause-fill');
  el.target.classList.remove('bi-play-fill');
  wave.classList.add('active1');

}
const random_music =() =>{
  if(index==songs.length)
  {
    index =1;
  }
  else{
    index =Math.floor((Math.random() *songs.length)+1);
  }
  music.src=`audio/darshan/${index}.mp3`;
  pic.src =`img/darshan/${index}.jpg`; 
  music.play();
  masterPlay.classList.remove('bi-play-fill');
  masterPlay.classList.add('bi-pause-fill');

  download.href=`audio/darshan/${index}.mp3`;
  let songTitle = songs.filter((els) =>{
    return els.id == index;
  });

  songTitle.forEach(elss =>{
    let {songName} = elss;
    title.innerHTML = songName;
    download.setAttribute('download',songName);
  });
  makeAllBackground();
  Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,.1)";
  makeAllplays();
  el.target.classList.add('bi-pause-fill');
  el.target.classList.remove('bi-play-fill');
  wave.classList.add('active1');
}

music.addEventListener('ended', ()=>{
  let b= shuffle.innerHTML;
  switch(b){
    case 'repeat':
      repeat_music();
      break;
    case  'random':
      random_music();
      break;
    case 'next':
      next_music();
  }

})