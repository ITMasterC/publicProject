 
class CUtils {

    























/**
     * 保存编辑好的文件
     * 保存字符串内容到文件。
     * 效果相当于从浏览器下载了一个文件到本地。
     * @param textToWrite 要保存的文件内容
     * @param fileNameToSaveAs 要保存的文件名
     */
    saveForBrowser(textToWrite:any, fileNameToSaveAs:string) {
        if (cc.sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null){
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }else{
                console.log("请使用谷歌浏览器");
            }
            downloadLink.click();
        }
    }
    

    /**
     * 获取类名
     * @param obj 类
     */
    public getClassName = function(obj) {
        if (obj && obj.constructor && obj.constructor.toString()) {
            return obj.constructor.name;
        }
        return undefined; 
    }
    //清楚龙骨动画数据
    // dragonBones.CCFactory.getFactory().clear()
}
let Utils = new CUtils()
export {Utils} 