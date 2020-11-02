import poolNodeMager from "./poolNodeMager";
import winNodeMager from "./winNodeMager";
import audioMager from "./audioMager";
//@ccclass
export default class conMager {
    // export default class conMager extends cc.Component {
    private static instance: conMager;
    private _poolNodeMager: poolNodeMager;
    private _winNodeMager: winNodeMager;
    private _audioMager: audioMager;

    public static getInstance(): conMager{
        if(!this.instance){
            this.instance = new conMager();
        }
        return this.instance;
    }

    public init(){
        this._poolNodeMager = new poolNodeMager();
        this._winNodeMager = new winNodeMager();
        this._audioMager = new audioMager();
        this._winNodeMager.init();
        this._poolNodeMager.init();
        this._audioMager.init();
    }

    /**
     * TOOD：显示弹窗
     * @date 2020-10-10
     * @param {any} winName:string 弹窗的名字
     * @param {any} parent:any 弹窗需要挂载到的节点
     * @param {any} ...data:any 传到弹窗挂载脚本上的可变参数裂变 - 数组
     * @returns {any}
     */
    public showWinNode(winName: string, parent: any, ...data: any) {
        let showFinish = function(node){
            if(parent){
                node.parent = parent;
            }else{
                node.parent = cc.find('/Canvas')
            }
            node.active = true;
            if(node.getComponent(winName))node.getComponent(winName).onOpen(data);
        }
        this._winNodeMager.showWinNode(winName, showFinish);
    }

    /**
     * TOOD：隐藏弹窗
     * @date 2020-10-10
     * @param {any} winName 需要隐藏的弹窗名字
     * @returns {any}
     */
    hideWinNode(winName){
        this._winNodeMager.hideWinNode(winName);
    }

    /**
     * TOOD：播放音效
     * @date 2020-10-10
     * @param {any} type:string 音效名字
     * @param {any} loop:boolean 是否循环
     * @param {any} volume:number 音量0-1 默认1
     * @returns {any}
     */
    playAudioEff(type: string, loop?: boolean, volume?: number){
        this._audioMager.playAudioEff(type, loop, volume);
    }

    /**
     * TOOD：播放音乐
     * @date 2020-10-10
     * @param {any} bgmName:string 音乐名称
     * @returns {any}
     */
    playBGM(bgmName: string) {
        this._audioMager.playBGM(bgmName)
    }

    /**
     * TOOD：停止音乐
     * @date 2020-10-10
     * @returns {any}
     */
    stopBGM() {
        this._audioMager.stopBGM();
    }

    /**
     * 描述
     * @date 2020-10-15
     * @param {any} nodeName:string 节点名称
     * @param {any} parent:any 节点挂载的父节点
     * @param {any} ...data:any 初始化数据
     * @returns {any}
     */
    getPoolNode(nodeName: string, parent?: cc.Node, ...data: any) {
        let showFinish = function(node){
            if(parent){
                node.parent = parent;
            }else{
                node.parent = cc.find('/Canvas')
            }
            node.active = true;
            if(node.getComponent(nodeName))node.getComponent(nodeName).onOpen(data);
        }
        this._poolNodeMager.getPoolNode(nodeName, showFinish);
    }

    /**
     * 描述
     * @date 2020-10-15
     * @param {any} nodeName:string 节点名称
     * @param {any} obj:any 需要回收的节点
     * @returns {any}
     */
    putPoolNode(nodeName: string, obj: any){
        this._poolNodeMager.putPoolNode(nodeName, obj);
    }

    // update (dt) {}
};

