const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

const { Pessoa } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));  

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Cadastro de Pessoas!');
});

app.post('/pessoas', async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
