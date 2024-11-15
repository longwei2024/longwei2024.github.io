
var formatime = function (seconds) {
    var m = 0, s = 0;
    m = Math.floor(seconds / 60);
    s = Math.floor(seconds % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return `${m}:${s}`;
}

function VideoPlayer() {

    this.video_element = document.querySelector("#video");
    this.button_mid_element = document.querySelector(".tt-button-toggle");
    this.video_page = document.querySelector(".tt-video-page")
    this.video_bottom = document.querySelector(".tt-video-bottom")
    this.video_aside = document.querySelector(".tt-video-aside")
    this.button_handle = document.querySelector(".btn-play");
    this.buttons = document.querySelectorAll(".group button");
    this.progress_element = document.querySelector(".tt-video-progress");
    this.ul_element = document.querySelector(".tt-video-progress ul");
    this.li_element = document.querySelector(".tt-video-progress li");
    this.container_element = document.querySelector(".container");
    this.volume_progress = document.querySelector(".volume-progress");
    this.volume_ul_element = document.querySelector(".volume-progress ul");
    this.volume_li_element = document.querySelector(".volume-progress ul li");
    this.volume_bar_element = document.querySelector(".volume-progress ul li .bar");
    this.span_element = document.querySelector(".txt-message span");
    this.msg_element = document.querySelector(".msg");
    this.volume_percent = document.querySelector(".volume-percent");
    this.btn_max = document.querySelector(".btn-max")
    this.css = document.querySelector(".css")
    this.js = document.querySelector(".js")

    this.cur = 0;
    this.dur = 0;
    this.volume = 1;

    this.isPlay = false;

    this.total_width = this.progress_element.offsetWidth;
    this.width = 0;

    this.posX = this.container_element.offsetLeft;

    this.isFullScreen = false;


}


VideoPlayer.prototype.init = function () {
    this.playFn();
    this.pauseFn();
    this.addEvent();
}

VideoPlayer.prototype.playFn = function () {
    var _this = this;
    this.button_mid_element.onclick = function () {
        this.style['display'] = "none";
        _this.video_element.play();
        _this.button_handle.children[0].className = "icon-off";
        _this.isPlay = true;
        _this.setStatus(0);
    }

}
VideoPlayer.prototype.pauseFn = function () {
    var _this = this;
    _this.button_handle.onclick = function () {
        if (_this.isPlay) {
            _this.video_element.pause();
            _this.isPlay = false;
            _this.button_handle.children[0].className = "icon";
            _this.button_mid_element.style['display'] = "block";
            _this.setStatus(1);
        }
        else {
            _this.button_mid_element.style['display'] = "none";
            _this.video_element.play();
            _this.button_handle.children[0].className = "icon-off";
            _this.isPlay = true;
            _this.setStatus(0);
        }
    }
}

VideoPlayer.prototype.progressFn = function () {
    var percent = this.cur / this.dur;
    this.width = percent * this.total_width;
    this.li_element.style['width'] = this.width + "px";
}

VideoPlayer.prototype.setStatus = function (index) {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].className = "";
    }
    this.buttons[index].className = "active";
}

VideoPlayer.prototype.addEvent = function () {
    var _this = this;
    this.container_element.onmouseenter= function(){
        _this.video_aside.style.display = "block"
        _this.video_bottom.style.display = "block"
    }
    this.container_element.onmouseleave= function(){
        _this.video_aside.style.display = "none"
        _this.video_bottom.style.display = "none"
    }
    this.btn_max.onclick = function(){
        if (!_this.isFullScreen) {
            _this.css.href = "./css/indexcopy.css";
            _this.isFullScreen = true;
            // 切换图标class
            _this.btn_max.children[0].className = "icon-min";
        } else {
            _this.css.href = "./css/index.css";
            _this.isFullScreen = false;
            // 切换回原始图标class
            _this.btn_max.children[0].className = "icon-max";
        }
        
        setTimeout(function() {
            _this.total_width = _this.progress_element.offsetWidth;
            
            if (_this.cur && _this.dur) {
                var percent = _this.cur / _this.dur;
                _this.width = percent * _this.total_width;
                _this.li_element.style['width'] = _this.width + "px";
            }
        }, 100);
    }
    this.video_element.oncanplay = function () {
        _this.dur = _this.video_element.duration;
        var v1 = formatime(_this.dur);
        console.log(v1)
        _this.span_element.innerText = `00:00/${v1}`;
    }
    this.video_element.ontimeupdate = function () {
        _this.cur = _this.video_element.currentTime;
        var v1 = formatime(_this.dur);
        var v2 = formatime( _this.cur);
        console.log(v2);
        _this.span_element.innerText = `${v2}/${v1}`;

        _this.progressFn();
    }
    this.video_element.addEventListener('ended',function(){
        console.log("结束");
        _this.setStatus(2);
        _this.button_mid_element.style['display']="block";
        _this.button_handle.children[0].className="icon";
        _this.isPlay = false;

        _this.msg_element.style['display']="block";

        setTimeout(function(){
            _this.video_element.currentTime = 0;
            _this.setStatus(0);
            _this.video_element.play();
            _this.button_mid_element.style['display']="none";
            _this.button_handle.children[0].className="icon-off";
            _this.isPlay = true;
            _this.msg_element.style['display']="none";
        },10 * 1000)
    })

    this.ul_element.onclick = function(event) {
        // 获取进度条相对于视口的位置
        var progressRect = _this.ul_element.getBoundingClientRect();
        
        // 计算点击位置相对于进度条的偏移
        _this.width = event.clientX - progressRect.left;
        
        // 边界检查
        if(_this.width < 0) {
            _this.width = 0;
        }
        if(_this.width > _this.total_width) {
            _this.width = _this.total_width;
        }
        
        // 更新进度条宽度
        _this.li_element.style['width'] = _this.width + "px";
        
        // 计算并设置视频时间
        _this.cur = (_this.width / _this.total_width) * _this.dur;
        _this.video_element.currentTime = _this.cur;
        
        // 更新时间显示
        var v1 = formatime(_this.dur);
        var v2 = formatime(_this.cur);
        _this.span_element.innerText = `${v2}/${v1}`;
    }

    var isMouseDown = false;
    this.ul_element.onmousedown = function(event){
        event.stopPropagation();
        _this.total_width = _this.progress_element.offsetWidth;
        
        isMouseDown = true;
        _this.video_element.pause();
        
        var progressRect = _this.ul_element.getBoundingClientRect();
        
        document.onmousemove = function(event){
            _this.width = event.clientX - progressRect.left;
            
            if(_this.width < 0) {
                _this.width = 0;
            }
            if(_this.width > _this.total_width) {
                _this.width = _this.total_width;
            }
            
            _this.li_element.style['width'] = _this.width + "px";
            _this.cur = (_this.width / _this.total_width) * _this.dur;
            _this.video_element.currentTime = _this.cur;
            
            var v1 = formatime(_this.dur);
            var v2 = formatime(_this.cur);
            _this.span_element.innerText = `${v2}/${v1}`;
        }
    }

    

    this.volume_bar_element.onmousedown = function(){
        var x1 = _this.volume_ul_element.offsetLeft;
        var x2 = _this.volume_progress.offsetLeft;
        var w1 = _this.volume_ul_element.offsetWidth;
        var w2 = _this.volume_bar_element.offsetWidth;
        var maxWidth = w1 - w2;
        document.onmousemove = function(event){
            var px = event.pageX;
            var x = px - x1 - x2 - _this.posX;
            if(x < 0) {
                x = 0
            };
            if(x > maxWidth) {
                x = maxWidth
            };

            _this.volume_li_element.style['width'] = x +"px";
            _this.volume_bar_element.style['left'] = x +"px";

    
            var v1 = x / maxWidth;
            var per =  parseInt(x / maxWidth * 100);
            console.log({per,v1});

            _this.volume_percent.innerText = per+"%"; 

            _this.video_element.volume = v1;
        }
    }


    document.onmouseup = function(){
        document.onmousemove = null;
        if(isMouseDown){
            console.log("松开")
            _this.video_element.play();
            _this.button_mid_element.style['display'] = "none";
            _this.button_handle.children[0].className = "icon-off";
            _this.isPlay = true;
        }
        isMouseDown = false;
    }



}

new VideoPlayer().init();