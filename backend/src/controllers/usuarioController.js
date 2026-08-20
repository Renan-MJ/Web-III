const usuarioService = require('../services/usuarioService')

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({ data:usuarios })
    } catch(err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuarios' })
    }
};

module.exports = { buscarUsuarios }