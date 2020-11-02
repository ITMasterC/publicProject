// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class baseNodeAction extends cc.Component {
    
    public actionType = {
        breathAction: "breathAction",//呼吸动作
        scaleSmallHide: "scaleSmallHide",//缩小隐藏
        moveHide: "moveHide",//移动消失
        fadeOut: "fadeOut",//渐隐效果
        scaleBigShow: "scaleBigShow",//放大显示
        moveShow: "moveShow",//移动显示
        fadeIn: "fadeIn",//渐显效果；
        showTopPopUp: "showTopPopUp",//从上方弹出
        itemShowScaleBig: "itemShowScaleBig",//item 出现动画 放大 抖动
        angleChange: "angleChange",//左右晃动 -- 循坏
    }

    /**
    * 执行关闭弹窗动作
    * @date 2020-08-20
    * @param {any} actionType：执行隐藏动作的类型：'scaleSmallHide':缩小隐藏；moveHide:移动消失；fadeOut:渐隐效果
    * @param {any} cd：执行动作后的回调
    */
    hideAction(actionType: string, endPos?: cc.Vec3, cb?: any) {
        console.log('---------------隐藏', actionType);
        this[actionType](endPos, cb);
    }

    /**
     * 执行显示弹窗动作
     * @date 2020-08-20
     * @param {string} actionType： 执行显示动作的类型：'scaleBigShow':放大显示；'moveShow':移动显示；'fadeIn':渐显效果；'showTopPopUp':从上方弹出
     * @param {cc.Vec3} endPos 动作结束的位置
     * @param {any} cd：执行动作后的回调
     */
    showAction(actionType : string, endPos?: cc.Vec3, cb?:any) {
        console.log('---------------显示', actionType);
        this[actionType](endPos, cb);
    }

    /**
     * 节点动作
     * @date 2020-08-20
     * @param {any} actionType： 执行动作的类型
     * @param {any} cd：执行动作后的回调
     * @returns {any}
     */
    nodeAction(actionType : string, cb : any) {
        console.log('-----------actionType', actionType);
        this[actionType](cb);
    }

    /********************************其他动作**************************************/
    /**
     * 呼吸动作
     */
    breathAction(cd:any) {
        cc.tween(this.node)
            .sequence(
                cc.tween().to(1.2, {
                    scaleX: 1.1,
                    scaleY: 1,
                }, {
                    easing: 'sineOut',
                    number: 1.3
                }),
                cc.tween().to(0.5, {
                    scaleX: 1.08,
                    scaleY: 1.06,
                }),
                cc.tween().to(0.8, {
                    scaleX: 1,
                    scaleY: 1,
                }, {
                    easing: 'sineIn',
                    number: 1.3
                })
            )
            .repeatForever()
            .start()
    }

    /**
     * item 出现动画 放大 抖动
     * @param {any} cb  结束后回调
     * @returns {any}
     */
    itemShowScaleBig(cb:any) {
        this.node.stopAllActions();
        this.node.setScale(0.1);
        cc.tween(this.node)
            .to(0.2, {
                scale: 1
            }, {
                easing: "sineIn",
                number: 5
            })
            .to(0.1, {
                angle: 5
            })
            .to(0.2, {
                angle: -5
            })
            .to(0.1, {
                angle: 3
            })
            .to(0.1, {
                angle: 0
            })
            .call(function () {
                if (cb) cb();
            })
            .start();
    }

    /**
     * 左右晃动 -- 循坏
     * @param {any} cb: 动作完成回调
     * @returns {any}
     */
    angleChange(cb:any) {
        cc.tween(this.node)
            .sequence(
                cc.tween().to(0.8, {
                    angle: 4
                }, {
                    easing: "sineOut"
                }),
                cc.tween().to(1, {
                    angle: -4
                }, {
                    easing: "sineInOut"
                }),
                cc.tween().to(1, {
                    angle: 3
                }, {
                    easing: "sineInOut"
                }),
                cc.tween().to(1, {
                    angle: -3
                }, {
                    easing: "sineInOut"
                }),
            )
            .repeatForever()
            .start();
    }

    /**
     * 放大动画 -- 弹簧效果
     * @date 2020-08-20
     * @param {any} endPos: 挂牌移动到的位置
     * @param {any} cb
     * @returns {any}
     */
    scaleBigShow(endPos:cc.Vec3, cb:any) {
        this.node.setScale(0);
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(1, {
                scale: 1
            }, {
                easing: "bounceOut",
                number: 2
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }

    /**
     * 缩小动画
     * @date 2020-08-20
     * @param {any} endPos: 挂牌移动到的位置
     * @param {any} cb
     * @returns {any}
     */
    scaleSmallHide(scaleNum:number, cb:any) {
        //this.node.setScale(0);
        let easingType = "bounceOut";
        if (this.node.scaleX > scaleNum) easingType = "sineOut";
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(0.7, {
                scale: scaleNum
            }, {
                easing: easingType,
                number: 2
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }

    /**
     * 移除动画：向一个终点移动 -- 由慢到快，开始阶段带回弹效果
     * @date 2020-08-20
     * @param {any} endPos: 移动到的位置
     * @param {any} cb
     * @returns {any}
     */
    moveHide(endPos:cc.Vec3, cb:any, easingType = "backIn") {
        if (!easingType || easingType == "") easingType = "backIn";
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(0.7, {
                position: endPos
            }, {
                easing: easingType,
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }

    /**
     * 显示动画：向一个终点移动 -- 由快到慢，结束阶段带回弹效果
     * @date 2020-08-20
     * @param {any} endPos: 移动到的位置
     * @param {any} cb
     * @returns {any}
     */
    moveShow(endPos: cc.Vec3, cb:any, easingType = "backOut") {
        if (!easingType || easingType == "") easingType = "backOut";
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(0.7, {
                position: endPos
            }, {
                easing: easingType,
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }

    /**
     * 渐显效果
     * @date 2020-08-21
     * @returns {any}
     */
    fadeIn() {
        this.node.opacity = 0;
        cc.tween(this.node)
            .to(0.6, {
                opacity: 255
            }, {
                easing: "sineIn",
            })
            .start()
    }

    /**
     * 渐隐效果
     * @date 2020-08-21
     * @returns {any}
     */
    fadeOut(cb:any) {
        cc.tween(this.node)
            .to(0.7, {
                opacity: 0
            }, {
                easing: "sineIn",
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }


    /********************************弹窗效果*************************************/

    /**
     * 从上弹出
     */
    showTopPopUp(endPos, cb) {
        this.node.setPosition(cc.v2(0, cc.winSize.height))
        this.node.stopAllActions();
        cc.tween(this.node)
            .to(1, {
                position: endPos
            }, {
                easing: "backOut",
            })
            .call(function () {
                if (cb) cb()
            })
            .start()
    }
}
