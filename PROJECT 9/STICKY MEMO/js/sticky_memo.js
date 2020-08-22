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
        save : function(currentMemo) {
            var txt = currentMemo.val();           // 작성 중인 글

            // 작성 중인 글이 있으면 저장
            if (txt !== '') {
                var key = prompt('저장할 파일명?', '');
                localStorage.setItem(key, txt);
            }
        },

        // 메모 목록 및 읽기 메서드
        get : function listStorage(currentMemo) {
            var storageLength = localStorage.length;           // 총 스토리지 길이
            var delIcon = '<i class="fa fa-trash"></i>';       // 삭제 아이콘

            currentMemo.find('ol').empty();        // 목록 초기화
            currentMemo.toggleClass('active');     // 목록 토글

            // 현재 메모장(current_memo)의 사이드바에 파일 목록 표시
            for (var i = 0; i < storageLength; i++) {
                var key = localStorage.key(i);
                currentMemo.find('ol').append(`<li>${key}${delIcon}</li>`); 
            }

            // 목록을 클릭 시 메모 읽어 오기
            currentMemo.find('li').click(function() {
                var txtTitle = $(this).text();             // 목록의 글 제목 읽음
                var txt = localStorage.getItem(txtTitle);
                currentMemo.toggleClass('acitve');         // 목록창 닫기
                currentMemo.prev('.txt').val(txt);         // 내용 표시
            });

            // 목록 삭제 버튼
            currentMemo.find('li > i').click(function() {
                var key = $(this).parent().text();      // 목록의 제목(key)을 읽음
                var delCheck = confirm('해당 메모를 삭제할까요?');
                if (delCheck) {
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
        var currentMemo = $(this).parent().siblings('.txt');       // 글 영역 선택
        Sticky.save(currentMemo);
    });

    // 메모장 목록 버튼
    $('#sticky_wrap').on('click', '.get', function() {
        var currentMemo = $(this).parents('.top_nav').siblings('.side_nav');
        Sticky.get(currentMemo);
    });

    // 메모장 닫기 버튼
    $('#sticky_wrap').on('click', '.del', function() {
        var currentMemo = $(this).parents('.sticky').remove();     // 메모장 객체 제거
    });

    /* ------------------------------------------------------------ */
    // 마우스가 메모장 상단에 위치하면 드래그 활성화
    $('#sticky_wrap').on('mouseover', '.top_nav', function() {
        $(this).parent().draggable();
    });

    // 터치 입력
    $('#sticky_wrap').on('touchstart mousedown', '.sticky', function() {
        $('.sticky').css('zIndex', '0');
        $(this).css('zIndex', '99');        // 드래그 시 메모장 표시 우선 순위 결정
    });

    $('#sticky_wrap').on('touchmove', '.top_nav', function(e) {
        var $sticky = $(this).parent();             // 메모장 객체
        var event = e.originalEvent;                // 자바스크립트 이벤트로 접근
        var touchobj = event.changedTouches[0];     // 터치 이벤트 객체

        // 현재 손가락 위치
        var x = parseInt(touchobj.clientX),
            y = parseInt(touchobj.clientY),
            ex = x - 125,
            ey = y - 16;

        // 메모장 위치 지정
        $sticky.css('left', `${ex}px`);
        $sticky.css('top', `${ey}px`);
    });

});