import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.x = cc.winSize.width * (this.node.x / 720);
        this.node.y = cc.winSize.height * (this.node.y / 1280);
    }

    start () {

    }

    // update (dt) {}
}
