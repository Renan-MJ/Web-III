const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/mensagem', (req,res) => {
    res.json({ texto: "Ola do Servidor!"});
});

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) return res.status(404).json({erro: "CEP não encontrado!"})

        res.status(200).json(dados);
    }catch(err){
        res.status(500).json({erro: "Erro de comunicação com VIACEP"})
    }
});


app.listen(3001);


//npm init (inicia o projeto)
// npm i
// npm i express
// npm i cors
// npm i nodemon
// npm run start