// Variabili globali

var usciti = [];
var arrayNumeroTiri = [];
var arrayRossi = [];
var arrayNeri = [];


// Casino in versione testuale

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Funzioni verifica risultato

function rosso(num) {
    var rossi = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    if(rossi.indexOf(num) > -1) {
        return true;
    } else {
        return false;
    }
}

function nero(num) {
    var neri = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
    if(neri.indexOf(num) > -1) {
        return true;
    } else {
        return false;
    }
}

function zero(num) {
    var zero = [0];
    if(zero.indexOf(num) > -1) {
        return true;
    } else {
        return false;
    }
}

function pari(num) {
    if(num%2 == 0 && num>0) {
        return true;
    } else {
        return false;
    }
}

function dispari(num) {
    if(num%2 == 0) {
        return false;
    } else {
        return true;
    }
}

function manque(num) {
    if(num>=1 && num<=18) {
        return true;
    } else {
        return false;
    }
}

function passe(num) {
    if(num>=19 && num<=36) {
        return true;
    } else {
        return false;
    }
}

function colore(num) {
    if(rosso(num)) {
        return "R";
    } else if (nero(num)) {
        return "N";
    } else {
        return "V";
    }
}

function paridispari(num) {
    if(pari(num)) {
        return "P";
    } else if (dispari(num)) {
        return "D";
    } else {
        return "-";
    }
}

function manquepasse(num) {
    if(manque(num)) {
        return "M";
    } else if (passe(num)) {
        return "P";
    } else {
        return "-";
    }
}

// View

function listaUscitiAggiungi(num) {
    var table = document.getElementById("listaUsciti");
    var row = table.insertRow(-1);

    var cellRosso = row.insertCell(0);
    var cellZero = row.insertCell(1);
    var cellNero = row.insertCell(2);

    var cellColore = row.insertCell(3);
    var cellPariDispari = row.insertCell(4);
    var cellManquePasse = row.insertCell(5);
    
    cellRosso.innerHTML = rosso(num)?num:"";
    cellZero.innerHTML = zero(num)?num:"";
    cellNero.innerHTML = nero(num)?num:"";

    cellColore.innerHTML = colore(num);
    cellPariDispari.innerHTML = paridispari(num);
    cellManquePasse.innerHTML = manquepasse(num);
    
}

function disegnaGrafico(fRossi, fNeri) {
    arrayRossi.push(fRossi);
    arrayNeri.push(fNeri);
    arrayNumeroTiri.push(usciti.length);

    var dataRossiNeri = {
        labels: arrayNumeroTiri,
        datasets: [
            {
                label: "Rossi",
                    fill: false,
                    backgroundColor: "red",
                    borderColor: "red",
                    data: arrayRossi
            } ,
            {
                label: "Neri",
                    fill: false,
                    backgroundColor: "black",
                    borderColor: "black",
                    data: arrayNeri
            } ,
        ]
    };
    
    var ctx = document.getElementById("grafico");
    var rossiLineChart = new Chart(ctx, {
        type: 'line',
        data: dataRossiNeri,
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
}

// Eventi interfaccia

document.getElementById("tira").addEventListener("click", function(){
    var numeroUscito = document.getElementById("numeroUscito");
    numeroUscito.innerHTML = "Sto tirando";
    var uscito = randomIntFromInterval(0,36);
    
    if(rosso(uscito)) {
        numeroUscito.style.color = "red";
    } else if (nero(uscito)) {
        numeroUscito.style.color = "black";
    } else if (zero(uscito)) {
        numeroUscito.style.color = "green";
    } else {
        numeroUscito.style.color = "orange";
    }

    usciti.push(uscito);
    numeroUscito.innerHTML = uscito;

    var tx_rosso = document.getElementById("rosso");
    tx_rosso.innerHTML = rosso(uscito)?"OK":"NO";

    var tx_nero = document.getElementById("nero");
    tx_nero.innerHTML = nero(uscito)?"OK":"NO";

    var tx_zero = document.getElementById("zero");
    tx_zero.innerHTML = zero(uscito)?"OK":"NO";
    
    var tx_pari = document.getElementById("pari");
    tx_pari.innerHTML = pari(uscito)?"OK":"NO";
    
    var tx_dispari = document.getElementById("dispari");
    tx_dispari.innerHTML = dispari(uscito)?"OK":"NO";
    
    var tx_manque = document.getElementById("manque");
    tx_manque.innerHTML = manque(uscito)?"OK":"NO";
    
    var tx_passe = document.getElementById("passe");
    tx_passe.innerHTML = passe(uscito)?"OK":"NO";

    var tx_totaletirati = document.getElementById("totaletirati");
    tx_totaletirati.innerHTML = usciti.length.toFixed(0);

    // Calcolo percentuale zeri

    var percentualeZeri = 0;
    var sommatoriaZeri = 0;
    
    for (var i = 0, len = usciti.length; i < len; i++) {
        sommatoriaZeri+=zero(usciti[i])?1:0;
    }
    
    percentualeZeri = sommatoriaZeri/usciti.length*100;

    var tx_p_zeri = document.getElementById("p_zeri");
    tx_p_zeri.innerHTML = percentualeZeri.toFixed(2);

    // Calcolo percentuale rossi
    
    var percentualeRossi = 0;
    var sommatoriaRossi = 0;
    
    for (var i = 0, len = usciti.length; i < len; i++) {
        sommatoriaRossi+=rosso(usciti[i])?1:0;
    }
    
    percentualeRossi = sommatoriaRossi/usciti.length*100;

    var tx_p_rossi = document.getElementById("p_rossi");
    tx_p_rossi.innerHTML = percentualeRossi.toFixed(2);

    // Calcolo percentuale neri
    
    var percentualeNeri = 0;
    var sommatoriaNeri = 0;
    
    for (var i = 0, len = usciti.length; i < len; i++) {
        sommatoriaNeri+=nero(usciti[i])?1:0;
    }
    
    percentualeNeri = sommatoriaNeri/usciti.length*100;

    var tx_p_neri = document.getElementById("p_neri");
    tx_p_neri.innerHTML = percentualeNeri.toFixed(2);

    // 

    listaUscitiAggiungi(uscito);
    disegnaGrafico(percentualeRossi.toFixed(2), percentualeNeri.toFixed(2));
    /*
    var p = document.createElement('p');
    p.innerHTML = uscito;
    
    var c3 = document.getElementById('c3');
    c3.appendChild(p);
    */
});

//console.log("");