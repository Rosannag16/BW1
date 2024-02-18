//costanti html
const documentCanvasClock = document.getElementById('canvasClock');
const testoDomanda = document.getElementById('documentDomanda');
const documentRisposta1 = document.getElementById('risposta1');
const documentRisposta2 = document.getElementById('risposta2');
const documentRisposta3 = document.getElementById('risposta3');
const documentRisposta4 = document.getElementById('risposta4');

// variabili globali 
let domandaCorrente = 0;
let intervallo;
Chart.defaults.global.tooltips.enabled = false;
let risposte = [];
let domandeEstratte = []
let risposteEstratte = []


//array database
const questions = [
  {
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {

    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {

    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {

    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {

    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {

    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {

    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {

    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {

    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];


// ottiene il contesto del timer
let ctxClock = documentCanvasClock.getContext('2d');
// array per chart.js; i valori possono andare da 0 a 1: 0 e' completamente sbagliato, 1 completamente giusto.
let myData = [0, 1];

let chart = new Chart(documentCanvasClock, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: myData,
      backgroundColor: ['#876191', '#00FFFF'],
      borderWidth: 0,
    }]
  },
  options: {
    maintainAspectRatio: false,
    hover: { mode: null },
    animation: { duration: 0, },
    cutoutPercentage: 75,
  }
});

// il parametro array memorizza le domande gia' estratte
// restituisce in modo casuale il numero di domande che va da 0 a n-1
// il parametro n e' il limite massimo (escluso) da estrarre
const domandeRandom = (array, n) => {
  if (array.length === questions.length) {
    return;
  }
  let domandaRandomIndex;
  do {
    domandaRandomIndex = Math.floor(Math.random() * n);
  } while (array.includes(domandaRandomIndex));

  array.push(domandaRandomIndex);

  return domandaRandomIndex;
}


// funzione che mostra la domanda e le corrispettive risposte in maniera random
const visualizzaDati = () => {
  let rispostaRandomIndex = 0;
  let risposteRandomArray = [];
  let documentRisposteArrayTesti = []
  risposteEstratte = [];
  let domandaRandomIndex = domandeRandom(domandeEstratte, questions.length);
  testoDomanda.innerText = questions[domandaRandomIndex].question;
  documentRisposteArrayTesti.push(questions[domandaRandomIndex].correct_answer);
  documentRisposteArrayTesti.push(questions[domandaRandomIndex].incorrect_answers[0]);
  documentRisposteArrayTesti.push(questions[domandaRandomIndex].incorrect_answers[1]);
  documentRisposteArrayTesti.push(questions[domandaRandomIndex].incorrect_answers[2]);
  documentRisposta1.innerText = documentRisposteArrayTesti[domandeRandom(risposteEstratte, 4)]
  documentRisposta2.innerText = documentRisposteArrayTesti[domandeRandom(risposteEstratte, 4)]
  if (documentRisposteArrayTesti.length > 2) {
    documentRisposta3.innerText = documentRisposteArrayTesti[domandeRandom(risposteEstratte, 4)]
    documentRisposta4.innerText = documentRisposteArrayTesti[domandeRandom(risposteEstratte, 4)]
  }

  let documentRisposte = document.getElementsByClassName('btnAsk');
  let documentRisposteArray = Array.from(documentRisposte);

  documentRisposteArray.forEach(element => {
    element.style.display = 'inline';
    if (element.innerText === 'undefined') {
      element.style.display = 'none';
    } console.log(element.innerText)
  });


  documentRisposteArrayTesti = [];
  console.log(domandaCorrente)
  document.getElementById("mostraNDomande").innerText = "QUESTION " + (parseInt(domandaCorrente) + 1);
}


//visualizza il grafico timer e lo aggiorna 10 volte al secondo
const startTimer = (durataMillis) => {
  let index1 = 0;
  let index2 = 1;
  let milliSecondi = 0;
  const documentSecondi = document.getElementById("documentSecondi");
  intervallo = setInterval(function () {

    index1 += 1 / durataMillis * 100;
    index2 -= 1 / durataMillis * 100;

    let secondiRimanenti = Math.floor((durataMillis - milliSecondi) / 1000);
    documentSecondi.innerText = secondiRimanenti;

    milliSecondi += 100;

    if (milliSecondi >= durataMillis) {
      clearInterval(intervallo);
      risposte.push(false);
      domandaSuccessiva();
      return;
    }

    myData = [index1, index2];
    chart.data.datasets[0].data = myData;
    chart.update();
  }, 100);

};

//verifica della risposta dell'utente tenendo conto il caso in cui le risposte possano essere 2 o 4
const verificaDomanda = (pulsanteCliccato) => {
  let documentRisposte = Array.from(document.getElementsByClassName("btnAsk"));
  for (let index = 0; index < documentRisposte.length; index++) {
    const rispostaCorrente = documentRisposte[index].innerText;
    if (documentRisposte[pulsanteCliccato - 1] !== undefined) {
      const rispostaUtente = documentRisposte[pulsanteCliccato - 1].innerText;
      if (rispostaUtente === rispostaCorrente) {
        risposte.push(true);
        break;
      } else {
        risposte.push(false);
        break;
      }
    }
  }
}

// al click dell'utente il timer si ferma, si passa alla domanda successiva e il timer ricomincia
// se la domanda e' l'ultima porta alla pagina del risultato
const domandaSuccessiva = () => {
  localStorage.setItem('risposte', risposte); //salva le risposte per la pagina del risultato

  clearInterval(intervallo);
  domandaCorrente++;
  if (domandaCorrente > questions.length - 1) {
    window.location.href = "risultato.html";
  }
  visualizzaDati();
  startTimer(30000);
};

//visualizza i dati e fa partire il timer al primo caricamento della pagina
function init() {
  visualizzaDati();
  startTimer(30000);

}

//rende non cliccabili i pulsanti dell'html
function disabilitaRisposte() {
  documentRisposta1.setAttribute("disabled", "");
  documentRisposta2.setAttribute("disabled", "");
  documentRisposta3.setAttribute("disabled", "");
  documentRisposta4.setAttribute("disabled", "");
}

//rende cliccabili i pulsanti dell'html
function ablitaRisposte() {
  documentRisposta1.removeAttribute("disabled");
  documentRisposta2.removeAttribute("disabled");
  documentRisposta3.removeAttribute("disabled");
  documentRisposta4.removeAttribute("disabled");
}


//intercetta il click dei corrispettivi pulsanti 
documentRisposta1.addEventListener("click", function () {
  disabilitaRisposte()
  verificaDomanda(1);
  domandaSuccessiva();
  ablitaRisposte();
});
documentRisposta2.addEventListener("click", function () {
  disabilitaRisposte()
  verificaDomanda(2);
  domandaSuccessiva();
  ablitaRisposte();
});
documentRisposta3.addEventListener("click", function () {
  disabilitaRisposte()
  verificaDomanda(3);
  domandaSuccessiva();
  ablitaRisposte();
});
documentRisposta4.addEventListener("click", function () {
  disabilitaRisposte()
  verificaDomanda(4);
  domandaSuccessiva();
  ablitaRisposte();
});

//richiama init con l'evento load 
addEventListener("load", init);
