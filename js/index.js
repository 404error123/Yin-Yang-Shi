//文字切换，轮播 封装 有变化过程
function TabChange(tab,cnt,type){
    this.tab = tab;
    this.length = tab.length;    
    this.cnt = cnt;
    this.type = type || "mouseenter";
    this.cntWidth = cnt.clientWidth/this.length;
}
TabChange.prototype.changeTab = function(){
    for(var i=0;i<this.length;i++){
        var _this = this;
        (function(i){
            _this.tab[i]["on"+_this.type] = function(){
                for(var j=0;j<_this.length;j++){
                    _this.tab[j].classList.remove("select");
                }
                this.classList.add("select");
                _this.cnt.style.marginLeft = -i*_this.cntWidth +"px";
            }
        })(i)
    }
}
//新闻文字轮播
function newsSlide(){
    var tab = document.getElementsByClassName("news-title")[0].getElementsByTagName("li");
    var cnt = document.getElementsByClassName("news-list")[0];
    var news = new TabChange(tab,cnt,"mouseenter");
    news.changeTab();
}

//攻略文字轮播
function strategySlide(){
    var tab = document.getElementsByClassName("right-title")[0].getElementsByTagName("a");
    var cnt = document.getElementsByClassName("right-cnt")[0];
    var news = new TabChange(tab,cnt,"mouseenter");
    news.changeTab();
}

//同人专区文字轮播
function tongSlide(){
    var tab = document.getElementsByClassName("tongren-tab")[0].getElementsByTagName("a");
    var cnt = document.getElementsByClassName("tr-box")[0];
    var news = new TabChange(tab,cnt,"mouseenter");
    news.changeTab();
}

// tab切换 封装 无变化过程
function TabControl(tab,cnt,type){
    this.tab = tab;
    this.length = tab.length;    
    this.cnt = cnt;
    this.type = type || "click";
}
TabControl.prototype.changeTab = function(){
    for(var i=0;i<this.length;i++){
        var _this = this;
        (function(i){
            _this.tab[i]["on"+_this.type] = function(){
                for(var j=0;j<_this.length;j++){
                    _this.tab[j].classList.remove("select");
                    _this.cnt[j].classList.remove("select");
                }
                this.classList.add("select");
                _this.cnt[i].classList.add("select");
            }
        })(i)
    }
}
// 平安之旅切换
function safetrip(){
    var tab = document.getElementsByClassName("ss-tabs")[0].getElementsByTagName("a");
    var cnt = document.getElementsByClassName("ss-same");
    var news = new TabControl(tab,cnt,"click");
    news.changeTab();
}

// 主角切换
function protagonist(){
    var tab = document.getElementsByClassName("zj-tabs")[0].getElementsByTagName("li");
    var cnt = document.getElementsByClassName("zj-cnt")[0].getElementsByTagName("li");
    var news = new TabControl(tab,cnt,"click");
    news.changeTab();
}

//式神头像列表切换
function shishenTab(){
    var tab = document.getElementsByClassName("ss-tab")[0].getElementsByTagName("li");
    var cnt = document.getElementsByClassName("ss-list");
    var news = new TabControl(tab,cnt,"click");
    news.changeTab();
}

//翻页封装
function TurnPage(box){
    this.box = box;
    this.next = box.getElementsByClassName("next-page")[0];
    this.prev = box.getElementsByClassName("prev-page")[0];
    this.cnt = box.getElementsByClassName("big-box")[0];
    this.boxWidth = box.clientWidth;
    this.cntWidth = this.cnt.clientWidth;
}
TurnPage.prototype.init = function(){
    if(this.cntWidth>this.boxWidth){
        this.next.style.display = "block";
        return true;
    }
}
TurnPage.prototype.initEvent = function(){
    var _this = this;
    this.next.onclick = function(){
        var boxLeft = _this.cnt.offsetLeft;
        _this.cnt.style.marginLeft = boxLeft - _this.boxWidth + "px";
        _this.prev.style.display = "block";
        if(_this.cntWidth+boxLeft-_this.boxWidth<=_this.boxWidth){
            this.style.display = "none";
        }
    }
    this.prev.onclick = function(){
        var boxLeft = _this.cnt.offsetLeft;
        _this.cnt.style.marginLeft = boxLeft + _this.boxWidth + "px";
        _this.next.style.display = "block";
        if(boxLeft<=0){
            this.style.display = "none";
        }
    }
}
// 式神翻页
function nextPage(){
    var box = document.getElementsByClassName("ss-list")[0];
    var page = new TurnPage(box);
    if(page.init()){
        page.initEvent();
    }
}

// 导航栏动画
function navShow(){
    var guan = document.getElementsByClassName("guan")[0],
        nav = document.getElementsByTagName("nav")[0],
        hidBox = document.getElementsByClassName("hid-box")[0],
        movekey = true;
    guan.onmouseenter = function(){
        nav.classList.add("hover");
    };
    guan.onmouseleave = function(){
        nav.classList.remove("hover");           
    };
    hidBox.onmouseenter = function(){
        nav.classList.add("hover");        
    };
    hidBox.onmouseleave = function(){
        nav.classList.remove("hover");     
    };
    document.addEventListener("scroll",function(){
        var sclTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(sclTop>=50 && movekey){
            nav.classList.add("fixed");
            movekey = false;
        }else if(sclTop<50 && !movekey){
            nav.classList.remove("fixed");
            movekey = true;
        }
    });
}

// 扫码下载动画
function showCode(){
    var download = document.getElementsByClassName("download-wrap")[0];
    document.getElementsByClassName("hid-download")[0].onclick = function(){
        download.classList.toggle("pick-up");
    }
    document.getElementsByClassName("show-code")[0].onclick = function(){
        download.classList.toggle("pick-up");
    }
}

// 角色切换动画
function roleChange(){
    var rolBox = document.getElementsByClassName("rol-slide");
    document.getElementsByClassName("next")[0].onclick = function(){
        var index =rolBox[0].classList.contains("select")? 0 : 1;
        rolBox[index].classList.toggle("select");
        setTimeout(function(){
            rolBox[1-index].classList.toggle("select");
        },1000)
    }
}

// 轮播图
var cnt = document.getElementsByClassName("left-banner")[0],
    box = document.getElementsByClassName("banner-box")[0],
    img = box.getElementsByTagName("li"),
    dotted = document.getElementsByClassName("dot")[0].getElementsByTagName("li"),
    num = dotted.length,
    index = 0,//默认开始的图片索引
    imgWidth = img[0].clientWidth,//图片宽度
    maxLen = imgWidth*num,
    left = -index*imgWidth,
    timer;

function initCarousel(){
    var last = img[0].cloneNode(true);
    box.appendChild(last);
    box.style.marginLeft = left + "px";
    dotted[index].className = 'select';
    initEvent();
    setTimer();
}
function setTimer(){
    timer = setInterval(function(){
        animate(1);//轮播图运动方向 1 或 -1
    },2500);//图片运动间隔 ms
}
function animate(dire){
    index = dire>0?++index:--index;
    left = -index*imgWidth;
    if(dire<0 && left>0){
        box.style.cssText = "transition:0s;margin-left:"+-maxLen+"px";
        left = -maxLen+imgWidth;
    }
    setTimeout(function(){
        box.style.cssText  = "transition:0.4s;margin-left:"+left+"px";
    },16)//运动时间0.4s;
    setTimeout(function(){
        if(dire>0 && left<=-maxLen){
            left = 0;            
            box.style.cssText = "transition:0s;margin-left:"+left+"px";
        }
    },400);
    if(index>num-1){
        index = 0;
    }else if(index<0){
        index = num-1;
    }
    dottedChange();
}
function dottedChange(){
    for(var i=0,len=dotted.length;i<len;i++){
        dotted[i].removeAttribute("class");
    }
    dotted[index].className = 'select';
}
function initEvent(){
    cnt.onmouseenter = function(){
        clearInterval(timer);
    };
    cnt.onmouseleave = setTimer;
    document.addEventListener("visibilitychange", function(){
        document.hidden?clearInterval(timer):setTimer();
    });
    for(var i=0;i<num;i++){
        (function(i){
            dotted[i].onmouseenter = function(){
                if(index!=i){
                    index = i>index?i-1:i+1;
                    animate(i-index);
                }
            }
        })(i)
    }
}
// 总执行函数
function init(){
    newsSlide();
    strategySlide();
    tongSlide();
    safetrip();
    protagonist();
    shishenTab();
    nextPage();
    navShow();
    showCode();
    roleChange();
    initCarousel();    
}
init();