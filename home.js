let numOfQuestionsInput = document.getElementById('numOfQuestions');
let difficultyRange = document.getElementById('difficulty');

let numOfQ = numOfQuestions.value;
let difficulty = 'medium';
difficultyRange.addEventListener('change', () => {
  if (difficultyRange.value == 0){
    difficulty = 'easy';
  } else if (difficultyRange.value == 50){
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }
});

numOfQuestionsInput.addEventListener('change', () => {
  numOfQ = numOfQuestions.value;
});

settings = () => {
  sessionStorage.setItem('numOfQ', numOfQ)
  sessionStorage.setItem('difficulty', difficulty);
  window.location.href = 'quiz.html';
}