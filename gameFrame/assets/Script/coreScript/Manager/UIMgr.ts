import { CKEY } from "../config/CKEY";
import UIView from "../View/UIView";
import { LevelMgr } from "./LevelMgr";
import { LoadMgr } from "./LoadMgr";


// 资源加载的处理回调
export type ProcessCallback = (completedCount: number, totalCount: number, item: any) => void;
/**
 * UI管理器
 */
class CUIMgr {
   
    constructor() {
        this.initUIConf(CKEY.UICF);
        this.initUIPageConf(CKEY.PageCF);
        
     }
    //------------------------------UI共用配置------------------------------
    /** 是否正在打开toast提示 */
    private isTipOpening = false;
    /** 是否正在关闭toast提示 */
    private isTipClosing = false;
    /** 是否正在打开UI */
    private isOpening = false;
    /** 是否正在关闭UI */
    private isClosing = false;

    //------------------------------UI弹窗配置------------------------------
    /** UI弹窗配置 */
    private UIConf: { [key: string]: CKEY.UIConf } = {};
    /** UI界面字典 */
    private _dictUIPopup: { [key: string]: UIView } = {};
    /**
    * 初始化所有UI的配置对象
    * @param conf 配置对象
    */
    private initUIConf(conf: { [key: string]: CKEY.UIConf }): void {
        this.UIConf = conf;
    }

    //------------------------------UI界面配置------------------------------
    private UIPanelConf: { [key: string]: CKEY.UIConf } = {};
    /** UI界面字典 */
    private _dictUIPanel: { [key: string]: UIView } = {};
    /**
    * 初始化所有界面配置
    * @param conf 配置对象
    */
    private initUIPageConf(conf: { [key: string]: CKEY.UIConf }): void {
        this.UIPanelConf = conf;
    }
    //-----------------------------toast提示-------------------------------
    public showTip(text:string ,uiName: string = null , ...param){
        if(!uiName){
            uiName = "Toast"
        }
        cc.log(this.UIConf[uiName])
        let parentName  = this.UIConf[uiName].parent 
        if(parentName != "Top") return console.error("该预制体不是toast提示:", uiName);
        if (this.isTipOpening) {
            //正处于打开
            return;
        }
        this.isTipOpening = true;

        let progressCallback: ProcessCallback = (completedCount: number, totalCount: number, item: any) => {}
        let node = LoadMgr.getRes(uiName,cc.Prefab)
        if(node){
            this.onTipOpen(node,text,param)
        }else{
            this.createTip(uiName, progressCallback, (node: cc.Node): void => {
                if (null == node) {
                    console.error("【toast提示创建失败】:", uiName);
                    return;
                }
                this.onTipOpen(node,text,param)
            },param);
        }
    }
    private createTip(uiName: string, processCallback: ProcessCallback, completeCallback: (node: cc.Node) => void, param){
        // 找到toast提示配置 
       
        let uiPath      = this.UIConf[uiName].url 
        let parentName  = this.UIConf[uiName].parent 
        let parent      = this.getLevelNode(parentName);
        //加载提示预制体
        LoadMgr.loadRes(uiPath, cc.Prefab, processCallback).then((res) => {
            let node = this.addChild(parent, res);
            completeCallback(node);
        }).catch((err) => { completeCallback(null); console.error("【资源加载异常】：", uiName + "==>>>" + err); });
    }
    /**
    * UI弹窗被打开时回调
    * @param node tip节点
    * @param text 提示语
    * @param param tip参数
    */
    private onTipOpen( node: cc.Node, text:string, param) {
        node.setPosition(cc.v3(0,0,0))
        node.active     = true
        node.opacity    = 255
        let Lable = node.getComponentInChildren(cc.Label)
        let LableNode   = Lable.node
        Lable.string    = text
        //刷新label宽高
        Lable._forceUpdateRenderData(true)
        let h  = Math.floor((LableNode.height-50)/40)
        cc.log(h)
        node.getChildByName("Bg").height = 60*(h + 1)
        cc.tween(node)
        .delay(0.4)
        .to(0.4,{position:cc.v3(0,50,0),opacity:0})
        .call(()=>{
            node.active = false 
            this.isOpening = false;
        })
        .start()
    }
    //------------------------------UI弹窗事件------------------------------
    /**
    * 打开UI弹窗
    * @param uiName  弹窗名字
    * @param param   界面初始化参数
    */
    public openPopup(uiName: string, ...param){
        //不是弹窗不弹出
        let parentName  = this.UIConf[uiName].parent 
        if(parentName != "Center") return console.error("该预制体不是弹窗:", uiName);

        if (this.isOpening || this.isClosing) {
            //正处于打开|关闭中
            return;
        }
        this.isOpening = true;

        let progressCallback: ProcessCallback = (completedCount: number, totalCount: number, item: any) => {}
        if(LoadMgr.getRes(uiName,cc.Prefab)){
            this.onPopupOpen(this._dictUIPopup[uiName],param)
        }else{
            this.createPopup(uiName, progressCallback, (uiView: UIView): void => {
                if (null == uiView) {
                    console.error("【UI弹窗创建失败】:", uiName);
                    return;
                }
                this.onPopupOpen(uiView, param);
            },param);
        }
    }
    /**
    * UI弹窗被打开时回调
    * @param uiView 界面对象
    * @param param 界面初始化参数
    */
    private onPopupOpen( uiView: UIView, param) {
        uiView.setActive(true);
        //是否播放动画
        if (uiView.enableAnimation) {
            
        }
        // 执行onOpen回调
        uiView.onOpen(param);
        this.isOpening = false;
    }
    /**
    * 异步加载一个UI弹窗的prefab，成功加载了一个prefab之后
    * @param uiName 界面名称
    * @param parent  界面父节点
    * @param processCallback 加载进度回调
    * @param completeCallback 加载完成回调
    * @param param 初始化参数
    */
   private createPopup(uiName: string, processCallback: ProcessCallback, completeCallback: (uiView: UIView) => void, param) {
        // 找到UI弹窗配置 
        let uiPath      = this.UIConf[uiName].url 
        let parentName  = this.UIConf[uiName].parent 
        let parent      = this.getLevelNode(parentName);
        
        // 加载弹窗
        LoadMgr.loadRes(uiPath, cc.Prefab, processCallback).then((res) => {
            let uiView = this.addChild(parent, res).getComponent(UIView);
            uiView.setActive(false);
            uiView._PanelName = uiName;
            // 执行inint回调
            uiView.inint(param);
            this._dictUIPopup[uiName] = uiView;
            completeCallback(uiView);
        }).catch((err) => { completeCallback(null); console.error("【资源加载异常】：", uiName + "==>>>" + err); });
    }

    /**
    * 关闭UI弹窗
    * @param uiName 要关闭的弹窗名称
    */
    public closePopup(uiName: string) {
        let uiView = this._dictUIPopup[uiName];
        if (!uiView) return;
        this.isClosing = true;
        //执行onClose回调
        uiView.onClose(uiName);
        //是否播放动画
        if (uiView.enableAnimation) {
           
        } else {
            uiView.node.active = false;
        }
        this.isClosing = false;
    }

    //------------------------------UI界面事件------------------------------
    /**
    * 打开UI弹窗
    * @param uiName  弹窗名字
    * @param param   界面初始化参数
    */
    public openPanel(uiName: string, ...param){
        let progressCallback: ProcessCallback = (completedCount: number, totalCount: number, item: any) => {}
        if (this.isOpening || this.isClosing) {
            //正处于打开|关闭中
            return;
        }
        this.isOpening = true;
        if(LoadMgr.getRes(uiName,cc.Prefab)){
            this.onPanelOpen(this._dictUIPanel[uiName],param)
        }else{
            this.createPanel(uiName, progressCallback, (uiView: UIView): void => {
                if (null == uiView) {
                    console.error("【UI弹窗创建失败】:", uiName);
                    return;
                }
                this.onPanelOpen(uiView, param);
            },param);
        }
    }
    /**
    * UI弹窗被打开时回调
    * @param uiView 界面对象
    * @param param 界面初始化参数
    */
    private onPanelOpen( uiView: UIView, param) {
        uiView.setActive(true);
        //是否播放动画
        if (uiView.enableAnimation) {
            
        }
        // 执行onOpen回调
        uiView.onOpen(param);
        this.isOpening = false;
    }
    /**
    * 异步加载一个UI弹窗的prefab，成功加载了一个prefab之后
    * @param uiName 界面名称
    * @param parent  界面父节点
    * @param processCallback 加载进度回调
    * @param completeCallback 加载完成回调
    * @param param 初始化参数
    */
    private createPanel(uiName: string, processCallback: ProcessCallback, completeCallback: (uiView: UIView) => void, param) {
        // 找到UI弹窗配置 
        let uiPath      = this.UIConf[uiName].url 
        let parentName  = this.UIConf[uiName].parent 
        let parent      = this.getLevelNode(parentName);
        
        // 加载弹窗
        LoadMgr.loadRes(uiPath, cc.Prefab, processCallback).then((res) => {
            let uiView = this.addChild(parent, res).getComponent(UIView);
            uiView.setActive(false);
            uiView._PanelName = uiName;
            // 执行inint回调
            uiView.inint(param);
            this._dictUIPanel[uiName] = uiView;
            completeCallback(uiView);
        }).catch((err) => { completeCallback(null); console.error("【资源加载异常】：", uiName + "==>>>" + err); });
    }

    /**
    * 关闭UI弹窗
    * @param uiName 要关闭的弹窗名称
    */
    public closePanel(uiName: string) {
        let uiView = this._dictUIPanel[uiName];
        if (!uiView) return;
        this.isClosing = true;
        //执行onClose回调
        uiView.onClose(uiName);
        //是否播放动画
        if (uiView.enableAnimation) {
        
        } else {
            uiView.node.active = false;
        }
        this.isClosing = false;
    }
    
    
    
    //------------------------------公共函数------------------------------
    /**
    * 实例UI节点
    * @param parent 父节点
    * @param child  预支体
    * @param pos    位置
    */
    private addChild(parent: cc.Node, child: cc.Prefab, pos: cc.Vec3 = cc.Vec3.ZERO) {
        if (parent == undefined || child == undefined) {
            console.error("---------->>>>>>>>>parent|child is undefined", parent == undefined, child == undefined);
            return
        }
        let addItem = cc.instantiate(child)
        addItem.parent = parent
        addItem.position = pos ;
        addItem.active = true;
        return addItem;
    }
    /**
    * 获取层级节点
    * @param level 
    * Bottom 为游戏内容盒子
    * Center 为弹窗内容盒子
    * Top 为提示内容盒子
    * Sub 为广告内容盒子
    */
    public getLevelNode(level:string){
        switch (level) {
            case "Bottom":
                return LevelMgr.NodeBottom;
            case "Center":
                return LevelMgr.NodeCenter;
            case "Top":
                return LevelMgr.NodeTop;
            case "Sub":
                return LevelMgr.NodeSub;
        }
    }
}
let UIMgr = new CUIMgr()
export {UIMgr}


