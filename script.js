
var questions = [
    {
      question: "When was javascript invented?",
      choices: ["1995", "1994", "1996", "None of above"],
      answer: 0
    },
    {
      question: "What does HTML stand for?",
      choices: ["Hypertext Markup Language", "Hypertext Markdown Language", "HyperLoop Machine Language", "None"],
      answer: 0
    },
    {
      question: "Which is the full form of CSS?",
      choices: ["Central style sheets", "Cascading style sheets", "Central simple sheets", "None"],
      answer: 1
    },
    {
      question: "What language runs in a web browser?",
      choices: ["Java", "C", "C++", "Javascript"],
      answer: 3
    }
  ];


  const modal = document.getElementById("modal");
  const userForm = document.getElementById("userForm");
  const usernameInput = document.getElementById("usernameInput");
  const emailInput = document.getElementById("emailInput");
  const usernameDisplay = document.getElementById("usernameDisplay");
  
  
  
  
  
  userForm.addEventListener("submit", function (event) {
    event.preventDefault();
  
    let username = usernameInput.value;
    let email = emailInput.value;
    localStorage.setItem(username, email);
    sessionStorage.setItem(username, email);
  
    usernameDisplay.textContent = username;
    modal.style.display = "none";
    container.style.display = "block";
    if(sessionStorage.getItem(username).length == 10){
      alert('session users limit exceeded! Restart browser to play more')
    }
  
    
  });
  
// -------------------------------->>-------------------------------------
  const submit=document.getElementById('submit')

  var currentQuestion = 0; // Tracks the current question
  var score = 0; // Tracks the score
  

  function displayQuestion() {
    var questionElement = document.getElementById("question");
    var choiceElements = document.getElementsByTagName("label"); //4
  
    questionElement.textContent = questions[currentQuestion].question;
  
    for (var i = 0; i < choiceElements.length; i++) {
      choiceElements[i].textContent = questions[currentQuestion].choices[i];
    }
  }
  

  submit.addEventListener("click",()=>{

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
  
    if (selectedChoice == questions[currentQuestion].answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion === questions.length) {
      
      quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`
    }
    
    else {
    
      displayQuestion();
    }
  

    for (var i = 0; i < choices.length; i++) {
      choices[i].checked = false;
    }
  

  }) 

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

 
