import conMager from "../conMagers/conMager";
export default class createVideoEvent {
    manager: any = undefined;
    videoPath: any = undefined;
    isCreateVing: any = undefined;
    startCreateVideoTime: any = undefined;
    // 构造一个广为人知的接口，供用户对该类进行实例化
    init() {
        this.initManager();
    }

    initManager = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME && wx.getGameRecorderManager) {
            this.manager = wx.getGameRecorderManager();
            this.manager.onStart(res => {
                var time = new Date();
                this.startCreateVideoTime = Number(time.getTime().toString());
                this.videoPath = undefined;
            })

            this.manager.onStop(res => {
                var time = new Date();
                this.endCreateVideoTime = Number(time.getTime().toString());
                if (this.endCreateVideoTime - this.startCreateVideoTime > 4000) {
                    this.videoPath = res.videoPath;
                    //window._notification.emit('stopCreateVideo');
                } else {
                    conMager.getInstance().getPoolNode("w_tipNode", undefined, "视频录制时间过短！");
                }
            })
        }
    }

    startCreate = function () {
        if (cc.sys.platform != cc.sys.WECHAT_GAME || !this.manager) return;
        if (this.isCreateVing) return;
        this.isCreateVing = true;
        this.manager.start({
            duration: 200,
        });
    }

    stopCreate = function () {
        if (cc.sys.platform != cc.sys.WECHAT_GAME || !this.manager) return;
        this.isCreateVing = false;
        this.manager.stop();
    }
};

