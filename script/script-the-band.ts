var memberNext = document.querySelector(".about .next");
var memberPrev = document.querySelector(".about .prev");
var listenAlbum = document.querySelectorAll(".discography .albums .listen");
var song = new Audio();
var playSong = document.querySelectorAll(".list-songs .play");
var turntable = document.querySelector(".turntable");
var circle = turntable.querySelector(".progress");
var done = turntable.querySelector(".done");
var willDo = turntable.querySelector(".will-do");
var pauseSong = turntable.querySelector(".pause");
var doSong = turntable.querySelector(".play");
var prevSong = turntable.querySelector(".prev");
var nextSong = turntable.querySelector(".next");
var step = 0;
var widthTrack = 0;
var interval = 0;
var timerId = 0;
let leftDo = 0;

var albums = [{
    name: "Surprise without Flaws",
    songs: [
        {num: "01", name: "Clouds In The Forest", time: "3:20"},
        {num: "02", name: "Rat In The River", time: "2:48"},
        {num: "03", name: "Giants And Companions", time: "2:27"},
        {num: "04", name: "Ashamed Of Light", time: "3:32"},
        {num: "05", name: "Doubting The Forest", time: "2:40"},
        {num: "06", name: "Criminals Of The Lake", time: "2:50"},
        {num: "07", name: "Curse Of Eternity", time: "1:33"},
        {num: "08", name: "Fog In My Town", time: "1:33"},
        {num: "09", name: "Serpent In The Mountains", time: "3:24"}
    ]},
        {name: "Mists Of A Shadow",
        songs: [
        {num: "01", name: "Horses In The Forest", time: "2:20"},
        {num: "02", name: "Box In The River", time: "1:48"},
        {num: "03", name: "Mardar And Companions", time: "1:27"},
        {num: "04", name: "Fairy Of Light", time: "2:32"},
        {num: "05", name: "Drawing The Forest", time: "3:40"},
        {num: "06", name: "Women Of The Lake", time: "3:50"},
        {num: "07", name: "Roses Of Eternity", time: "3:33"},
        {num: "08", name: "Dog In My Town", time: "3:33"},
        {num: "09", name: "Gradient In The Mountains", time: "2:24"}
    ]},
        {name: "Heroes Of The Sun",
        songs: [
        {num: "01", name: "Loups In The Forest", time: "2:20"},
        {num: "02", name: "Mat In The River", time: "1:48"},
        {num: "03", name: "Business And Companions", time: "1:27"},
        {num: "04", name: "Raining Of Light", time: "1:32"},
        {num: "05", name: "Smile The Forest", time: "6:40"},
        {num: "06", name: "Face Of The Lake", time: "5:50"},
        {num: "07", name: "Mouse Of Eternity", time: "2:33"},
        {num: "08", name: "Me In My Town", time: "5:33"},
        {num: "09", name: "Threes In The Mountains", time: "1:24"}
    ]},
        {name: "Picure Of The Past",
        songs: [
        {num: "01", name: "Sun In The Forest", time: "2:20"},
        {num: "02", name: "Light In The River", time: "4:48"},
        {num: "03", name: "Boss And Companions", time: "6:27"},
        {num: "04", name: "Cry Of Light", time: "2:32"},
        {num: "05", name: "Fox The Forest", time: "3:40"},
        {num: "06", name: "Bottom Of The Lake", time: "1:50"},
        {num: "07", name: "Nurse Of Eternity", time: "1:33"},
        {num: "08", name: "Rock In My Town", time: "1:33"},
        {num: "09", name: "Luck In The Mountains", time: "2:24"},
        {num: "10", name: "Luck In The Mountains", time: "2:24"}
    ]}
];

letMusicPlay();

for (let i = 0, max = listenAlbum.length; i < max; i++) {
    listenAlbum[i].addEventListener("click", function(event){
        event.preventDefault();
        if (doSong.classList.contains("is-none")) {
            pauseSong.click();
        }
        if (parseInt(done.style.width) > 4) {
            widthTrack = parseInt(turntable.offsetWidth)*0.9 - 30;

            var pad = parseInt(turntable.offsetWidth)*0.02;
            step = pad;
            circle.style.left = pad + "px";
            done.style.width = "4px";
            willDo.style.left = pad + "px";
            willDo.style.width = parseInt(turntable.offsetWidth)*0.88 + "px";
            song.src = "";
        };
        let nameAlbum = this.parentElement.parentElement.querySelector("td:first-child").textContent;
        let nAlbum = 0;
        for(let j = 0, max = albums.length; j < max; j++) {
            if ( albums[j]["name"] == nameAlbum) {
                nAlbum = j;
                break;
            }
        };
        // Now playing
        let songs = document.querySelector(".songs");
        let nowPlaingAlbum = songs.querySelector(".name-album");
        let nowPlayingSong = songs.querySelector(".name-song");
        let currentAlbum = songs.querySelector(".current-album");
        let currentAlbumName = songs.querySelector(".current-album h3");
        let currentAlbumSongs = songs.querySelector(".current-album .list-songs");
        let currentAlbumTime = songs.querySelector(".current-album .time-songs");

        nowPlaingAlbum.textContent = nameAlbum;
        currentAlbumName.textContent = nameAlbum;
        nowPlayingSong.textContent = albums[nAlbum].songs[0].name;

        //загружаем список песен
        let newList = document.createElement("ul");
        newList.className = "list-songs";

        let newTimeList = document.createElement("ul");
        newTimeList.className = "time-songs";

        for(let k=0, max =  albums[nAlbum].songs.length; k < max; k ++) {
            let newSong = document.createElement("li");
            newSong.innerHTML = `<button class='play'></button><span>${albums[nAlbum].songs[k].num}. ${albums[nAlbum].songs[k].name}</span>`;
            newList.appendChild(newSong);

            let newTime = document.createElement("li");
            newTime.innerHTML = `<span class="dots"></span><span class="time">${albums[nAlbum].songs[k].time}</span>`;
            newTimeList.appendChild(newTime);
        }

        currentAlbum.replaceChild(newList, currentAlbumSongs);
        currentAlbum.replaceChild(newTimeList, currentAlbumTime);

        letMusicPlay();
    });
}


memberNext.addEventListener("click", function(event){
    event.preventDefault();
    slideMembers('next');
});

memberPrev.addEventListener("click", function(event){
    event.preventDefault();
    slideMembers('prev');
});

function slideMembers(direction: string){
    var about = document.querySelector(".about");
    var ulMembers = document.querySelectorAll(".members ul:first-child li");
    var ulProf = document.querySelectorAll(".members ul:last-child li");

    for(let i = 0, max = ulMembers.length; i < max; i++){
        if (ulMembers[i].classList.contains("active")){
            ulMembers[i].classList.remove("active");
            ulProf[i].classList.remove("active");
            if (direction == "next"){
                i = i+1;
                (i == max) ? i = 0 : i = i;
            } else if (direction == "prev"){
                i = i-1;
                (i == -1) ? i = max-1 : i = i;
            }
            ulMembers[i].classList.add("active");
            ulProf[i].classList.add("active");

            let name = ulMembers[i].textContent.split(" ")[0];
            let sername = ulMembers[i].textContent.split(" ")[1];
            let profi = ulProf[i].textContent.toLowerCase();

            let nameNode = about.querySelector(".member-name .light-coffee");
            nameNode.textContent = name.toUpperCase();

            let sernameNode = about.querySelector(".member-name .dark-coffee");
            sernameNode.textContent = sername.toUpperCase();

            let photo = about.querySelector(".photo img");
            let pass = photo.src.split("/");
            pass.pop();
            pass.push("member-"+profi+".jpg");
            photo.src = pass.join("/");

            break;
        }
    }
}

pauseSong.addEventListener("click", function(){
    song.pause();
    clearInterval(timerId);
    pauseSong.classList.add("is-none");
    doSong.classList.remove("is-none");
});

doSong.addEventListener("click", function(){
    if (song.src == "") {
        playSong[0].click();
    } else {
      song.play();
      timerId = setInterval(goTurntable, interval);
    }
    pauseSong.classList.remove("is-none");
    doSong.classList.add("is-none");
});

nextSong.addEventListener("click", function(){
    var currentSong = document.querySelector(".list-songs .play.in-process").parentElement.nextElementSibling;
    currentSong.querySelector(".play").click();
});

prevSong.addEventListener("click", function(){
    var currentSong = document.querySelector(".list-songs .play.in-process").parentElement.previousElementSibling;
    currentSong.querySelector(".play").click();
});

function letMusicPlay() {
    playSong = document.querySelectorAll(".list-songs .play");
    var album = document.querySelector(".current-album h3").textContent.toLowerCase();
    var currentAlbum = album.split(" ").join("-");
    for (let i = 0, max = playSong.length; i < max; i++) {
        playSong[i].addEventListener("click", function (event) {
            pauseSong.classList.remove("is-none");
            doSong.classList.add("is-none");
            // отмечаем, что песня включена (а у остальных выключаем)
            for (let j = 0, max = playSong.length; j < max; j++) {
                if (playSong[j].classList.contains("in-process")) {
                    playSong[j].classList.remove("in-process");
                    break;
                }
            }
            playSong[i].classList.add("in-process");
            // находим название песни
            var parentLi = playSong[i].parentElement;
            var nameSong = parentLi.querySelector("span").textContent;
            var n = nameSong.toLowerCase().split(" ");
            n.shift();
            var currentSong = n.join("-");
            // находим время песни
            var songTime = "";
            for (let k = 0, max = albums.length; k < max; k++) {
                if (albums[k].name.toLowerCase() == album) {
                    for (let s = 0, max = albums[k].songs.length; s < max; s++) {
                        if (albums[k].songs[s].name.toLowerCase() == n.join(" ")) {
                            songTime = albums[k].songs[s].time;
                            break;
                        }
                    }
                    break;
                }
            }

            //включаем песню
            try {
                song.src = "songs/" + currentAlbum + "/" + currentSong + ".mp3";
                song.play();

                // отмечаем процесс
                circle.style.left = "0px";
                let second = songTime.split(":");
                let allSecond = (parseInt(second[0]) * 60 + parseInt(second[1]))*1000;
                widthTrack = parseInt(turntable.offsetWidth)*0.9 - 30;

                interval = Math.round(allSecond / widthTrack);
                var pad = parseInt(turntable.offsetWidth)*0.02;
                step = pad;
                circle.style.left = pad + "px";
                done.style.width = "4px";
                willDo.style.left = pad + "px";
                willDo.style.width = parseInt(turntable.offsetWidth)*0.88 + "px";
                var leftDo = pad;
                clearInterval(timerId);
                timerId = setInterval(goTurntable, interval);

            }catch(error) {
                console.log(error);
            }


        });
    }
}

function goTurntable() {
    step++;
    circle.style.left = `${step}px`;
    done.style.width = `${leftDo + step}px`;
    willDo.style.left = `${leftDo + step}px`;
    let widthWillDo = willDo.offsetWidth;
    willDo.style.width = `${widthWillDo - 1}px`;
    let valueLeft = parseInt(circle.style.left);
    if (valueLeft > widthTrack) {
        clearInterval(timerId);
        song.pause();
    };
}
