import { CKEY } from "./CKEY"

/**
 * 本地存储  会改变的
 */
class GlobalData {

    private localStorage = {
        userInfo :{
            username: "郑富城",
            userId: "0000",
            // ...
        },
        audioControl:{
            music:true,//背景音乐
            sound:true,//音效
        },
        energy:{
            Num :5,//体力
            maxEnergy:5, //最大体力
            isFullEnergy:true,//是否满体力
            Restoredtime: 0, //还剩多少恢复时间
        },
        lastLoginTime:0,//上次登录0点时间
        gold: 0, //金币
        leaveTime: 0,//离线时长
        // ...
    }
    private leaveTime = 0;

    /**初始化 */
    init(){
        //获取本地数据
        let data = cc.sys.localStorage.getItem(`${CKEY.Gamename}_localStorage`) 
        if(data){
            this.localStorage = JSON.parse(data)
        }
        

        let loginTime = new Date(new Date().toLocaleDateString()).getTime() //现在登录0点时间 
        let lastLoginTime = this.localStorage.lastLoginTime
        //每日更新数据
        if(loginTime != lastLoginTime){
            //更新数据 
            this.localStorage.lastLoginTime = loginTime //更新上次登录0点时间戳



            //...
            this.SaveData()
        }
        //离线奖励
        if(!CKEY.IslineRewards) return
        //获取退出游戏时间戳
        let leaveTime = cc.sys.localStorage.getItem(`${CKEY.Gamename}_leaveTime`) 
        if(leaveTime){
            this.leaveTime = JSON.parse(leaveTime)
        }
        let nowtime = new Date().getDate() // 当前时间戳
        let time = (nowtime -  leaveTime)/1000 // 累计离线 秒
        //离线奖励逻辑
        this.localStorage.leaveTime += time //领取奖励后清零

    
        this.SaveData()
        
        
        if(!CKEY.IsEnergy) return
        this.RefreshEnergy()
        //后台回来 回调
        cc.game.on(cc.game.EVENT_SHOW, function () {
            Global.RefreshEnergy()
        });
        // ...

    }

    /**获取本地所有信息 */
    public getLocalStorage(){
        return this.localStorage
    }

    /**获取用户信息 */
    public getUserInfo(){
        return this.localStorage.userInfo
    }
    /**
     * 设置用户信息
     * @param param 参数 
     *  param = {
            username : "121211",
            age:"21",
            userId:"999",
        }
     */
    public setUserInfo(param:{[key:string]:any}){
        let data = this.faultTolerance("userInfo","Obj")
        for(let key in param){
            data[key] = param[key]
        }
        this.SaveData()
    }

    /**获取音频数据 */
    public getAudioControl(){
        return this.localStorage.audioControl
    }
    /**
     * 设置音频数据
     * @param param 参数 
     * param = {
            music : true,
            sound : true,
        }
     */
    public setAudioControl(param:{[key:string]:boolean}){
        for(let key in param){
            this.localStorage.audioControl[key] = param[key]
        }
        this.SaveData()
    }
    /**
     * 设置退出游戏时间
     */
    public setLeaveTime() {
        this.leaveTime = new Date().getDate()
        this.SaveleaveTime()
    }
    /**
     * 增加金币
     * @param Num 数量
     */
    addGoldNum(Num:number){
        this.localStorage.gold += Num
    }
     /**
     * 减少金币
     * @param Num 数量
     */
    subGoldNum(Num:number){
        this.localStorage.gold -= Num
    }
    /**获取金币数量 */
    getGoldNum(){
        return this.localStorage.gold
    }

    /**-------------------体力方法Start---------------------------------------------------------------------------- */
      /**
     * 增加体力
     * @param Num 数量
     */
    addEnergy(Num:number){
        this.localStorage.energy.Num += Num

        if(this.localStorage.energy.Num >= this.localStorage.energy.maxEnergy){
            this.setisFullEnergy(true)
        }
    }
     /**
     * 减少体力
     * @param Num 数量
     */
    subEnergy(Num:number){
        this.localStorage.energy.Num        -= Num
        this.setisFullEnergy(false)
    }
    /**获取体力数量 */
    getEnergy(){
        return this.localStorage.energy.Num
    }
    /**获取体力数量 */
    getMaxEnergy(){
        return this.localStorage.energy.maxEnergy
    }
    /**
     * 设置体力是否满了
     * @param boolean 
     */
    setisFullEnergy(boolean:boolean){
        this.localStorage.energy.isFullEnergy  = boolean
        this.SaveData()
    }
    /**获取体力是否满了 */
    getisFullEnergy(){
        return this.localStorage.energy.isFullEnergy
    }
    /**
     * 设置还剩多少恢复时间
     * @param Num 时间
     */
    setRestoredtime(Num:number){
        this.localStorage.energy.Restoredtime  = Num
        this.SaveData()
    }
    /**体力离线恢复 */
    RefreshEnergy(){
        let leaveTime = cc.sys.localStorage.getItem(`${CKEY.Gamename}_leaveTime`) 
        if(leaveTime){
            this.leaveTime = JSON.parse(leaveTime)
        }
        let nowtime = new Date().getDate() // 当前时间戳
        let time = (nowtime -  leaveTime)/1000
        let restoreTime = CKEY.restoreTime*60
        let Restoredtime = this.localStorage.energy.Restoredtime
        if(time >= restoreTime){
            let energy =  Math.floor((time-Restoredtime)/(restoreTime))+1
            //自然恢复不可以超出上限
            if(this.getEnergy() + energy >= this.getMaxEnergy()){
                energy = this.getMaxEnergy() - this.getEnergy()
            }
            this.addEnergy(energy)
        }
    }
    /**-------------------体力方法End---------------------------------------------------------------------------- */



    /**存储数据 */
    public SaveData(){
        //带上游戏名称 以免本地存储名字冲突
        // let data = JSON.stringify(this.localStorage)
        // cc.sys.localStorage.setItem(`${CKEY.Gamename}_localStorage`, data) 


        //服务器上传数据
        //...
    }
    /**存储离开时间戳 */
    public SaveleaveTime(){
        //带上游戏名称 以免本地存储名字冲突
        // let data = JSON.stringify(this.leaveTime)
        // cc.sys.localStorage.setItem(`${CKEY.Gamename}_leaveTime`, data) 


        //服务器上传数据
        //...
    }
    /**
     * 容错处理  防止数据存服务器 更新字段 服务器没有 导致报错 
     * @param data 数据
     * @param type 数据类型  Number  String  Obj  Array
     */
    public faultTolerance (name:any,type:string){
        let data = this.localStorage[name]
        if(data){
            return data
        }else{
            switch (type) {
                case "Number":
                    this.localStorage[name] = 0
                    return  this.localStorage[name]
                case "String":
                    this.localStorage[name] = ""
                    return  this.localStorage[name]
                case "Obj":
                    this.localStorage[name] = {}
                    return  this.localStorage[name]
                case "Array":
                    this.localStorage[name] = []
                    return this.localStorage[name]
                default:
                    console.log("类型错误")
                    break;
            }
        }
    }
}
let Global = new GlobalData()
export {Global} 