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

// funkcja jako argument przyjmuje HTMLCollection i zapisuje wartosci do plików cookies
function zapiszDaneFormularza() {
    kodyDostepnychWalut.forEach (kod => {
        var waluta = document.getElementsByClassName(kod);
        if(waluta[0].name == "skup") {
            var skup = waluta[0].value.substr(0, maxIloscZnakow);
            var sprzedaz = waluta[1].value.substr(0, maxIloscZnakow);
        } else {
            var skup = waluta[1].value.substr(0, maxIloscZnakow);
            var sprzedaz = waluta[0].value.substr(0, maxIloscZnakow);
        }
        
        console.log("Utworzono ciasteczko: " + waluta[0].className + "=" + skup + ":" + sprzedaz + "; path=\; expires=Fri, 31 Dec 9999 23:59:59 GMT");
        
        document.cookie = waluta[0].className + "=" + skup + ":" + sprzedaz + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    })
    alert("Kursy zostały załadowane.")
}

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