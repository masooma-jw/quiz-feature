
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + expires + "; path=/";
}


function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
  }
  return null;
}

let currentUserData = {};

function saveUserData() {
  localStorage.setItem(currentUserData.email, JSON.stringify(currentUserData));
}

function saveUserDataCookies() {
  setCookie("userData", currentUserData);
}

function loadUserData() {
  const sessionStorageData = sessionStorage.getItem("userData");
  const cookieData = getCookie("userData");
  const localStorageData = localStorage.getItem("userData");

  if (sessionStorageData) {
    currentUserData = JSON.parse(sessionStorageData);
  } else if (cookieData) {
    currentUserData = cookieData;
  } else if (localStorageData) {
    currentUserData = JSON.parse(localStorageData);
  } else {
  
    showModal();
    return;
  }

  if (currentUserData.currentQuestion !== undefined) {
    
    userAnswers = currentUserData.userAnswers || [];
    if (currentUserData.currentQuestion >= questions.length) {
      showScorePage();
    } else {
      showQuiz();
      displayQuestion();
    }
    return;
  }


  showModal();
}


window.addEventListener("load", () => {
  loadUserData();
});

window.addEventListener("beforeunload", () => {
  if (currentUserData.currentQuestion !== undefined) {
    sessionStorage.setItem("userData", JSON.stringify(currentUserData));
  }
});


let questions = [
  {
    question: "When was javascript invented?",
    choices: ["1995", "1994", "1996", "None of above"],
    answer: 0,
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "HyperLoop Machine Language",
      "None",
    ],
    answer: 0,
  },
  {
    question: "Which is the full form of CSS?",
    choices: [
      "Central style sheets",
      "Cascading style sheets",
      "Central simple sheets",
      "None",
    ],
    answer: 1,
  },
  {
    question: "What language runs in a web browser?",
    choices: ["Java", "C", "C++", "Javascript"],
    answer: 3,
  },
];

const modal = document.getElementById("modal");
const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const usernameDisplay = document.getElementById("usernameDisplay");
let previous = document.getElementById("previous");
let quiz = document.getElementById("quiz");
let scorePage = document.getElementById("scorePage");





function showModal(){
  modal.style.display="inline-flex";
  quiz.style.display="none";
  scorePage.style.display="none"
}
function showQuiz(){
  modal.style.display="none";
  quiz.style.display="block";
  scorePage.style.display="none"
}

userForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("usernameInput").value;

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim(); 
  const emailPattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email");
    emailInput.value = ""; 
    emailInput.focus();
    return; 
  }

  if (localStorage.length >= 10) {
    alert("Session timeout. Maximum number of users logged in.");
    localStorage.clear();
    location.reload();
  }


  const storedUserData = JSON.parse(localStorage.getItem(email));
  if (storedUserData) {
    currentUserData = storedUserData;
    showScorePage();
    return;
  } else {
    currentUserData = {
      username,
      email,
      score: 0,
      currentQuestion: 0
    };
    localStorage.setItem(email, JSON.stringify(currentUserData));
    saveUserData();
    saveUserDataCookies();
  }

  usernameDisplay.textContent = username;
  showQuiz();
  // shuffleQuestions();
  displayQuestion();
});

const submit = document.getElementById("submit");

let userAnswers = currentUserData.userAnswers || [];

function displayQuestion() {
  if (currentUserData.currentQuestion === undefined) {
    currentUserData.currentQuestion = 0;
    currentUserData.userAnswers = [];
    saveUserData();
  }
  let questionElement = document.getElementById("question");
  let choiceElements = document.getElementsByTagName("label");

  questionElement.textContent =
    questions[currentUserData.currentQuestion].question;

  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent =
      questions[currentUserData.currentQuestion].choices[i];
  }

  let previousAnswer = userAnswers[currentUserData.currentQuestion];

  if (previousAnswer !== undefined) {
    let choices = document.getElementsByName("choice");
    choices[previousAnswer].checked = true;
  }

  if (currentUserData.currentQuestion == 0) {
    previous.style.display = "none";
  } else {
    previous.style.display = "inline-flex";
  }
}

function handleSelected() {

  let choices = document.getElementsByName("choice");
  let selectedChoice = -1;

  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      selectedChoice = parseInt(choices[i].value);
      for (let j = 0; j < choices.length; j++) {
        choices[j].checked = false;
      }
      break;
    }
  }

  userAnswers[currentUserData.currentQuestion] = selectedChoice;
  currentUserData.userAnswers = userAnswers;
  saveUserData();
  saveUserDataCookies();

  if (selectedChoice == -1) {
    alert("Please select option!!!");
    return;
  }

 
  currentUserData.currentQuestion++;

  if (currentUserData.currentQuestion === questions.length) {
    calculateScore();
    showScorePage();
    
  } else {
    displayQuestion();
  }
}

submit.addEventListener("click", handleSelected);

function showScorePage() {
  modal.style.display = "none";
  quiz.style.display = "none";
  scorePage.style.display = "block";

  const allUserData = Object.values(localStorage);

  const scoreTableBody = document.getElementById("scoreTableBody");
  scoreTableBody.innerHTML = "";
  allUserData.forEach((userDataJSON) => {
    const userData = JSON.parse(userDataJSON);
    const row = document.createElement("tr");

    const usernameCell = document.createElement("td");
    usernameCell.textContent = userData.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = userData.email;
    row.appendChild(emailCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = userData.score;
    row.appendChild(scoreCell);

    scoreTableBody.appendChild(row);
  });

}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  currentUserData.score = score;
  saveUserData();
  saveUserDataCookies();
}

function PreviousQuestion() {
  currentUserData.currentQuestion--;
  saveUserData();
  saveUserDataCookies();
  displayQuestion();
}

previous.addEventListener("click", PreviousQuestion);

function restartQuiz() {
  if (localStorage.length >= 10) {
    alert("Session timeout. Maximum number of users logged in.");
    localStorage.clear();
    window.close();
  }

  document.getElementById("userForm").reset();
  currentUserData = {};
  userAnswers = [];
  
  showModal()
}

document.getElementById("restartButton").addEventListener("click", restartQuiz);

// function shuffleQuestions() {
//     for (let i = questions.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         let temp = questions[i];
//         questions[i] = questions[j];
//         questions[j] = temp;
//     }
// }
