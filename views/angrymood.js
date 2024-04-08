var music = new Audio('audio2/1.mp3');
//onmouseout =e =>{
//   const ctx =new AudioContext('audio/1.mp3');
//   const osc=ctx.createOscillator();
// osc.connect(ctx.destination);
//osc.start(0);
// osc.stop(1);
music.play();
const songs = [
    {
        id: "21",
        songName: `Bhaag DK Bose <br>
        <div class="subtitle">Ram Sampath</div>`,
        poster: "img2/21.jpg"
    },
    {
        id: "22",
        songName: `Jee Karda <br>
        <div class="subtitle">Divya Kumar</div>`,
        poster: "img2/22.jpg"
    },
    {
        id: "23",
        songName: `Besharmi Ki Height <br>
        <div class="subtitle">Benny Dayal, Shalmali Kholgade</div>`,
        poster: "img2/23.jpg"
    },
    {
        id: "24",
        songName: `Badtameez Dil <br>
        <div class="subtitle">Benny Dayal, Shefali Alvares</div>`,
        poster: "img2/24.jpg"
    },
    {
        id: "25",
        songName: `Jai Jai Shivshankar <br>
        <div class="subtitle">Vishal Dadlani, Benny Dayal</div>`,
        poster: "img2/25.jpg"
    },
    {
        id: "26",
        songName: `Aahun Aahun <br>
        <div class="subtitle">Neeraj Shridhar, Master Saleem, Suzi Q</div>`,
        poster: "img2/26.jpg"
    },
    {
        id: "27",
        songName: `Chaiyya Chaiyya <br>
        <div class="subtitle">Sukhwinder Singh, Sapna Awasthi</div>`,
        poster: "img2/27.jpg"
    },
    {
        id: "28",
        songName: `Angry Mix - Chakravyuh <br>
        <div class="subtitle">Sunidhi Chauhan, Vishal Dadlani</div>`,
        poster: "img2/28.jpg"
    },
    {
        id: "29",
        songName: `Psycho Saiyaan <br>
    <div class="subtitle">Sachet Tandon, Dhvani Bhanushali, Tanishk Bagchi</div>`,
        poster: "img2/29.jpg"
    },
    {
        id: "30",
        songName: `Emotional Attyachar <br>
        <div class="subtitle">Bony Chakravarty</div>`,
        poster: "img2/30.jpg"
    },
    {
        id: "31",
        songName: `Mere Gully Mein <br>
        <div class="subtitle">DIVINE, Naezy</div>`,
        poster: "img2/31.jpg"
    },
    {
        id: "32",
        songName: `Malhari <br>
        <div class="subtitle">Vishal Dadlani</div>`,
        poster: "img2/32.jpg"
    },
    {
        id: "33",
        songName: `Chhil Gaye Naina <br>
        <div class="subtitle">Kanika Kapoor, Dipanshu Pandit</div>`,
        poster: "img2/33.jpg"
    },
    {
        id: "34",
        songName: `Dhaakad <br>
        <div class="subtitle">Raftaar</div>`,
        poster: "img2/34.jpg"
    },
    {
        id: "35",
        songName: `Khalbali <br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "img2/35.jpg"
    },
    {
        id: "36",
        songName: `Sultan <br>
        <div class="subtitle">Sukhwinder Singh, Shadab Faridi</div>`,
        poster: "img2/36.jpg"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});
//search data start
let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(element => {
    const { id, songName, poster } = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
   <img src="${poster}" alt="">
            <div class="content">
                ${songName}
            </div>
            `;
    search_results.appendChild(card);
});
let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');

    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;
        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = "flex";
        }
        else {
            items[index].style.display = "none";
        }
        if (input.value == 0) {
            search_results.style.display = "none";
        }
        else {
            search_results.style.display = "";
        }
    }
})
//search data end
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    }
    else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-fill');
        el.classList.remove('bi-pause-fill');
    })
}
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105,105,105,.0)';
    })
}
let index = 0;
let pic = document.getElementById('pic');
let download = document.getElementById('download');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        music.src = `audio2/${index}.mp3`;
        pic.src = `img2/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');

        download.href = `audio2/${index}.mp3`;
        let songTitle = songs.filter((els) => {
            return els.id == index;
        });

        songTitle.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
            download.setAttribute('download', songName);
        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
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

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});
seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;

});
let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio2/${index}.mp3`;
    pic.src = `img2/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.add('bi-pause-fill');
    el.target.classList.remove('bi-play-fill');
    wave.classList.add('active1');

})
next.addEventListener('click', () => {
    index += 1;
    if (index < Array.from(document.getElementsByClassName('songItem')).length);
    {
        index = 1;
    }
    music.src = `audio2/${index}.mp3`;
    pic.src = `img2/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.add('bi-pause-fill');
    el.target.classList.remove('bi-play-fill');
    wave.classList.add('active1');

})
let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 400;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 400;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_sart_right = document.getElementById('pop_art_right');
let item = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', () => {
    item.scrollLeft += 330;
});
pop_art_left.addEventListener('click', () => {
    item.scrollLeft -= 330;
});

let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;
    switch (a) {
        case "next":
            shuffle.classList.add('bi-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;

        case "repeat":
            shuffle.classList.remove('bi-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
    }
});


const next_music = () => {
    //index++;
    if (index == songs.length) {
        index = 1;
    }
    else {
        index++;
    }
    music.src = `audio2/${index}.mp3`;
    pic.src = `img2/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = `audio2/${index}.mp3`;
    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download.setAttribute('download', songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.add('bi-pause-fill');
    el.target.classList.remove('bi-play-fill');
    wave.classList.add('active1');
}
const repeat_music = () => {
    index;
    music.src = `audio2/${index}.mp3`;
    pic.src = `img2/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = `audio2/${index}.mp3`;
    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download.setAttribute('download', songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.add('bi-pause-fill');
    el.target.classList.remove('bi-play-fill');
    wave.classList.add('active1');

}
const random_music = () => {
    if (index == songs.length) {
        index = 1;
    }
    else {
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    music.src = `audio2/${index}.mp3`;
    pic.src = `img2/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = `audio2/${index}.mp3`;
    let songTitle = songs.filter((els) => {
        return els.id == index;
    });

    songTitle.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download.setAttribute('download', songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,.1)";
    makeAllplays();
    el.target.classList.add('bi-pause-fill');
    el.target.classList.remove('bi-play-fill');
    wave.classList.add('active1');
}

music.addEventListener('ended', () => {
    let b = shuffle.innerHTML;
    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'random':
            random_music();
            break;
        case 'next':
            next_music();
    }

})