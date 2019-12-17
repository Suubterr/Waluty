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

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);



var coa = '';

window.onload = function() {
    
    const Http = new XMLHttpRequest();
    const url = "http://localhost:8080/waluta";
    Http.open("GET",url);
    Http.send();
    
    Http.onreadystatechange = function() {

        const waluty = JSON.parse(Http.responseText);
        
        console.log(waluty);
        
          if (waluty.length > 1) {

                waluty.forEach(waluta => {

                        if(coa = ''){
                            coa = waluta.czas;
                        }

                        const col0 = document.createElement('div');
                        col0.setAttribute('class', 'col0');
                        const col1 = document.createElement('div');
                        col1.setAttribute('class', 'col1');
                        const col2 = document.createElement('div');
                        col2.setAttribute('class','col')
                        const col3 = document.createElement('div');
                        col3.setAttribute('class','col')

                        container.appendChild(col0);
                        container.appendChild(col1);
                        container.appendChild(col2);
                        container.appendChild(col3);


                        var sciezka = "flagi/" + waluta.kod + ".png";

                        const kod = document.createElement('k');
                        kod.classList.add('kod');
                        kod.textContent = waluta.kod;

                        const skup = document.createElement('a');
                        skup.classList.add('liczba');
                        skup.textContent = waluta.skup;

                        const sprzedaz = document.createElement('p');
                        sprzedaz.classList.add('liczba');
                        sprzedaz.textContent = waluta.sprzedaz;

                        var img = document.createElement('img');
                        img.src = sciezka;


                        col0.appendChild(img);
                        col1.appendChild(kod);
                        col2.appendChild(skup);
                        col3.appendChild(sprzedaz);

                    });

          } else {
                const errorMessage = document.createElement('marquee');
                errorMessage.textContent = `Brak wygenerowanych ciasteczek.`;
                app.appendChild(errorMessage);
          }
    }
}