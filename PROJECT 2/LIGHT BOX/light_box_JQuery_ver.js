$(function() {
    // 변수 선언 및 초기화
    var $block = $('#block');                   // 라이트박스 배경
    var $lightbox = $('#lightbox');
    var $indicator = $('.indicator button');

    // 라이트 박스 표시
    function lightbox_open(num) {
        $lightbox.addClass('active');
        $block.addClass('active');

        change_img(num);
        $indicator.eq(num).focus();
    };

    // 라이트 박스 닫기
    function lightbox_close() {
        $lightbox.removeAttr('class')
        $block.removeAttr('class')
    };

    // 이미지 전환 함수
    function change_img(val) {
        var $imgs = $('figure > img');

        //  해당 이미지 제외 초기화
        for (var i = 0; i < $imgs.length; i++) {
            $imgs.eq(i).removeAttr('class');
        }
        // 해당 이미지 active 클래스 추가
        $imgs.eq(val).addClass('active');
    };

    // 이미지 목록 click 이벤트 => 라이트 박스 열기
    $('img.thumb').click(function () {

        // this 는 선택한 이미지 객체
        var img_num = $(this).index() - 1;
        lightbox_open(img_num)
    });

    // 라이트 박스 닫기 버튼 click 이벤트
    $('.btn-close').click(function () {
        lightbox_close();
    });

    // 인디케이터 클릭 시 click 이벤트 => 라이트 박스 이미지 변경
    $indicator.click(function () {
        var img_num = $(this).index();
        change_img(img_num);
    });
});