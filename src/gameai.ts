
export function getNextKey(currentGame: number[], nextPlayer: number, width: number, height: number, winlen: number, playerNum: number, deepth: number = 2): number {
    const nextGames = getNextGames(currentGame, nextPlayer, width);
    const nextnextPlayer = nextPlayer + 1 > playerNum ? 1 : nextPlayer + 1;
    let allBenes: number[][] = [];
    
    nextGames.forEach(game => {
        const nextnextGames = getNextGames(game, nextnextPlayer, width);
        let benes: number[] = [];
        nextnextGames.forEach(game2 => {
            const
                bf1 = benefitEvaluate(game2, nextPlayer, width, height, winlen),
                bf2 = benefitEvaluate(game2, nextnextPlayer, width, height, winlen);
            benes.push(bf1 - bf2);
            console.log('bf', bf1, bf2,nextPlayer,nextnextPlayer);
        });
        allBenes.push(benes);
    });
    let max: number[] = [], min: number[] = [], minus: number[] = [];
    allBenes.forEach(benes => {
        
        max.push(Math.max(...benes));
        min.push(Math.min(...benes));
        minus.push(Math.max(...benes) - Math.min(...benes))
    });

    console.log('getnk', nextGames, allBenes,minus,getCanDroppedKeys(currentGame, width));

    return getCanDroppedKeys(currentGame, width)[minus.indexOf(Math.min(...minus))];
}

function benefitEvaluate(currentGame: number[], droppedPlayer: number, width: number, height: number, winlen: number) {
    const WIDTH: number = width, HEIGHT: number = height, WIN_LEN: number = winlen;

    let key = 0
    let win_patterns: number[][] = [];
    currentGame.forEach(b => {
        if (b !== 0) {
            const CRT_POS = getPosByKey(key, WIDTH);

            //generate pattern
            for (let i = 0; i < 4; i++) {
                let temp_pattern: number[] = [];
                let thre1: number = -1, thre2: number = -1;
                switch (i) {
                    case 0://horiz(left)
                        for (let j = 0; j < WIN_LEN; j++) {
                            temp_pattern = [];
                            for (let k = 0; k < WIN_LEN; k++) {
                                thre1 = CRT_POS[0] - j + k;
                                if (thre1 >= 0 && thre1 < WIDTH) {
                                    temp_pattern.push(getKeyAt(CRT_POS[0] - j + k, CRT_POS[1], WIDTH));
                                }
                            }
                            win_patterns.push(temp_pattern);
                        }
                        break;
                    case 1://verti(top)
                        for (let j = 0; j < WIN_LEN; j++) {
                            temp_pattern = [];
                            for (let k = 0; k < WIN_LEN; k++) {
                                thre1 = CRT_POS[1] - j + k;
                                if (thre1 >= 0 && thre1 < HEIGHT) {
                                    temp_pattern.push(getKeyAt(CRT_POS[0], CRT_POS[1] - j + k, WIDTH));
                                }
                            }
                            win_patterns.push(temp_pattern);
                        }
                        break;
                    case 2://incline(upperleft)
                        for (let j = 0; j < WIN_LEN; j++) {
                            temp_pattern = [];
                            for (let k = 0; k < WIN_LEN; k++) {
                                thre1 = CRT_POS[0] - j + k;
                                thre2 = CRT_POS[1] - j + k;
                                if (thre1 >= 0 && thre1 < WIDTH && thre2 >= 0 && thre2 < HEIGHT) {
                                    temp_pattern.push(getKeyAt(CRT_POS[0] - j + k, CRT_POS[1] - j + k, WIDTH));
                                }
                            }
                            win_patterns.push(temp_pattern);
                        }
                        break;
                    case 3://incline(upperright)
                        for (let j = 0; j < WIN_LEN; j++) {
                            temp_pattern = [];
                            for (let k = 0; k < WIN_LEN; k++) {
                                thre1 = CRT_POS[0] - j + k;
                                thre2 = CRT_POS[1] + j - k;
                                if (thre1 >= 0 && thre1 < WIDTH && thre2 >= 0 && thre2 < HEIGHT) {
                                    temp_pattern.push(getKeyAt(CRT_POS[0] - j + k, CRT_POS[1] + j - k, WIDTH));
                                }
                            }
                            win_patterns.push(temp_pattern);
                        }
                        break;
                    default:
                        break;
                }
            }

        }
        key++;
    });

    let max = 0;
    win_patterns.forEach(pattern => {
        let once_pp = getPatternPoint(pattern, currentGame, WIN_LEN, droppedPlayer);
        //max = once_pp > max ? once_pp : max;
        //console.log('TONO',once_pp, max, pattern);
        max+=once_pp;
    });

    return max;
}

function getNextGames(currentGame: number[], nextPlayer: number, width: number): number[][] /* next games*/ {
    let res: number[][] = [];

    getCanDroppedKeys(currentGame, width)/*All dropえる positions*/.forEach(p => {
        let once_nextGame = currentGame.slice(0);
        once_nextGame[p] = nextPlayer;
        res.push(once_nextGame);
    });

    return res;
}

function getCanDroppedKeys(currentGame: number[], width: number): number[] {
    let res: number[] = [];
    let i: number = 0;
    currentGame.forEach(p => {
        if (p === 0) { //加入跳过边缘空白的检测（？）
            res.push(i);
        }
        i++;
    });

    return res;
}

function getKeyAt(x: number, y: number, width: number): number {
    return width * y + x;
}

function getPosByKey(key: number, width: number): number[] {
    return [key % width, Math.floor(key / width)];
}

function getPatternPoint(pattern: number[], blocks: number[], winlen: number, player: number): number {
    let playerCount = 0, blankCount = 0;

    for (let i = 1; i < winlen; i++) {
        switch (blocks[pattern[i]]) {
            case 0:
                blankCount++;
                break;
            default:
                if (blocks[pattern[i]] === player) {
                    playerCount++;
                }else{playerCount--;}
                break;
        }
    }
    
    if (playerCount + blankCount === winlen-1) {
        return playerCount+100 ;
    } else{
        return playerCount ;
    }
}

export default getNextKey;