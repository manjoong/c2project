window.onload = function () {
    var mapContainer = document.getElementById("map-loc"), // 지도를 표시할 div 
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

    mapContainer.style.width = $("#map-loc").css("width");
    mapContainer.style.height = $("#map-loc").css("height");
    console.log(mapContainer.style.height);

    var markers = [];

    // 장소 검색 객체를 생성합니다
    var ps = new daum.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new daum.maps.InfoWindow({
        zIndex: 1
    });

    // modal 호출 시 지도 resizing
    $('#container-modal_plan_detail').on('shown.bs.modal', function (e) {
        console.log("modal appeared.");
        map.relayout();
    })
}