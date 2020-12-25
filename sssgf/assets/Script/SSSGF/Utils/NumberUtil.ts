export class NumberUtil  {

    /***
     * 随机数
     */
    public static randomNum(minNum:number, maxNum?:number): number {
        switch (arguments.length) {
            case 1:
                return parseInt((Math.random() * minNum).toString(), 10);
            case 2:
                return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
            default:
                return 0;
        }
    }
    /**
     * 在一段连续的数随机获取一个包含指定个数数值的数组
     * @date 2020-11-27
     * @param {any} needCount：需要获取的数值长度
     * @param {any} maxLength：最大可能获得的数值
     * @returns {any}
     */
    public static randomArr (needCount:number, maxLength:number, minNumber?: number): Array<number> {
        var randomArr = [];
        if(arguments.length < 3)minNumber = 0;
        function getNoRepeatNum() {
            var random = parseInt((maxLength * Math.random()).toString());
            for (var i = 0; i < randomArr.length; i++) {
                if (randomArr[i] == random) {
                    return getNoRepeatNum();
                }
            }
            randomArr.push((random+minNumber));
            return random;
        }
        var arr = [];
        for (var i = 0; i < needCount && i < maxLength; i++) {
            arr.push(getNoRepeatNum());
        }
        return arr;
    };

    /**
     * 随机返回正负1
     * @date 2020-12-01
     * @returns {any}
     */
    public static randomZFOne(){
        return (Math.random()*1 < 0.5 ? 1 : -1);
    }
}
