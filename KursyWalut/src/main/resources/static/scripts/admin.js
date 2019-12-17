const kodyDostepnychWalut = [
            'usd'
            ,'eur'
            ,'gbp'
            ,'chf'
            ,'cad'
            ,'sek'
            ,'dkk'
            ,'nok'
            ,'sur'
            ,'huf'
            ,'czk'
            ,'uah'
];

const maxIloscZnakow = 7;

const mainDiv = document.getElementById("mainDiv");

var skupW = "";
var sprzedW = "";

// funkcja generująca ciasteczka
function zapiszDaneFormularza() {
    
    
    // generowanie timestampa dla zestawu danych
    var obecnyCzas = new Date();
    
    var dzien = obecnyCzas.getDate();
    var miesiac = obecnyCzas.getMonth() + 1;
    var rok = obecnyCzas.getFullYear();
    var rokDoCiastka = rok + 1;
    
    var godzina = obecnyCzas.getHours();
    if(godzina<10) godzina = "0" + godzina;
    var minuta = obecnyCzas.getMinutes();
    if(minuta<10) minuta = "0" + minuta;
    
    var czasExportu = dzien + "-" + miesiac + "-" + rok + " " + godzina + ":" + minuta;
    
    
    //generowanie zestawu danych w oparciu o tablicę walut
    kodyDostepnychWalut.forEach (kod => {
        var waluta = document.getElementsByClassName(kod);
        if(waluta[0].name == "skup") {
            var skup = waluta[0].value.substr(0, maxIloscZnakow);
            var sprzedaz = waluta[1].value.substr(0, maxIloscZnakow);
        } else {
            var skup = waluta[1].value.substr(0, maxIloscZnakow);
            var sprzedaz = waluta[0].value.substr(0, maxIloscZnakow);
        }
        
        console.log("Utworzono ciasteczko: " + waluta[0].className + "=" + skup + ":" + sprzedaz + "; path=\; expires=Fri, 31 Dec " + rokDoCiastka + " 23:59:59 GMT");
        
        document.cookie = waluta[0].className + "=" + skup + ":" + sprzedaz + "; path=/; expires=Fri, 31 Dec " + rokDoCiastka + " 23:59:59 GMT";
    })
    
    //dodanie ciasteczka z timestampem
    document.cookie = "czasOstAkt=" + czasExportu + "; path=/; expires=Fri, 31 Dec " + rokDoCiastka + " 23:59:59 GMT";
    console.log("Utworzono ciasteczko: " + "czasOstAkt=" + czasExportu + "; path=/; expires=Fri, 31 Dec " + rokDoCiastka + " 23:59:59 GMT");
    
    var poleZczasemAkt = document.getElementById("czasAktualizacji");
    poleZczasemAkt.textContent = "Ostatnia aktualizacja: " + czasExportu;
    
    alert("Kursy zostały załadowane (" + czasExportu + ")");
}

//generowanie pól input w oparciu o tablicę walut
window.onload = function() {
    kodyDostepnychWalut.forEach(kod => {
        
        var sciezkaDoFlagi = "flagi/" + kod.toUpperCase() + ".png";
        
        if(document.cookie) {
            var walutyCiastka = document.cookie.split(";");
            walutyCiastka.forEach(wc => {
                if(wc.split("=")[0].trim() == kod) {
                    skupW = wc.split("=")[1].split(":")[0];
                    sprzedW = wc.split("=")[1].split(":")[1];
                    console.log(kod + " > " + skupW + ":" + sprzedW);
                }
            })
        }
        
        const kontKurs = document.createElement("div");
        kontKurs.calssName = "kontKurs";
        
        const inSkup = document.createElement("input");
        const inSprzedaz = document.createElement("input");
        const flaga = document.createElement("img");
        const kodWal = document.createElement("p");
        
        
        flaga.className="lewa";
        flaga.src= sciezkaDoFlagi;
        
        kodWal.innerHTML = kod.toUpperCase();
        
        inSkup.type="number";
        inSkup.step="0.0001";
        inSkup.value=skupW;
        inSkup.className=kod;
        inSkup.name="skup";
        inSkup.id="wpisz";
        
        inSprzedaz.type="number";
        inSprzedaz.step="0.0001";
        inSprzedaz.value=sprzedW;
        inSprzedaz.className=kod;
        inSprzedaz.name="sprzedaz";
        inSprzedaz.id="wpisz";
        
        kontKurs.append(flaga);
        kontKurs.append(kodWal);
        kontKurs.appendChild(inSkup);
        kontKurs.appendChild(inSprzedaz);
        mainDiv.appendChild(kontKurs);
    })
}