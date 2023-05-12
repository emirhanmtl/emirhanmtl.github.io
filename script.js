const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const correctIncorrect = document.getElementById("correct-incorrect");
const restartButton = document.getElementById("restart");
const addQuestionButton = document.getElementById("add-question");
const editQuestionButton = document.getElementById("edit-question");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let started = false;
let timeLeft = 300;
let userAnswers = [];
let quizData = [
  {
    question: "1) Karadeniz Teknik Üniversitesi hangi ildedir?",
    options: ["Ankara", "İstanbul", "Trabzon"],
    correctAnswer: 2,
  },
  {
    question: "2) Cumhuriyet hangi yılda ilan edilmiştir?",
    options: ["1923", "1071", "1453"],
    correctAnswer: 0,
  },
  {
    question: "3) 10+10=?",
    options: ["11", "15", "20"],
    correctAnswer: 2,
  },
  {
    question: "4) Türkiye Cumhuriyetinin ilk Cumhurbaşkanı kimdir?",
    options: ["Mustafa Kemal Atatürk", "İsmet İnönü", "Doğu Perinçek"],
    correctAnswer: 0,
  },
  {
    question: "5) Uzungöl yapay mıdır?",
    options: ["Evet", "Hayır", "Ne yapay mı?"],
    correctAnswer: 2,
  },
  {
    question: "6) İstiklal Marşı' nın yazarı kimdir?",
    options: ["Mehmet Akif Ersoy", "Osman Zeki Üngör", "Dostoyevski"],
    correctAnswer: 0,
  },
  {
    question: "7) Kürk Mantolu Madonna, kimin eseridir?",
    options: ["Sabahattin Ali", "Yaşar Kemal", "Orhan Pamuk"],
    correctAnswer: 0,
  },
  {
    question: "8) Türkiye' nin en büyük yüzölçümüne sahip ili hangisidir?",
    options: ["Trabzon", "Ankara", "Konya"],
    correctAnswer: 2,
  },
  {
    question: "9) 2-2=?",
    options: ["0", "2", "4"],
    correctAnswer: 0,
  },
  {
    question: "10) Alternatif akım, kimin icadıdır?",
    options: ["Albert Einstein", "Nikola Tesla", "Thomas Edison"],
    correctAnswer: 1,
  },
];
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00";
      showResult();
    }
  }, 1000);
}

let scorePerQuestion = 100 / quizData.length;

function renderQuestion() {
  if(currentQuestionIndex >= quizData.length || currentQuestionIndex < 0) {
    console.error("Invalid question index");
    return;
  };
  const questionData = quizData[currentQuestionIndex];
  questionElement.textContent = questionData.question;
  optionsContainer.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement("label");
    optionElement.innerHTML = `
      <input type="radio" name="option" value="${index}" ${
      userAnswers[currentQuestionIndex] === index ? "checked" : ""
    } />
      ${option}
    `;
    optionsContainer.appendChild(optionElement);
  });
}

nextButton.addEventListener("click", () => {
  const selectedOption = optionsContainer.querySelector("input[name='option']:checked");
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= quizData.length) {
    showResult();
  } else {
    renderQuestion();
  }
});

prevButton.addEventListener("click", () => {
  const selectedOption = optionsContainer.querySelector("input[name='option']:checked");
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
  }

  currentQuestionIndex--;
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = 0;
  }
  renderQuestion();
});

function showResult() {
  quizData.forEach((questionData, index) => {
    if (userAnswers[index] === questionData.correctAnswer) {
      score += scorePerQuestion;
    }
  });

  document.getElementById("quiz-container").style.display = "none";
  result.style.display = "block";
  scoreElement.textContent = Math.round(score);

  correctIncorrect.innerHTML = quizData
    .map(
      (questionData, index) =>
        `<div>${index + 1}. Soru: ${
          userAnswers[index] === questionData.correctAnswer ? "Doğru" : "Yanlış"
        }</div>`
    )
    .join("");

  score = 0; // Puanı sıfırla
}

restartButton.addEventListener("click", () => {
  document.getElementById("quiz-container").style.display = "block";
  result.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  renderQuestion();
});

addQuestionButton.addEventListener('click', () => {
  const newQuestion = prompt('Yeni soruyu giriniz:');
  const newOption1 = prompt('1. seçeneği giriniz:');
  const newOption2 = prompt('2. seçeneği giriniz:');
  const newOption3 = prompt('3. seçeneği giriniz:');
  const correctAnswer = parseInt(prompt('Doğru seçeneğin numarasını giriniz (1, 2 veya 3):')) - 1;

  const newQuestionObject = {
    question: newQuestion,
    options: [newOption1, newOption2, newOption3],
    correctAnswer: correctAnswer
}

quizData.push(newQuestionObject);

scorePerQuestion = 100 / quizData.length;

renderQuestion();
});

editQuestionButton.addEventListener('click', () => {
if(currentQuestionIndex >= quizData.length || currentQuestionIndex < 0) {
    console.error("Invalid question index");
    return;
  }
const editedQuestion = prompt('Soruyu düzenleyiniz:', quizData[currentQuestionIndex].question);
const editedOption1 = prompt('1. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[0]);
const editedOption2 = prompt('2. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[1]);
const editedOption3 = prompt('3. seçeneği düzenleyiniz:', quizData[currentQuestionIndex].options[2]);
const correctAnswer = parseInt(prompt('Doğru seçeneğin numarasını giriniz (1, 2 veya 3):')) - 1;

quizData[currentQuestionIndex] = {
    question: editedQuestion,
    options: [editedOption1, editedOption2, editedOption3],
    correctAnswer: correctAnswer
}

scorePerQuestion = 100 / quizData.length;

renderQuestion();
});

renderQuestion();

optionsContainer.addEventListener("change", () => {
  if (!started) {
    started = true;
    startTimer();
  }
});
