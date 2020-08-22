// 글상자에 글자 입력
$('txt').val('글상자 영역의 색상 값을 저장합니다.');

// 글자색 변경 시 글상자의 글자색에 적용
$('textcolor').change(function() {
    var textColor = $(this).val();
    $('#txt').css('color', textColor);
});

// 배경색 변경 시 글상자의 배경색에 적용
$('#bgcolor').change(function() {
    var bgColor = $(this).val();
    $('#txt').css('backgroundColor', bgColor);
});

// 글자색과 배경색을 로컬 스토리지에 저장
$('#set_color').click(function() {
    var textColor = $('#textcolor').val();
    var bgColor = $('#bgcolor').val();
    var obj = {
        textcolor : textColor,
        backgroundcolor : bgColor
    }
    // 색상 설정 객체를 저장
    localStorage.setItem('color', JSON.stringify(obj));
});

// 저장한 환경 설정을 읽어 옴
$('#get_color').click(function() {
    var color = JSON.parse(localStorage.getItem('color'));
    $('#txt').css({
        'color' : color.textcolor,
        'backgroundColor' : color.backgroundcolor
    });
});