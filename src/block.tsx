import React, { EventHandler } from 'react';
import { PLAYER_LIST } from './global';

interface P {
    crt: number;
    width: number;
    win: boolean;
    onClick: EventHandler<React.SyntheticEvent> | undefined;
}

function Block(props: P): JSX.Element {
    const CURRENT: number = props.crt, WIDTH: number = props.width;

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
            <span>{CURRENT === 0 ? "" : PLAYER_LIST[CURRENT - 1]}</span>
        </div>
    );
}

export default Block;