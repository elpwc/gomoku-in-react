let w: number = 5, h: number = 5, wl: number = 3, pn: number = 2;

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

interface P_InputBox {
    children: string;
    placeholder: string;
    id: string;
    default: string;
}

function InputBox(props: P_InputBox): JSX.Element {
    return (
        <div>
            <span>{props.children}</span>
            <input type="text" placeholder={(props.placeholder === null) ? "" : props.placeholder} id={props.id} onChange={inputChange} defaultValue={props.default === null ? "" : props.default}></input>
        </div>
    );
}

interface P_SettingBox {
    width: number;
    height: number;
    winlen: number;
    playernum: number;
    onClick: any;
}

export default function SettingBox(props: P_SettingBox) {
    w = props.width;
    h = props.height;
    wl = props.winlen;
    pn = props.playernum;

    return (
        <div>
            <InputBox default={String(w)} id="tb_w" placeholder="">Width</InputBox>
            <InputBox default={String(h)} id="tb_h" placeholder="">Height</InputBox>
            <InputBox default={String(wl)} id="tb_wl" placeholder="">WinLength</InputBox>
            <InputBox default={String(pn)} id="tb_pn" placeholder="">PlayerNum</InputBox>
            <input id="checkbox1" type="checkbox" /><span>AI</span>&nbsp;&nbsp;&nbsp;
            <button onClick={() => props.onClick(w, h, wl, pn, (document.getElementById('checkbox1') as HTMLInputElement).checked)}>Apply</button>
        </div>
    );

}