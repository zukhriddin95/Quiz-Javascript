const startBtn = document.querySelector(".start-btn");
const popurInfo = document.querySelector(".popur-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const TryAgain = document.querySelector(".tryAgain-btn");
const GoToHome = document.querySelector(".goHome-btn");
const nextBtn = document.querySelector(".next-btn");

startBtn.onclick = () => {
  popurInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popurInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popurInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestions(0);
  questionCounter(1);
  headerScore();
};

TryAgain.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumber = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);

  headerScore();
};
GoToHome.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumber = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);
};

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);
    questionNumber++;
    questionCounter(questionNumber);
    nextBtn.classList.remove("active");
  } else {
    showResults();
  }
};

const optionList = document.querySelector(".option-list");
// getting questions and options

function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}.  ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  // if user has selected, disabled all options

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResults() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");

  scoreText.textContent = `Your score: ${userScore} out of ${questions.length}`;

  const CircularProgress = document.querySelector(".circular-progress");
  const ProgressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    ProgressValue.textContent = `${progressStartValue} %`;

    CircularProgress.style.background = `conic-gradient(#005646 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.2) 0deg)`;

    if (progressStartValue === progressEndValue) {
      clearInterval(progress);
    }
    console.log(progressStartValue);
  }, speed);
}