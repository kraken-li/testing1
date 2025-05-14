import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

const app = document.getElementById('app');

const questions = [
  { question: "What’s your favorite weekend activity?", answers: [{ text: "Hanging out with friends", type: "Extrovert" }, { text: "Reading alone at home", type: "Introvert" }] },
  { question: "How do you handle challenges?", answers: [{ text: "Find a quick solution", type: "Practical" }, { text: "Think through every possibility", type: "Reflective" }] }
];

let currentQuestionIndex = 0;
let results = {};

function showQuestion() {
  const current = questions[currentQuestionIndex];
  app.innerHTML = `<h2>${current.question}</h2>`;
  
  current.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(answer);
    app.appendChild(button);
  });
}

function selectAnswer(answer) {
  results[answer.type] = results[answer.type] ? results[answer.type] + 1 : 1;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 300);
  } else {
    setTimeout(showResult, 300);
  }
}

function showResult() {
  let personality = Object.keys(results).reduce((a, b) => (results[a] > results[b] ? a : b));

  app.innerHTML = `
    <h2>Your Personality Type: ${personality}!</h2>
    <button id="shareButton">Share on Warpcast</button>
  `;

  document.getElementById("shareButton").addEventListener("click", function() {
    shareResult(personality);
  });
}

function shareResult(personality) {
  sdk.actions.cast({
    text: `I just took the Personality Test and my result is ${personality}! Try it now!`
  }).catch(error => console.error("Warpcast share failed:", error));
}

showQuestion();
