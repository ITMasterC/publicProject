import { CKEY } from "../config/CKEY"
import { MonitorCfg } from "../config/MonitorCfg";

type Callback = (param?) => void;
/**
 * 事件派发管理器
 */
class CMonitorMgr {
    constructor() {}
    /**监听模块配置 */
    public  EventCF: any = {};
    /** 事件节点字典 */
    public dicEventNode:{[key: string]:cc.Node} = {}
    /** 事件注册字典 */
    public dicRegisteredEvent:{[key: string]:Array<string>} = {}
    //初始化
    public init(){
        this.initEvent(CKEY.Event)
        this.initEventNode()
    }
    
    /**
    * 初始化所有监听事件的配置对象
    * @param Event 配置对象
    */
    public initEvent(Event:any){
        this.EventCF = Event
    }
    /**初始化数据 */
    public initEventNode(){
        for(let key in this.EventCF){
            let nodeName = this.EventCF[key]
            let eventNode = new cc.Node(nodeName)
        
            this.dicEventNode[nodeName] = eventNode
            this.dicRegisteredEvent[nodeName] = []
        }
    }
  
    /**
     * 注册监听事件
     * @param Node  目标节点
     * @param eventName 事件名称
     * @param callback 回调
     */
    public registeredEvent(Node:cc.Node,eventName:string,callback:Callback){
        if(!Node)return console.error("请初始化监听管理器")
        let nodeName = Node.name
        
        if(!this.dicEventNode[nodeName] && this.dicEventNode[nodeName] != Node) return console.error("不允许不经过配置监听节点 开启监听事件")

        if(!MonitorCfg[nodeName][eventName]) return console.error("请到MonitorCfg文件配置监听事件名称")


        Node.on(eventName,(param?)=>{
            if(callback){
                callback(param)
            }
        },this)
        //缓存监听事件
        let name = Node.name
        if(this.dicRegisteredEvent[name].indexOf(eventName) <= -1){
            this.dicRegisteredEvent[name].push(eventName)
        }
    }
    /**
     * 注销事件
     * @param Node 目标节点
     * @param eventName 事件名称
     */
    public Logout(Node:cc.Node,eventName:string){
        if(!Node)return console.error("请初始化监听管理器")
        let name = Node.name
        let index = this.dicRegisteredEvent[name].indexOf(eventName)
        if(index <= -1) return
        Node.off(eventName)
        this.dicRegisteredEvent[name].splice(index,1)

        console.log(`注销 ${Node.name} 节点下的 ${eventName} 监听事件 `)
    }
    /**
     * 注销该节点下的所有监听
     * @param Node 目标节点
     */
    public LogoutAllEventNode(Node:cc.Node){
        if(!Node)return console.error("请初始化监听管理器")
        let name = Node.name
        for(let i = 0 ,len = this.dicRegisteredEvent[name].length; i < len; i++){
            Node.off(this.dicRegisteredEvent[name][i])
        }
        this.dicRegisteredEvent[name] = []
        console.log(`注销 ${Node.name} 节点下的所有监听事件 `)
    }
    /**
     * 触发监听事件
     * @param Node  目标节点
     * @param eventName 事件名称
     * @param param 参数
     */
    public triggerEvent(Node:cc.Node,eventName:string,param?:any){
        if(!Node)return console.error("请初始化监听管理器")
        Node.emit(eventName,param)
    }
    /**
     * 获取监听节点
     * @param eventName 监听节点的名字
     */
    public getEventNode(eventName:string){
        return this.dicEventNode[eventName]
    }
    
}

let MonitorMgr = new CMonitorMgr()
export {MonitorMgr}