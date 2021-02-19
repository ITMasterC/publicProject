//游戏配置表  固定不变的 
export module CKEY {
    /**游戏名字 */
    export let Gamename     = "canting" 
    /**公共事件KEY */
    export enum CommodKey {
        /**[KEY]更新金币label */
        updateCoinsLabel    = "C_UPDATECOINSLABEL",
        /**[KEY]更新体力label */
        updateTiLiLabel     = "C_UPDATETILILABEL",
    }

    /**是否有离线奖励 */
    export let IslineRewards    = false
    /**是否有体力 */
    export let IsEnergy         = true
    //恢复体力时间 单位分钟 增量 1 
    export let restoreTime      = 5

    /**监听模块名字 */
    export enum EventNode{
        Common = "Common",
        Tip = "Tip",
        
    }
    /**
     * 监听模块配置
     */
    export let Event:any = {
        [EventNode.Common]: "Common",
        [EventNode.Tip]: "Tip",
    }
    //------------------------------------------------------------【UI弹窗配置】--------------------------------------------------------------------------
    /** UI配置结构体 */
    export interface UIConf {
        url: string;
        parent?: string; // Bottom节点（游戏内容层级） Center节点（弹窗内容层级） Top节点（提示层级） Sub节点（广告层级） 4个层级
    }
    /**UI面板名称key */
    export enum UIName {
        //value 一定要对应资源的名称 
        UISignin    = "Signin",
        UIToast     = "Toast", 
    }
    /**UI面板配置*/
    export let UICF: { [key: string]: UIConf } = {
        [UIName.UISignin]:  { url: "prefab/Popup/Signin" ,parent:"Center"},
        [UIName.UIToast]:   { url: "prefab/Common/Toast" ,parent:"Top"},
    }
    //-----------------------------------------------------------【UI界面配置】----------------------------------------------------------------------------
    /**界面名称key */
    export enum PageName {
        //value 一定要对应资源的名称 
        //LevelOne = "Level_0",
    }
    /**界面配置*/
    export let PageCF: { [key: string]: UIConf } = {
       // [PageName.LevelOne]: { url: "Level_0" },
    }
    //-----------------------------------------------------------【首屏资源配置】---------------------------------------------------------------------------
    /**资源类型 */
    export enum ResType {
        SpriteAtlas = "cc.SpriteAtlas",
        SpriteFrame = "cc.SpriteFrame",
        AudioClip = "cc.AudioClip",
        Prefab = "cc.Prefab",
        JsonAsset = "cc.JsonAsset",
        TextAsset = "cc.TextAsset"
    }

    /** 资源配置结构体 */
    export interface ResConf {
        url: string; //资源路径
        type: string;//资源类型 cc.SpriteAtlas|cc.SpriteFrame|cc.AudioClip|cc.Prefab|cc.JsonAsset
    }
    /**资源首屏加载配置*/
    export let preRes: Array<ResConf> = [
        { url: "prefab/Popup", type: ResType.Prefab},
        { url: "txeture/Frame", type: ResType.SpriteFrame},
    ]
        
        // [1]: { url: "UI", type: ResType.SpriteFrame, isFolder: true },
        // [2]: { url: "BtnBlue", type: ResType.Prefab, isFolder: false },
        // [3]: { url: "DragonNameAtlas", type: ResType.SpriteAtlas, isFolder: false },
        // [4]: { url: "HomeBg", type: ResType.AudioClip, isFolder: false, audioType: 0 },
        // [5]: { url: "PlayingBg", type: ResType.AudioClip, isFolder: false, audioType: 1 },
        // [6]: { url: "Level_0", type: ResType.Prefab, isFolder: false, property: 1 },
        // [7]: { url: "Audio/note1", type: ResType.AudioClip, isFolder: false, audioType: 1 },
    //-------------------------------------------------------------【音频配置】-----------------------------------------------------------------------------
    /**音乐名称Key */
    export enum MusicName {
        HomeBg = "HomeBg",
    }
    /**音效名称Key */
    export enum SoundName {
        node_1 = "note1",
  
    }
    /**音乐音效配置*/
    export let MusicCF: { [key: string]: UIConf } = {
        //--------------------音乐---------------------
        [MusicName.HomeBg]: { url: "HomeBg" },
        //--------------------音效---------------------
        [SoundName.node_1]: { url: "Audio/note1"},
    }
    //-------------------------------------------------------------【对象池配置】-----------------------------------------------------------------------------
    /**对象池名称KEY */
    export enum PoolName {
        Ball = "Ball",
    }
    /**对象池配置*/
    export let PoolCF: { [key: string]: UIConf } = {
        [PoolName.Ball]: { url: "Ball" },
    }
    //-------------------------------------------------------------【其他资源配置】---------------------------------------------------------------------------
    /**资源名称Key(除UI面板名称)*/
    export enum ResName {
        test = "common测试",
    }
    //-------------------------------------------------------------【关卡数据配置】----------------------------------------------------------------------------
    /**关卡数据项结构 */
    export interface LevelDataStructure {
        id: number,//编号
        state: number,//状态 0-未解锁 1-未完成 2-完成
        starCount?: number,//获得星星数量
        target?: object,//目标 例:{score:100} ..
        des?: string,//描述 例:"终于上考上了心愿的高中了，今天就要去新学校了，馨儿公主想穿上一套清新的连衣裙装，达成梦想的心情就像一只蝴蝶在空中翩翩飞舞"
    }
}
