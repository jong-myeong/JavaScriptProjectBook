// calendar 함수
function calendar(new_year, new_month) {

    // 특정 연월을 시작일부터 조회(year, month, date)
    var d = new Date(new_year, new_month - 1, 1),
        // 월별 일수 구하기
        d_length = 32 - new Date(new_year, new_month, 32).getDate(),
        year = d.getFullYear(),
        month = d.getMonth(),
        date = d.getDate(),
        day = d.getDay();
    
    // caption 영역 날짜 표시 객체
    var $caption_year = $('.year'),
        $caption_month = document.querySelector('.month');
    
    // calendar에 날짜 표시 객체
    var $start_day = $('tr td');
    
    // 테이블 초기화
    $start_day.each(function(i) {
        $(this).html('&nbsp');
    });
    
    // 한 달 치 날짜를 테이블에 시작 요일부터 순서대로 표시
    for(var i = day; i < day + d_length; i++){
        start_day[i].innerHTML = date;
        date++;
      }
    
    // caption 연도, 월 표시
    $caption_year.html(year);
    $caption_month.html(month + 1);
    }
    
    // 메인 처리문 - 익명 함수로 정의하고 함수를 바로 실행
    (function() {
        var $prev = $('prev'),
            $next = $('next'),
            year = new Date().getFullYear(),
            month = new Date().getMonth() + 1;
    
        calendar(year, month);
    
        // 이전 달, 다음 달 이벤트 핸들러
        $prev.click = function() {
            calendar(year, --month);
        };
        $next.click = function() {
            calendar(year, ++month);
        };
    })();