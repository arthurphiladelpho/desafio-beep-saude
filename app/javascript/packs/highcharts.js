// Essa funçao vai pegar a data e transformar no string que eu preciso pra acessar o API.
function grabDates(daysBefore){
  const today = new Date();
  let dd = today.getDate() - daysBefore;
  // O dia precisa ser definido com 2 digitos.
  if (dd < 10){
    dd = '0' + dd.toString();
  } else {
    dd.toString();
  }
  let mm = today.getMonth() + 1; //Janeiro é 0.
  // O mês precisa ser definido com 2 digitos.
  if (mm < 10){
    mm = '0' + mm.toString();
  } else {
    mm.toString();
  }
  const yyyy = today.getFullYear().toString();
  const date = yyyy + '-' + mm + '-' + dd;
  return date;
}

// Essa função vai ajudar a organizar nossos resultados em ordem quando usarmos o sort().
function compare(a,b) {
  if (a['date'] < b['date']){
    return -1;
  } else {
    return 1;
  }
}

// Criei um array vazio pra guardar todas as informações.
let results = [];

// Chamamos a API 7 vezes, para pegarmos a cotação de hoje e dos 6 dias anteriores.
for (let i = 0; i <= 6; i++){
  fetch('http://apilayer.net/api/historical?access_key=3e43389a7ab7a1fe62bfeb0514ac8239&date='+ grabDates(i))
  .then(response => response.json())
  .then((data) => {
    let res = {};
    res['date'] = data.date;
    res['brl'] = data.quotes.USDBRL;
    res['eur'] = data.quotes.USDEUR;
    res['ars'] = data.quotes.USDARS;
    results.push(res);
  });
}

// Assim que clicar o botão com a ID de #clickme, o gráfico com as cotações será gerado.
const button = document.querySelector('#clickme');
button.addEventListener('click', function () {
  // Criar um array pra cada tipo de informação que queremos.
    // Deste jeito vai ser mais fácil para criar o gráfico.
  const dates = [];
  const brl = [];
  const eur = [];
  const ars = [];

  // Organizamos nossos resultados em ordem ascendente.
  results.sort(compare);

  // Colocar as informações corretas em seus respectivos arrays.
  results.forEach((element) =>{
    dates.push(element['date']);
    brl.push(element['brl']);
    eur.push(element['eur']);
    ars.push(element['ars']);
  })

  // Criar o gráfico e o inserimos no div com id de content.
  const myChart = Highcharts.chart('content', {
      chart: {
          height: '40%',
          type: 'line'
      },
      title: {
          text: 'Cotações'
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
          name: 'Real',
          data: brl
      }, {
          name: 'Euro',
          data: eur
      }, {
          name: 'Peso Argentino',
          data: ars
      }]
  });
});
