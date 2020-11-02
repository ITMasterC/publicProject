import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"
const {ccclass, property} = cc._decorator;

@ccclass
export default class gameScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        LogWrap.log("test log");
        LogWrap.info("test info");
        LogWrap.warn("test warn");
        LogWrap.err("test err");

        let frameSize = cc.view.getFrameSize();
        let bFitWidth = (frameSize.width / frameSize.height) < (720 / 1280)
        cc.Canvas.instance.fitWidth = bFitWidth;
        cc.Canvas.instance.fitHeight = !bFitWidth;

    }

    start () {
        // window._conMager.showWinNode("mainNode", undefined, 1,"str", false);
        conMager.getInstance().showWinNode("mainNode", undefined)
    }   

    // update (dt) {}
}
