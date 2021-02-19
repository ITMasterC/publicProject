import { CKEY } from "../resources/coreScript/config/CKEY";
import { Global } from "../resources/coreScript/config/Global";
import { MonitorCfg } from "../resources/coreScript/config/MonitorCfg";
import { LoadMgr } from "../resources/coreScript/Manager/LoadMgr";
import { MonitorMgr } from "../resources/coreScript/Manager/MonitorMgr";
import { MusicMgr } from "../resources/coreScript/Manager/MusicMgr";
import {UIMgr} from "../resources/coreScript/Manager/UIMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    Time:number = 0 //计时（每秒）
    restoreTime:number = CKEY.restoreTime*60 //恢复时长

    onLoad () {
        // //初始化
        Global.init()
        MusicMgr.init()
        MonitorMgr.init()
        // LoadMgr.preLoad(()=>{
        //     //预加载完成
        //     console.log("预加载完成")
        // },(completedCount,totalCount)=>{
        //     //加载进度
        //     var progress = Number((completedCount / totalCount).toFixed(2));
        //     console.log(progress)
        // })
        // //打开ui弹窗
        // UIMgr.openPopup("Signin") 
        // UIMgr.showTip("格式不对")
        // // 修改用户信息
        // let data = {
        //     username : "121211",
        //     age:"21",
        //     userId:"999",
        // }
        // Global.setUserInfo(data)
        // console.log(Global.getLocalStorage())

        // //注册监听事件
        // let evenNode = MonitorMgr.getEventNode(CKEY.EventNode.Common)
        // MonitorMgr.registeredEvent(evenNode,MonitorCfg.Common.subGold,(res)=>{
        //     console.log(res)
        //     console.log(111111111)
        // })
        // MonitorMgr.registeredEvent(evenNode,"addGold",(res)=>{
        //     console.log(res)
        //     console.log(111111111)
        // })
        // MonitorMgr.registeredEvent(evenNode,"subGold",(res)=>{
        //     console.log(res)
        //     console.log(111111111)
        // })
        // MonitorMgr.registeredEvent(evenNode,"checkGold",(res)=>{
        //     console.log(res)
        //     console.log(111111111)
        // })
        // MonitorMgr.triggerEvent(evenNode,"addGold",{"a":1,"b":2})
        // // evenNode.off("addGold")
        // // MonitorMgr.Logout(evenNode,"addGold")
        // MonitorMgr.LogoutAllEventNode(evenNode)
        // MonitorMgr.triggerEvent(evenNode,"addGold",{"a":1,"b":55})
        // console.log(MonitorMgr.dicRegisteredEvent)
        
    }

    start () {

    }

    update (dt) {
        
        if(CKEY.IsEnergy){
            //体力更新
            this.Time += dt
            if(this.Time >=1){
                this.Time = 0
                //计时Label更新

                // ...
                //是否体力已满
                if(Global.getisFullEnergy()){
                    this.restoreTime--
                    Global.setRestoredtime(this.restoreTime)
                    if( this.restoreTime <=0){
                        this.restoreTime = CKEY.restoreTime*60
                        //体力加一
                        Global.addEnergy(1)
                        //...
                        //体力已满
                        if(Global.getMaxEnergy() >= Global.getEnergy()){
                            Global.setisFullEnergy(true)
                        }
                    }
                }
                
            }
        }

        
        if(CKEY.IslineRewards) {
            //离线奖励 记录离线时间
            Global.setLeaveTime()
        }
    }
}
