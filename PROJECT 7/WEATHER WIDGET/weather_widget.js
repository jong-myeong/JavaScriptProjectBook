// API 요청 URL 변수
var cityId = 1838519;        // 부산
var apiKEY = 'a07a92a4576ad8b9b0d74f4ff467dcc7';
var url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKEY}`;

// 로딩 이미지 표시
$('#weather_info .load_img').show();


$.getJSON(url, function(data) {

    // 날씨 data 객체
    var sys = data.sys;             // 국가명, 일출/일몰
    var city = data.name;           // 도시명
    var weather = data.weather;     // 날씨 객체
    var main = data.main;           // 온도, 기압 관련 객체

    var weatherMain = weather[0].main;      // 구름 상태(Cloudiness)
    var weatherId = weather[0].id;          // 날씨 상태 id 코드
    var weatherIcon = weather[0].icon;      // 날씨 아이콘 정보
    var country = sys.country;              // 국가명
    var temp = main.temp;                   // 현재 온도
    var temp_min = main.temp_min;           // 최저 온도
    var temp_max = main.temp_max;           // 최고 온도

    // 날씨 아이콘
    var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}`;

    // 날씨 정보 표시
    $('#weather_info > .city').html(`${city}/${country}`);
    $('#weather_info .icon').html(`<img src='${iconUrl}.png'>`);
    $('#weather_info .weather_id').html(weatherMain);
    $('#weather_info .temp').html(`현재 온도 : ${parseInt(temp_min-273.15)}&deg`);
    $('#weather_info .temp_max').html(`최고 온도 : ${parseInt(temp_max-273.15)}&deg`);
    $('#weather_info .temp_min').html(`최저 온도 : ${parseInt(temp_min-273.15)}&deg`);

    $('#weather_info .load_img').hide();
}).fail(function() {
    // 오류 메시지
    alert("loading error");
});


