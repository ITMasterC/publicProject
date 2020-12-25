import { winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil } from "./../SSSGF/ssscgf"

const { ccclass, property } = cc._decorator;
// let breathAction = "breathAction";
// let scaleSmallHide = "scaleSmallHide";
// let moveHide = "moveHide";
// let fadeOut = "fadeOut";
// let scaleBigShow = "scaleBigShow";
// let moveShow = "moveShow";
// let fadeIn = "fadeIn";
// let showTopPopUp = "showTopPopUp";
// let itemShowScaleBig = "itemShowScaleBig";
// let angleChange = "angleChange";

// const actionType = cc.Enum({
//     breathAction = "breathAction",//呼吸动作
//     scaleSmallHide= "scaleSmallHide",//缩小隐藏
//     moveHide= "moveHide",//移动消失
//     fadeOut= "fadeOut",//渐隐效果
//     scaleBigShow= "scaleBigShow",//放大显示
//     moveShow= "moveShow",//移动显示
//     fadeIn= "fadeIn",//渐显效果；
//     showTopPopUp= "showTopPopUp",//从上方弹出
//     itemShowScaleBig= "itemShowScaleBig",//item 出现动画 放大 抖动
//     angleChange= "angleChange",//左右晃动 -- 循坏
// })
const actionTypes = ["angleChange", "breathAction", "scaleBigShow", "moveShow", "fadeIn", "showTopPopUp", "itemShowScaleBig", "scaleSmallHide", "moveHide", "fadeOut"]
@ccclass
export default class UIAction extends winRootNode {
    public inint(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onOpen(args: any): void {
        throw new Error("Method not implemented.");
    }
    public onClose(cb?: any): void {
        if(this.hideActionType > 6)this[actionTypes[this.hideActionType]](this.hideEndPos, cb);
    }
    public onClear(): void {
        throw new Error("Method not implemented.");
    }

    // @property(cc.Label)
    // label: cc.Label = null;

    @property({
        displayName: "循环播放的动画类型",
        type: cc.Enum({
            non: 10,
            angleChange: 0,
            breathAction: 1,
        })
    })
    cycleAction: number = 10;

    @property({
        displayName: "出现时播放的动画类型",
        type: cc.Enum({
            non: 1,
            scaleBigShow: 2,
            moveShow: 3,
            fadeIn: 4,
            showTopPopUp: 5,
            itemShowScaleBig: 6,
        })
    })
    showActionType: number = 1;
    @property({
        displayName: "最终出现位置",
        type: cc.Vec3
    })
    showEndPos: cc.Vec3 = new cc.Vec3;

    @property({
        displayName: "隐藏时播放的动画类型",
        type: cc.Enum({
            non: 6,
            scaleSmallHide: 7,
            moveHide: 8,
            fadeOut: 9,
        })
    })
    hideActionType: number = 6;
    @property({
        displayName: "最终隐藏位置",
        type: cc.Vec3
    })
    hideEndPos: cc.Vec3 = new cc.Vec3;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.showAction(this.actionType.angleChange);
        this.node.x = cc.winSize.width * (this.node.x / 1280);
        this.node.y = cc.winSize.height * (this.node.y / 720);
        this.showEndPos.x = cc.winSize.width * (this.showEndPos.x / 1280);
        this.showEndPos.y = cc.winSize.height * (this.showEndPos.y / 720);
        this.hideEndPos.x = cc.winSize.width * (this.hideEndPos.x / 1280);
        this.hideEndPos.y = cc.winSize.height * (this.hideEndPos.y / 720);
    }

    start() {

    }

    onEnable(){
        if(this.showActionType > 1){
            this[actionTypes[this.showActionType]](this.showEndPos, this.startCycleAction.bind(this));
        }else{
            this.startCycleAction();
        }
    }

    startCycleAction(){
        if(this.cycleAction < 10)this[actionTypes[this.cycleAction]]();
    }


    

    // update (dt) {}
}
