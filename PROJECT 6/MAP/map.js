function initMap() {
    // 위치 정보 변수
    var myPosition = {lat: 35.667306, lng: 139.699969};

    // map 객체 생성 및 지도 표시
    var map = new google.maps.Map(document.getElementById("map"), {
        center: myPosition,
        scrollwheel: false,
        zoom: 17,
        style: styleArray
    });

    // marker 객체 생성
    var marker = new google.maps.Marker({
        map: map,
        position: myPosition,
        title: '여기가 내 위치입니다!'
    })

    // map style
    var styleArray = [{
        featureType: 'all',
        stylers: [{
            saturation: -80
        }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
                hue: '#00ffee'
            },
            {
                saturation: 50
            }
        ]
    }, {
        featureType: 'poi.business',
        elementType: 'lables',
        stylers: [{
            visibility: 'off'
        }]
    }];

    // 정보창 객체를 추가
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // HTML5 위치 정보 요청
    if (navigator.geolocation) {
        // 지오로케이션 사용 가능한 경우
        navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('여기가 내 위치입니다!');
                map.setCenter(pos);
            }, function () {
                // 연결 실패
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // 지오로케이션 사용 불가능한 경우
        handleLocationError(false, infoWindow, map.getCenter());
    };

};

initMap();

// 지오로케이션 오류 처리
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        '오류: 지오로케이션 연결 실패' :
        '오류: 브라우저에서 지오로케이션을 지원하지 않음');
}