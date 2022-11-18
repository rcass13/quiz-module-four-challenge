const TEST_TIME = 60;



$(document).ready(function () {



    var timerEl = document.getElementById("timer");
    timerEl.innerHTML = "Time: " + 60;
    var counter = 0;
    var score = 0;



    //intro section
    var introSection = document.getElementById("intro");
    var endSection = document.getElementById("end");
    var scoreElement = document.getElementById("score");
    var scoreData = document.getElementById("scoreData");


    // quiz

    var quizQuestions = [
        {
            question: "What is the styling coding language?",
            answer1: "HTML",
            answer2: "CSS",
            answer3: "JSON",
            answer4: "JavaScript",
            correctAnswer: "answer2-is-correct"
        },
        {
            question: "How many times can you use an id?",
            answer1: "As many as you want",
            answer2: "Three",
            answer3: "One",
            answer4: "Ten",
            correctAnswer: "answer3-is-correct"
        }, {
            question: "What is not a valid color?",
            answer1: "rgb(40,200,60,.5",
            answer2: "red",
            answer3: "#E76F51",
            answer4: "rgb",
            correctAnswer: "answer4-is-correct"
        }, {
            question: "What would you use to create a click event?",
            answer1: "addEventListener",
            answer2: "getElementById",
            answer3: "event",
            answer4: "function",
            correctAnswer: "answer1-is-correct"
        }
    ]

    var currentQuestion = 0;
    var result;


    var startButton = document.getElementById("start");
    var quiz = document.getElementById("quiz");
    quiz.style.display = "none";
    timerEl.style.display = "none";
    endSection.style.display = "none";
    scoreData.style.display = "none";
    counter = 0;



    startButton.addEventListener("click", function () {
        console.log("im clicking the start button");
        startTimer();
        introSection.style.display = "none";
        quiz.style.display = "block";
        timerEl.style.display = "block";
        endSection.style.display = "none";
    })

    // getting my HTML elements
    var questionElement = $("#question")[0];

    var answer1Element = $("#answer1");
    var answer2Element = $("#answer2");
    var answer3Element = $("#answer3");
    var answer4Element = $("#answer4");

    var resultElement = $("#result");


    //on click event run function clickQuestion
    answer1Element.on("click", (event) => clickQuestion("answer1-is-correct"));
    answer2Element.on("click", (event) => clickQuestion("answer2-is-correct"));
    answer3Element.on("click", (event) => clickQuestion("answer3-is-correct"));
    answer4Element.on("click", (event) => clickQuestion("answer4-is-correct"));

    console.log("answer one is working", answer1Element);
    console.log("question one is working", questionElement);

    //defining the timer function
    function startTimer() {
        timerEl.innerHTML = "Time: " + TEST_TIME
        var timedOut = setInterval(function () {
            console.warn('Im running...');
            if (counter < TEST_TIME) {
                counter++;
                timerEl.innerHTML = "Time: " + (TEST_TIME - counter)
            } else {
                quiz.style.display = "none";
                endSection.style.display = "block";
                timerEl.style.display = "none";
                clearInterval(timedOut);
            }
        }, 1000);
        console.log("timedOut", timedOut)
    }

    //defining the fuction that is rendering all componants of current question
    function renderQuestion() {
        questionElement.innerText = quizQuestions[currentQuestion].question;
        answer1Element[0].innerText = quizQuestions[currentQuestion].answer1;
        answer2Element[0].innerText = quizQuestions[currentQuestion].answer2;
        answer3Element[0].innerText = quizQuestions[currentQuestion].answer3;
        answer4Element[0].innerText = quizQuestions[currentQuestion].answer4;

    }

    //defining the fuction that tells if question was right or wrong
    function renderResult() {
        if (result) {
            resultElement[0].innerText = "Correct!";
        } else if (result === false) {
            resultElement[0].innerText = "Wrong!";
        } else {
            resultElement[0].innerText = "";
        }
    }

    //this is the function that handles the user click/guess (rendering correct/wromg, adding points/deduction seconds, rendering next question)
    function clickQuestion(clickedAnswer) {
        if (quizQuestions[currentQuestion].correctAnswer === clickedAnswer) {
            console.log("you're right!")
            result = true;
            score = score + 25;
            scoreElement.innerText = score;
            console.log(score);
        } else {
            console.log("you're not right :(")
            result = false;
            counter = (counter + 15);
        }
        renderResult();

        if (currentQuestion <= 2) {
            currentQuestion++;
            renderQuestion();
        } else {
            quiz.style.display = "none";
            endSection.style.display = "block";

            timerEl.style.display = "none";
            clearInterval(timedOut);
            console.log("the inverval has stopped", timedOut)
        }
    }

    // render first question
    renderQuestion();

    //
    // if (counter < 1) {
    //     renderQuestion();
    // } else if (currentQuestion <= 3) {
    //     endSection;
    //     clearInterval(timedOut);
    // } else {
    //     clearInterval(timedOut);
    // }

    // Create a function to handle the form submission event that captures the form's `<input>` value and saves it to local storage. 
    function submitInitials(e) {
        e.preventDefault();
        var initials = document.getElementById("initials");
        var initialsInput = document.getElementById("initialsInput")
        console.log("initialsInput", initialsInput.value);
        console.log("event", e)
        // initials.text(inputValue);
        // console.log(inputValue.val());
        // initials.appendChild(inputValue);
        console.log("initials", initials)

        var initialString = initialsInput.value;
        var retrievedObject = JSON.parse(localStorage.getItem('highScores'));
        var storedItems = retrievedObject;

        if(storedItems === null) {
            storedItems = {};
        }

        storedItems[initialString] = score;

        // Put the object into storage
        localStorage.setItem('highScores', JSON.stringify(storedItems));
    }

    var submitBtn = document.getElementById("submitInitials");
    submitBtn.addEventListener('click', submitInitials);
   
   var highScores = document.getElementById("highScores");
 
    // function showHighScores(e) {
    //     e.preventDefault();
    //     highScores.style.display = "block";
    //     console.log("highScores", retrievedObject)
    //     retrievedObject=text;
    //     // localStorage.getItem(initialString, JSON.parse(score));
    //     console.log("retrievedObject", retrievedObject);
    //     // console.log("initialString", initialString, "score", score)
    //     // highScores.text(initialString, score);
    //     // scoreData.appendChild(initialString, score);
    // }

    function showHighScores(e) {
        e.preventDefault();
        scoreData.style.display = "block";
        var retrievedObject = JSON.parse(localStorage.getItem('highScores'));
        console.log("highScores", retrievedObject);

        let retrievedKeys = Object.keys(retrievedObject);

        for (let index = 0; index < retrievedKeys.length; index++) {
            const element = retrievedKeys[index];
            console.log("element", element, "value", retrievedObject[element]);

            retrievedObject[element]

            var initialElement = document.getElementById("initial-" + index.toString());
            var scoreElement = document.getElementById("score-" + index.toString());

            initialElement.innerText = element;
            scoreElement.innerText = retrievedObject[element];
        }

        // var scoreArray = JSON.parse(localStorage.getItem("persons"));
        // document.getElementById("scoreData").appendChild;
        // scoreArray.forEach(retrievedObject)
    }

    var highScoresBtn = document.getElementById("showHighScores");
    highScoresBtn.addEventListener('click', showHighScores);

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
});
