let counter = 0,
    current = 0,
    answering = true,
    submitButton, 
    restartButton,
    nextButton,
    questionSection,
    inputs,
    finished;

const questions = [
  {
    title: 'What is the result of "1" + 2 ?',
    answers: [
      {
        content: "3",
        correct: false,
      },
      {
        content: "1+2",
        correct: false,
      },
      {
        content: "NaN",
        correct: false,
      },
      {
        content: "12",
        correct: true,
      },
    ],
  },
  {
    title: 'What is the result of [1, 2] + [3, 4] ?',
    answers: [
      {
        content: "[4, 6]",
        correct: false,
      },
      {
        content: "[1, 5, 4]",
        correct: false,
      },
      {
        content: "1,23,4",
        correct: true,
      },
      {
        content: "10",
        correct: false,
      },
    ],
  },
  {
    title: 'What is the parameters to the callback function to Array.prototype.forEach()?',
    answers: [
      {
        content: "item",
        correct: false,
      },
      {
        content: "item, array",
        correct: false,
      },
      {
        content: "item, index, array",
        correct: true,
      },
      {
        content: "array, index",
        correct: false,
      },
    ],
  },
  
];

onload = main;

function main(){

  init();

  renderNextQuestion(questions[current]);
  
  //renderQuestions();

}

function renderQuestions(){

  questions.forEach( (question, index, array ) => {
    questionSection.innerHTML += `
      <div>
        <div>Q${index + 1}. ${question.title}</div>
        <div>
          <p><label><input type="radio" name="q${index}" class="${question.answers[0].correct ? "correct" : ""}">${question.answers[0].content}</label></p>
          <p><label><input type="radio" name="q${index}" class="${question.answers[1].correct ? "correct" : ""}">${question.answers[1].content}</label></p>
          <p><label><input type="radio" name="q${index}" class="${question.answers[2].correct ? "correct" : ""}">${question.answers[2].content}</label></p>
          <p><label><input type="radio" name="q${index}" class="${question.answers[3].correct ? "correct" : ""}">${question.answers[3].content}</label></p>
        </div>
      </div>
      <hr />
      `;
  });

  
}

function renderNextQuestion(question){
  questionSection.innerHTML = `
      <div>
        <div class="questionTitle">Q${current + 1}. ${question.title}</div>
        <div class="answers">
          <input type="radio" name="q${current}" class="${question.answers[0].correct ? "correct" : ""}" id="a1"><label for="a1">${question.answers[0].content}</label>
          <input type="radio" name="q${current}" class="${question.answers[1].correct ? "correct" : ""}" id="a2"><label for="a2">${question.answers[1].content}</label>
          <input type="radio" name="q${current}" class="${question.answers[2].correct ? "correct" : ""}" id="a3"><label for="a3">${question.answers[2].content}</label>
          <input type="radio" name="q${current}" class="${question.answers[3].correct ? "correct" : ""}" id="a4"><label for="a4">${question.answers[3].content}</label>
        </div>
      </div>
      <hr />
  `;
  Array.from(inputs).forEach((elem)=>{
    elem.addEventListener("click", submitClicked, false);
  })
  answering = true;
}

function init(){

  submitButton = document.querySelector(".submitButton");
  restartButton = document.querySelector(".restartButton");
  nextButton = document.querySelector(".nextButton");
  questionSection = document.querySelector('.questionSection');
  inputs = document.getElementsByTagName("input");
  finished = document.querySelector(".finished");

  submitButton.addEventListener("click", submitClicked, false);
  submitButton.style.display = "none";
  restartButton.addEventListener("click", restartClicked, false);
  restartButton.style.display = "none";
  nextButton.addEventListener("click", nextClicked, false);
  nextButton.style.display = "none";
  finished.style.display = "none";
}

function restartClicked(){
  counter = 0;
  current = 0;
  //questionSection.innerHTML = ``;
  //renderQuestions();
  renderNextQuestion(questions[current]);
  //submitButton.style.display = "block";
  restartButton.style.display = "none";
  nextButton.style.display = "none";
  document.querySelector(".result").innerText = ``;
  finished.style.display = "none";
}

function submitClicked(){

  if(answering){
    answering = false;
    for (let i = 0; i < inputs.length; i++) {
      if(inputs[i].checked){
        if(inputs[i].classList.contains("correct")){
          counter++;
        }else{
          let label = inputs[i].nextSibling;
          label.innerHTML += ' <span class="material-icons">close</span>';
          label.classList.add("wrong-revealed");
        }
      }
      if(inputs[i].classList.contains("correct")){
        let label = inputs[i].nextSibling;
        label.innerHTML += ' <span class="material-icons">check</span>';
        label.classList.add("correct-revealed");
      }
    }
    document.querySelector(".result").innerText = `Score: ${counter} / ${questions.length}`;

    submitButton.style.display = "none";

    //console.log(current);
    
    if(current == questions.length - 1){
      finished.style.display = "block";
      restartButton.style.display = "block";
    }else{
      nextButton.style.display = "block";
    }
  }else{

  }
  
}

function nextClicked(){
  renderNextQuestion(questions[++current]);
  //submitButton.style.display = "block";
  nextButton.style.display = "none";
}