// 변수 선언
var $banner = $('#banner'),          // 배너 전체
    $img = $banner.find('img'),      // 풍선 스프라이트 이미지 객체
    $toggle = $('#toggle'),          // 배너 열고 닫는 토글 버튼 객체
    $soundBtn = $('#sound_btn');     // 사운드 끄고 켜는 버튼 객체

var $bannerHeight = $banner.css('height');     // 배너 높이 값 변수
var cast = [];                                 // 풍선 객체 정의 배열

// 풍선 객체 생성 함수
function setBalloon(num) {
    // 풍선의 속성 값을 랜덤으로 생성
    var x = Math.floor(Math.random() * (500 - 10) + 10),        // 10에서 500 사이의 값
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 - 100) + 100),
        angle = Math.floor(Math.random() * 360),
        speed = Math.random() * 2;

    // 풍선 객체
    cast[num] = {
        x: x,               // 풍선 x 좌표
        y: -y,              // 풍선 y 좌표 (배너 상단 밖에서 출현하므로 -값 적용)
        size: size,         // 풍선 크기
        angle: angle,       // 풍선 초기 회전 각도
        speed: speed        // 풍선 떨어지는 속도
    };
}

// 풍선 객체 초기화 함수
function balloonInit() {
    $img.each(function(i) {
        // 풍선 객체들의 속성 초기화
        setBalloon(i);
        $img.eq(i)
        .css('left', '-9999px')
        .css('top', '-9999px');
    });
}

// 풍선 애니메이션 함수
function animateBalloon() {
    $img.each(function(i) {
        // 풍선 속성 변경
        $img.eq(i)
        .css('left', `${cast[i].x}px`)                          // x 좌표
        .css('top', `${cast[i].y}px`)                           // y 좌표
        .css('transform', `rotate(${cast[i].angle}deg)`);       //회전
        
        // 풍선이 화면 안에 있으면
        if(cast[i].y < parseInt($bannerHeight)) {
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        } else { 
            // 풍선이 화면 밖으로 나가면 풍선 객체 위치 초기화
            setBalloon(i);
        }
    });
}

// 배경 음악 처리 함수
function bgmInit() {
    var bgm = new Audio();
    bgm.src = 'bgm/bgm.mp3';
    bgm.loop = true;
    // 문서에 오디오 객체 추가
    $('body').append(bgm);     
}

/* ------------------------------------------------- */

balloonInit();

// 초당 30프레임으로 애니메이션 동작
setInterval(function() {
    animateBalloon();
}, 1000/30);

bgmInit();

/* ------------------------------------------------- */

// 사운드 버튼 이벤트 핸들러
$soundBtn.click(function(event) {
    var soundBtnClass = $(this).attr('class');      // 사운드 버튼의 class 속성
    var bgm = $('audio');                           // audio 객체

    if (soundBtnClass == 'active') {
        //사운드 off
        $(this).removeAttr('class');                        // class 제거
        $(this).attr('src', 'images/sound_off.png');        // 버튼 이미지 교체
        bgm[0].pause()                                      // bgm 정지
    } else {
        // 사운드 on
        $(this).attr('class', 'active');                   // class 부여
        $(this).attr('src', 'images/sound_on.png');        // 버튼 이미지 교체
        bgm[0].play();                                     // bgm 재생
    }

    // 이벤트 버블링 차단
    event.stopPropagation();
});

// 배너 열기/닫기 버튼 이벤트 핸들러
$toggle.click(function() {
    var bannerClass = $banner.attr('class');     // 배너 객체 class 속성

    if (bannerClass == 'active') {
        // 배너 닫기
        $banner.removeAttr('class');
        $(this).html = '배너 열기';         // toggle 버튼 text 변경
        return false;                       // 클릭 시 문서가 이동되는 이벤트 방지
    } else {
        // 배너 열기
        $banner.attr('class', 'active');
        $(this).html = '배너 닫기';         // toggle 버튼 texst 변경
        return false;                       // 클릭 시 문서 이동 이벤트 방지 
    }
});

// 배너 링크 처리
$banner.click = function() {
    window.open('https://github.com/jong-myeong/', '_blank');        // 새 창 열기
}