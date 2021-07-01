const numOfQuestionsInput = document.getElementById('numOfQuestions');
const difficultyRange = document.getElementById('difficulty');
const categoryInput = document.getElementById('category');

let numOfQ = numOfQuestionsInput.value;
let difficulty = '';
let category = '';

difficultyRange.addEventListener('change', () => {
  if (difficultyRange.value == 0){
    difficulty = '';
  } else if (difficultyRange.value == 33){
    difficulty = 'easy';
  } else if (difficultyRange.value == 66){
    difficulty = 'medium';
  } 
  else {
    difficulty = 'hard';
  }
});

numOfQuestionsInput.addEventListener('change', () => {
  numOfQ = numOfQuestionsInput.value;
});


categoryInput.addEventListener('change', () => {
  category = categoryInput.options[categoryInput.selectedIndex].value;
});



settings = () => {
  sessionStorage.setItem('numOfQ', numOfQ)
  sessionStorage.setItem('difficulty', difficulty);
  sessionStorage.setItem('category', category);
  window.location.href = 'quiz.html';
}