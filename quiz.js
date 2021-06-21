// Get page elements
const questionCategory = document.getElementById('category');
const questionTitle = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choices'));
const scoreBoard = document.getElementById('score');
const loader = document.getElementById('loader');
const quiz = document.getElementById('quiz');
const form = document.getElementById('form-container')
let questionNum = document.getElementById('questionNum');

//Get settings from home page
let numOfQuestions = sessionStorage.getItem('numOfQ');
let difficulty = sessionStorage.getItem('difficulty');

//Set Variables
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
let isLoaded = false;
let score = 0;
let correctAnswer = 0;
let questions = [];
const url = 'https://opentdb.com/api.php?amount=' + numOfQuestions + '&difficulty=' + difficulty +'&type=multiple';

//EVENT LISTENERS
choices.forEach((choice) => {
  choice.addEventListener('click', e => {
    if (!isLoaded) return;

    isLoaded = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    //DO something if selectedAnswer = correct answer
    if (selectedAnswer == correctAnswer) {
      score++;
    }

    const applyClass = selectedAnswer == correctAnswer ? 'choice-correct' : 'choice-incorrect';
    selectedChoice.parentElement.classList.add(applyClass);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(applyClass);
      getNextQuesion()
    }, 1000);

  });
});

//Request data from api
fetch(url)
  .then((response) => response.json())
  .then((data) => {

    questions = data.results.map((result) => {
      const quizQuestion = {
        question: result.question,
        category: result.category
      };

      const allChoices = [...result.incorrect_answers];
      quizQuestion.answer = Math.floor(Math.random() * 3) + 1;
      allChoices.splice(quizQuestion.answer - 1, 0, result.correct_answer);

      allChoices.forEach((choice, index) => {
        quizQuestion["choice" + (index + 1)] = choice;
      });

      return quizQuestion;
    });
    //Stop people loading on quiz page without using settings
      sessionStorage.removeItem('difficulty');
      sessionStorage.removeItem('numOfQ');
      startQuiz();
  });

//Load the quesions
startQuiz = () => {
  questionCounter = 0;
  availableQuestions = [...questions];
  totalQuestions = [...questions];
  getNextQuesion();
  form.classList.remove("hidden");
  loader.classList.add("hidden");
}

//get individual question and load to page
getNextQuesion = () => {
  if (availableQuestions.length === 0) {
    //GAME OVER
    window.location.href = 'end.html';
    sessionStorage.setItem('recentScore', score);
  } else {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionCategory.innerText = currentQuestion.category;
    questionTitle.innerText = currentQuestion.question;
    scoreBoard.innerText = 'Score: ' + score;
    questionNum.innerText = questionCounter + '/' + totalQuestions.length;


    choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    correctAnswer = currentQuestion.answer;
    isLoaded = true;
  }
};