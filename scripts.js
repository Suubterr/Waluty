const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/c/?format=json', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
      
        data.forEach(movie => {
            movie.rates.forEach(rate =>{
                
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


                const k = document.createElement('k');
                k.textContent = rate.code;

                const a = document.createElement('a');
                a.textContent = rate.bid;

                const p = document.createElement('p');
                p.textContent = rate.ask;
                
                var img = document.createElement('img');
                img.src = "flagi/" + rate.code + ".png";
                

                col0.appendChild(img);
                col1.appendChild(k);
                col2.appendChild(a);
                col3.appendChild(p);
            
        })
    });
  } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
  }
}

request.send();