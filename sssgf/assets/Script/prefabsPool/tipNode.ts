import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"
const {ccclass, property} = cc._decorator;

@ccclass
export default class tipNode extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    bgNode: cc.Node = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onOpen(args){
        this.label.string = args[0];
        this.bgNode.width = this.label.node.width+150;
        this.startAction(this.endAction.bind(this));
    }

    startAction(cb){
        this.node.opacity = 255;
        this.node.setScale(0);
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(1, {
                scale: 1.2
            }, {
                easing: "bounceOut",
                number: 2
            })
            .to(2, {
                opacity: 0
            }, {
                easing: "sineIn",
                number: 2
            })
            .call(function () {
                cb();
            })
            .start()
    }

    endAction(){
        conMager.getInstance().putPoolNode(this.node.name, this.node);
    }

    // update (dt) {}
}
