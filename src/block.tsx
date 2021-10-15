import { render } from '@testing-library/react';
import { WSAEINVALIDPROVIDER } from 'constants';
import React, { EventHandler } from 'react';
import { PLAYER_LIST } from './global';

interface P {
    crt: number;
    width: number;
    win: boolean;
    onClick: EventHandler<React.SyntheticEvent> | undefined;
    startChangingColor?: number;
}

interface S {
    startChangingColor: number,
    color: number,
    ms: number
}

class Block extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            startChangingColor: 0,//0 wait, 1 command received, 2 processing, 3 stoped
            color: 0,
            ms: 0
        }
    }

    colorChangesPerMs: number = 100;

    static getDerivedStateFromProps(nextProps: P, prevState: S) {
        if (nextProps.startChangingColor !== prevState.startChangingColor) {
            return { startChangingColor: nextProps.startChangingColor };
        }
        return null;
    }

    getSnapshotBeforeUpdate(nextProps: P, nextState: S) {
        if (nextState.startChangingColor !== this.props.startChangingColor) {
            console.log(nextState);
            if (nextState.startChangingColor === 1) {
                //start changing color
                this.timer = setInterval(() => this.timetick(), this.colorChangesPerMs);
                this.setState({ startChangingColor: 2 });
            }
        }
        return null;
    }

    componentDidUpdate() { };

    timer: any;

    timetick() {
        this.setState((state: S) => ({ ms: state.ms + this.colorChangesPerMs }));
        if (this.state.ms > (255 * this.colorChangesPerMs)) {
            this.setState({ ms: 0, startChangingColor: 3 });
            clearInterval(this.timer);
        }
        this.setColor(this.state.color - 1);
    }

    setColor(color: number) {
        this.setState({ color: color });
    }

    render() {
        const CURRENT: number = this.props.crt, WIDTH: number = this.props.width;
        const bgc: string = 'rgb(' + this.state.color + "," + this.state.color + "," + this.state.color + ')';
        return (
            <div
                className={"block block_" + String(CURRENT) + (this.props.win ? " win" : "")}
                style={{
                    width: String(Math.floor(600 / WIDTH)) + "px",
                    height: String(Math.floor(600 / WIDTH)) + "px",
                    fontSize: String(Math.floor(600 / WIDTH) * 0.75) + "px",
                    backgroundColor: this.state.startChangingColor === 2 ? bgc : ''
                }}
                onClick={this.props.onClick}
            >
                <span>{CURRENT === 0 ? "" : PLAYER_LIST[CURRENT - 1]}</span>
            </div>
        );
    }
}

export default Block;