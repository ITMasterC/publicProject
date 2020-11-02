import { KEY } from "../../KEY";
export default class winNodeMager extends cc.Component {
    nodes: any = {};
    bundle : any;
    constructor(){
        super();
    }
    init(){
        //prefabsWinNodes
        cc.assetManager.loadBundle("prefabsWinNodes", undefined ,(err, bundle)=>{
            this.bundle = bundle;
        })
    }
    
    showWinNode(type:string, cb){
        //console.log('--------------prefabsWinNodes', type, KEY.UIName[type],KEY.UICF[type].prefab);
        if(this.nodes[type] != undefined){
            cb(this.nodes[type]);
        }else{
            this.bundle.load(KEY.UICF[type].prefab, cc.Prefab,(err, prefab) => {
                this.nodes[type] = cc.instantiate(prefab);
                this.nodes[type].active = true;
                cb(this.nodes[type]);
            });
        }
    }

    hideWinNode(type: string){
        if(!this.nodes[type])return;
        if(KEY.UICF[type].isCommonlyUsed){
            this.nodes[type].removeFromParent();
            this.nodes[type].active = false;
        }else{
            this.nodes[type].destroy();
            this.bundle.release(KEY.UICF[type].prefab);
            this.nodes[type] = undefined;
        }
    }
}

// window['_winNodeMager'] = new winNodeMager();
