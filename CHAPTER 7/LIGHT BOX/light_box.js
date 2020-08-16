// 변수 선언 및 초기화
var block = document.querySelector('#block');                       // 라이트박스 배경
var lightbox = document.querySelector('#lightbox');
var indicator = document.querySelectorAll('.indicator button');

// 라이트 박스 표시
function lightbox_open(num) {
    lightbox.setAttribute('class', 'active');
    block.setAttribute('class', 'active');
    
    change_img(num);
    indicator[num-1].focus();
}

// 라이트 박스 닫기
function lightbox_close() {
    lightbox.removeAttribute('class')
    block.removeAttribute('class')
}

// 이미지 전환 함수
function change_img(val) {
    var imgs = document.querySelectorAll('figure > img');
    
    //  해당 이미지 제외 초기화
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].removeAttribute('class');
    }
    // 해당 이미지 active 클래스 추가
    imgs[val-1].setAttribute('class', 'active')
}