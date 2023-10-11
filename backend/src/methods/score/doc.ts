
export const doc = `
    <h3>Metodo GET:</h3>
    <p>
        /score - retorna um objeto com a chave data que tem em seu value um array contendo os scores executados na rodada.
    </p>
    <h4>Exemplo de retorno: </h4>
        {
	        "data": [
                {
                    "id_score": 4,
                    "create_time": "2023-10-08T15:35:16.000Z",
                    "id_game": 1,
                    "id_player": 1,
                    "id_ball": 7,
                    "action": "INCREASE"
                },
                {
                    "id_score": 5,
                    "create_time": "2023-10-08T15:35:50.000Z",
                    "id_game": 1,
                    "id_player": 3,
                    "id_ball": 7,
                    "action": "DECREASE"
                }
	        ]
        }
    <p>
        /score?id_player=1 - Ao fornecer um id de jogador, será retornado um array com todas as rodadas que o player enviado participou.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
    {
        "data": [
            {
                "id_score": 4,
                "create_time": "2023-10-08T15:35:16.000Z",
                "id_game": 1,
                "id_player": 1,
                "id_ball": 7,
                "action": "INCREASE"
            },
            {
                "id_score": 4,
                "create_time": "2023-10-08T15:35:20.000Z",
                "id_game": 1,
                "id_player": 1,
                "id_ball": 5,
                "action": "DECREASE"
            }
        ]
    }
    </p>
    <h3>
    Metodo POST:
    </h3>
    <p>
        /score - deve ser fornecido um body no formato JSON contendo uma chave score: object, que tem em seu value um objeto com as chaves id_player: integer,
        id_game: integer, id_ball: integer, action: string['INCREASE' | 'DECREASE'].
    </p>
    <h4>
        Exemplo de body:
    </h4>
    <p>
        {
            "score":{
                "id_game": 1,
                "id_player": 1,
                "id_ball": 7,
                "action": "INCREASE"
            }
        }
    </p>
    <p>
        O retorno será um objeto com a chave data que irá conter um array com um objeto contendo o id_score inserido.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
    <p>
        {
            "data": [
                {
                    "id_score": 1
                }
            ]
        }
    </p>
    <h3>
    Metodo DELETE:
    </h3>
    <p>
        /score - deve ser fornecido um body no formato JSON contendo uma chave player: object, que tem em seu value um objeto com a chave id_score: integer.
    </p>
    <h4>    
        Exemplo de body:
    </h4>
    <p>
        {
            "score":{
                "id_score": 1
            }
        }
    </p>
`