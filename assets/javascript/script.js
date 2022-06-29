
var startQuizBtn = document.getElementById("start-quiz");
var starQuizSection = document.getElementById("start-section");
var scoreSection = document.getElementById('score-card');

var quizsection = document.getElementById("quiz-section");
var questionPlaceHolder = document.getElementById('question');
var answersPlaceHolder = document.getElementById('answer');
var currentQuestion = 0;
var points = 0;
var timerInterval = null;

var questions = [

    {
        question: 'Which of the following tags should <meta> tags be enclosed in?',
        answer1: "title tag",
        answer2: "head tag",
        answer3: "body tag",
        answer4: "p tag",
        correctAnswer: "answer2"
    },
    {
        question: 'Which element will create an unordered list ?',
        answer1: "ol",
        answer2: "dl",
        answer3: "ul",
        answer4: "none of the above",
        correctAnswer: "answer3"
    },
    {
        question: 'Title, meta and link elements are all located inside what element ?',
        answer1: "the body element",
        answer2: "the foot element",
        answer3: "the div element",
        answer4: "the head element",
        correctAnswer: "answer4"
    }

];

startQuizBtn.addEventListener("click", function () {
    startQuiz();
});

function startQuiz() {

    starQuizSection.classList.add("hide");
    quizsection.classList.remove("hide")

    var question = questions[currentQuestion];

    questionPlaceHolder.textContent = question.question;
    answersPlaceHolder.innerHTML = `
        <li onClick="submitAnswer(${currentQuestion},'answer1')">${question.answer1}</li>
        <li onClick="submitAnswer(${currentQuestion},'answer2')">${question.answer2}</li>
        <li onClick="submitAnswer(${currentQuestion},'answer3')">${question.answer3}</li>
        <li onClick="submitAnswer(${currentQuestion},'answer4')">${question.answer4}</li>
    `;

    startTimer();
}

function submitAnswer(questionIndex, answer) {

    var correctAnswer = questions[questionIndex].correctAnswer;


    if (answer == correctAnswer) {
        points++;
    }

    moveToNextQuestion();

}

function moveToNextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showScoreCard();
    }
    else {
        var question = questions[currentQuestion];

        questionPlaceHolder.textContent = question.question;
        answersPlaceHolder.innerHTML = `
            <li onClick="submitAnswer(${currentQuestion},'answer1')">${question.answer1}</li>
            <li onClick="submitAnswer(${currentQuestion},'answer2')">${question.answer2}</li>
            <li onClick="submitAnswer(${currentQuestion},'answer3')">${question.answer3}</li>
            <li onClick="submitAnswer(${currentQuestion},'answer4')">${question.answer4}</li>
        `;
    }

}

function showScoreCard() {
    starQuizSection.classList.add("hide");
    quizsection.classList.add("hide");
    scoreSection.classList.remove('hide');

    document.getElementById('total-questions').textContent = questions.length;
    document.getElementById('correct-answers').textContent = points;
    document.getElementById('wrong-answers').textContent = questions.length - points;
    document.getElementById('total-points').textContent = points;



}

function playAgain() {

    points = 0;
    currentQuestion = 0;

    starQuizSection.classList.add("hide");
    quizsection.classList.remove("hide");
    scoreSection.classList.add('hide');
    document.getElementById('name').value = '';

    startQuiz();
}

function startTimer() {

    clearInterval(timerInterval);
    var currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (1 * 60 * 1000));
    var countDownDate = new Date(currentDate).getTime();


    timerInterval = setInterval(function () {


        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Time Over";
            showScoreCard();
        }
    }, 1000);

}

function saveIntitals() {
    var name = document.getElementById('name').value;

    var scoreCard = {
        name: name,
        totalQuestions: questions.length,
        correctAnswers: points,
        wrongAnswers: questions.length - points,
        points: points
    };

    var oldScoreCard = localStorage.getItem("quiz-score-card");

    if (oldScoreCard != null && oldScoreCard != undefined && oldScoreCard != '') {
        oldScoreCard = JSON.parse(oldScoreCard);

        oldScoreCard.push(scoreCard);
    }
    else {

        oldScoreCard = [];
        oldScoreCard.push(scoreCard);
    }



    var scoreCardString = JSON.stringify(oldScoreCard);

    localStorage.setItem('quiz-score-card', scoreCardString);

}

