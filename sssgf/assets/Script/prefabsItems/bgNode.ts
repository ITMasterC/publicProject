
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
    }

    start () {

    }

    // update (dt) {}
}
