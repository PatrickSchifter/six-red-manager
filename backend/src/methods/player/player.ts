import { Request, Response } from "express";
import { connection } from "../../database/connection";
import { doc } from "./doc";
import { MysqlError } from 'mysql';


class Player{
    static get(req: Request, res: Response) {
        const {id_player} = req.query;

        let query = `SELECT * FROM player`;

        if(id_player){
            query = query + 
            ` WHERE id_player = '${id_player}';`
        }

        connection.query(query, (err: MysqlError, results: any) => {
            if (err) {
                res.status(500).json({info: err});
            }else{
                res.status(200).json({data: results});
            }
        });
    }

    static post(req: Request, res: Response) {
        const {player} = req.body;

        let query = `
            INSERT INTO player(
                name
            )VALUES(
                '${player.name}'
            );
        `
        if(!player.name){
            res.status(403).json({info: "É necessário enviar o name no body da requisição."})
        }

        connection.query(query, (err: MysqlError) => {
            if (err) {
                res.status(500).json({info: err});
            }else{
                connection.query('SELECT MAX(id_player) AS id_player FROM player ', (err: MysqlError, results: any) => {
                    res.status(201).json({data: results});
                })    
            }   
        });
    }

    static delete(req: Request, res: Response) {
        const {player} = req.body;

        let query = `
            DELETE FROM player
            WHERE id_player = ${player.id_player};
        `

        connection.query(query, (err: MysqlError) => {
            if (err) {
                res.status(500).json({info: err});
            }else{
                res.status(204).json({info:"Jogador deletado com sucesso."});
            }
        });
    }

    static docs(req: Request, res: Response) {
        res.send(doc);
    }
}

export default Player;
