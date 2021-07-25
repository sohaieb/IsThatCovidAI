import {ButtonCallback} from "../_types/GlobalTypes";

export interface ButtonListener {
    button: Node | HTMLElement;
    action: string;
    callback: ButtonCallback
}