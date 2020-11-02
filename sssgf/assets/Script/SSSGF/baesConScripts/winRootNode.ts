import baseNodeAction from "./baseNodeAction"
export default abstract class winRootNode extends baseNodeAction {

    clickTimer = false;

    /********************** UI的回调 ***********************/
    /**
     * 当界面被创建时回调，生命周期内只调用
     * @param args 可变参数
     */
    public abstract inint(args): void;

    /**
     * 当界面被打开时回调，每次调用Open时回调
     * @param args 可变参数
     */
    public abstract onOpen(args): void;

    /**
     * 当界面被关闭时回调，每次调用Close时回调
     * @param uiname 关闭的UI面板名称
     */

    public abstract onClose(uiname): void;
    /**
     * 当界面被销毁时回调
     */
    public abstract onClear(): void;

    onDestroy() { this.onClear(); };

    btnClickFun(e, cbName) {
        if (!this.clickTimer) {
            this.clickTimer = true;
            setTimeout(() => {
                this.clickTimer = false;
            }, 200);
            this[cbName]();
        }
    }

    // update (dt) {}
}
