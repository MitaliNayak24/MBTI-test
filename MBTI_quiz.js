// Questions array with correct scoring values
const questions = [
  {
    text: "You’re more energized by spending time alone than with groups.",
    options: [
      { answer: "Strongly agree", dimension: "EI", value: -2 },  // Introvert
      { answer: "Agree", dimension: "EI", value: -1 },
      { answer: "Disagree", dimension: "EI", value: 1 },       // Extravert
      { answer: "Strongly disagree", dimension: "EI", value: 2 }
    ]
  },
  {
    text: "You focus on real possibilities rather than abstract theories.",
    options: [
      { answer: "Strongly agree", dimension: "SN", value: 2 }, // Sensing
      { answer: "Agree", dimension: "SN", value: 1 },
      { answer: "Disagree", dimension: "SN", value: -1 },      // Intuition
      { answer: "Strongly disagree", dimension: "SN", value: -2 }
    ]
  },
  {
    text: "You make decisions based on logic, not emotions.",
    options: [
      { answer: "Strongly agree", dimension: "TF", value: 2 }, // Thinking
      { answer: "Agree", dimension: "TF", value: 1 },
      { answer: "Disagree", dimension: "TF", value: -1 },      // Feeling
      { answer: "Strongly disagree", dimension: "TF", value: -2 }
    ]
  },
  {
    text: "You prefer a planned, organized life to a spontaneous one.",
    options: [
      { answer: "Strongly agree", dimension: "JP", value: 2 }, // Judging
      { answer: "Agree", dimension: "JP", value: 1 },
      { answer: "Disagree", dimension: "JP", value: -1 },      // Perceiving
      { answer: "Strongly disagree", dimension: "JP", value: -2 }
    ]
  }
];

// MBTI type messages
const messages = {
  INTJ: "You are a visionary strategist who sees patterns and possibilities. You thrive on intellectual depth and future-oriented thinking.",
  ENFP: "You’re an inspiring free spirit with a curious mind and an open heart. Your energy uplifts others and helps them believe in possibilities.",
  ISFJ: "You are a quiet protector, deeply caring and committed to the well‑being of others. Your strength lies in empathy and consistency.",
  ESTP: "You’re a bold doer — living in the moment, thriving on action and excitement. You see opportunity where others see risk."
};

// Fallback types mapping
messages.ENTJ = messages.INTJ;
messages.INTP = messages.INTJ;
messages.INFJ = messages.ISFJ;
messages.ESFP = messages.ENFP;
messages.ISTJ = messages.ISFJ;
messages.ESTJ = messages.ESTP;
messages.ENFJ = messages.ENFP;
messages.ISFP = messages.ISFJ;
messages.ISTP = messages.ESTP;
messages.ESFJ = messages.ISFJ;
messages.ENFP = messages.ENFP;
messages.INFP = messages.ENFP;

// Initialize scores for each MBTI dimension
let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
let currentIndex = 0;
const total = questions.length;

// Get DOM elements
const welcome = document.getElementById("welcome-screen");
const quiz = document.getElementById("quiz-screen");
const result = document.getElementById("result-screen");
const qText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const currentQ = document.getElementById("current");
const totalQ = document.getElementById("total");
const nextBtn = document.getElementById("next-btn");
const typeSpan = document.getElementById("mbti-type");
const msgP = document.getElementById("mbti-message");

totalQ.textContent = total;

// Start button click event
document.getElementById("start-btn").addEventListener("click", () => {
  welcome.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

// Restart button reloads page
document.getElementById("restart-btn").addEventListener("click", () => {
  window.location.reload();
});

// Show question and options
function showQuestion() {
  const q = questions[currentIndex];
  currentQ.textContent = currentIndex + 1;
  qText.textContent = q.text;
  answersDiv.innerHTML = "";  // Clear old answers

  // Create buttons for each answer
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt.answer;
    btn.className = "answer-btn";
    btn.onclick = () => selectAnswer(idx);
    answersDiv.appendChild(btn);
  });

  nextBtn.disabled = true;  // Disable next button until answer selected
}

// When an answer is selected
function selectAnswer(choiceIdx) {
  // Remove 'selected' from all buttons
  [...answersDiv.children].forEach(btn => btn.classList.remove("selected"));

  // Highlight the clicked button
  const btn = answersDiv.children[choiceIdx];
  btn.classList.add("selected");
  nextBtn.disabled = false;

  // Update score for chosen option
  const opt = questions[currentIndex].options[choiceIdx];
  scores[opt.dimension] += opt.value;
}

// Next button click handler
nextBtn.addEventListener("click", () => {
  if (currentIndex < total - 1) {
    currentIndex++;
    showQuestion();
  } else {
    calculateResult();
  }
});

// Calculate final MBTI result based on scores
function calculateResult() {
  const resultType =
    (scores.EI > 0 ? "E" : "I") +
    (scores.SN > 0 ? "S" : "N") +
    (scores.TF > 0 ? "T" : "F") +
    (scores.JP > 0 ? "J" : "P");

  showResult(resultType);
}

// Display result screen and message
function showResult(type) {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  typeSpan.textContent = type;
  msgP.textContent = messages[type] || "Your type is unique!";
}
