const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const loadModel = require('@tensorflow-models/universal-sentence-encoder');
const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
  const { text } = req.body;
  const model = await loadModel.load();
  const input = model.embed(text);
  const output = tf.softmax(input);
  const values = Array.from(output.dataSync());
  const [negativeScore, positiveScore] = values;
  const sentiment = positiveScore > negativeScore ? 'Positive' : 'Negative';
  const confidence = (Math.abs(positiveScore - negativeScore) * 100).toFixed(2);
  res.send({ sentiment, confidence });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
