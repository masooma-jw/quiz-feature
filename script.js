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

// -------------------modal------------------------->




const modal = document.getElementById("modal");
const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const usernameDisplay = document.getElementById("usernameDisplay");
let previous = document.getElementById("previous");


function showModal(){
  modal.style.display ="block" ;
  container.style.display = "none";
}






userForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("usernameInput").value;
  const email = document.getElementById("emailInput").value;
  if (storedUserData[email]) {
    currentUserData = storedUserData[email];
    if (currentUserData.score !== undefined) {
      showScorePage();
      return;
    }
  } else {
    // User data doesn't exist, create a new entry
    currentUserData = { username, email, score: 0 };
    storedUserData[email] = currentUserData;
    saveUserData();
  }

 

  usernameDisplay.textContent = username;
  modal.style.display = "none";
  container.style.display = "block";

  // if (sessionStorage.getItem("currentQuestionIndex")) {
  //   currentQuestion = parseInt(
  //     sessionStorage.getItem("currentQuestionIndex")
  //   );
  //   userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
  //   displayQuestion();

  // } else {

  //   // currentQuestion = 0;
  //   userAnswers = [];
  //   displayQuestion();
  // }
  
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
   // Save current question index in sessionStorage
   sessionStorage.setItem('currentQuestionIndex', currentQuestion);


  // Check if the user has answered this question previously
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
  sessionStorage.setItem(currentQuestion, selectedChoice);
  
  currentQuestion++;


  if(currentQuestion===questions.length){
    calculateScore();
    showScorePage();
    
  }else{
    displayQuestion();
  }
}

submit.addEventListener("click", handleSelected)





function showScorePage(){
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



// submit.addEventListener("click", () => {
//   let choices = document.getElementsByName("choice");

//   let selectedChoice = -1;

//   for (var i = 0; i < choices.length; i++) {
//     if (choices[i].checked) {
//       selectedChoice = parseInt(choices[i].value);
//       for (var i = 0; i < choices.length; i++) {
//         choices[i].checked = false;
//       }

//       break;
//     }
//   }

//   if (selectedChoice == -1) {
//     alert("Please select an option.");
//     return;
//   }
//   userAnswers[currentQuestion] = selectedChoice;
//   sessionStorage.setItem(currentQuestion, selectedChoice)
  
  

//   currentQuestion++;

//   if (currentQuestion === questions.length) {
//     calculateScore();
//     let email = emailInput.value;
//     let a = localStorage.getItem(email);
//     quiz.innerHTML = `<h2>You answered ${a} out of ${questions.length} correctly!!</h2>
//       <button onclick = "location.reload()">Reload</button>`;
      
//   } else {
//     displayQuestion();
//   }
// });






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


