var mySwiper = new Swiper ('.swiper', {
    direction: 'vertical', // 垂直切换选项
    mousewheel: true,
  })        

$(".cen_r ul ol").eq(0).siblings().find("img").hide()
$(".remen span").on("mouseover",function(){

    for(i=0;i<5;i++){
        $(".remen span").removeClass("active").next().hide()
        
    }
    $(this).addClass("active").next().show()
 
})
// 循环遍历每个 .th span 元素
$(".remen span").each(function(index) {
    $(this).on("mouseover", function() {
        // 隐藏所有的 .list 元素
        $(".cen_list").css("display", "none");
        
        // 根据当前索引显示对应的 .list 元素
        $(".cen_list").eq(index).css("display", "flex");
    });
});

$(".nav_mask").hide()
$(".nav_left i img").on("mouseover",function(){
    $(".nav_mask").stop().slideDown()
})
$(".nav_mask").on("mouseleave",function(){
    $(".nav_mask").stop().slideUp()
})

// $(".nav-item").on("mouseover",".dropdown-menu",(event)=>{
//    let el = event.target
//     $(el).stop().slideDown()
// })
// $(document).ready(function() {
//     // 选择视频元素并播放
//     $('#video_part1').get(0).play();
// });

// window.onload = () {
//     var video = document.getElementById('myVideo');
//     video.play();
// };


let innerH = document.documentElement.scrollTop;
console.log(innerH)


