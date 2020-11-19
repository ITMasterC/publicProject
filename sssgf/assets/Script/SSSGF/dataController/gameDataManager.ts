import StorageManager from "./storageManager";

export class User {
    /**
     * 初始用户数据
     */
    private initUserData = {
        username: "无",
        usingCarIndex: 0,
        carList:[1,0,0,0],
        carInfo:[[1,0,0,0]],
        trophyCount: 0,
    }

    carCount = 4;

    /**
     * 用户数据
     */
    private userData = null;

    /**
     * 没有该用户会 初始化该用户出来
     * @param username 
     */
    constructor(username: string) {
        StorageManager.init();
        this.userData = StorageManager.ins.getData("userData:" + username);
        if (this.userData === null) {
            if(this.initUserData.carList.length < this.carCount){
                for(; this.initUserData.carList.length < this.carCount; ){
                    this.initUserData.carList.push(0);
                    this.initUserData.carInfo.push([1,0,0,0]);
                }
            }
            this.userData = this.initUserData;
            this.userData.username = username;
        } else{
            this.userData = JSON.parse(this.userData);
            if(this.userData.carList.length < this.carCount){
                for(; this.userData.carList.length < this.carCount; ){
                    this.userData.carList.push(0);
                    this.userData.carInfo.push([1,0,0,0]);
                }
            }
        }
    }

    getUsername(): string {
        return this.userData.username;
    }

    getUsingCarIndex():number{
        return this.userData.usingCarIndex;
    }

    /**
     * 玩家闯过了多少关
     * @returns rush levels sum 
     */
    getRushLevelsSum(): number {
        if (this.userData === null)
            return;
        return this.userData.levelsReview.length;
    }


    preseverData() {
        StorageManager.ins.storageData("userData:" + this.userData.username, JSON.stringify(this.userData))
        console.log("保存用户数据:", this.userData);
    }
}

export default class GameDataStorage {
    private static user: User = null;

    /**
     * 游戏打开时必须执行一次
     */
    static init() {
        this.user = new User("SaiChe");
    }

    /**
     * 获得当前使用的用户
     * @returns current user 
     */
    static getUser(): User {
        return this.user;
    }

    static setUser(user: User) {
        this.user = user;
    }

    /**
     * 保存游戏数据,游戏退出时必须执行
     */
    static preserveGameData() {
        this.user.preseverData();
    }
}