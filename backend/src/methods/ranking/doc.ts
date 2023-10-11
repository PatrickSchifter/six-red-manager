
export const doc = `
    <h3>Metodo GET:</h3>
    <p>
        /ranking - retorna um objeto com a chave data que tem em seu value um array contendo por ordem decrescente as pontuações e informações dos jogadores.
    </p>
    <h4>Exemplo de retorno: </h4>
    <p>
    {
        "data": [
            {
                "id_player": 1,
                "name": "Patrick",
                "max_score": 18
            },
            {
                "id_player": 4,
                "name": "João",
                "max_score": 13
            },
            {
                "id_player": 5,
                "name": "Roberto",
                "max_score": 12
            },
            {
                "id_player": 3,
                "name": "Rafael",
                "max_score": 6
            }
        ]
    }
    </p>
`
