
export module DATA {
    /** 用户数据 配置结构体 */
    export interface DataConf{
        username: string
        usingCarIndex: number
        trophyCount: number
        carList: Array<number>
        carLevelInfo: Array<Array<number>>
    }
    /**用户数据*/
    export let Data : DataConf = {
        username : "",
        usingCarIndex: 0,
        trophyCount: 0,
        carList: [1,0,0,0],
        carLevelInfo: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
    }

}