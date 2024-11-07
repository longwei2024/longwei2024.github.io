$("span.navbar-toggler-icon").on("click", function () {
    $("ul.navbar-nav").slideDown(10000)
})
$("span.navbar-toggler-icon").on("click", function () {
    $("ul.navbar-nav").slideup(10000)
})
$(".row .col-md-3.col-6").on("mouseover", function () {
    $(this).find(".mask").stop().fadeIn(1500);
});

$(".row .col-md-3.col-6").on("mouseleave", function () {
    $(this).find(".mask").stop().fadeOut(800);
});




// var Swiper2 = new Swiper('#swiper2',{
//   initialSlide :2,
// })
// var Swiper1 = new Swiper('#swiper1',{
//   controller: {
//     control: Swiper2,
//     inverse :true,
//   },
// })
effect = 1
var swiper = new Swiper('.swiper-container', {
    zoom: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {

        delay: 1000,
        disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
    slidesPerView: 7,
    spaceBetween: 30,   
    centeredSlides: true,
    watchSlidesProgress: true,
    on: {
        setTranslate: function () {
            slides = this.slides
            for (i = 0; i < slides.length; i++) {
                slide = slides.eq(i)
                progress = slides[i].progress
                //slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
                slide.css({ 'opacity': '', 'background': '' }); slide.transform('');//清除样式

                if (effect == 1) {
                    slide.transform('scale(' + (1 - Math.abs(progress) / 8) + ')');
                } else if (effect == 2) {
                    slide.css('opacity', (1 - Math.abs(progress) / 6));
                    slide.transform('translate3d(0,' + Math.abs(progress) * 20 + 'px, 0)');
                }
                else if (effect == 3) {
                    slide.transform('rotate(' + progress * 30 + 'deg)');
                } else if (effect == 4) {
                    slide.css('background', 'rgba(' + (255 - Math.abs(progress) * 20) + ',' + (127 + progress * 32) + ',' + Math.abs(progress) * 64 + ')');
                }

            }
        },
        setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

pe = document.getElementById('progressEffect');
pe.onchange = function () {
    effect = this.value
    swiper.update();
}
$('.carousel').carousel({
    interval:500
})


// var btn-l = document.querySelector(".swiper-button-prev")
// var enter = function(){
//     btn-1.style.display = "block"
//     $(".swiper-button-next").style.display = "block"
// }
// var leave = function(){
//     $(".swiper-button-prev").style.display = "none"
//     $(".swiper-button-next").style.display = "none"
// }
$(".allimg").on("mouseenter", function () {
    $(".swiper-button-next").css("display", "block")
    $(".swiper-button-prev").css("display", "block")
    console.log("bbbbbb")
})
$(".allimg").on("mouseleave", function () {
    $(".swiper-button-next").css("display", "none")
    $(".swiper-button-prev").css("display", "none")
})

