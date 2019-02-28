// TODO: put api key into .env file.
import "bootstrap";

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

var results = [];

for (var i = 0; i <= 6; i++){
  $.ajax({
    url: 'http://apilayer.net/api/historical?access_key=1e1d044abd41d0059b0afbd5bc9fe17b&date='+ grabDates(i),
    dataType: 'jsonp',
    success: function(json) {
      var res = [];
      res.push(json.date);
      res.push(json.quotes.USDBRL);
      res.push(json.quotes.USDEUR);
      res.push(json.quotes.USDARS);

      results.push(res);

      // results.splice(i, 1, res);
    }
  });
}


// export default results;
