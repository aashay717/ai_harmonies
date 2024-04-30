var music = new Audio('audio/1.mp3');
//onmouseout =e =>{
//   const ctx =new AudioContext('audio/1.mp3');
//   const osc=ctx.createOscillator();
// osc.connect(ctx.destination);
//osc.start(0);
// osc.stop(1);
music.play();
const songs = [
    {
        id: "1",
        songName: `On My way <br>
    <div class="subtitle">Alan Walker</div>`,
        poster: "./public/img/1.jpg"
    },
    {
        id: "2",
        songName: `Alan Walker-FADED <br>
    <div class="subtitle">Alan Walker</div>`,
        poster: "public/img/2.jpg"
    },
    {
        id: "3",
        songName: `Feel Good<br>
    <div class="subtitle">Daniel Levi</div>`,
        poster: "public/img/3.jpg"
    },
    {
        id: "4",
        songName: `Warriyo-Mortals <br>
    <div class="subtitle">Mortals</div>`,
        poster: "public/img/4.jpg"
    },
    {
        id: "5",
        songName: `Aa Jaana<br>
    <div class="subtitle">Darshan</div>`,
        poster: "public/img/5.jpg"
    },
    {
        id: "6",
        songName: `Asal mein<br>
    <div class="subtitle">Darshan</div>`,
        poster: "public/img/6.jpg"
    },
    {
        id: "7",
        songName: `Agar Tum Sath Ho <br>
    <div class="subtitle">Tamashaa</div>`,
        poster: "public/img/7.jpg"
    },
    {
        id: "8",
        songName: `Suna Hai <br>
    <div class="subtitle">Neha Kakkar</div>`,
        poster: "public/img/8.jpg"
    },
    {
        id: "9",
        songName: `Dilbar <br>
    <div class="subtitle">Satyamev Jayate</div>`,
        poster: "public/img/9.jpg"
    },
    {
        id: "10",
        songName: `Duniya  <br>
    <div class="subtitle">Luka Chuppi</div>`,
        poster: "public/img/10.jpg"
    },
    {
        id: "11",
        songName: `lagdi Lahore <br>
    <div class="subtitle">Street Dancer</div>`,
        poster: "public/img/11.jpg"
    },
    {
        id: "12",
        songName: `Putt jaat Da<br>
    <div class="subtitle">Putt Jaat Da</div>`,
        poster: "public/img/12.jpg"
    },
    {
        id: "13",
        songName: `Baarishein <br>
    <div class="subtitle">Atif Aslam</div>`,
        poster: "public/img/13.jpg"
    },
    {
        id: "14",
        songName: `Vaaste <br>
    <div class="subtitle">Dhuvani Bhanusali</div>`,
        poster: "public/img/14.jpg"
    },
    {
        id: "15",
        songName: `Lut Gaye <br>
    <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "public/img/15.jpg"
    },
    {
        id: "16",
        songName: `Tu meri Zindagi <br>
    <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "public/img/16.jpg"
    },
    {
        id: "17",
        songName: `Baato yaad<br>
    <div class="subtitle">Rahat Fateh</div>`,
        poster: "public/img/17.jpg"
    },
    {
        id: "18",
        songName: `pasoori <br>
    <div class="subtitle">Sher gill</div>`,
        poster: "public/img/18.jpg"
    },
    {
        id: "19",
        songName: `munde pagal ne <br>
    <div class="subtitle">Ap Dhillon</div>`,
        poster: "public/img/19.jpg"
    },
    {
        id: "20",
        songName: ` <br>
    <div class="subtitle">Darshan</div>`,
        poster: "public/img/20.jpg"
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});
//search data start
let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(song => {
    const { id, songName, poster } = song;
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

    card.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedIndex = id; // Store the clicked song index
        music.src = audio/${clickedIndex}.mp3;
        pic.src = public/img/${clickedIndex}.jpg;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');

        download.href = ../public/audio/${clickedIndex}.mp3;

        // Find the title of the clicked song
        const clickedSong = songs.find(song => song.id === clickedIndex);
        if (clickedSong) {
            title.innerHTML = clickedSong.songName;
            download.setAttribute('download', clickedSong.songName);
        }

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[clickedIndex - 1].style.background = "rgb(105,105,105,.1)";
        makeAllplays();
        card.classList.add('bi-pause-fill');
        card.classList.remove('bi-play-fill');
        wave.classList.add('active1');
    });
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

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');
let isMusicPlaying = false;
masterPlay.addEventListener('click', () => {
    if (!isMusicPlaying) { 
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        isMusicPlaying = true; 
    } else { 
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        isMusicPlaying = false; 
    }
});
let masterPlay2 = document.getElementById('masterPlay2');
let wave2 = document.getElementById('wave');
let isMusicPlaying2 = false;

masterPlay2.addEventListener('click', () => {
    if (!isMusicPlaying2) { 
        music.play();
        wave2.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        isMusicPlaying = true; 
    } else { 
        music.pause();
        wave2.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        isMusicPlaying2 = false; 
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
        music.src = audio/${index}.mp3;
        pic.src = public/img/${index}.jpg;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');

        download.href = ../public/audio/${index}.mp3;
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
        sec1 = 0${sec1};
    }
    currentEnd.innerText = ${min1}:${sec1};

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = 0${sec2};
    }
    currentStart.innerText = ${min2}:${sec2};

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = ${seekbar}%;
    dot.style.left = ${seekbar}%;

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
    vol_bar.style.width = ${vol_a}%;
    vol_dot.style.left = ${vol_a}%;
    music.volume = vol_a / 100;

});
let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = audio/${index}.mp3;
    pic.src = public/img/${index}.jpg;
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
    music.src = audio/${index}.mp3;
    pic.src = public/img/${index}.jpg;
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
    music.src = audio/${index}.mp3;
    pic.src = public/img/${index}.jpg;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = audio/${index}.mp3;
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
    music.src = audio/${index}.mp3;
    pic.src = public/img/${index}.jpg;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = audio/${index}.mp3;
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
    music.src = audio/${index}.mp3;
    pic.src = public/img/${index}.jpg;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download.href = audio/${index}.mp3;
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
