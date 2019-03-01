// Essa funçao vai pegar a data e transformar no string que é preciso pra acessar o API.
function grabDates(daysBefore){
  const today = new Date();
  let our_day = new Date(today);
  our_day.setDate(today.getDate() - daysBefore);
  let dd = our_day.getDate();
  // O dia precisa ser definido com 2 digitos.
  if (dd < 10){
    dd = '0' + dd.toString();
  } else {
    dd.toString();
  }
  dd.toString();
  let mm = our_day.getMonth() + 1; //Janeiro é 0.
  // O mês precisa ser definido com 2 digitos.
  if (mm < 10){
    mm = '0' + mm.toString();
  } else {
    mm.toString();
  }
  const yyyy = our_day.getFullYear().toString();
  const date = yyyy + '-' + mm + '-' + dd;
  return date;
}

// Esta função vai ajudar a organizar os resultados em ordem quando usarmos o sort().
function compare(a,b) {
  if (a['date'] < b['date']){
    return -1;
  } else {
    return 1;
  }
}

function createGraph(sigla, moeda, results) {
  // Criar um array pra cada tipo de informação que queremos.
    // Deste jeito será mais fácil criar o gráfico.
  const dates = [];
  const cur = [];

  // Organizar os resultados em ordem.
  results.sort(compare);

  // Colocar as informações em seus respectivos arrays.
  results.forEach((element) =>{
    dates.push(element['date']);
    cur.push(element[sigla]);
  })

  // Criar o gráfico e o inserimos no div com id de content.
  const myChart = Highcharts.chart('content', {
      chart: {
          height: '35%',
          type: 'line'
      },
      title: {
          text: 'Cotação'
      },
      xAxis: {
          categories: dates
      },
      yAxis: {
          title: {
              text: 'Valor'
          }
      },
      series: [{
          name: moeda,
          data: cur
      }]
  });
}

// Criei um array vazio pra guardar os resultados da chamada ao API da Currency Layer.
let results = [];

// Chamar a API 7 vezes, para pegar a cotação de hoje e dos 6 dias anteriores.
for (let i = 0; i <= 6; i++){
  fetch('http://apilayer.net/api/historical?access_key=3e43389a7ab7a1fe62bfeb0514ac8239&date='+ grabDates(i))
  .then(response => response.json())
  .then((data) => {
    // Guardar as informações relevantes em um objeto.
    let res = {};
    res['date'] = data.date;
    res['brl'] = data.quotes.USDBRL;
    res['eur'] = data.quotes.USDEUR;
    res['ars'] = data.quotes.USDARS;
    results.push(res);
  });
}

// Assim que clicar o botão com a ID de #brl, o gráfico com as cotações do real será gerado.
const brlButton = document.querySelector('#brl');
brlButton.addEventListener('click', () => {
  createGraph('brl', 'Real', results);
});

const eurButton = document.querySelector('#eur');
eurButton.addEventListener('click', () => {
  createGraph('eur', 'Euro', results);
});

const arsButton = document.querySelector('#ars');
arsButton.addEventListener('click', () => {
  createGraph('ars', 'Peso Argentino', results);
});
