
export const doc = `
    <h3>Metodo GET:</h3>
    <p>
        /player - retorna um objeto com a chave data que tem em seu value um array contendo as informações dos jogadores.
    </p>
    <h4>Exemplo de retorno: </h4>
        {
	        "data": [
                {
                    "id_player": 1,
                    "name": "user1"
                },
                {
                    "id_player": 2,
                    "name": "user2"
                }
	        ]
        }
    <p>
        /player?id_player=1 - Ao fornecer um id de jogador, será retornado apenas os dados do id solicitado.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
        {
	        "data": [
                {
                    "id_player": 1,
                    "name": "user1"
                }
	        ]
        }
    </p>
    <h3>
    Metodo POST:
    </h3>
    <p>
        /player - deve ser fornecido um body no formato JSON contendo uma chave player: object, que tem em seu value um objeto com a chave name: string.
    </p>
    <h4>
        Exemplo de body:
    </h4>
    <p>
        {
            "player":{
                "name": "playerToPost"
            }
        }
    </p>
    <p>
        O retorno será um objeto com a chave data que irá conter um array com um objeto contendo o id_player inserido.
    </p>
    <h4>
        Exemplo de retorno:
    </h4>
    <p>
        {
            "data": [
                {
                    "id_player": 4
                }
            ]
        }
    </p>
    <h3>
    Metodo DELETE:
    </h3>
    <p>
        /player - deve ser fornecido um body no formato JSON contendo uma chave player: object, que tem em seu value um objeto com a chave id_player: integer.
    </p>
    <h4>    
        Exemplo de body:
    </h4>
    <p>
        {
            "player":{
                "id_player": 1
            }
        }
    </p>
`