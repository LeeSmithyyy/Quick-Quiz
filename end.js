const finalScore = document.getElementById('finalScore');
let recentScore = sessionStorage.getItem('recentScore');

finalScore.innerText = 'Final Score: ' + recentScore;