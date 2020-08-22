$(function() {
    // 메모장
    var sticky_html = 
    `
    <div class="sticky">
        <nav class="top_nav">
            <a href="#" class="add"><i class="fa fa-plus"></i></a>
            <a href="#" class="save"><i class="fa fa-floppy-o"></i></a>
            <div class="right">
                <a href="#" class="get"><i class="fa fa-list"></i></a>
                <a href="#" class="del"><i class="fa fa-times"></i></a>
            </div>
        </nav>
        <textarea name="txt" class="txt"></textarea>
        <nav class="side_nav"><ol></ol></nav>
    </div>
    `;

    /* ------------------------------------------------------------ */
    // 메모장 초기화
    $('#sticky_wrap').append(sticky_html);
    
    // 메모 객체
    var Sticky = {
        // 메모 추가 메서드
        add : function() {
            var win_width = $('#sticky_wrap').width() - 250,
                win_height = $('#sticky_wrap').height() - 300,
                // 랜덤으로 좌표를 지정
                x = Math.random() * win_width,
                y = Math.random() * win_height;

            $('#sticky_wrap').append(sticky_html);      // 메모장 추가
            var $new_sticky = $('.sticky').last();      // 새로 생성된 메모장 객체

            $new_sticky.css({
                left: `${parseInt(x)}px`,
                top: `${parseInt(y)}px`
            });
            $('.sticky').css('zIndex', '0');        // 메모장 레이어 초기화
            $new_sticky.css('zIndex', '99');        // 새 메모장을 상위 레이어로
        },

        // 메모 저장 메서드
        save : function(current_memo) {
            var idx = localStorage.length;          // 저장된 글 수
            var txt = current_memo.val();           // 작성 중인 글

            // 작성 중인 글이 있으면 저장
            if (txt !== '') {
                var key = prompt('저장할 파일명?', '');
                localStorage.setItem(key, txt);
            }
        },

        // 메모 목록 및 읽기 메서드
        get : function list_storage(current_memo) {
            var key;
            var l = localStorage.length;                        // 총 스토리지 길이
            var del_icon = `<i class="fa fa-trash"></i>`;       // 삭제 아이콘

            // empty 메서드 없애보기
            current_memo.find('ol').empty();        // 목록 초기화
            current_memo.toggleClass('active');     // 목록 토글

            // 현재 메모장(current_memo)의 사이드바에 파일 목록 표시
            for (var i = 0; i < l; i++) {
                // key를 함수에서 정의 안 하고 for에서 정의하면 어떻게 되는지 확인하기
                key = localStorage.key(i);
                current_memo.find('ol').append(`<li>${key}${del_icon}</li>`); 
            }

            // 목록을 클릭 시 메모 읽어 오기
            current_memo.find('li').click(function() {
                var getData = $(this).text();               // 목록의 글 제목 읽음
                var txt = localStorage.getItem(getData);
                current_memo.toggleClass('acitve');         // 목록창 닫기
                current_memo.prev('.txt').val(txt);         // 내용 표시
            });

            // 목록 삭제 버튼
            current_memo.find('li > i').click(function() {
                var key = $(this).parent().text();
                var ok = confirm('해당 메모를 삭제할까요?');
                if (ok) {
                    localStorage.removeItem(key);
                }
            });
        }
    };

    /* ------------------------------------------------------------ */
    // 메모장 추가 버튼
    $('#sticky_wrap').on('click', '.add', function() {
        Sticky.add();
    });

    // 메모장 저장 버튼
    $('#sticky_wrap').on('click', '.save', function() {
        var current_memo = $(this).parent().siblings('.txt');       // 글 영역 선택
        Sticky.save(current_memo);
    });

    // 메모장 목록 버튼
    $('#sticky_wrap').on('click', '.get', function() {
        var current_memo = $(this).parents('.top_nav').siblings('.side_nav');
        console.log($(this).parent('.top_nav'));
        Sticky.get(current_memo);
    });

    // 메모 닫기 버튼
    $('#sticky_wrap').on('click', '.del', function() {
        var current_memo = $(this).parents('.sticky').remove();     // 메모장 객체 제거
    });
})