import gameRootNode from "./prefabWins/gameRootNode"

export module KEY {
    /********************************【ui 弹窗配置】**********************************/
    /** UI 配置结构体 */
    export interface UIConf{
        prefab: string
        isCommonlyUsed: boolean
    }
    /** UI弹窗名称key */
    export enum UIName{
        //value 一定要对应资源的名称
        mainNode = "mainNode",
        gameRootNode = "gameRootNode"
    }
    /** 配置 预制体弹窗的资源路径 - prefabsWinNodes 目录下的路径*/
    export let UICF : {[key: string]: UIConf}={
        [UIName.mainNode]:{prefab:"mainNode", isCommonlyUsed: true},
        [UIName.gameRootNode]:{prefab:"game/gameRootNode", isCommonlyUsed: true},
    }
    /********************************【ui 弹窗配置】**********************************/

    /********************************【用到对象池的预制体配置】**********************************/
    export interface PoolConf{
        prefab: string,
        usePool: boolean,
        maxCount: number
    }
    /** UI弹窗名称key */
    export enum poolName{
        //value 一定要对应资源的名称
        tipNode = "tipNode"
    }
    /** 配置 预制体弹窗的资源路径 - prefabsWinNodes 目录下的路径*/
    export let POOLCF : {[key: string]: PoolConf}={
        [poolName.tipNode]:{prefab:"tipNode", usePool: true, maxCount: 3},
    }
    /********************************【用到对象池的预制体配置】**********************************/

    /**************************************【声音资源名称】********不区分路径，名称必须唯一**/
    export enum audioName{
        tenMan = "tenMan",
        jiNeng3 = "jiNeng3",
        boss = "boss",
    }
    /**************************************【声音资源名称】***************************************************/

    /**资源类型 */
    export enum ResType {
        SpriteAtlas = "cc.SpriteAtlas",
        SpriteFrame = "cc.SpriteFrame",
        AudioClip = "cc.AudioClip",
        Prefab = "cc.Prefab",
        JsonAsset = "cc.JsonAsset",
        TextAsset = "cc.TextAsset"
    }
}