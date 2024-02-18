// otteniamo ID del bottone btnPro
const btn = document.getElementById('btnPro');
//otteniamo ID checkbox
const checkbox = document.getElementById('checkbox');

// funzione per passare alla pagina successiva
const cambioPagina = () => {
    if (checkbox.checked) {
        // se la checkbox e' marcata va alla pagina domande
        window.location.href = 'domande.html'
    } else {
        // altrimenti visualizza messaggio errore per l'utente dopo mezzo secondo
        setTimeout(function () {
            document.getElementById('required').innerText = 'You must accept the conditions to proceed with the quiz.'
        }, 500)
    }
};

// viene intercettato l'evento click
btn.addEventListener('click', function (e) {
    e.preventDefault;
    cambioPagina();
});
