import { Request, Response } from "express";
import { connection } from "../../database/connection";
import { doc } from "./doc";

const getDataBall = (score: any) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ball WHERE id_ball = ${score.id_ball}`, (err, resultsBall) => {
        if (err) {
            reject(err);
        } else {
            resolve(resultsBall);
        }
        });
    });
    };

    const getDataGame = (score: any) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM game WHERE id_game = ${score.id_game}`, (err, resultsGame) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(resultsGame);
                }
            });
        })
    }

    const getScore = (score: any) => {
        return new Promise ((resolve, reject) => {
            let selectQuery = `
                SELECT *
                FROM score
                WHERE id_score = ${score.id_score};
            `

            connection.query(selectQuery, (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        })
    }

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

class Score{
    static get(req: Request, res: Response) {
        const {id_player, id_game} = req.query;

        let query = `SELECT * FROM score`;

        if(id_player){
            query = query + 
            ` WHERE id_player = ${id_player} `
            if(id_game){
                query += `
                AND id_game = ${id_game};`
            }
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
        const {score} = req.body;

        interface Game {
            score_player1: number,
            score_player2: number,
            id_game: number,
            create_time: string,
            id_player1: number,
            id_player2: number
        }

        const updateGame = (action: string, value : number, gameData : Game) => {
            let setPlayer = ''
            if(gameData.id_player1 === score.id_player){
                if(action === 'INCREASE')
                    setPlayer = `SET score_player1 = ${gameData.score_player1 + value}`;
                else if (action === 'DECREASE'){
                    setPlayer = `SET score_player2 = ${gameData.score_player2 + value}`;
                }
            }else if(gameData.id_player2 === score.id_player){
                if(action === 'INCREASE')
                    setPlayer = `SET score_player2 = ${gameData.score_player2 + value}`;
                else if (action === 'DECREASE'){
                    setPlayer = `SET score_player1 = ${gameData.score_player1 + value}`;
                }
            }else{
                res.status(403).json({info: 'id_jogador não participante dessa partida'});
                return
            }

            let queryUpdate = `
                UPDATE game 
                ${setPlayer} 
                WHERE id_game = ${gameData.id_game};
            `
            
            return new Promise((resolve, reject) => {
                connection.query(queryUpdate, (err, resultsGame) => {
                    if (err) {
                        reject(err);
                    }else{
                        resolve(resultsGame);
                    }
                });
            })
        }

        let query = `
            INSERT INTO score(
                create_time,
                id_game,
                id_player,
                id_ball,
                action
            )VALUES(
                '${getCurrentDateTime()}',
                ${score.id_game},
                ${score.id_player},
                ${score.id_ball},
                '${score.action}'
            );
        `

        if(!score.id_game){
            res.status(403).json({info: "É necessário enviar o id_game da partida."})
        }else if(!score.id_player){
            res.status(403).json({info: "É necessário enviar o id_player do jogador que executou a jogada."})
        }else if(!score.id_ball){
            res.status(403).json({info: "É necessário enviar o id_ball da bola que deve ser inserida ou decrescida da pontuação."})
        }else if(!score.action && score.action !== 'INCREASE' && score.action !== 'DECREASE'){
            res.status(403).json({info: "É necessário enviar o action INCREASE ou DECREASE para alterar a pontuação do jogador."})
        }else{
            let dataBall : any = [];
            let dataGame : any = [];
            const getAllData = async () => {
                dataBall = await getDataBall(score);
                dataGame = await getDataGame(score);

                connection.query(query, async (err, results) => {
                    if(err){
                        res.status(500).json({info: err});
                    }else{
                        await updateGame(score.action, dataBall[0].value, dataGame[0]);
                        connection.query('SELECT MAX(id_score) AS id_score FROM score', (err, results) => {
                            if(err){
                                res.status(500).json({info: err});
                            }else{
                                res.status(201).json({data: results});
                            }
                        })
                    }
                })
            };
            getAllData();
        }        
    }

    static delete(req: Request, res: Response) {
        const {score} = req.body;

        const getAndDelete = async () => {
            const scoreToDelete: any = await getScore(score);
            const gameData: any = await getDataGame(scoreToDelete[0]);
            const ballData: any = await getDataBall(scoreToDelete[0]);
            let setScore: string = ''
            let queryUpdate: string = ''

            if(gameData[0].id_player1 === scoreToDelete[0].id_player){
                if(scoreToDelete[0].action === 'INCREASE'){
                    setScore = ` SET score_player1 = ${gameData[0].score_player1 - ballData[0].value}`
                }else if (scoreToDelete[0].action === 'DECREASE'){
                    setScore = ` SET score_player2 = ${gameData[0].score_player2 - ballData[0].value}`
                }
            }else if(gameData[0].id_player2 === scoreToDelete[0].id_player){
                if(scoreToDelete[0].action === 'INCREASE'){
                    setScore = ` SET score_player2 = ${gameData[0].score_player2 - ballData[0].value}`
                }else if (scoreToDelete[0].action === 'DECREASE'){
                    setScore = ` SET score_player1 = ${gameData[0].score_player1 - ballData[0].value}`
                }
            }

            queryUpdate = `
                UPDATE game 
                ${setScore} 
                WHERE id_game=${scoreToDelete[0].id_game};
            `

            let queryDelete = `
                DELETE FROM score
                WHERE id_score = ${score.id_score};
            `

            connection.query(queryUpdate, (err, results) => {
                if(err){
                    res.status(500).json({info: err})
                }else{
                    connection.query(queryDelete, (err, results) => {
                        if(err){
                            res.status(500).json({info: err})
                        }else{
                            res.status(204).json({info: 'Deleted'});
                        }
                    })
                }
            })
        }

        getAndDelete();
        res.status(204);
    }

    static docs(req: Request, res: Response) {
        res.send(doc);
    }
}

export default Score;
