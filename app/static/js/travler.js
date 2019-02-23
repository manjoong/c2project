$(document).ready(function () {
    //console.log("ready.");
    //resizing_tagbox();
})

$(window).resize(function () {
    //resizing_tagbox();
});
//추가
var place_tags = new Array();
var mood_tags = new Array();
var purpose_tags = new Array();
var indoor_tags = new Array();
var name;

/*** 각 태그 활성화 및 값 전송 ***/
$(".button-tag").on("click", function toggleButton() {

    if (!$(this).hasClass("activated")) {

    }

    /*var k = $(this).parent().val();
    var tagVal = $(this).val();
    alert($(this).parent().val())
    if ($(this).parent().attr("id") == "mood") {
        name = "mood_tags";
        if (k.length > 2 && !$(this).hasClass("activated")) {
            alert("[무드] 태그는 3개만 선택가능합니다.");
            return false;
        } else {

        }
    } else if ($(this).parent().attr("id") == "location") {
        name = "location_tags";
        if (k.length > 0 && !$(this).hasClass("activated")) {
            alert("[위치] 태그는 1개만 선택가능합니다.");
            return false;
        } else {

        }
    } else if ($(this).parent().attr("id") == "purpose") {
        name = "purpose_tags";
        if (k.length > 0 && !$(this).hasClass("activated")) {
            alert("[목적] 태그는 1개만 선택가능합니다.");
            return false;
        } else {

        }
    } else {
        name = "indoor_tags";
        if (k.length > 0 && !$(this).hasClass("activated")) {
            alert("[도어] 태그는 1개만 선택가능합니다.");
            return false;
        } else {

        }
    }

    if ($(this).hasClass("activated")) {
        $(this).parent().val(k.substr(1, k.length));
        $(this).removeClass("activated");
        $(this).addClass("activated");
        if (name == "mood_tags") {
            mood_tags.splice(mood_tags.indexOf(tagVal), 1);
        } else if (name == "location_tags") {
            place_tags.splice(place_tags.indexOf(tagVal), 1);
        } else if (name == "purpose_tags") {
            purpose_tags.splice(purpose_tags.indexOf(tagVal), 1);
        } else {
            indoor_tags.splice(indoor_tags.indexOf(tagVal), 1);
        }

    } else {
        $(this).parent().val(k + 1);
        $(this).addClass("activated");
        if (name == "mood_tags") {
            mood_tags.push(tagVal)
        } else if (name == "location_tags") {
            place_tags.push(tagVal)
        } else if (name == "purpose_tags") {
            purpose_tags.push(tagVal)
        } else {
            indoor_tags.push(tagVal)
        }
    }
    */
    $(".button-search").css("height", $("#container-tagVals").css("height"));
    //resizing_tagbox();
})
window.onload = function () {
    document.getElementById('pp').onclick = function () {
        document.getElementById('gd').submit();

        //console.log();
        return false;
    };
};

function resizing_tagbox() {
    /*var list_tagbox = $(".container-tagbox");
    var max = 0;
    for (var i =0; list_tagbox[i]; i++){
        max = max > list_tagbox[i].offsetHeight? max : list_tagbox[i].offsetHeight;
    }
    list_tagbox.css("height", max);
    console.log(max);*/
}
