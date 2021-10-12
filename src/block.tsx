import React from 'react';
import { PLAYER_LIST } from './global';

function Block(props: any): JSX.Element {
    const CURRENT: number = props.crt, WIDTH: number = props.width;
    var text: string = "";

    if (CURRENT == 0) {//0: o, 1: x;
        text = "";
    } else {
        text = PLAYER_LIST[CURRENT - 1];
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

export default Block;