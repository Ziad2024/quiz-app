const questions = [
    {
        question: "4+4?",
        answers: [
            { text: "5", correct: false },
            { text: "2", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false }
        ]
    },
    {
        question: "5+4?",
        answers: [
            { text: "5", correct: false },
            { text: "2", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: true }
        ]
    },
    {
        question: "4+1?",
        answers: [
            { text: "5", correct: true },
            { text: "2", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: false }
        ]
    }
];

let currentIndex = 0;
let score = 0;

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers-btn");
const nextButton = document.querySelector(".next-btn");

function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    resetState();
    showQuestion();
}

function showQuestion() {    
    questionElement.innerHTML = `${currentIndex + 1}. ${questions[currentIndex].question}`;
    
    questions[currentIndex].answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.innerHTML = answer.text;
        answersElement.appendChild(btn);
        
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }

        btn.addEventListener("click", (e) => {
            selectAnswer(e.target, answer.correct);
        });
    });
}

function selectAnswer(button, correct) {
    if (correct) {
        ++score;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
    ++currentIndex;
    nextButton.style.display = "block";

    Array.from(answersElement.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

}

function resetState() {
    nextButton.style.display = "none";
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function handle() {
    resetState();

    if (currentIndex < questions.length) {
        showQuestion();
        console.log(questions.length)
    } else {
        console.log(currentIndex)
        questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";

        nextButton.addEventListener("click", () => {

                startQuiz();
        });
    }
}

nextButton.addEventListener("click", () => {
    
        handle();
});

startQuiz();
