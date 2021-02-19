// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LoadMgr } from "../../Manager/LoadMgr";
import { MonitorMgr } from "../../Manager/MonitorMgr";
import { UIMgr } from "../../Manager/UIMgr";
import { Utils } from "../Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.Node)
    MainCamera: cc.Node         = null;
    @property(cc.Node)
    Map: cc.Node                = null;
    @property(cc.Node)
    moduleContent: cc.Node      = null;
    @property(cc.Node)
    mapBox: cc.Node = null;
    
    
    /**地图数据 */
    MapData:any = {}
    /**怪物数据 */
    MonsterData:any = {}
    /**物品数据 */
    ArticleData:any = {}

    isBlack:boolean             = false 
    container:cc.Node           = null

    lastModule:cc.Node          = null
    moduleArray:Array<string>   = null



    onLoad () {
        this.container = this.node.getChildByName("container")
        this.initList()
        this.moduleContent.getComponent
        
    }
    // start () {}
    // update (dt) {}

    initList(){
        this.moduleArray = ["mapScrollView","monsterScrollView","articleScrollView"]
        //初始化按钮选择按钮
        let moduleContentChildren = this.moduleContent.children
        this.lastModule = moduleContentChildren[0].getChildByName("Label")
        for(let i = 0, len = moduleContentChildren.length; i < len; i++ ){
            moduleContentChildren[i].on(cc.Node.EventType.TOUCH_START,this.selModule,this)
        }
    }
  
    /**选择模块 */
    selModule(e){
        this.lastModule.color = cc.color(255,255,255,255)
        let lastindex = this.lastModule.parent.getSiblingIndex()
        let node = e.target.getChildByName("Label")
        node.color = cc.color(207,11,11,255)
        this.lastModule = node
        let index = node.parent.getSiblingIndex()
        
        this.container.getChildByName(this.moduleArray[lastindex]).active = false
        this.container.getChildByName(this.moduleArray[index]).active = true
    }
   
   
    back(e){
        let node  =e.target
        let parentNode = node.parent
        let move
        if(!this.isBlack){
            this.isBlack = true
            this.mapBox.active = false
            move = cc.moveTo(0.4,cc.v2(640,0))
       
            node.getChildByName("Label").getComponent(cc.Label).string = "弹出"
        }else{
            this.isBlack = false
            move = cc.sequence(cc.moveTo(0.4,cc.v2(320,0)),cc.callFunc(()=>{
                this.mapBox.active = true
            },this))
            
            node.getChildByName("Label").getComponent(cc.Label).string = "收起"
        }
        parentNode.stopAllActions()
        parentNode.runAction(move)
        
        //    cc.log(e.target.parent) 
    }
    


    
    // saveMonsterData(){
    //     let data = JSON.stringify(this.MonsterData)
    //     Utils.saveForBrowser(data,"MonsterData")
    // }
    // saveArticleData(){
    //     let data = JSON.stringify(this.ArticleData)
       
    //     Utils.saveForBrowser(data,"ArticleData")
    // }
   

    

}
