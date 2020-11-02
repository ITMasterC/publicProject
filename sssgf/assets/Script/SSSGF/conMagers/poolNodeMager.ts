import { KEY } from "../../KEY";
export default class poolNodeMager extends cc.Component {
    nodes: any = {};
    bundle : any;
    constructor(){
        super();
    }
    init(){
        //prefabsWinNodes
        cc.assetManager.loadBundle("prefabsPoolNodes", undefined ,(err, bundle)=>{
            this.bundle = bundle;
        })
    }
    
    getPoolNode(type:string, cb){
        //console.log('--------------prefabsWinNodes', type, KEY.UIName[type],KEY.UICF[type].prefab);
        let node = undefined;
        if(this.nodes[type] != undefined){//已经加载过的 直接获取
            if(KEY.POOLCF[type].usePool){
                if (this.nodes[type+"Pool"].size() > 0) {
                    node = this.nodes[type+"Pool"].get();
                } else {
                    node = cc.instantiate(this.nodes[type]);
                }
            }else{
                node = cc.instantiate(this.nodes[type]);
            }
            cb(node);
        }else{//第一次通过异步加载获得
            this.bundle.load(KEY.POOLCF[type].prefab, cc.Prefab,(err, prefab) => {
                this.nodes[type] = prefab;
                if(KEY.POOLCF[type].usePool){
                    this.nodes[type+"Pool"] = new cc.NodePool();
                }
                node = cc.instantiate(prefab);
                cb(node);
            });
        }
    }

    putPoolNode(type: string, node: any){
        if(KEY.POOLCF[type].usePool){
            if(KEY.POOLCF[type].maxCount > this.nodes[type+"Pool"].size()){
                this.nodes[type+"Pool"].put(node);
                return;
            }
        }
        node.destroy();
    }
}

// window['_poolNodeMager'] = new poolNodeMager();
