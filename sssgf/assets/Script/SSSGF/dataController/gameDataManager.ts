import { DATA } from "./DATA";
import StorageManager from "./storageManager";

export class User {
    /**
     * 初始用户数据
     */
    private initUserData = DATA.Data

    /**
     * 用户数据
     */
    userData = DATA.Data;

    /**
     * 没有该用户会 初始化该用户出来
     * @param username 
     */
    constructor(username: string) {
        StorageManager.init();
        let userData = StorageManager.ins.getData("userData:" + username);
        console.log('-----------用户数据：', userData);
        if (!userData) {
            this.userData = this.initUserData;
            this.userData.username = username;
        } else {
            userData = JSON.parse(userData);
            for (const key of Object.keys(userData)) {
                if (this.userData[key] != undefined) {
                    if (key == "carList" || key == "carLevelInfo") {//数组的数据需要注意是否有添加新的元素
                        if(this.userData[key].length != userData[key].length){
                            for (let i = 0; i < userData[key].length; i++) {
                                this.userData[key][i] = userData[key][i];
                            }
                        }else{
                            this.userData[key] = userData[key];
                        }
                    } else {
                        this.userData[key] = userData[key]
                    }
                }
            }
            console.log('-----------用户数据：', this.userData);
        }
    }

    getUsername(): string {
        return this.userData.username;
    }

    getUsingCarIndex(): number {
        return this.userData.usingCarIndex;
    }


    preseverData() {
        StorageManager.ins.storageData("userData:" + this.userData.username, JSON.stringify(this.userData))
        console.log("保存用户数据:", this.userData);
    }
}

export default class GameDataStorage {
    private static user: User = null;
    public static configData: configData = null;
    /**
     * 游戏打开时必须执行一次
     */
    static init() {
        this.user = new User("SaiChe");
        this.configData = new configData();
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

export class configData {//全局游戏控制变量
    dragonAssets: any = null;
    dragonAtlas: any = null;
    isEnableClick:boolean = true;
}