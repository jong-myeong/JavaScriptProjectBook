// 변수 선언
var wrapper = document.querySelector('.wrapper'),           // 전체 페이지 
    page = document.querySelectorAll('.page'),              // 각 페이지 요소
    indicator = document.getElementById('indicator'),       // 인디케이터
    indicator_li = indicator.querySelectorAll('li');        // 인디케이터 목록

var yDeg = 0,                               // 페이지 전환 시 회전 각도
    indicatorNum = 1,                       // 현재 표시 페이지 번호(인디케이터 번호)
    indicatorLength = page.length,          // 화면에 표시할 인디케이터 개수
    pageWidth = page[0].offsetWidth,        // 현재 페이지 폭
    pageAngle = 0;                          // 페이지 배치를 위한 각도 정의

var hammer = new Hammer(wrapper);           // 터치 제스처 구현을 위한 해머 객체 생성

// 페이지 초기화
function initPage() {
    pageWidth = page[0].offsetWidth;

    // 3D page 4면체 위치 정의
    for(var i = 0; i < page.length; i++){
		page[i].style.transform = `rotateY(${pageAngle}deg) translateZ(${pageWidth/2}px)`;
		pageAngle += 90;
    }
    
    // page wrapper 정면으로 초기화
    wrapper.style.transform = `translateZ(${-pageWidth/2}px) rotateY(${yDeg}deg)`;
}

// 인디케이터 초기화
function initIndicator() {
    // 인디케이터 표시
    for(var i = 0; i < indicatorLength; i++) {
        indicator.innerHTML += `<li>${i+1}</li>`;
    }

    indicator_li = indicator.querySelectorAll('li');
    changePage(indicatorNum);
}

// 페이지 전환
// iNum => 이동하려는 페이지 인디케이터 숫자
function changePage(iNum) {
    // 현재 페이지 인디케이터에 active 클래스 추가
    indicator_li[iNum - 1].setAttribute('class', 'active');
    yDeg = -90 * (iNum - 1);
    wrapper.style.transform = `translateZ(${-pageWidth/2}px) rotateY(${yDeg}deg)`;

    // 페이지 이동 시 인디케이터 클래스 초기화 후 현재 페이지만 active 클래스 추가
    for (var i = 0; i < indicator_li.length; i++) {
        indicator_li[i].removeAttribute('class');
    }
    indicator_li[iNum - 1].setAttribute('class', 'active')
}

/* ----------------------------------- */
initPage();
initIndicator();

/* ---------- 이벤트 리스너 ---------- */
for (var i = 0; i < indicator_li.length; i++) {
    indicator_li[i].addEventListener('click', function() {
        iNum = parseInt(this.innerText);
        changePage(iNum);
    });
}

// 터치 swipe left
hammer.on('swipeleft', function(e) {
    if (indicatorNum < indicatorLength) {
        pageVector = 1;
    } else {
        pageVector = 0;
    }

    indicatorNum += pageVector;
    changePage(indicatorNum);
});

// 터치 swipe right
hammer.on('swiperight', function(e) {
    if (indicatorNum > 1) {
        pageVector = -1;
    } else {
        pageVector = 0;
    }

    indicatorNum += pageVector;
    changePage(indicatorNum);
});

// 창 크기 변경 시 페이치 초기화
window.onresize = function() {
    initPage();
}