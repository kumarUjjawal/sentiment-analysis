const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = document.querySelector('#text-input').value;

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(data => {
      resultDiv.textContent = `Sentiment: ${data.sentiment}, Confidence: ${data.confidence}%`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
