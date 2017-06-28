(function () {
    var oListItem = document.getElementsByClassName('list-item')[0];
    for (var i = 0; i < playlist.length; i++) {
        var oPlayListItem = document.createElement('div');
        oPlayListItem.textContent = (i + 1) + '.' + playlist[i].title;
        oPlayListItem.className = 'play-list-item';
        oPlayListItem.index = i;
        oListItem.appendChild(oPlayListItem);
    }
})();

(function () {
    var oListItem = document.getElementsByClassName('list-item')[0];
    var oScroll = document.getElementsByClassName('scroll')[0];
    var oDrag = document.getElementsByClassName('drag')[0];
    var oPlayList = document.getElementsByClassName('play-list')[0];

    var scale = oPlayList.offsetHeight / oListItem.offsetHeight;
    oDrag.style.height = scale * oScroll.offsetHeight + 'px';

    oPlayList.addEventListener('mousewheel', stopScroll, false);

    function stopScroll(ev) {
        if (ev.wheelDelta < 0) {
            oDrag.style.top = parseInt(getComputedStyle(oDrag)['top']) + 10 + 'px';
            oListItem.style.top = parseInt(getComputedStyle(oListItem)['top']) - (10 / (oScroll.offsetHeight - oDrag.offsetHeight)) * (oListItem.offsetHeight - oPlayList.offsetHeight) + 'px';
        } else {
            oDrag.style.top = parseInt(getComputedStyle(oDrag)['top']) - 10 + 'px';
            oListItem.style.top = parseInt(getComputedStyle(oListItem)['top']) + (10 / (oScroll.offsetHeight - oDrag.offsetHeight)) * (oListItem.offsetHeight - oPlayList.offsetHeight) + 'px';
        }

        if (parseInt(oDrag.style.top) < 0) {
            oDrag.style.top = 0;
            oListItem.style.top = 0;
        }
        if (parseInt(oDrag.style.top) > (oScroll.offsetHeight - oDrag.offsetHeight)) {
            oDrag.style.top = oScroll.offsetHeight - oDrag.offsetHeight + 'px';
            oListItem.style.top = -(oListItem.offsetHeight - oPlayList.offsetHeight) + 'px';
        }

        if (ev.preventDefault) {
            ev.preventDefault();
        }
        return false;
    }
})();

(function () {
    var oAudio = document.getElementsByTagName('audio')[0];
    var oSource = document.getElementsByTagName('source')[0];
    var oTitle = document.getElementsByClassName('music-title')[0];
    var oArtist = document.getElementsByClassName('music-artist')[0];
    var oTime = document.getElementsByClassName('time')[0];
    var oPic = document.getElementsByClassName('pic')[0].getElementsByTagName('img')[0];
    var progress = document.getElementsByClassName('music-progress')[0];
    var progressValue = document.getElementsByClassName('progress-value')[0];
    var currentTime = 0;
    var timer = null;
    oArtist.textContent = '';

    function loadMusic(index) {
        oAudio.index = index;
        oSource.src = playlist[index].url;
        oTitle.textContent = playlist[index].title;
        oArtist.textContent = playlist[index].singers[0].name;
        if (playlist[index].singers.length > 1) {
            for (var i = 1; i < playlist[index].singers.length; i++) {
                oArtist.textContent += ' / ' + playlist[index].singers[i].name;
            }
        }
        oPic.src = playlist[index].picture;
        oTime.textContent = toZero(oAudio.currentTime);
        clearInterval(timer);
        controlTime(oAudio.currentTime);
        oAudio.load();
    }

    function toZero(length) {
        var min = Math.floor(length / 60);
        var sec = '' + Math.round(length % 60);
        if (sec.length < 2) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }


    function control() {
        var oPrv = document.getElementsByClassName('prev')[0];
        var oToggle = document.getElementsByClassName('toggle')[0];
        var oNext = document.getElementsByClassName('next')[0];
        var aListItem = document.getElementsByClassName('list-item')[0].getElementsByTagName('div');


        oPrv.addEventListener('click', function () {
            if (oAudio.index <= 0) {
                loadMusic(playlist.length - 1);
            } else {
                tab(oAudio.index - 1);
                loadMusic(oAudio.index - 1);
            }
        }, false);

        oNext.addEventListener('click', function () {
            if (oAudio.index >= playlist.length - 1) {
                loadMusic(0);
            } else {
                tab(oAudio.index + 1);
                loadMusic(oAudio.index + 1);
            }
        }, false);

        oToggle.addEventListener('click', function () {
            if (oAudio.paused) {
                clearInterval(timer);
                oAudio.play();
                oToggle.style.background = 'url(img/pause.jpg) no-repeat';
            } else if (oAudio.played) {
                controlTime();
                oAudio.pause();
                oToggle.style.background = 'url(img/start.jpg) no-repeat';
            }
        }, false);
    }

    function controlTime() {
        timer = setInterval(function () {
            oTime.textContent = toZero(oAudio.currentTime);
            progressValue.style.width = (oAudio.currentTime / oAudio.duration) * progress.offsetWidth + 'px';
            if (oAudio.currentTime >= oAudio.duration) {
                loadMusic(oAudio.index + 1);
            }
        }, 1000);
    }

    function change() {
        var aListItem = document.getElementsByClassName('list-item')[0].getElementsByTagName('div');
        aListItem[0].className = 'active';
        for (var i = 0; i < aListItem.length; i++) {
            aListItem[i].addEventListener('click', function () {
                tab(this.index);
                loadMusic(this.index);
            }, false);
        }
    }

    function tab(index) {
        var aListItem = document.getElementsByClassName('list-item')[0].getElementsByTagName('div');
        for (var i = 0; i < aListItem.length; i++) {
            aListItem[i].className = 'play-list-item';
        }
        aListItem[index].className = 'active';
    }

    change();
    control();
    loadMusic(0);
})();

(function () {
    function controlProgress() {
        var progress = document.getElementsByClassName('music-progress')[0];
        var progressValue = document.getElementsByClassName('progress-value')[0];
        var volumeScroll = document.getElementsByClassName('volume-scroll')[0];
        var volumeValue = document.getElementsByClassName('volume-value')[0];
        var oAudio = document.getElementsByTagName('audio')[0];

        progress.addEventListener('click', function (ev) {
            ev = ev || event;
            var progressWidth = ev.clientX - getOffset(progress).left;
            progressValue.style.width = progressWidth + 'px';
            oAudio.currentTime = (progressWidth / progress.offsetWidth) * oAudio.duration;
        }, false);

        volumeScroll.addEventListener('click', function (ev) {
            ev = ev || event;
            var volumeWidth = ev.clientX - getOffset(volumeScroll).left;
            volumeValue.style.width = volumeWidth + 'px';
            oAudio.volume = (volumeWidth / volumeScroll.offsetWidth) * 1;
        }, false);
    }

    function getOffset(obj) {
        var dis = {
            left: 0,
            top: 0
        };
        while (obj.offsetParent) {
            dis.left += obj.offsetLeft;
            dis.right += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return dis;
    }

    controlProgress();
})();