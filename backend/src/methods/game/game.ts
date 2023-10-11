import { Request, Response } from "express";
import { connection } from "../../database/connection";
import { doc } from "./doc";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";

class Game{
    static get(req: Request, res: Response) {
        const {id_player, id_game} = req.query;

        let query = `SELECT * FROM game`;

        if(id_player){
            query = query + 
            ` WHERE id_player1 = ${id_player} OR id_player2 = ${id_player} `
            query += ';'
        }else if(id_game){
            query += ` WHERE id_game = ${id_game};`
        }

        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({info: err});
            }
            res.status(200).json({data: results});
        });
    }

    static post(req: Request, res: Response) {
        const {game} = req.body;

        const getCurrentDateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours() - 3).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        let query = `
            INSERT INTO game(
                id_player1,
                id_player2,
                create_time
            )VALUES(
                '${game.id_player1}',
                '${game.id_player2}',
                '${getCurrentDateTime()}'
            );
        `

        if(!game.id_player1 || !game.id_player2){
            res.status(403).json({info: "É necessário enviar o id_player dos jogadores envolvidos nessa partida."})
        }

        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({info: err});
            }else{
                connection.query('SELECT MAX(id_game) AS id_game FROM game ', (err, results) => {
                    res.status(201).json({data: results});
                })
            }
        });

        
    }

    static delete(req: Request, res: Response) {
        const {game} = req.body;

        let query = `
            DELETE FROM game
            WHERE id_game = ${game.id_game};
        `

        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({info: err});
            }
            res.status(204).json({info:"Partida deletada com sucesso."});
        });
    }

    static docs(req: Request, res: Response) {
        res.send(doc);
    }
}

export default Game;
