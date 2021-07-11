// interface.js
document.addEventListener("DOMContentLoaded", () => {
  const updateTemperature = () => {
    document.querySelector('#temperature').innerText = thermostat.temperature;
    document.querySelector('#temperature').className = thermostat.energyUsage();
  }

  const thermostat = new Thermostat();
  updateTemperature();

  document.querySelector('#temperature-up').addEventListener('click', () => {
    thermostat.up();
    updateTemperature();
  });

  document.querySelector('#temperature-down').addEventListener('click', () => {
    thermostat.down();
    updateTemperature();
  });

  document.querySelector('#temperature-reset').addEventListener('click', () => {
    thermostat.resetTemperature();
    updateTemperature();
  });

  document.querySelector('#powersaving-on').addEventListener('click', () => {
    thermostat.switchPowerSavingModeOn();
    document.querySelector('#power-saving-status').innerText = 'on';
    updateTemperature();
  })

  document.querySelector('#powersaving-off').addEventListener('click', () => {
    thermostat.switchPowerSavingModeOff();
    document.querySelector('#power-saving-status').innerText = 'off';
    updateTemperature();
  })

  fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a2d3431c8c42a066164450a04bbc3074&units=metric') //unit=metric needed to activate
  .then((response) => {
    return response.json()
  })
  // .then((data) => {
  //   console.log(data.main.temp); //show visability on console
  // })
  .then((data) => {
    document.querySelector('#current-temperature').innerText = data.main.temp;
  });

  const selectElement = document.querySelector('#current-city');
  selectElement.addEventListener('change', (event) => {
  const city = event.target.value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2d3431c8c42a066164450a04bbc3074&units=metric`

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      document.querySelector('#current-temperature').innerText = data.main.temp;
    })
  });
});
