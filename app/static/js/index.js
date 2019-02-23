/*** 스크롤 높이를 추적하여 header와 footer 배경/글꼴 색상 조절 ***/
$(document).ready(function(){
    scroll_tracker();
    $("#button-login").css("color", "white");
});
$(window).scroll(function () {
    scroll_tracker();
});
function scroll_tracker(){
    var scroll_height = $(window).scrollTop();
    //console.log(scroll_height);
    if (scroll_height >= 100) {
        $("#footer").removeClass("transparented");
    }
    else{
        $("#footer").addClass("transparented");
    }
    if (scroll_height >= 1000){
        $("#header").removeClass("transparented");
        $("#button-login").css("color", "lightcoral");
    }
    else{
        $("#header").addClass("transparented");
        $("#button-login").css("color", "white");
    }
}
