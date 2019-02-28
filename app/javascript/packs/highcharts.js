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

// O exercício pede a cotação do dólar dos 7 últimos dias pro real, euro e peso argentino.
for (var i = 0; i <= 6; i++){
  $.ajax({
    url: 'http://apilayer.net/api/historical?access_key=1e1d044abd41d0059b0afbd5bc9fe17b&date='+ grabDates(i),
    dataType: 'jsonp',
    success: function(json) {
      // Criei um objeto pra cada dia que vai segurar o valor das cotações
      var res = {};
      res['date'] = json.date;
      res['brl'] = json.quotes.USDBRL;
      res['eur'] = json.quotes.USDEUR;
      res['ars'] = json.quotes.USDARS;
      results.push(res);
    }
  });
}

// Aqui eu to logando os resultados.
// Quando eu logo results sozinho, aparece um array no console com 7 objetos.
// Já quando eu logo a length, dá 0.
// E quando eu logo o primeiro item dá undefined.

console.log('results:')
console.log(results);
console.log('---------------');
console.log('results length:')
console.log(results.length);
console.log('---------------');
console.log('results:')
console.log(results);
console.log('---------------');
console.log('results first item:')
console.log(results[0]);
console.log('---------------');


document.addEventListener('DOMContentLoaded', function () {
  // Create a chart from the Highcharts API.
  var myChart = Highcharts.chart('chart', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Paridades'
      },
      xAxis: {
          categories: [
            'Segunda',
            'Terça',
            'Quarta'
          ]
      },
      yAxis: {
          title: {
              text: 'Valor'
          }
      },
      series: [{
          name: 'Real',
          data: [1, 0, 4]
      }, {
          name: 'Euro',
          data: [5, 7, 3]
      }, {
          name: 'Peso Argentino',
          data: [4, 6, 5]
      }]
  });
});
