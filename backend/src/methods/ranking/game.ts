import { Request, Response } from "express";
import { connection } from "../../database/connection";
import { doc } from "./doc";

class Ranking{
    static get(req: Request, res: Response) {
        const {id_player, id_game} = req.query;

        let query = `
            SELECT
                p.id_player,
                p.name,
                MAX(score) AS max_score
            FROM (
                SELECT
                    id_player1 AS id_player,
                    score_player1 AS score
                FROM game
                UNION ALL
                SELECT
                    id_player2 AS id_player,
                    score_player2 AS score
                FROM game
            ) AS combined
            INNER JOIN player p ON combined.id_player = p.id_player
            GROUP BY p.id_player, p.name
            ORDER BY max_score DESC;
    `;

        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({info: err});
            }
            res.status(200).json({data: results});
        });
    }

    static docs(req: Request, res: Response) {
        res.send(doc);
    }
}

export default Ranking;
