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

app.get('/cep/:uf/:cidade/:logradouro', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;

    try {
        const url = `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
        const resposta = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`);
        const dados = await resposta.json();

        if (!dados || dados.length === 0) {
            return res.status(404).json({erro: "CEP não encontrado!"});
        }

        res.status(200).json(dados);
    }catch(err){
        res.status(500).json({erro: "Erro de comunicação com VIACEP"})
    }
});

app.get('/cep-xml/:uf/:cidade/:logradouro', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;

    try {

        const url = `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/xml/`;
        const resposta = await fetch(url);

        const xmlTexto = await resposta.text();

        if (xmlTexto.includes('<erro>true</erro>') || xmlTexto.includes('<xmlcep/>')) {
            res.header('Content-Type', 'application/xml');
            return res.status(404).send('<?xml version="1.0" encoding="UTF-8"?><erro>Endereço não encontrado!</erro>');
        }

        res.header('Content-Type', 'application/xml');
        res.status(200).send(xmlTexto);
    } catch (err) {
        res.header('Content-Type', 'application/xml');
        res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><erro>Erro de comunicação com VIACEP</erro>');
    }
});


app.listen(3001);


//npm init (inicia o projeto)
// npm i
// npm i express
// npm i cors
// npm i nodemon
// npm run start