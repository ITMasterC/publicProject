import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"
const { ccclass, property } = cc._decorator;
@ccclass
export default class mainNode extends winRootNode {
    public inint(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onOpen(args: any): void {
        this.showAction(this.actionType.showTopPopUp,cc.v3(0,0,0), undefined);
    }
    public onClose(uiname: any): void {
        this.hideAction(this.actionType.moveHide, cc.v3(0,cc.winSize.height, 0), function(){
            conMager.getInstance().hideWinNode(KEY.UIName.mainNode)
        })
        conMager.getInstance().showWinNode(KEY.UIName.gameRootNode, undefined)
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
        //this.showAction("scaleBigShow",undefined, undefined);
    }

    btnClick(){
        conMager.getInstance().playAudioEff(KEY.audioName.boss);
        conMager.getInstance().getPoolNode(KEY.poolName.tipNode, undefined, "这是一个文字提示框aaa");
    }

    // update (dt) {}
}
