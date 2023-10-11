
export const doc = `
    <h3>Metodo GET:</h3>
    <p>
        /game - retorna um objeto com a chave data que tem em seu value um array contendo as informações das rodadas.
    </p>
    <h4>Exemplo de retorno: </h4>
        {
	        "data": [
                {
                    "id_game": 1,
                    "id_player1": 1,
                    "id_player2": 3,
                    "create_time": "2023-10-08T18:24:56.000Z"
                },
                {
                    "id_game": 2,
                    "id_player1": 1,
                    "id_player2": 3,
                    "create_time": "2023-10-08T18:24:56.000Z"
                }
	        ]
        }
    <p>
        /game?id_player=1 - Ao fornecer um id de jogador, será retornado um array com todas as rodadas que o player enviado participou.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
    {
        "data": [
            {
                "id_game": 1,
                "id_player1": 1,
                "id_player2": 3,
                "create_time": "2023-10-08T18:24:56.000Z"
            },
            {
                "id_game": 3,
                "id_player1": 1,
                "id_player2": 5,
                "create_time": "2023-10-08T18:24:56.000Z"
            },
            {
                "id_game": 5,
                "id_player1": 1,
                "id_player2": 4,
                "create_time": "2023-10-08T12:33:19.000Z"
            }
        ]
    }
    </p>
    <h3>
    Metodo POST:
    </h3>
    <p>
        /game - deve ser fornecido um body no formato JSON contendo uma chave game: object, que tem em seu value um objeto com as chavee id_player1: integer e
        id_player2: integer.
    </p>
    <h4>
        Exemplo de body:
    </h4>
    <p>
        {
            "game":{
                "id_player1": 1,
                "id_player2": 2
            }
        }
    </p>
    <p>
        O retorno será um objeto com a chave data que irá conter um array com um objeto contendo o id_game inserido.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
    <p>
        {
            "data": [
                {
                    "id_game": 1
                }
            ]
        }
    </p>
    <h3>
    Metodo DELETE:
    </h3>
    <p>
        /game - deve ser fornecido um body no formato JSON contendo uma chave player: object, que tem em seu value um objeto com a chave id_game: integer.
    </p>
    <h4>    
        Exemplo de body:
    </h4>
    <p>
        {
            "game":{
                "id_game": 1
            }
        }
    </p>
`