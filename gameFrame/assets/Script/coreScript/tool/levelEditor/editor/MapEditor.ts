// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LoadMgr } from "../../../Manager/LoadMgr";
import { UIMgr } from "../../../Manager/UIMgr";
import { Utils } from "../../Utils";
import List from "../../virtualList/List";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Map: cc.Node = null;
    @property(cc.Node)
    content: cc.Node = null;

    /**地图数据 */
    MapDataArr:Array<any>       = []
    MapData:any                 = {}
    
    PlateImgData:any            = {} //图片资源
    nodeData:any                = {} //节点数据（不存储）
    PlateImgcountData:any       = {} //地块图片计数数据（不存储）

    mouseDownType:number        = 0
    row:number                  = 10
    col:number                  = 10
    gridW:number                = 200
    gridH:number                = 200
    initpos:cc.Vec2             = cc.v2(0,0)
    loadimgNum:number           = 0

    selPlateNode:cc.Node        = null
    selPlateImgName:string      = null

    @property(List)
    listV:List                  = null;
    @property(cc.Node)
    FloorScrollView:cc.Node     = null;
    listdata:Array<any>         = []
    listStatus:Boolean          = false
    listTween:cc.Tween          = null

    @property(cc.Node)
    EditBox:cc.Node             = null

    onLoad () {
        this.onMonitor()
        this.init()
        this.initMapData()
        this.initList()
    }
    start () {
        this.ImportMapData("MapData")
    }
    onMonitor(){
        this.Map.on(cc.Node.EventType.MOUSE_DOWN,this.mouseDown,this)
        this.Map.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.Map.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.Map.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this)
        this.Map.on(cc.Node.EventType.MOUSE_WHEEL,this.mouseWheel,this)
        this.Map.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)

    }
    mouseWheel(e){
        let Y = e._scrollY
        if(Y<0 && this.Map.scale>0.25){
            this.Map.scale -=0.05
        }else if(Y>=0 && this.Map.scale<1){
            this.Map.scale +=0.05
        }
        
    }
    init(){
        this.Map.width      = this.row * this.gridW
        this.Map.height     = this.col * this.gridW
        this.initpos        = cc.v2(-this.Map.width/2,-this.Map.height/2)
        //初始化地图选择按钮
        let mapContentChildren  = this.content.children
        for(let i = 0, len = mapContentChildren.length; i < len; i++ ){
            mapContentChildren[i].on(cc.Node.EventType.TOUCH_START,this.selPlate,this)
        }
        this.EditBox.getComponent(cc.EditBox).string = `${this.row}*${this.col}`
        
    }
    initMapData(){
        this.MapData        = {}
        let MapData         = {}
        for(let i = 0; i < this.row; i++){
            for(let j = 0; j < this.col ; j++){
                let key = `${i}*${j}`
                MapData[key] = {type:0,imgName:null,monster:null}
            }
        }
        this.MapData["MapData"]     = MapData
        this.MapData["row"]         = this.row
        this.MapData["col"]         = this.col
        this.MapData["PlateData"]   = []
        this.MapDataArr.push(this.MapData)
    }
    initList(){
        this.listdata = [];
        let length = this.MapDataArr.length
        for (let n: number = 0; n < length; n++) {
            this.listdata.push(n);
        }
        this.listV.numItems = length;
    }
    onListRender(item: cc.Node, idx: number) {
        item.getComponent(cc.Label).string = `第${this.listdata[idx]+1}层`;
        item["index"] = idx
    }
    back(){
        if(this.listStatus){
            if(this.listTween) this.listTween.stop()
            this.listStatus = false
            this.listTween = cc.tween(this.FloorScrollView)
            .to(0.2, { height: 200})
            .start()
            let view =this.FloorScrollView.getChildByName("view")
            this.listTween = cc.tween(view)
            .to(0.2, { height: 200})
            .start()
        }else{
            this.listStatus = true
            this.listTween = cc.tween(this.FloorScrollView)
            .to(0.2, { height: 0})
            .start()
            let view =this.FloorScrollView.getChildByName("view")
            this.listTween = cc.tween(view)
            .to(0.2, { height: 0})
            .start()
        }
    }
    addFloor(){
        this.initMapData()
        this.initList()
    }
    subFloor(){

    }
    selFloor(e){
        let node = e.target
        cc.log(node.index)

        let index = node.index

        this.MapData["MapData"]     = this.MapDataArr[index].MapData
        this.MapData["row"]         = this.MapDataArr[index].row
        this.MapData["col"]         = this.MapDataArr[index].col
        this.MapData["PlateData"]   = this.MapDataArr[index].PlateData
    }
    changeMapize(){
        let string =  this.EditBox.getComponent(cc.EditBox).string  
        let arr = string.split("*")
        let row = parseInt(arr[0])
        let col = parseInt(arr[1])
        if(row && col){
            this.row = row
            this.col = col
            this.init()
            this.initMapData()
            this.Map.removeAllChildren()
        }else{
            UIMgr.showTip("格式不对")
        }
    }

    //操作地图
    mouseDown(e){
        this.mouseDownType = e.getButton()
    }
    touchStart(e){
        this.createrPlate(e)
    }
    touchMove(e){
        if(this.mouseDownType  == 0 ) {
           this.createrPlate(e)
        }else{
            let Delta = e.getDelta()
            this.Map.x += Delta.x
            this.Map.y += Delta.y
        }
    }
    touchEnd(){

    }
    
    /**放置地块 */
    createrPlate(e){
        setTimeout(()=>{
            if(this.mouseDownType  == 2 ) return
            let pos =this.Map.convertToNodeSpaceAR(e.getLocation())
            let row = Math.floor(-(this.initpos.x-pos.x)/this.gridW)
            let col = Math.floor(-(this.initpos.y-pos.y)/this.gridH)
            let key = `${row}*${col}`
            if(this.selPlateNode == null) {
                let node = this.nodeData[key]
                if(node != null) {
                    //清空地块数据
                    let name = node.name
                    node.destroy()
                    this.nodeData[key] = null
                    this.MapData["MapData"][key].imgName = null
                    this.PlateImgcount(name,1)
                }
            }else{
                if(this.nodeData[key] == null){
                    //创建地块数据
                    this.createrPlateNode(row,col,key)
                }else{
                    if(this.selPlateImgName == null) return
                    if(this.selPlateImgName != this.nodeData[key].name){
                        //覆盖地块数据
                        this.nodeData[key].destroy()
                        this.createrPlateNode(row,col,key)
                    }
                }
            }
        },5)
    }
    /**创建地块节点 */
    createrPlateNode(row,col,key){
        let node = cc.instantiate(this.selPlateNode)
        node.width = this.gridW
        node.height = this.gridH
        let nodePos = cc.v2(row*this.gridW+this.initpos.x+this.gridW/2,col*this.gridH+this.initpos.y+this.gridH/2)
        let name  = node.name
        node.setPosition(nodePos)
        this.Map.addChild(node)
        this.nodeData[key] = node
        this.MapData["MapData"][key].imgName = name
        this.PlateImgcount(name,0)
    }
     /**选择地块 */
     selPlate(e){
        let node = e.target;
        let index = node.getSiblingIndex()
        if(index==0){
            this.selPlateNode = null
        }else{
            this.selPlateNode = node;
            this.selPlateImgName = node.getComponent(cc.Sprite).spriteFrame.name
        }
    }
    /**导出地图数据 */
    ExportMapData(){
        let data = JSON.stringify(this.MapData)
        Utils.saveForBrowser(data,"MapData")
    }
    /**导入地图数据 */
    ImportMapData(jsonName){
        let uiPath = `json/${jsonName}`
        let self = this
        LoadMgr.loadRes(uiPath, cc.JsonAsset).then((res) => {
            this.MapDataArr = res.json
            for(let i = 0; i < res.json.PlateData.length; i++ ){
                
                let name = res.json.PlateData[i]
                self.loadPlateImg(name)
            }
            
            // self.loadMapData(res.json)
        }).catch((err) => { console.error("【资源加载异常】：", jsonName + "==>>>" + err); });
    }
    /**加载导入的地图数据 */
    loadMapData(){
        let row     = this.MapData.width/this.gridW
        let col     = this.MapData.height/this.gridH
        let MapData = this.MapDataArr[0].MapData
        
        cc.log(MapData)
        for(let i = 0; i < row; i++){
            for(let j = 0; j < col ; j++){
                let key = `${i}*${j}`

                let imgName = this.MapData["MapData"][key].imgName
                if(imgName){
                    this.PlateImgcount(imgName)
                }
            }
        }
    }
    /**加载地块图片 */
    loadPlateImg(imgName){
        let uiPath = `txeture/Frame/${imgName}`
        let self = this
        LoadMgr.loadRes(uiPath, cc.SpriteFrame).then((res) => {
            let total =this.MapData.PlateData.length
            this.PlateImgData[imgName] = res
            this.loadimgNum++
            if(total <= this.loadimgNum){
                self.loadMapData()
            }
        }).catch((err) => { console.error("【资源加载异常】：", imgName + "==>>>" + err); });
        
    }
    /**使用地块计数 */
    PlateImgcount(name,type = 0){
        if(type == 0){
            if(this.PlateImgcountData[name]){
                this.PlateImgcountData[name] ++
            }else{
                this.MapData["PlateData"].push(name)
                this.PlateImgcountData[name] = 1
            }
        }else{
            if(this.PlateImgcountData[name]){
                this.PlateImgcountData[name] --
                if(this.PlateImgcountData[name] == 0 ){
                    let index = this.MapData["PlateData"].indexOf(name)
                    if(index>-1){
                        this.MapData["PlateData"].splice(index,1)
                    }
                }
            }
        }
    }
 

}
