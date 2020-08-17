// 변수 선언
var $calculator = $('form[name=cal]');                      // form 객체
var $input = $calculator.find('input');                     // input 객체
var $clear_btn = $('.clear_btn');                           // 초기화 버튼
var $result_btn = $('.result_btn');                         // 결과 버튼
var $result = $calculator.find('input[name=result]');       // 결과창

// 계산기 초기화(clear)
function clear() {
    $result.val(0);
}

// 계산기 입력 처리 함수
function calcInput(value) {
    // 입력이 들어가면 0을 지움
    if($result.val() == 0) {
        $result.val('');
    }
    // 입력 값을 결과 출력창에 출력
    var val = $result.val() + value;
    $result.val(val);
}

// 계산 결과 처리 함수
function calcOutput() {
    var calcResult = eval($result.val());
    // 결과 창에 표시
    $result.val(calcResult);
}

// 이벤트 핸들러
// ------------------------------------------------------------
// 숫자 및 사칙 연산 버튼   
$('input').click(function() {
    var $input_value = $(this).val();

    // 숫자와 사칙 연산자만 입력 처리
    if ($input_value != '=' && $input_value != 'clear') {
        calcInput($input_value);
    }
});

// 초기화 버튼
$('.clear_btn').click(function() {
    clear();
})

//결과 버튼
$('.result_btn').click(function() {
    try {
        calcOutput();
    }
    catch (err) {
        $result.val('입력 오류');
    }
});