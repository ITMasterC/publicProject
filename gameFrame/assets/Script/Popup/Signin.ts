// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UIView from "../coreScript/View/UIView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Signin extends UIView {
    public inint(args: any): void {
       cc.log("inint")
    }
    public onOpen(args: any): void {
       cc.log("onOpen")
    }
    public onOpenAniOver(isopen: boolean): void {
       cc.log("onOpenAniOver")
    }
    public onClose(uiname: any): void {
       cc.log("onClose")
    }
    public onClear(): void {
       cc.log("onClear")
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
