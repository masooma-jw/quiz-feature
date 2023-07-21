// Retrieve stored user data from localStorage
const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
let currentUserData = {};

// Function to save user data in localStorage
function saveUserData() {
  localStorage.setItem("userData", JSON.stringify(storedUserData));
}


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


const modal = document.getElementById("modal");
const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const usernameDisplay = document.getElementById("usernameDisplay");
let previous = document.getElementById("previous");




userForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("usernameInput").value;
  const email = document.getElementById("emailInput").value;
  if (storedUserData[email]) {
    currentUserData = storedUserData[email];
    if (currentUserData.score !== undefined) {
      showScorePage();
      // return;
    }
  } else {
  
    currentUserData = { username, email, score: 0 };
    storedUserData[email] = currentUserData;
    saveUserData();
  }

 

  usernameDisplay.textContent = username;
  modal.style.display = "none";
  container.style.display = "block";

});






const submit = document.getElementById("submit");

let currentQuestion = 0;

let userAnswers = [];






function displayQuestion() {
  let questionElement = document.getElementById("question");
  let choiceElements = document.getElementsByTagName("label");
  
  questionElement.textContent = questions[currentQuestion].question;

  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = questions[currentQuestion].choices[i];
  }

  let previousAnswer = userAnswers[currentQuestion];
  if (previousAnswer !== undefined) {
    let choices = document.getElementsByName("choice");
    choices[previousAnswer].checked = true;
  }

  if (currentQuestion == 0) {
    previous.style.display = "none";
  } else {
    previous.style.display = "inline-flex";
  }
}






function handleSelected(){
  let choices = document.getElementsByName("choice")
  let selectedChoice= -1;

  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      selectedChoice = parseInt(choices[i].value);
      for(var i = 0; i<choices.length; i++ ){
        choices[i].checked=false;
      }
      break;
    }
  }
  if(selectedChoice ==-1){
    alert('Please select option!!!');
    return;
  }
  
  userAnswers[currentQuestion]=selectedChoice;
  // sessionStorage.setItem(currentQuestion, selectedChoice);
  
  currentQuestion++;


  if(currentQuestion===questions.length){
    calculateScore();
    showScorePage();
    calculateScore();
  }else{
    displayQuestion();
  }
}

submit.addEventListener("click", handleSelected)





function showScorePage(){
  modal.style.display="none";
  quiz.style.display="none"
  document.getElementById("scorePage").style.display="block"
  
  // calculateScore()
  // Retrieve all user data from localStorage
  const allUserData = Object.values(storedUserData);

  const scoreTableBody = document.getElementById('scoreTableBody');
  scoreTableBody.innerHTML = '';

  // Create table rows for each user's score
  allUserData.forEach((userData) => {
    const row = document.createElement('tr');

    const usernameCell = document.createElement('td');
    usernameCell.textContent = userData.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = userData.email;
    row.appendChild(emailCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = userData.score;
    row.appendChild(scoreCell);

    scoreTableBody.appendChild(row);
  });
  document.getElementById('btn').innerHTML=`<button onclick = "location.reload()">Reload</button>`


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
}




function PreviousQuestion() {
  currentQuestion--;
  displayQuestion();



}


previous.addEventListener("click", PreviousQuestion);






function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

shuffleQuestions();
displayQuestion();


