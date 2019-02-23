window.onload = function() {
    document.getElementById('asd').onclick = function() {

    var k= {page : 0};

    $.ajax({
        //data는 바꿀예정
        data : JSON.stringify(k),
        contentType: "application/json",
        url : 'requestDiary',
        type : 'POST',
        dataType : 'json',
        success : function(data){
            //alert("ajax 통신 성공!!!");
            $.each(data, function(key, value) {
                var input_html ="<button id=\"계획1\" class=\"button-plan\">"+
                        "<div id=\"k1\" class=\"container-plan_info\">"+
                            "<h4>"+value.s_info+"</h4>"+
                            "<p>"+value.text+"</p>"+
                        "</div>"+
                        "<div class=\"container-plan_detail\">"+
                            "<ul class=\"div-thumbnail\">"+
                                "<li>"+
                                    "<div id=\"loc1\" class=\"thumbnail\">"+
                                        "<img src=\"../static/source/img/cafe.jpg\"/>"+
                                    "</div>"+
                                    "<h6 id=\"장소1\" class=\"text-thumbnail\">"+value.places[0]+"</h6>"+
                                "</li>"+
                                "<li>"+
                                    "<div id=\"loc1\" class=\"thumbnail\">"+
                                        "<img src=\"../static/source/img/cafe.jpg\"/>"+
                                    "</div>"+
                                    "<h6 id=\"장소2\" class=\"text-thumbnail\"> "+value.places[1]+"</h6>"+
                                "</li><li>"+
                                    "<div id=\"loc1\" class=\"thumbnail\">"+
                                        "<img src=\"../static/source/img/cafe.jpg\"/>"+
                                    "</div>"+
                                    "<h6 id=\"장소3\" class=\"text-thumbnail\">" +value.places[2]+"</h6>"+
                                "</li>"+
                            "</ul>"+
                            "<span>장소 분류 : </span>"+
                            "<img class=\"category_icon\" src=\"../static/source/icon/cafeicon.png\">"+
                            "<img class=\"category_icon\" src=\"../static/source/icon/cafeicon.png\">"+
                            "<img class=\"category_icon\" src=\"../static/source/icon/cafeicon.png\">"+
                            "<span class=\"text_start\">시작 장소 : </span>"+
                            "<span class=\"button-tag activated\"><i class=\"fas fa-hashtag\"></i>&nbsp;"+value.placetag[0]+"</span>"+
                       "</div>"+"</button>"
                $("#container-plan_list").append(input_html);

            })
        }


        });
    }

    };
