import React from 'react';
import Block from './block';

export default class ChessBoard extends React.Component<any, any> {
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
