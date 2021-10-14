import React from 'react';

interface P {
    command: TimerCommand;
}

interface S {
    command: TimerCommand;
    second: number;
}

export enum TimerCommand {
    default, Start, Stop, Clear, StopAndClear
}

export default class Timer extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            command: TimerCommand.default,//0 default, 1 start, 2 stop, 3 clear, 4 stop&clear
            second: 0
        };
    }

    timer: any; //NodeJS.Timeout = new NodeJS.Timeout();
    /*
        componentDidMount() {
            if (!this.mounted) { this.mounted = true; }
        }
        
        componentWillUnmount() {
            stop();
            clear();
        }
        */


        /*
        
    UNSAFE_componentWillReceiveProps(nextProps: P): void {
        if (nextProps.command !== this.props.command) {
            this.setState({
                command: nextProps.command
            });
        }
    }

    UNSAFE_componentWillUpdate(nextProps: P, nextState: S): void {
        if (nextState.command !== this.props.command) {
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
        
        */


    static getDerivedStateFromProps(nextProps: P, prevProps: S) {
        console.log(nextProps, prevProps);
        const command = nextProps.command;

        if (command !== prevProps.command) {
            return {command: command};
        }

        return null;
    }

    getSnapshotBeforeUpdate(nextProps: P, nextState: S): any {
        console.log(nextState.command , this.props.command);
        console.log(typeof nextState.command ,typeof this.props.command);
        if (nextState.command !== this.props.command) {
            switch (nextState.command) {
                case TimerCommand.Start:
                    console.log(0);
                    this.start();
                    break;
                case TimerCommand.Stop:
                    console.log(1);
                    this.stop();
                    break;
                case TimerCommand.Clear:
                    console.log(2);
                    this.clear();
                    break;
                case TimerCommand.StopAndClear:
                    console.log(3);
                    this.stop();
                    this.clear();
                    break;
                default:
                    console.log(4);
                    break;
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: P, prevState: S, snapshot: any){

        
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

        this.setState((state: S) => ({
            second: ++state.second
        }));
    }

    render(): JSX.Element {
        return (
            <span>{String(Math.floor(this.state.second / 60)).padStart(2, '0') + ":" + String(this.state.second % 60).padStart(2, '0')}</span>
        );
    }
}