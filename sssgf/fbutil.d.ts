
declare interface Number_util
{
    unit_format(number: number|string): string;

    millisecondToDate(millisecond: number): string;

    millisecondToMinute(millisecond: number): string;

    isOneDay(perTime: number, nowTime: number): boolean;

    countTime(second: number, callback: Function): void;

    clearInterval(id: number): void;
    /***
     * 大数相加
     */
    galaxyAdd(a: number|string, b: number|string): string;

    /***
     * 大数相减
     */
    galaxySub(a: number|string, b: number|string): string;

    /***
     * 大数相乘 b可以是小数 返回是整数
     */
    galaxyMut(a: number|string, b: number|string): string;

    /***
     * 大数相除
     * @param a
     * @param b
     * @returns {string}
     */
    galaxyDiv(a: number|string, b: number|string): string[]|number[];

    /***
     * 比较大小
     * @param a
     * @param b
     * @returns 0为相等，1为a大，-1为b大
     */
    cmpBigInt(a: number|string, b: number|string): number;

    randomNum(minNum, maxNum):number;
}