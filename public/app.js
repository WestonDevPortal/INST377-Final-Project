
async function loadWeather() {
  const loc = document.getElementById('location').value;
  if (!loc) return;

  // Save last searched city for Forecast page
  localStorage.setItem('lastCity', loc);

  const res = await fetch(`/api/weather?location=${loc}`);
  const data = await res.json();

  const tempF = Math.round((data.temperature * 9/5) + 32);
  const feelsF = Math.round((data.feelsLike * 9/5) + 32);
  const wind = data.windSpeed;

  let windChill = null;
  if (tempF <= 50 && wind > 3) {
    windChill = Math.round(
      35.74 + (0.6215 * tempF) - (35.75 * Math.pow(wind, 0.16)) +
      (0.4275 * tempF * Math.pow(wind, 0.16))
    );
  }

  let heatIndex = null;
  if (tempF >= 80) {
    heatIndex = Math.round(-42.379 + 2.04901523 * tempF + 10.14333127 * 50);
  }

  let riskClass = 'normal';
  let riskLabel = 'Normal Conditions';
  let icon = '🌤️';

  const condition = data.condition.toLowerCase();
  if (condition.includes('rain')) icon = '🌧️';
  else if (condition.includes('snow')) icon = '❄️';
  else if (condition.includes('cloud')) icon = '☁️';
  else if (condition.includes('sun') || condition.includes('clear')) icon = '☀️';

  if (tempF <= 32) {
    riskClass = 'cold';
    riskLabel = 'Cold Risk';
  } else if (tempF >= 90) {
    riskClass = 'heat';
    riskLabel = 'Heat Risk';
  }

  document.getElementById('output').innerHTML = `
    <div class="risk-box ${riskClass}">
      <p class="risk-title">${icon} <strong>${riskLabel}</strong></p>
      <p><strong>Temperature:</strong> ${tempF}°F</p>
      <p><strong>Feels Like:</strong> ${feelsF}°F</p>
      ${windChill !== null ? `<p><strong>Wind Chill:</strong> ${windChill}°F</p>` : ''}
      ${heatIndex !== null ? `<p><strong>Heat Index:</strong> ${heatIndex}°F</p>` : ''}
      <p><strong>Wind Speed:</strong> ${wind} mph</p>
      <p><strong>Condition:</strong> ${data.condition}</p>
    </div>
  `;
}
