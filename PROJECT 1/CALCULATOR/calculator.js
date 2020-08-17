// 변수 선언
var calculator = document.forms['cal'];
var input = calculator.getElementsByTagName('input');
var clear_btn = document.getElementsByClassName('clear_btn')[0];
var result_btn = document.getElementsByClassName('result_btn')[0];

// 계산기 초기화(clear)
function clear() {
calculator['result'].value = 0;
}

// 계산기 입력 처리 함수
function calcInput(value) {
    // 숫자를 입력하기 전에 결과 출력창의 값이 0 일 때, 결과 출력창을 빈 값으로 채워 넣어 초기화
    if (calculator['result'].value == 0) {
        calculator['result'].value = '';
    }
    // 입력 값을 결과 출력창에 출력
    calculator['result'].value += value;
}

// 계산 결과 처리 함수
function calcOutput() {
    var result = document.forms['cal']['result'];
    var calcResult = eval(result.value);
    // 결과 창에 표시
    calculator['result'].value = calcResult;
}

// 이벤트 핸들러
// -----------------------
// 숫자 및 사칙 연산 버튼
// 문서 내 모든 input 요소에 클릭 이벤트 처리를 위한 이벤트 핸들러 적용을 위해 반복문 실행
for (var i = 0; i < input.length; i++) {
    // 숫자와 사칙 연산자만 입력 처리
    if (input[i].value != '=' && input[i].value != 'clear') {
        input[i].onclick = function () {
            calcInput(this.value);
        }
    }
}

// 초기화 버튼
clear_btn.onclick = function() {
    clear();
}

//결과 버튼
result_btn.onclick = function() {
    try {
        calcOutput();
    }
    catch (err) {
        let result = calculator['result'];
        result.value = '입력 오류';
    }
}
