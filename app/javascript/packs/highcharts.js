function log(i){
  console.log(i);
}

// Essa funçao vai pegar a data e transformar no string que eu preciso pra acessar o API.
function grabDates(daysBefore){
  var today = new Date();
  var dd = today.getDate() - daysBefore;
  dd = dd.toString();
  var mm = today.getMonth() + 1; //January is 0!
  if (mm < 10){
    mm = '0' + mm.toString();
  } else {
    mm = mm.toString();
  }
  var yyyy = today.getFullYear().toString();
  var date = yyyy + '-' + mm + '-' + dd;
  return date;
}

// Criei um array vazio pra guardar todas as informações.
var results = [];

for (var i = 0; i <= 6; i++){
  fetch('http://apilayer.net/api/historical?access_key=f025674478ec665d743c5bb618b6981c&date='+ grabDates(i))
  .then(response => response.json())
  .then((data) => {
    var res = {};
    res['date'] = data.date;
    res['brl'] = data.quotes.USDBRL;
    res['eur'] = data.quotes.USDEUR;
    res['ars'] = data.quotes.USDARS;
    results.push(res);
  });
}

const button = document.querySelector('#clickme');
button.addEventListener('click', function () {
  // Create a chart from the Highcharts API.
  const dates = [];
  const brl = [];
  const eur = [];
  const ars = [];

  results.forEach((element) =>{
    dates.push(element['date']);
    brl.push(element['brl']);
    eur.push(element['eur']);
    ars.push(element['ars']);
  })

  dates.sort();
  brl.sort();
  eur.sort();
  ars.sort();

  var myChart = Highcharts.chart('clickme', {
      chart: {
          height: '80%',
          type: 'line'
      },
      title: {
          text: 'Paridades'
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
