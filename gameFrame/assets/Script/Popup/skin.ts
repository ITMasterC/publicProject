// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIView from "../../resources/coreScript/View/UIView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skin extends UIView {
    public inint(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onOpen(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onOpenAniOver(isopen: boolean): void {
        throw new Error("Method not implemented.");
    }
    public onClose(uiname: any): void {
        throw new Error("Method not implemented.");
    }
    public onClear(): void {
        throw new Error("Method not implemented.");
    }

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
