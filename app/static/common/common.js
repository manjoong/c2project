$(document).ready(function(){
    $("#header").load("static/common/header.html");
    $("#footer").load("static/common/footer.html");
    $("head").append('<link rel="shortcut icon" href="static/source/icon/favicon.png" type="image/x-icon" />');
    $("#container-modal_plan").load("static/common/modal_plan_detail.html");
    $("#container-modal_chatbot").load("static/common/modal_chatbot.html");
})