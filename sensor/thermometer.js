import fetch from 'node-fetch'
import five from 'johnny-five'
require('dotenv').config()

const board = new five.Board()

board.on('ready', () => {
  var temp = new five.Thermometer({
    controller: 'LM35',
    pin: 'A0',
    freq: 30000
  })

  temp.on('data', function () {
    const url = 'https://api.thingspeak.com/update?' +
      'api_key=' + process.env.THINGSPEAK_LIVETHERMOMETER_WRITE +
      '&field1=' + this.celsius

    fetch(url, {method: 'POST'})
      .then(res => res.text())
      .then(content => console.log(content))
  })
})
