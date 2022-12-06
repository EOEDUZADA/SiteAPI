async function consulta() {

console.log("ativou");
  let coin = document.querySelector('#coin').value;
  if(coin !== "") {
     
  
  let coinUpperCase = coin.toUpperCase();
  let coinLowerCase = coin.toLowerCase();



    const dadosAPI = async () => {
    const resposta = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym='+coinUpperCase+'&tsym=BRL&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
    const json = await resposta.json();
    const data = json.Data.Data;
    const times = data.map(obj => obj.time);
    console.log(times)
    const precos = data.map(obj => obj.high);
    const precoBaixo = data.map(obj => obj.low);
    console.log(precos[119]);
    console.log(precoBaixo);




     

 


 




    return {
      times,
      precos,
      precoBaixo
    }
    
  }
  


  /// Error handling ///
  function checkStatus(resposta) {
    if (resposta.ok) {
      return Promise.resolve(resposta);
    } else {
      return Promise.reject(new Error(resposta.statusText));
    }
  }
  
  
  
  /// Charts ///

  let criarGrafico
  

  
  async function mostrarGrafico() {
    let { times, precos } = await dadosAPI();
  
    let grafico = document.getElementById('grafico').getContext('2d');
  
    let gradient = grafico.createLinearGradient(0, 0, 0, 400);
  
    gradient.addColorStop(0, 'rgba(78,56,216,.5)');
    gradient.addColorStop(.425, 'rgba(118,106,192,0)');
  
    Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
    Chart.defaults.global.defaultFontSize = 12;
  
    criarGrafico = new Chart(grafico, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: 'R$',
          data: precos,
          backgroundColor: gradient,
          borderColor: 'rgba(118,106,192,1)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          borderWidth: 3,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: .2,
        }]
      },
  
      options: {
        title: {
          display: false,
          text: 'Heckin Chart!',
          fontSize: 35
        },
  
        legend: {
          display: false
        },
  
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
  
        scales: {
          xAxes: [{
            display: false,
            gridLines: {}
          }],
          yAxes: [{
            display: false,
            gridLines: {}
          }]
        },
  
        tooltips: {
          callbacks: {
            //This removes the tooltip title
            title: function() {}
         },
          //this removes legend color
          displayColors: false,
          yPadding: 10,
          xPadding: 10,
          position: 'nearest',
          caretSize: 10,
          backgroundColor: 'rgba(255,255,255,.9)',
          bodyFontSize: 15,
          bodyFontColor: '#303030' 
        }
      }
    });












    
  }
  
  let img = document.querySelector("#coinimage");
  let nomeCrypto = document.querySelector(".nomecrypto");
  let coinImage = document.querySelector("#coinimage");
  let my3 = document.querySelector(".my-3");
  let cards = document.querySelector(".cards");


  /// Update current price ///
  async function atualizarPreco() {
    let { times, precos, precoBaixo, } = await dadosAPI()
    let precoAltoAtualizado = precos[precos.length-1].toFixed(2);
    let precoBaixoAtualizado = precoBaixo[precoBaixo.length-1].toFixed(2);
  
    document.getElementById("preco").innerHTML = "R$" + precoAltoAtualizado;

        const painel = document.querySelector('.sobre');
       const THREE_HOURS_IN_MS = 2*60*60*1000;
    var date = new Date(times[0]*1000 + THREE_HOURS_IN_MS);
    let texto= "<h1 id='valores'>VALORES DOS ÚLTIMOS TRADES</h1><br>";
    texto=texto + "Mais alto : <p id='precos'> R$ "+ precoAltoAtualizado+"</p><br>";
    texto=texto + "Mais baixo :  <p id='precos'> R$ "+precoBaixoAtualizado+"</p><br><br><br>";
    texto=texto + "Atualizado em : <p id='data'> "+ date+" </p> <br><br><br>";
    painel.innerHTML = texto;

try {
      img.setAttribute("src", 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/'+coinLowerCase+'.svg');
}catch {
  console.log("nao achou img")
}

    nomeCrypto.innerHTML= coinUpperCase;

    
    coinImage.style.display = "block";

    

        my3.style.display="block";

       

        cards.style.setProperty('display', 'inline-flex', 'important');


  }
  

  atualizarPreco();

  

  mostrarGrafico();





  }
}






    





   