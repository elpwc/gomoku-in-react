import React from 'react';

export default class Timer extends React.Component<any, any> {
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