$(function () {
    //首页渐变的效果
    (function () {
        init();

        function init() {
            hideCover();
            showTime();
            handleTime();
            // setBackground();
        }

        // function setBackground() {
        //     $.ajax({
        //         url:"http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
        //         type: 'get',
        //         dataType: 'jsonp',
        //         jsonp:'',                             //需要填入后端的回调函数名称才可以
        //         jsonpCallback:'success_jsonpCallback',
        //         success: function (data) {
        //             // var list = $.stringfy(data);
        //             // var list = data;
        //             // console.log(data);
        //         }
        //     });
        // }

        function handleTime() {
            var date = new Date();
            if(date.getHours() > 5 && date.getHours() < 10) {
                $('.content h2').text('早上好');
            } else if(date.getHours() > 10 && date.getHours() < 14) {
                $('.content h2').text('中午好');
            } else if(date.getHours() > 14 && date.getHours() < 19) {
                $('.content h2').text('下午好');
            } else if(date.getHours() > 19 && date.getHours() < 24) {
                $('.content h2').text('晚上好');
            } else if(date.getHours() > 0 && date.getHours() < 5) {
                $('.content h2').text('迎接新的一天');
            }
        }

        function hideCover() {
            $('.cover').animate({
                opacity: 0
            }, 4000, function () {
                $(this).css('display', 'none');
            });
        }

        function showTime() {
            setTime();
            setInterval(function () {
                setTime();
            }, 1000);
        }

        function setTime() {
            var oTime = $('.time');
            var date = new Date();
            var str = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
            oTime.text(str);
        }

        function addZero(data) {
            var str = data + '';
            if (str.length < 2) {
                str = '0' + str;
            }
            return str;
        }

    })();














});