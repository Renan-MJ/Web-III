const obterTodosUsuarios = async () => {
    const mockUsuarios = [
        {
            id: 1, nome: 'João', email: 'joao@email.com'
        },

        {
            id: 2, nome: 'Marcos', email: 'marcos@email.com'
        }
    ]

    return mockUsuarios;
};

module.export = { obterTodosUsuarios }