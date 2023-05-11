const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const correctIncorrect = document.getElementById("correct-incorrect");
const restartButton = document.getElementById("restart");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const quizData = JSON.parse(localStorage.getItem("quizData")) || [
  {
    question: "1) Karadeniz Teknik Üniversitesi hangi ildedir?",
    options: ["Ankara", "İstanbul", "Trabzon"],
    correctAnswer: 2,
  },
  {
    question: "2) Web Programlama dersini kim vermektedir?",
    options: ["Öğr. Gör. Dr. Zafer Yavuz", "Doç. Dr. Hüseyin Pehlivan", "Doç. Dr. Bekir Dizdaroğlu"],
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

function renderQuestion() {
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
  score = 0; // Skoru sıfırla
  const scorePerQuestion = 100 / quizData.length;

  quizData.forEach((questionData, index) => {
    if (userAnswers[index] === questionData.correctAnswer) {
      score += scorePerQuestion;
    }
  });

  document.getElementById("quiz-container").style.display = "none";
  result.style.display = "block";
  scoreElement.textContent = score;

  correctIncorrect.innerHTML = quizData
    .map(
      (questionData, index) =>
        `<div>${index + 1}. Soru: ${
          userAnswers[index] === questionData.correctAnswer ? "Doğru" : "Yanlış"
        }</div>`
    )
    .join("");
}

restartButton.addEventListener("click", () => {
  document.getElementById("quiz-container").style.display = "block";
  result.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  renderQuestion();
});
const timerElement = document.getElementById("timer");
let timerInterval;
let timeLeft = 300; // 5 dakika x 60 saniye = 300 saniye
let started = false;

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

function stopTimer() {
  clearInterval(timerInterval);
}

optionsContainer.addEventListener("change", () => {
  if (!started) {
    started = true;
    startTimer();
  }
});

nextButton.addEventListener("click", () => {
  // ...
  if (currentQuestionIndex >= quizData.length) {
    stopTimer();
    showResult();
  } else {
    renderQuestion();
  }
});

restartButton.addEventListener("click", () => {
  // ...
  timeLeft = 300;
  timerElement.textContent = "05:00";
  started = false;
});


renderQuestion();
