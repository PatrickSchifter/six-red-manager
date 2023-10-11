import {Router} from 'express';
import Player from '../methods/player/player';
import Game from '../methods/game/game';
import Score from '../methods/score/score';
import Ranking from '../methods/ranking/game';

export const router = Router();

router.get('/player', Player.get);
router.post('/player', Player.post);
router.delete('/player', Player.delete);
router.get('/player/docs', Player.docs);

router.post('/game', Game.post);
router.get('/game', Game.get);
router.delete('/game', Game.delete);
router.get('/game/docs', Game.docs);

router.post('/score', Score.post);
router.get('/score', Score.get);
router.delete('/score', Score.delete);
router.get('/score/docs', Score.docs);

router.get('/ranking', Ranking.get);
router.get('/ranking/docs', Ranking.docs);