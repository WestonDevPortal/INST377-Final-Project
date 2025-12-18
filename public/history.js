async function loadHistory() {
  const res = await fetch('/api/history');
  const data = await res.json();
  const ul = document.getElementById('history');
  ul.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.location;
    ul.appendChild(li);
  });
}

loadHistory();