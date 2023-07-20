

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
 
  usernameDisplay.textContent = username;
  modal.style.display = "none";
  container.style.display = "block";
});


const submit = document.getElementById("submit");

var currentQuestion = 0; 

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
      for (var i = 0; i < choices.length; i++) {
        choices[i].checked = false
        
      }
      
      break;
    }
  
  }

  if (selectedChoice == -1) {
    alert("Please select an option.");
    return;
  }
  userAnswers[currentQuestion]=selectedChoice 
      

  currentQuestion++;
    
  if (currentQuestion === questions.length) {
    calculateScore()
    let email=emailInput.value
    let a = localStorage.getItem(email)
    quiz.innerHTML = `<h2>You answered ${a} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`;
  } else {
    displayQuestion();
  }

 
 
});

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  let email= emailInput.value
  localStorage.setItem(email, score)
}

function PreviousQuestion() {
  currentQuestion--;
  
  displayQuestion();
}
previous.addEventListener("click", PreviousQuestion)


function shuffleQuestions() {
  for (var i = questions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}


shuffleQuestions();
displayQuestion();









