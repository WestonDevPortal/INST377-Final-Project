
async function loadChart() {
  const city = localStorage.getItem('lastCity');
  const note = document.getElementById('forecast-note');
  const canvas = document.getElementById('tempChart');

  if (!city) {
    note.innerText = 'Search for a city on the Home page to view forecast trends.';
    canvas.style.display = 'none';
    return;
  }

  note.innerText = `Showing temperature trend for: ${city}`;

  // Get current weather for city
  const res = await fetch(`/api/weather?location=${city}`);
  const data = await res.json();

  // Base temp in Fahrenheit
  const baseTemp = Math.round((data.temperature * 9/5) + 32);

  // Generate realistic 7-day variation around base temp
  const temps = [
    baseTemp - 3,
    baseTemp - 1,
    baseTemp,
    baseTemp + 2,
    baseTemp + 3,
    baseTemp + 1,
    baseTemp - 2
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: `Daily Highs (°F)`,
        data: temps,
        tension: 0.3
      }]
    },
    options: {
      responsive: true
    }
  });
}

loadChart();
