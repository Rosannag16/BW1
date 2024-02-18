//fa riferimento alle risposte della pagina precedente
const risposteDate = localStorage.getItem('risposte');
// divide in un array le risposte in stringa 
const arrayRisposte = risposteDate.split(',');
//viariabile globale
let ctxGrafico;
// costanti HTML 
let documentRisultatoPositivo = document.querySelector('#correct p');
let documentRisultatoNegativo = document.querySelector('#wrong p');
let documentPercentualePositiva = document.querySelector('#correct h3 span');
let documentPercentualeNegativa = document.querySelector('#wrong h3 span');
let documentGrafico = document.getElementById('graficoCanvas');
let documentScrittaGrafico_h4 = document.querySelector('#scritteGrafico h4')
let documentScrittaGrafico_span = document.querySelector('#scritteGrafico_span')
let documentScrittaGrafico_p = document.querySelector('#scritteGrafico p')
let documentBtn = document.querySelector('.risultato_footer input')

//disabilita i tooltips
Chart.defaults.global.tooltips.enabled = false;

//oggetto per il grafico chart.js
let myData = [];
let chart = new Chart(documentGrafico, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: myData,
            backgroundColor: ['#d20094', '#00FFFF'],
            borderWidth: 0,
        }]
    },
    options: {
        maintainAspectRatio: false,
        hover: { mode: null },
        animation: { duration: 2000, },
        cutoutPercentage: 75,
    },
    tooltips: {
        enabled: true, // Abilita i tooltip
        callbacks: {
            label: function (tooltipItem, data) {
                // Ottieni il valore del segmento attuale
                var value = data.datasets[0].data[tooltipItem.index];
                if (tooltipItem.index === 0) {
                    return "Wrong " + value * 100 + '%';
                } else {
                    return "Correct " + value * 100 + '%';
                }
            }
        }
    }
});


//visualizza dati delle risposte date divise in sbagliate e giuste (in percentuali)
function stampa() {
    let iPositivo = 0;
    let iNegativo = 0;
    //calcola gli indici delle risposte
    arrayRisposte.forEach(risposta => {

        if (iPositivo == 0) {
            documentRisultatoPositivo.innerText = `0/10 questions`
        }

        if (risposta == 'true') {
            iPositivo++;
        } else {
            iNegativo++;
        }
    });
    documentRisultatoPositivo.innerText = `${iPositivo}/${arrayRisposte.length} questions`
    documentRisultatoNegativo.innerText = `${iNegativo}/${arrayRisposte.length} questions`
    //transforma il calcolo in percentuale e aggiorna il grafico
    iPositivo = (iPositivo / arrayRisposte.length) * 100;
    iNegativo = (iNegativo / arrayRisposte.length) * 100;
    documentPercentualePositiva.innerText = `${iPositivo}%`;
    documentPercentualeNegativa.innerText = `${iNegativo}%`;
    myData = [iNegativo / 100, iPositivo / 100];
    chart.data.datasets[0].data = myData;
    chart.update();

    //in base al risultato ottenuto viene inviato l'esito positivo o negativo 
    if (iPositivo >= 60) {
        documentScrittaGrafico_h4.innerText = 'Congratulations!'
        documentScrittaGrafico_span.innerText = 'You passed the exam'
        documentScrittaGrafico_p.innerText = `We'll send you the certificare in few minutes. Check your email (including promotions / spam folder)`
    } else {
        documentScrittaGrafico_h4.innerText = 'Oh sorry!'
        documentScrittaGrafico_span.innerText = 'You failed the exam'
        documentScrittaGrafico_span.style.color = "#d20094";
        documentScrittaGrafico_p.innerText = `The teacher will get in touch with you to understand your mistakes, you will definitely improve in the future.`
    }
}

//ottiene canvas
function init() {
    ctxGrafico = documentGrafico.getContext('2d');
    stampa();
}

//richiama init con l'evento load 
addEventListener('load', init);

//cambio pagina al click dell'utente che porta alla pagina feedback
documentBtn.addEventListener('click', function (e) {
    e.preventDefault;
    window.location.href = 'feedback.html'
});
