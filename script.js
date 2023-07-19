

var questions = [
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

// -------------------modal------------------------->
const modal = document.getElementById("modal");
const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const usernameDisplay = document.getElementById("usernameDisplay");
let previous = document.getElementById("previous");



userForm.addEventListener("submit", function (event) {
  event.preventDefault();


  for(let i =0; i<localStorage.length; i++){
    let email = emailInput.value;
    if(email == localStorage.key(i)){
      let a = localStorage.getItem(email)
      quiz.innerHTML = `<h2>You answered ${a} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`;
    }
  }

  let username = usernameInput.value;
  let email = emailInput.value;
  // sessionStorage.setItem(email,username)
  usernameDisplay.textContent = username;
  modal.style.display = "none";
  container.style.display = "block";
});


const submit = document.getElementById("submit");

var currentQuestion = 0; // Tracks the current question
var score = 0; // Tracks the score
var userAnswers =[];

function displayQuestion() {
  var questionElement = document.getElementById("question");
  var choiceElements = document.getElementsByTagName("label"); 

  questionElement.textContent = questions[currentQuestion].question;
 

  for (var i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = questions[currentQuestion].choices[i];
  }

// Check if the user has answered this question previously
var previousAnswer = userAnswers[currentQuestion];
if (previousAnswer !== undefined) {
  var choices = document.getElementsByName("choice");
  choices[previousAnswer].checked = true;
}

  if (currentQuestion == 0) {
    previous.style.display = "none";
  } else {
    previous.style.display = "inline-flex";
  }
}


submit.addEventListener("click", () => {
  

   
  var choices = document.getElementsByName("choice");

  var selectedChoice = -1;

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      selectedChoice = parseInt(choices[i].value);
      
      break;
    }
  
  }

  if (selectedChoice == -1) {
    alert("Please select an option.");
    return;
  }
  userAnswers[currentQuestion]=selectedChoice;
 
 

  if (selectedChoice == questions[currentQuestion].answer) {
    score++;
    
    
  }


  

  currentQuestion++;
    
  if (currentQuestion === questions.length) {
    let email=emailInput.value
    localStorage.setItem(email, score)
    quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`;
  } else {
    displayQuestion();
  }

  for (var i = 0; i < choices.length; i++) {
    choices[i].checked = false
    
  }
 
});

function showPreviousQuestion() {
  currentQuestion--;
  
  displayQuestion();
}


function shuffleQuestions() {
  for (var i = questions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}
previous.addEventListener("click", showPreviousQuestion)

shuffleQuestions();
displayQuestion();




















































// //Retrieve stored user data from sessionStorage
// let currentUserData = JSON.parse(sessionStorage.getItem('userData')) || {};

// // Function to save user data in sessionStorage
// function saveUserData() {
//   sessionStorage.setItem('userData', JSON.stringify(currentUserData));
// }

// // Function to display the login page
// function showLoginPage() {
//   // Restoring user data from sessionStorage
//   currentUserData = JSON.parse(sessionStorage.getItem('userData')) || {};

//   document.getElementById('loginPage').style.display = 'block';
//   document.getElementById('quizPage').style.display = 'none';
//   document.getElementById('scorePage').style.display = 'none';
// }

// // Function to display the quiz page
// function showQuizPage() {
//   document.getElementById('loginPage').style.display = 'none';
//   document.getElementById('quizPage').style.display = 'block';
//   document.getElementById('scorePage').style.display = 'none';
// }

// // Function to display the score page
// function showScorePage() {
//   document.getElementById('loginPage').style.display = 'none';
//   document.getElementById('quizPage').style.display = 'none';
//   document.getElementById('scorePage').style.display = 'block';

//   // Display the final score
//   document.getElementById('finalScore').innerText = `Your Score: ${currentUserData.score}`;

//   // Clear sessionStorage since the game is completed
//   sessionStorage.removeItem('userData');
// }

// // Function to handle the form submission and start the quiz
// function startQuiz(event) {
//   event.preventDefault();

//   // Get the entered username and email
//   const username = document.getElementById('username').value;
//   const email = document.getElementById('email').value;

//   // Check if the user data already exists in sessionStorage
//   if (currentUserData.email === email) {
//     // User data exists, proceed to the quiz page
//     showQuizPage();
//     displayQuestion();
//   } else {
//     // User data doesn't exist, create a new entry
//     currentUserData = { username, email, score: 0 };
//     saveUserData();

//     // Proceed to the quiz page
//     showQuizPage();
//     displayQuestion();
//   }
// }

// // Restoring user data from sessionStorage when the page loads
// window.addEventListener('load', showLoginPage);

// // ... Rest of the code remains the same ...





// Function to save the current question index and user answers in sessionStorage
function saveProgress() {
  sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
}

// Function to retrieve the saved progress from sessionStorage
function retrieveProgress() {
  const savedQuestionIndex = sessionStorage.getItem('currentQuestionIndex');
  const savedUserAnswers = sessionStorage.getItem('userAnswers');

  if (savedQuestionIndex && savedUserAnswers) {
    currentQuestionIndex = parseInt(savedQuestionIndex);
    userAnswers = JSON.parse(savedUserAnswers);
  }
}

// Function to display the login page or resume the quiz
function showLoginPageOrResumeQuiz() {
  if (currentQuestionIndex === 0 && userAnswers.length === 0) {
    showLoginPage();
  } else {
    showQuizPage();
    displayQuestion();
  }
}

// Function to go to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    calculateScore();
    showScorePage();
  } else {
    displayQuestion();
  }

  saveProgress();
}

// Function to go to the previous question
function previousQuestion() {
  currentQuestionIndex--;
  displayQuestion();
  saveProgress();
}

// Add event listener to the window object to handle page refresh
window.addEventListener('beforeunload', saveProgress);

// Initialization
retrieveProgress();
showLoginPageOrResumeQuiz();