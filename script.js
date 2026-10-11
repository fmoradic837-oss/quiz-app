const questions = [
  { question: "Which language adds styling to a web page?", answers: ["HTML", "CSS", "SQL", "Python"], correct: 1 },
  { question: "Which keyword declares a block-scoped variable that can be reassigned?", answers: ["const", "let", "fixed", "define"], correct: 1 },
  { question: "Which method selects an element using a CSS selector?", answers: ["querySelector()", "selectCSS()", "getStyle()", "findElement()"], correct: 0 },
  { question: "Which event is commonly used when a button is clicked?", answers: ["changeText", "press", "click", "submitPage"], correct: 2 },
  { question: "Where can a browser store small key/value data between visits?", answers: ["localStorage", "console.log", "querySelector", "CSS"], correct: 0 }
];

const progress = document.querySelector("#progress");
const scoreDisplay = document.querySelector("#score");
const progressFill = document.querySelector("#progress-fill");
const questionDisplay = document.querySelector("#question");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next");

let questionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const currentQuestion = questions[questionIndex];
  answered = false;
  progress.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  progressFill.style.width = `${(questionIndex / questions.length) * 100}%`;
  questionDisplay.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = questionIndex === questions.length - 1 ? "See results" : "Next question";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.append(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const correctIndex = questions[questionIndex].correct;
  const buttons = answersContainer.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
    if (index === selectedIndex && index !== correctIndex) button.classList.add("wrong");
  });

  if (selectedIndex === correctIndex) {
    score += 1;
    feedback.textContent = "Correct! Nice work.";
  } else {
    feedback.textContent = `Not quite. Correct answer: ${questions[questionIndex].answers[correctIndex]}`;
  }
  scoreDisplay.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  questionIndex += 1;
  if (questionIndex < questions.length) {
    renderQuestion();
    return;
  }

  progress.textContent = "Quiz complete";
  progressFill.style.width = "100%";
  questionDisplay.textContent = `You scored ${score} out of ${questions.length}!`;
  answersContainer.innerHTML = "";
  feedback.textContent = score === questions.length ? "Perfect score — excellent!" : "Try again to improve your score.";
  nextButton.textContent = "Restart quiz";
  nextButton.disabled = false;
  nextButton.onclick = () => {
    questionIndex = 0;
    score = 0;
    nextButton.onclick = null;
    renderQuestion();
  };
});

renderQuestion();
