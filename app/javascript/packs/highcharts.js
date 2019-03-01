// Essa funçao vai pegar a data e transformar no string que eu preciso pra acessar o API.
function grabDates(daysBefore){
  const today = new Date();
  let our_day = new Date(today);
  our_day.setDate(today.getDate() - daysBefore);
  let dd = our_day.getDate();
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

// Assim que clicar o botão com a ID de #brl, o gráfico com as cotações do real será gerado.
const brlButton = document.querySelector('#brl');
brlButton.addEventListener('click', function () {
  // Criar um array pra cada tipo de informação que queremos.
    // Deste jeito será mais fácil criar o gráfico.
  const dates = [];
  const brl = [];

  // Organizamos nossos resultados em ordem ascendente.
  results.sort(compare);

  // Colocar as informações corretas em seus respectivos arrays.
  results.forEach((element) =>{
    dates.push(element['date']);
    brl.push(element['brl']);
  })

  // Criar o gráfico e o inserimos no div com id de content.
  const myChart = Highcharts.chart('content', {
      chart: {
          height: '35%',
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
      }]
  });
});

const eurButton = document.querySelector('#eur');
eurButton.addEventListener('click', function () {
  // Criar um array pra cada tipo de informação que queremos.
    // Deste jeito será mais fácil criar o gráfico.
  const dates = [];
  const eur = [];

  // Organizamos nossos resultados em ordem ascendente.
  results.sort(compare);

  // Colocar as informações corretas em seus respectivos arrays.
  results.forEach((element) =>{
    dates.push(element['date']);
    eur.push(element['eur']);
  })

  // Criar o gráfico e o inserimos no div com id de content.
  const myChart = Highcharts.chart('content', {
      chart: {
          height: '35%',
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
          name: 'Euro',
          data: eur
      }]
  });
});

const arsButton = document.querySelector('#ars');
arsButton.addEventListener('click', function () {
  // Criar um array pra cada tipo de informação que queremos.
    // Deste jeito será mais fácil criar o gráfico.
  const dates = [];
  const ars = [];

  // Organizamos nossos resultados em ordem ascendente.
  results.sort(compare);

  // Colocar as informações corretas em seus respectivos arrays.
  results.forEach((element) =>{
    dates.push(element['date']);
    ars.push(element['ars']);
  })

  // Criar o gráfico e o inserimos no div com id de content.
  const myChart = Highcharts.chart('content', {
      chart: {
          height: '35%',
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
          name: 'Peso Argentino',
          data: ars
      }]
  });
});
