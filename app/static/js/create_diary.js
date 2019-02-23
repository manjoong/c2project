// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map-loc'), // 지도를 표시할 div 
    mapOption = {
        center: new daum.maps.LatLng(37.366384, 127.106668), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
        mapTypeId: daum.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성합니다    
var map = new daum.maps.Map(mapContainer, mapOption);
// 지도 타입 변경 컨트롤을 생성한다
var mapTypeControl = new daum.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new daum.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

// 장소 검색 객체를 생성합니다
var ps = new daum.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new daum.maps.InfoWindow({
    zIndex: 1
});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === daum.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === daum.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === daum.maps.services.Status.ERROR) {

        alert('검색 진행 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new daum.maps.LatLngBounds(),
        listStr = '';
    //console.log(listEl);
    //console.log(menuEl);
    //console.log(fragment);

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
        //console.log(places[i]);
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new daum.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 click 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        (function (marker, title) {
            daum.maps.event.addListener(marker, 'click', function () {
                var newBound = new daum.maps.LatLngBounds();
                newBound.extend(marker.getPosition());
                map.setBounds(newBound);
                displayInfowindow(marker, title);
                console.log("클릭함 : " + title);
            });
            daum.maps.event.addListener(marker, 'rightclick', function () {
                if (confirm("이 장소(" + title + ")를 추가하시겠습니까?")) {
                    //console.log("장소 추가됨 : " + title + ", 좌표 : " + marker.getPosition());
                    var mY = (marker.getPosition().getLat()).toFixed(10);
                    var mX = (marker.getPosition().getLng()).toFixed(10);
                    console.log("mX : " + mX);
                    console.log("mY : " + mY);
                    var thisPosition = places.find(function (element) {
                        if (Number(element.x).toFixed(10) == mX && Number(element.y).toFixed(10) == mY) {
                            console.log("find");
                            return element;
                        }
                        console.log("cannot find");
                        return null;
                    });
                    console.log(thisPosition);
                    add_location(thisPosition);
                }
            });

            /*daum.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });*/

            itemEl.onclick = function () {
                

                displayInfowindow(marker, title);
                console.log("클릭함 : " + title);
            };
            itemEl.ondblclick = function () {
                var newBound = new daum.maps.LatLngBounds();
                newBound.extend(marker.getPosition());
                map.setBounds(newBound);
            };

            /*itemEl.onmouseout = function () {
                infowindow.close();
            };*/
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
        '<div class="info">' +
        '   <h5 class="place_name">' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span class="road_address">' + places.road_address_name + '</span>' +
            '   <span class="address" class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new daum.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new daum.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}


// 선택한 장소를 추가 + 해당 장소의 정보를 서버로 전송
var loc_count = 0;

function add_location(thisPosition) {
    if (loc_count >= 3) {
        alert("장소는 최대 3개까지 추가할 수 있습니다.");
        return;
    }
    var title = thisPosition.place_name;
    var address = thisPosition.address_name;
    var road_address = thisPosition.road_address_name;
    var tel = thisPosition.phone;
    var category = thisPosition.category_name;
    var place_link = thisPosition.place_url;

    var item_info =
        '<button id="button-place-' + thisPosition.id + '" class="button-place">' +
        '<h4># ' + title + '</h4>' +
        '<h6>' + category + '</h6>' +
        '<h6>' + tel + '</h6>' +
        '<h5>' + road_address + '</h5>' +
        '<h5>' + address + '</h5>' +
        '<a class="a-place_link" target="_blank" href="' + place_link + '">' + '자세히 보기</a>' +
        '</button>';
    
    $(".container-input_loc_info").append(item_info);
    //console.log(item_info);
    console.log("장소 추가됨 : [" + title + "], 좌표 : (" + thisPosition.x + ", " + thisPosition.y + ").");
    loc_count++;
    return 0;
}

$(document).ready(function(){
    //console.log("ready.");
    //resizing_tagbox();
})

$( window ).resize( function() {
    //resizing_tagbox();
} );

/*** 각 태그 활성화 및 값 전송 ***/
$(".button-tag").on("click", function toggleButton(){
    /*** 태그 전송 갯수 제한 ***/
    // [위치]태그 제어
    if($(this).parent().attr("id") == "location"){
        //console.log("this is loc.");
        if($(this).parent().val() > 0 && !$(this).hasClass("activated")){
            alert("[위치] 태그는 1개만 선택가능합니다.");
            return false;
        }
    }
    // 총 태그 갯수 제어
    var tag_count = $("#container-tagVals").val();
    //console.log(tag_count);
    if( tag_count >= 6 && !$(this).hasClass("activated")){
        alert("태그는 6개까지 선택 가능합니다.");
        return false;
    }
    /*** 선택된 태그 값 추출 ***/
    var tagVal = $(this).val();
    //var tagVal = $(this).val();
    if (tagVal == ""){
        //alert("오류 - attr : value 항목이 존재하지 않습니다.");
        //return false;
    }
    //console.log(tagVal + " - 태그 클릭됨.");
    var copiedButton = $(this);
    
    /*** 활성화 상태와 값 제어 ***/
    // on -> off
    if($(this).hasClass("activated")){
        $(this).removeClass("activated");
        var valueName = $(this).val();
        $("#container-tagVals > [value = "+valueName+"]").remove();
        $("#container-tagVals").val(--tag_count);
        
        $("input[value="+tagVal+"]").remove();
        
        if($(this).parent().attr("id") == "location"){
            $(this).parent().val(0);
        }
    }
    // off -> on
    else{
        $(this).addClass("activated");
        $("#container-tagVals").append(copiedButton.clone());
        $("#container-tagVals").val(++tag_count);
        
        var hidden_input_html = "<input id=\"" + tagVal + "\" type=\"hidden\" name=\"input-others\" value=\"" + tagVal + "\">";
        
        $("#container-search_bar").append(hidden_input_html);
        
        if($(this).parent().attr("id") == "location"){
            $(this).parent().val(1);
            $("input[id="+tagVal+"]").attr("name", "input-location");
        }
    }
    $(".button-search").css("height", $("#container-tagVals").css("height"));
    //resizing_tagbox();
})


function resizing_tagbox(){
    /*var list_tagbox = $(".container-tagbox");
    var max = 0;
    for (var i =0; list_tagbox[i]; i++){
        max = max > list_tagbox[i].offsetHeight? max : list_tagbox[i].offsetHeight;
    }
    list_tagbox.css("height", max);
    console.log(max);*/
}