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

const nazwaCiastkaZczasemOA = "czasOstAkt";
const waluty = document.cookie.split(";");

var coa = '';

window.onload = function() {
    
  if (waluty.length > 1) {
    
    kodyDostepnychWalut.forEach(kodWal => {
        
        waluty.forEach(waluta => {
            
            var h = waluta.split("=")[0];

      
                if(waluta.split("=")[0].trim() == nazwaCiastkaZczasemOA){
                    coa = waluta.split("=")[1];
                }
            
            if(kodWal.trim() == h.trim()) {

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


                var sciezka = "flagi/" + h.trim() + ".png";

                const kod = document.createElement('k');
                kod.classList.add('kod');
                kod.textContent = h.toUpperCase();

                const skup = document.createElement('a');
                skup.classList.add('liczba');
                skup.textContent = waluta.split("=")[1].split(":")[0];

                const sprzedaz = document.createElement('p');
                sprzedaz.classList.add('liczba');
                sprzedaz.textContent = waluta.split("=")[1].split(":")[1];

                var img = document.createElement('img');
                img.src = sciezka;


                col0.appendChild(img);
                col1.appendChild(kod);
                col2.appendChild(skup);
                col3.appendChild(sprzedaz);
                
            }
        });
    });

      if(coa){
        const czasAkt = document.createElement('div');
        czasAkt.setAttribute('id','czasOstAkt');
        czasAkt.textContent = "Ostania aktualizacja: " + coa;
        container.appendChild(czasAkt);
      }

      
  } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Brak wygenerowanych ciasteczek.`;
        app.appendChild(errorMessage);
  }
}