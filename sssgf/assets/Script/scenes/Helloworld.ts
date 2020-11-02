const {ccclass, property} = cc._decorator;
import {winRootNode, KEY, conMager, _pl_fun, LogWrap, NumberUtil} from "./../SSSGF/ssscgf"
@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'loading...';

    timeFlag: 0;

    start () {
        _pl_fun.getInstance().init();
        conMager.getInstance().init();
        // init logic
        this.label.string = this.text;
        this.timeFlag = 0;
        // window._winNodeMager.init();
        cc.assetManager.loadBundle("scenes",(err:any, bundle)=>{
            this.loadingEnd(bundle);
        })
    }

    loadingEnd(bundle){
        bundle.loadScene('gameScene', function (err, scene) {
            cc.director.runScene(scene);
        });
    }

    update(dt){
        this.timeFlag++;
        if(this.timeFlag == 15)this.label.string = 'loading...';
        if(this.timeFlag == 30)this.label.string = 'loading..';
        if(this.timeFlag == 45){
            this.timeFlag = 0;
            this.label.string = 'loading.';
        }
    }
}
