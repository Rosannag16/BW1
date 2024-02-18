// Seleziona gli elementi dal DOM
const stelle = document.querySelectorAll('#stelle img'); // Selezione di tutte le immagini con id 'stelle'
const stelleArray = Array.from(stelle); // Creazione di un array da NodeList
const documentFeedbackUtente = document.getElementById('commentoUtente'); // Selezione dell'elemento con id 'commentoUtente'
const documentBtnFeedback = document.getElementById('btnFeedback'); // Selezione del pulsante con id 'btnFeedback'

// Inizializza la variabile per tenere traccia delle stelle attive
let stelleAttive = 0;

// Funzione per gestire l'effetto hover sulle stelle
const gestisciHover = (indice) => {
    for (let j = 0; j <= indice; j++) {
        stelleArray[j].setAttribute('src', 'assets/img/star.svg'); // Imposta l'immagine della stella attiva
    }
};

// Funzione per gestire l'effetto mouseout sulle stelle
const gestisciUscita = (indice) => {
    if (stelleAttive <= indice) {
        for (let j = 0; j <= indice; j++) {
            stelleArray[j].setAttribute('src', 'assets/img/star2.svg'); // Ripristina l'immagine della stella inattiva
        }
    }
};

// Funzione per gestire il click su una stella
const gestisciClick = (indice) => {
    stelleArray.forEach(element => {
        element.setAttribute('src', 'assets/img/star2.svg'); // Ripristina tutte le stelle come inattive
    });

    stelleAttive = indice + 1; // Imposta il numero di stelle attive
    for (let j = 0; j <= indice; j++) {
        stelleArray[j].setAttribute('src', 'assets/img/star.svg'); // Imposta l'immagine della stella attiva
    }

    verificaForm(); // Chiama la funzione per verificare il form
};

// Aggiungi gli event listener alle stelle
stelleArray.forEach((stella, i) => {
    stella.addEventListener("mouseover", () => gestisciHover(i)); // Aggiungi evento hover
    stella.addEventListener("mouseout", () => gestisciUscita(i)); // Aggiungi evento mouseout
    stella.addEventListener("click", () => gestisciClick(i)); // Aggiungi evento click
});

// Aggiungi l'event listener per l'input nel campo di testo
documentFeedbackUtente.addEventListener("input", function () {
    verificaForm(); // Chiama la funzione per verificare il form
});

// Definisci la funzione del pulsante
function button() {
    if (stelleAttive === 0 || documentFeedbackUtente.value.trim() === '') {    //GRAZIE A SANTA ROSA ABBIAMO TROVATO IL METODO TRIM ED ORA IL MONDO E' UN POSTO MIGLIORE :D <3
        alert('Write comment and rate us!'); // Mostra un avviso se il form non è completo
    } else {
        textRingraziamento(); // Chiama la funzione per mostrare il ringraziamento
    }
}

documentBtnFeedback.addEventListener('click', button); // Aggiungi evento click al pulsante

// Definisci la funzione di ringraziamento
function textRingraziamento() {
    // Rimuovi tutti gli elementi tranne il logo
    const eliminaElementi = document.querySelectorAll('#mainFeedback, footer');
    eliminaElementi.forEach(element => {
        element.remove();
    });

    // Crea e aggiungi la scritta al centro della pagina
    const ringraziamento = document.createElement('div');
    const testo = document.createElement('h1');
    ringraziamento.classList.add('testoRingraziamento');
    testo.innerText = 'Thank you, your feedback has been recorded!';
    ringraziamento.appendChild(testo);
    document.body.appendChild(ringraziamento);
}