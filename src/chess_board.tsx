import Block from './block';

interface P {
    width: number;
    height: number;
    win_pattern: number[];
    blocks: number[];
    onClick: any;
}

export default function ChessBoard(props: P) {
    const WIDTH: number = props.width, HEIGHT: number = props.height,
        innerblocks: JSX.Element[] = ([...Array(Number(HEIGHT))].map((_, i) => (i * WIDTH))).map((i: number) => {
            return (
                <div className="horiz" key={i}>{
                    ([...Array(Number/*没有Number()会导致WIDTH被认定为string*/(WIDTH))].map((_, k: number) => (i + k))).map((j) => {
                        return (
                            <Block crt={props.blocks[j]} onClick={() => props.onClick(j)} win={props.win_pattern && props.win_pattern.includes(j)} key={j} width={WIDTH} />
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
