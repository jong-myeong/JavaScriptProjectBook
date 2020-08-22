$(function () {
    // 문제 객체
    function Question(text, choice, answer) {
        this.text = text;
        this.choice = choice;
        this.answer = answer;
    }

    // 퀴즈 객체
    function Quiz(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    // 정답 확인 메서드
    Quiz.prototype.correctAnswer = function (inputAnswer) {
        return inputAnswer == this.questions[this.questionIndex].answer;
    }

    /* -------------------------------------------------------------------------------- */
    // 문제 데이터
    var questions = [
        new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
        new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
        new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
        new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
    ];

    // 퀴즈 객체 생성
    var quiz = new Quiz(questions);

    /* -------------------------------------------------------------------------------- */
    // 문제 출력 함수
    function updateQuiz() {
        var $question = $('#question');
        var index = quiz.questionIndex + 1;
        $question.html(`문제${index}) ${quiz.questions[quiz.questionIndex].text}`);

        // 선택 항목 출력
        for (var i = 0; i < 4; i++) {
            var $choice = $('.btn').eq(i);
            $choice.html(quiz.questions[quiz.questionIndex].choice[i]);
        }

        progress();
    }

    // 문제 진행 정보 표시
    function progress() {
        var progress = $('#progress');
        progress.html(`문제 ${quiz.questionIndex+1} / ${quiz.questions.length}`);
    }

    /* -------------------------------------------------------------------------------- */
    // 결과 표시
    function result() {
        var $quiz = $('#quiz'); // 퀴즈 박스 컨테이너

        // 백분율 점수 계산
        var per = parseInt((quiz.score * 100 / quiz.questions.length));

        // 표시할 텍스트 정보와 변수
        var txt = `<h1>결과</h1>
        <h2 id = "score">당신의 점수 : ${quiz.score}/${quiz.questions.length}<br><br>
        ${per}점</h2>`;

        $quiz.html(txt); // 결과 텍스트 출력

        // 점수별 결과 텍스트 출력
        if (per < 60) {
            txt += `<h2 style="color:red">더 분발하세요</h2>`;
            $quiz.html(txt);
        } else if (per >= 60 && per < 80) {
            txt += `<h2 style="color:red">무난한 점수네요</h2>`;
            $quiz.html(txt);
        } else if (per >= 80) {
            txt += `<h2 style="color:red">훌륭합니다</h2>`;
            $quiz.html(txt);
        }
    }

    /* -------------------------------------------------------------------------------- */
    // 입력 및 정답 확인
    $('.btn').click(function () {
        var $answer = $(this).text();

        if (quiz.correctAnswer($answer)) {
            alert('정답입니다!');
            quiz.score++;
        } else {
            alert('틀렸습니다!');
        }

        if (quiz.questionIndex < quiz.questions.length - 1) {
            quiz.questionIndex++;
            updateQuiz();
        } else {
            result()
        }
    });

    updateQuiz();

});