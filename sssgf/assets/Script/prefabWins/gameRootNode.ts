import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameRootNode extends winRootNode {
    public inint(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onOpen(args: any): void {
        this.showAction(this.actionType.fadeIn, cc.v3(0,0,0),undefined);
    }
    public onClose(uiname: any): void {
        throw new Error("Method not implemented.");
    }
    public onClear(): void {
        throw new Error("Method not implemented.");
    }

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
