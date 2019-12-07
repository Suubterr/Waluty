const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

const waluty = document.cookie.split(";");

window.onload = function() {

  console.log(waluty)
  if (waluty) {
      
    waluty.forEach(waluta => {            
                
        const col0 = document.createElement('div');
        col0.setAttribute('class', 'col0');
        const col1 = document.createElement('div');
        col1.setAttribute('class', 'col');
        const col2 = document.createElement('div');
        col2.setAttribute('class','col')
        const col3 = document.createElement('div');
        col3.setAttribute('class','col')

        container.appendChild(col0);
        container.appendChild(col1);
        container.appendChild(col2);
        container.appendChild(col3);
        
        var h = waluta.split("=")[0].toUpperCase();
        var sciezka = "flagi/" + h.trim() + ".png";
        console.log(sciezka);

        const kod = document.createElement('k');
        kod.classList.add('liczba');
        kod.textContent = h;

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
            
    });
  } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Brak wygenerowanych ciasteczek.`;
        app.appendChild(errorMessage);
  }
}