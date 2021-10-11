import React from 'react';
import './main.css';

namespace GameMain {

    const PLAYER1: string = "〇", PLAYER2: string = "╳";

    function Block(props: any): JSX.Element {
        const CURRENT: number = props.crt, WIDTH: number = props.width;
        var text: string = "";

        if (CURRENT == 1) {//0: o, 1: x;
            text = PLAYER1;
        } else if (CURRENT == 2) {
            text = PLAYER2;
        } else if (CURRENT == 0) {
            text = "";
        }

        return (
            <div
                className={"block block_" + String(CURRENT) + (props.win ? " win" : "")}
                style={{
                    width: String(Math.floor(600 / WIDTH)) + "px",
                    height: String(Math.floor(600 / WIDTH)) + "px",
                    fontSize: String(Math.floor(600 / WIDTH) * 0.75) + "px"
                }}
                onClick={props.onClick}
            >
                <span>{text}</span>
            </div>
        );
    }

    class ChessBoard extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {

            }
        }

        render(): JSX.Element {
            const WIDTH: number = this.props.width, HEIGHT: number = this.props.height;

            let firstRow: number[] = [];
            for (let i = 0; i < HEIGHT; i++) {
                firstRow.push(i * WIDTH);
            }

            var innerblocks: JSX.Element[] = firstRow.map(i => {
                let crtLine: number[] = [];
                for (let j = 0; j < WIDTH; j++) {
                    crtLine.push(i + j);
                }
                return (
                    <div className="horiz" key={i}>{
                        crtLine.map(j => {
                            var t_win: boolean = false;

                            //console.log(props.win_pattern);
                            if (this.props.win_pattern && this.props.win_pattern.includes(j)) { t_win = true; }
                            return (
                                <Block crt={this.props.blocks[j]} onClick={() => this.props.onClick(j)} win={t_win} key={j} width={WIDTH} />
                            );
                        })
                    }
                    </div>
                );
            });

            return (
                <div className="chessboard">
                    {innerblocks}
                </div>
            );
        }
    }

    class Timer extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                command: 0,//0 default, 1 start, 2 stop, 3 clear, 4 stop&clear
                second: 0
            };
        }

        timer: any;
        /*
            componentDidMount() {
                if (!this.mounted) { this.mounted = true; }
            }
            
            componentWillUnmount() {
                stop();
                clear();
            }
            */

        componentWillReceiveProps(nextProps: any): void {
            if (nextProps.command !== this.props.command) {
                this.setState({
                    command: nextProps.command
                });
            }
        }

        componentWillUpdate(nextProps: any, nextState: any): void {
            if (nextState.command != this.props.command) {
                switch (nextState.command) {
                    case 1:
                        this.start();
                        break;
                    case 2:
                        this.stop();
                        break;
                    case 3:
                        this.clear();
                        break;
                    case 4:
                        this.stop();
                        this.clear();
                        break;
                    default:
                        break;
                }
            }
        }

        componentWillUnmount(): void {
            clearInterval(this.timer);
        }

        start(): void {
            this.setState({
                command: 0
            });
            this.timer = setInterval(() => this.run(), 1000);
        }

        stop(): void {
            this.setState({
                command: 0
            });
            clearInterval(this.timer);
        }

        clear(): void {
            this.setState({
                command: 0,
                second: 0
            });
        }

        run(): void {
            this.setState((state: any) => ({
                second: ++state.second
            }));
        }

        render(): JSX.Element {
            return (
                <span>{String(Math.floor(this.state.second / 60)).padStart(2, '0') + ":" + String(this.state.second % 60).padStart(2, '0')}</span>
            );
        }
    }

    class MyGame extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                next: "0",
                history_boards: [],
                blocks: this.getInitArr(this.props.width * this.props.height),
                matchResult: {
                    available: false,
                    winner: -1,
                    pattern: this.getInitWonPatternMatchResult(this.props.winLength)
                },
                timer_command: 0
            }
        }

        clear_onClick(): void {
            this.setState({
                next: "0",
                history_boards: [],
                blocks: this.getInitArr(this.props.width * this.props.height),
                matchResult: {
                    available: false,
                    winner: -1,
                    pattern: this.getInitWonPatternMatchResult(this.props.winLength)
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

        isWin(blocks: number[]): any {
            var t_flag: boolean = false;
            var t_pattern: number[] = this.getInitWonPatternMatchResult(this.props.winLength);

            const WIDTH: number = this.props.width, HEIGHT: number = this.props.height, WIN_LEN: number = this.props.winLength;
            blocks.forEach(b => {
                if (b != 0) {
                    const CRT_P = b;

                    //generate pattern
                    var win_patterns: number[][] = [];
                    /// TODO: 对任意位置的block的所有won patterns的获取 ，随后在下侧判断

                }
            });

            /*
            [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ].forEach(pattern => {
                if (blocks[pattern[0]] != 0 &&
                    blocks[pattern[1]] != 0 &&
                    blocks[pattern[2]] != 0 &&
                    blocks[pattern[0]] === blocks[pattern[1]] &&
                    blocks[pattern[1]] === blocks[pattern[2]]) {
                    t_pattern = pattern;
                    t_flag = true;
                }
            });
            */

            if (t_flag) {
                if (this.inAGame) {
                    this.inAGame = false;
                    this.setState({
                        timer_command: 2
                    });
                }

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
            if (!this.inAGame) {
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
                    if (this.state.next == "0") {
                        t_blocks[index] = 2;
                    } else if (this.state.next == "1") {
                        t_blocks[index] = 1;
                    }
                }

                var t_res: any = this.isWin(t_blocks);
                this.setState((state: any) => ({
                    history_boards: t_histo,
                    next: state.next == "0" ? "1" : "0",
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
                if (!this.state.blocks.includes(0)) {
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
                this.setState((state: any) => ({
                    history_boards: t_histo,
                    next: this.state.next == "0" ? "1" : "0",
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

        render() {
            return (
                <div className="contents">
                    <div className="horiz">
                        <ChessBoard
                            onClick={this.block_onClick.bind(this)}
                            blocks={this.state.blocks}
                            win_pattern={this.state.matchResult.pattern}
                            width={this.props.width}
                            height={this.props.height}
                            winLength={this.props.winLength}
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
                                    ("winner is " + (this.state.matchResult.winner == "1" ? PLAYER1 : PLAYER2))) :
                                "next player: " + (this.state.next == "1" ? PLAYER1 : PLAYER2)
                        }</span>
                        <span id="bottombar-item"><Timer command={this.state.timer_command} /></span>
                    </h1>
                </div>
            );
        }
    }

    export function GameMain() {
        return (
            <MyGame width="5" height="5" winLength="3" />
        );
    }


}
export default GameMain;