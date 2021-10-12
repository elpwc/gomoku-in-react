import React from 'react';
import { PLAYER_LIST } from './global';
import ChessBoard from './chess_board';
import Timer from './timer';
import SettingBox from './settingbox';
import './main.css';

namespace GameMain {


    class MyGame extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                next: 1,
                history_boards: [],
                blocks: this.getInitArr(this.props.width * this.props.height),
                matchResult: {
                    available: false,
                    winner: -1,
                    pattern: this.getInitWonPatternMatchResult(this.props.winLength)
                },
                timer_command: 0,
                width: this.props.width,
                height: this.props.height,
                winlength: this.props.winLength,
                playernum: this.props.playernum
            }
        }

        clear_onClick(): void {
            this.inAGame = false;
            this.setState({
                next: 1,
                history_boards: [],
                blocks: this.getInitArr(this.state.width * this.state.height),
                matchResult: {
                    available: false,
                    winner: -1,
                    pattern: this.getInitWonPatternMatchResult(this.state.winLength)
                },
                timer_command: 4
            });
        }

        getInitArr(count: number): number[] {
            var res: number[] = [];
            for (let i = 0; i < count; i++) {
                res.push(0);
            }
            return res;
        }

        getInitWonPatternMatchResult(winLen: number): number[] {
            var res: number[] = [];
            for (let i = 0; i < winLen; i++) {
                res.push(-1);
            }
            return res;
        }

        getKeyAt(x: number, y: number): number {
            return this.state.width * y + x;
        }

        getPosByKey(key: number): number[] {
            return [key % this.state.width, Math.floor(key / this.state.width)];
        }

        isPatternWin(pattern: number[], blocks: number[]): boolean {
            var res: boolean = true;
            if (blocks[pattern[0]] == 0) {
                return false;
            }

            for (let i = 1; i < this.state.winlength; i++) {

                if (blocks[pattern[i]] != blocks[pattern[i - 1]] || blocks[pattern[i]] == 0) {
                    res = false;
                    break;
                }
            }
            return res;
        }

        isWin(blocks: number[]): any {
            const WIDTH: number = this.state.width, HEIGHT: number = this.state.height, WIN_LEN: number = this.state.winlength;
            var t_flag: boolean = false;
            var t_pattern: number[] = this.getInitWonPatternMatchResult(WIN_LEN);

            var key = 0
            var win_patterns: number[][] = [];
            blocks.forEach(b => {
                if (b != 0) {
                    const CRT_PLYR = b, CRT_POS = this.getPosByKey(key);

                    //generate pattern

                    /// TODO: 对任意位置的block的所有won patterns的获取 ，随后在下侧判断

                    for (let i = 0; i < 4; i++) {
                        var temp_pattern: number[] = [];
                        var thre1: number = -1, thre2: number = -1;
                        switch (i) {
                            case 0://horiz(left)
                                for (let j = 0; j < WIN_LEN; j++) {
                                    temp_pattern = [];
                                    for (let k = 0; k < WIN_LEN; k++) {
                                        thre1 = CRT_POS[0] - j + k;
                                        if (thre1 >= 0 && thre1 < WIDTH) {
                                            temp_pattern.push(this.getKeyAt(CRT_POS[0] - j + k, CRT_POS[1]));
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
                                            temp_pattern.push(this.getKeyAt(CRT_POS[0], CRT_POS[1] - j + k));
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
                                            temp_pattern.push(this.getKeyAt(CRT_POS[0] - j + k, CRT_POS[1] - j + k));
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
                                            temp_pattern.push(this.getKeyAt(CRT_POS[0] - j + k, CRT_POS[1] + j - k));
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

            win_patterns.forEach(pattern => {
                if (this.isPatternWin(pattern, blocks)) {
                    t_pattern = pattern;
                    t_flag = true;
                }
            });

            if (t_flag) {
                if (this.inAGame) {
                    this.inAGame = false;
                    this.setState({
                        timer_command: 2
                    });
                }

                this.inAGame = false;
                return ({
                    available: true,
                    winner: blocks[t_pattern[0]],
                    pattern: t_pattern
                });
            } else {
                if (!blocks.includes(0)) {
                    if (this.inAGame) {
                        this.inAGame = false;
                        this.setState({
                            timer_command: 2
                        });
                    }

                    this.inAGame = false;
                    return ({
                        available: true,
                        winner: -1,
                        pattern: t_pattern
                    });
                }

                return ({
                    available: false,
                    winner: -1,
                    pattern: t_pattern
                });
            }

        }

        inAGame: boolean = false;

        block_onClick(index = 0): void {
            if (!this.inAGame && !this.state.matchResult.available) {
                this.inAGame = true;
                console.log(9);
                this.setState({
                    timer_command: 1
                });
            }

            if (!this.state.matchResult.available && this.state.blocks[index] == 0) {
                var t_blocks: number[] = this.state.blocks.slice(0);
                var t_histo: number[][] = this.state.history_boards.slice(0);
                t_histo.push(t_blocks);
                console.log(t_histo);

                if (t_blocks[index] == 0) {
                    t_blocks[index] = this.state.next;
                }

                var t_res: any = this.isWin(t_blocks);
                var t_next = this.state.next + 1;
                this.setState((state: any) => ({
                    history_boards: t_histo,
                    next: t_next > this.state.playernum ? 1 : t_next,
                    blocks: t_blocks,
                    matchResult: {
                        available: t_res.available,
                        winner: t_res.winner,
                        pattern: t_res.pattern
                    }
                }));
            }
        }

        redo_onClick(): void {
            if (this.state.history_boards.length > 0) {

                var t_time_command: number = 0;
                if (!this.inAGame) {
                    this.inAGame = true;
                    t_time_command = 1;
                }

                var t_blocks: number[] = this.getInitArr(this.props.width * this.props.height);
                if (this.state.history_boards.length != 1) {
                    t_blocks = this.state.history_boards.slice(0)[this.state.history_boards.length - 2];
                }

                var t_histo: number[] = this.state.history_boards.slice(0);
                t_histo.pop();
                console.log(t_histo);

                var t_res: any = this.isWin(t_blocks);
                var t_next = this.state.next + 1;
                this.setState((state: any) => ({
                    history_boards: t_histo,
                    next: t_next > this.state.playernum ? 1 : t_next,
                    blocks: t_blocks,
                    matchResult: {
                        available: t_res.available,
                        winner: t_res.winner,
                        pattern: t_res.pattern
                    },
                    timer_command: t_time_command
                }));
            }

        }

        apply_onClick(width: number, height: number, winlen: number, playernum: number) {
            this.inAGame = false;
            this.setState({
                next: 1,
                history_boards: [],
                blocks: this.getInitArr(width * height),
                matchResult: {
                    available: false,
                    winner: -1,
                    pattern: this.getInitWonPatternMatchResult(winlen)
                },
                timer_command: 4,
                width: width,
                height: height,
                winlength: winlen,
                playernum: playernum
            });
        }

        render() {
            return (
                <div>
                    <div className="left-contents">
                        <SettingBox onClick={this.apply_onClick.bind(this)} width={this.state.width} height={this.state.height} winlen={this.state.winlength} playernum={this.state.playernum} />
                    </div>

                    <div className="contents">
                        <div className="horiz">

                            <ChessBoard
                                onClick={this.block_onClick.bind(this)}
                                blocks={this.state.blocks}
                                win_pattern={this.state.matchResult.pattern}
                                width={this.state.width}
                                height={this.state.height}
                                winlength={this.state.winLength}
                            />

                            <div className="verti">
                                <button className="btn" onClick={() => { this.clear_onClick() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    clear
                                </button>

                                <button className="btn" onClick={() => { this.redo_onClick() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    redo
                                </button>
                            </div>
                        </div>

                        <h1 id="bottombar">
                            <span id="bottombar-item">{
                                this.state.matchResult.available ?
                                    (this.state.matchResult.winner == -1 ?
                                        "no space to put, please press the clear or redo button." :
                                        ("winner is " + (PLAYER_LIST[this.state.matchResult.winner - 1]))) :
                                    "next player: " + (PLAYER_LIST[this.state.next - 1])
                            }</span>
                            <span id="bottombar-item"><Timer command={this.state.timer_command} /></span>
                        </h1>
                    </div>
                </div>
            );
        }
    }

    export function GameMain() {
        return (
            <MyGame width="20" height="20" winLength="5" playernum="2" />
        );
    }


}
export default GameMain;