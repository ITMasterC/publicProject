const { ccclass, property } = cc._decorator;
@ccclass
export default abstract class UIView extends cc.Component {

    /**是否是UI面板 */
    @property({ displayName: "是否是UI面板", tooltip: "勾选:UI面板;不勾选:Page界面" })
    IsUiPanel: boolean = true;
    /**UI面板描述 */
    @property({
        readonly: true,
        displayName: "当前为UI面板属性", visible: function (this: UIView) {
            return this.IsUiPanel == true;
        }
    })
    uiPanelDesStr = "";
    /**Page界面描述 */
    @property({
        readonly: true,
        displayName: "当前为Page界面属性", visible: function (this: UIView) {
            return this.IsUiPanel == false;
        }
    })
    PageDesStr = "";
    /**面板名称 */
    public _PanelName: string = "";
    /** 设置Widget节点 */
    @property({
        type: cc.Node, displayName: "面板内容", visible: function (this: UIView) {
            return this.IsUiPanel == true;
        }
    })
    public nodeWidget: cc.Node = null;

    /**是否开启动画 */
    @property({
        displayName: "是否开启动画?", visible: function (this: UIView) {
            return this.IsUiPanel == true;
        }
    })
    public enableAnimation: boolean = false;

    /**
    * 设置节点激活状态
    * @param bActive 是否激活
    */
    setActive(bActive) {
        if (this.nodeWidget) {
            this.nodeWidget.active = bActive;
        }
    }

    /**设置自身世界坐标 */
    public setWorldPostion(pos: cc.Vec3) {
        this.node.position = this.node.parent.convertToNodeSpaceAR(pos);
    }
    /**获取自身世界坐标 */
    public getWorldPosition() {
        return this.node.convertToWorldSpaceAR(new cc.Vec3(0, 0, 0));
    }
    /**
     * 获取在指定目标对象里面的坐标
     * @param target 目标对象
     */
    public getInTargetSpacePos(target: cc.Node) {
        if (target instanceof cc.Node) {
            return target.parent.convertToNodeSpaceAR(this.getWorldPosition());
        }
        return cc.Vec3.ZERO;
    }

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
     * 每次界面Open动画播放完毕时回调
     * @param isopen 是否是打开动画完成|结束动画完成
     */
    public abstract onOpenAniOver(isopen: boolean): void
    /**
     * 当界面被关闭时回调，每次调用Close时回调
     * @param uiname 关闭的UI面板名称
     */
    public abstract onClose(uiname): void;
    /**
     * 当界面被销毁时回调
     */
    public abstract onClear(): void;



    onDestroy() { this.onClear(); }
}
