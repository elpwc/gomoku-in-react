import React from 'react';

var w: number = 5, h: number = 5, wl: number = 3, pn: number = 2;

function inputChange(e: any) {
    switch (e.target.id) {
        case "tb_w":
            w = e.target.value;
            break;
        case "tb_h":
            h = e.target.value;
            break;
        case "tb_wl":
            wl = e.target.value;
            break;
        case "tb_pn":
            pn = e.target.value;
            break;
        default:
            break;
    }
}

function InputBox(props: any, contents: any): JSX.Element {
    return (
        <div>
            <span>{props.children}</span>
            <input type="text" placeholder={isNaN(props.placeholder) ? "" : props.placeholder} id={props.id} onChange={inputChange} defaultValue={isNaN(props.default) ? "" : props.default}></input>
        </div>
    );
}

export default class SettingBox extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        w = this.props.width;
        h = this.props.height;
        wl = this.props.winlen;
        pn = this.props.playernum;
    }

    render(): JSX.Element {
        return (
            <div>
                <InputBox default={w} id="tb_w">Width</InputBox>
                <InputBox default={h} id="tb_h">Height</InputBox>
                <InputBox default={wl} id="tb_wl">WinLength</InputBox>
                <InputBox default={pn} id="tb_pn">PlayerNum</InputBox>
                <button onClick={() => this.props.onClick(w, h, wl, pn)}>Apply</button>
            </div>
        );
    }
}