import { KEY } from "../../KEY";

// 兼容性处理
let isChildClassOf = cc.js["isChildClassOf"]
if (!isChildClassOf) {
    isChildClassOf = cc["isChildClassOf"];
}
let ccloader: any = cc.assetManager;
/**
 * 资源加载管理器
 */
class CLoadMgr {

    constructor() {}
    /** 音乐音效配置 */
    private MusicCF: { [key: string]: KEY.UIConf } = {};
    /** 图集字典 */
    private dictAtlas = {};
    /**图片字典 */
    private dictSpriteFrame = {};
    /** 音乐资源字典 */
    private dictMusic = {};
    /** 其他预制体资源字典 */
    private dictOther = {};
    /** json字典 */
    private dicJson = {};
    /** 文本字典 */
    private dicText = {};

    /** 首屏加载 */
    private currentTostCount: number = 0;//当前配置任务数量
    private curProgress : number    = 0; //当前加载进度
    private _preRes = [];//首屏加载配置表

    /**初始化 */
    public init(){
        this.currentTostCount = this._preRes.length;//当前配置任务数量
        this.curProgress = 0;//当前加载数量
       
    }
    /**深拷贝数据 */
    public cloneData(data){
        return JSON.parse(JSON.stringify(data));
    }
    /**
    * 预加载
    * @param completedCallback 完成回调res
    * @param progressCallback 进度回调progress
    */
    public preLoad(completedCallback?, progressCallback?:(completedCount,totalCount)=> void) {
        this.init();
        
        this.sequenceLoad(completedCallback,progressCallback)
        console.log("【首屏资源配置】KEY.preRes:", this._preRes);
    }
    /**
     *  顺序加载
     * @param completedCallback 完成回调res
     * @param progressCallback 进度回调progress
     */
    private sequenceLoad(completedCallback?,progressCallback?:(completedCount,totalCount,item)=> void){
        let self = this
        let currentTostCount = this.currentTostCount-1
        let curProgress = this.curProgress

        let url     = this._preRes[curProgress].url
        let type    = this.conventType(this._preRes[curProgress].type)

        this.loadResDir(url,type,(completedCount,totalCount,item)=>{
            if(progressCallback){
                progressCallback(completedCount,totalCount,item)
            }
        }).then((res)=>{
            if(currentTostCount > curProgress){
                self.curProgress++
                self.sequenceLoad(completedCallback,progressCallback)
            }else{
                if(completedCallback){
                    completedCallback(res)
                }
            }
        })
    }
    /**
    * 初始化所有音乐音效的配置对象
    * @param conf 配置对象
    */
    private initUIConf(conf: { [key: string]: KEY.UIConf }): void {
        this.MusicCF = conf;
    }

   /**
    * 加载单个资源
    * @param path 资源路径
    * @param type 资源类型
    * @param progressCallbcak //加载进度回调
    */
   public loadRes(path: string, type: typeof cc.Asset, progressCallbcak?: (completedCount, totalCount,item) => void) : Promise<any>{
        let self = this
        return new Promise(function (resolve, reject) {
            // let strArr = path.split("/")
            // let name  = strArr[strArr.length-1]
            cc.resources.load(path, type, (completedCount, totalCount, item) => {
                // var progress = (completedCount / totalCount).toFixed(2);
                progressCallbcak && progressCallbcak(completedCount, totalCount,item);
            }, (err, resource) => {
                if (err) {
                    reject(null)
                } else {
                    //缓存已加载资源
                    // self.setRes(resource.name,resource,type)
                    resolve(resource)
                }
            })
        })
    }

    /**
     * 加载dir资源
     * @param path 
     * @param type 
     * @param  progressCallbcak 
     */
    public loadResDir(path: string, type: typeof cc.Asset, progressCallbcak?: (completedCount, totalCount,item) => void): Promise<any>{
        let self = this
        return new Promise(function (resolve, reject) {
            cc.resources.loadDir(path, type, (completedCount, totalCount,item) => {
                // var progress = (completedCount / totalCount).toFixed(2);
                progressCallbcak && progressCallbcak(completedCount, totalCount,item);
            }, (err, resource) => {
                if (err) {
                    reject(null)
                } else {
                    //缓存已加载资源
                    for(let i = 0 ,len = resource.length; i<len; i++){
                        self.setRes(resource[i].name,resource,type)
                    }
                    console.log(resource)
                    resolve(resource)
                }
            })
        })
    }
  /**类型映射 */
  private conventType(type: string) {
    switch (type) {
        case KEY.ResType.AudioClip: { return cc.AudioClip; }
        case KEY.ResType.JsonAsset: { return cc.JsonAsset; }
        case KEY.ResType.Prefab: { return cc.Prefab; }
        case KEY.ResType.SpriteAtlas: { return cc.SpriteAtlas; }
        case KEY.ResType.SpriteFrame: { return cc.SpriteFrame; }
        case KEY.ResType.TextAsset: { return cc.TextAsset; }
    }
}
    /**
     * 缓存资源
     * @param name 资源名称
     * @param res 资源
     * @param type 类型
     */
    public setRes(name: string,res: any, type: typeof cc.Asset) {
        
        switch (type) {
            //图集资源
            case cc.SpriteAtlas: 
                this.dictAtlas[name] = res;
                break
            //预制资源
            case cc.Prefab: 
                this.dictOther[name] = res;
                break
            //图片资源
            case cc.SpriteFrame: 
                this.dictSpriteFrame[name] = res;
                break
            //音乐资源
            case cc.AudioClip: 
                this.dictMusic[name] = res;
                break
            //JSON资源
            case cc.JsonAsset: 
                this.dicJson[name] = res;
                break
            //文本资源
            case cc.TextAsset: 
                this.dicText[name] = res;
                break
            default: {
                console.log("类型错误")
            }
        }
    }

     /**
     * 获取资源缓存
     * @param name 资源名称
     * @param type 类型
     */
    public getRes(name: string, type: typeof cc.Asset) {
        switch (type) {
            case cc.SpriteAtlas: 
                if (this.dictAtlas[name]) {
                    return this.dictAtlas[name];
                }
                return null;
            
            case cc.Prefab: 
                if (this.dictOther[name]) {
                    return this.dictOther[name];
                }
                return null;
            
            case cc.SpriteFrame: 
                if (this.dictSpriteFrame[name]) {
                    return this.dictSpriteFrame[name];
                }
                return null;
            
            case cc.AudioClip: 
                if (this.dictMusic[name]) {
                    return this.dictMusic[name];
                }
                return null;
            
            case cc.JsonAsset: 
                if (this.dicJson[name]) {
                    return this.dicJson[name];
                }
                return null;
            
            case cc.TextAsset: 
                if (this.dicText[name]) {
                    return this.dicText[name];
                }
                return null;
            
            default: {
                return null;
            }
        }
    }

}
let LoadMgr = new CLoadMgr()
export {LoadMgr}
