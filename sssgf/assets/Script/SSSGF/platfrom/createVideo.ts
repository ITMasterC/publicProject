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
        if (window.tt && tt.getGameRecorderManager) {
            this.manager = tt.getGameRecorderManager();
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
        } else if (window.kwaigame) {
            this.manager = kwaigame.createMediaRecorder();
            if (this.manager === null) {
                console.log("当前版本 App 不支持录屏")
                return;
            }
            this.manager.onStart(res => {
                var time = new Date();
                this.startCreateVideoTime = Number(time.getTime().toString());
                this.videoPath = undefined;
                // controller.showTipText("开始录制视频录制！");
            })

            this.manager.onStop(res => {
                console.log('-----------结束录制视频');
                var time = new Date();
                this.endCreateVideoTime = Number(time.getTime().toString());
                if (this.endCreateVideoTime - this.startCreateVideoTime > 3500) {
                    this.videoPath = res.videoID;
                } else {
                    conMager.getInstance().getPoolNode("w_tipNode", undefined, "视频录制时间过短！");
                }
            })
        }
    }

    startCreate = function () {
        if (!this.manager) return;
        if (this.isCreateVing) return;
        this.isCreateVing = true;
        if (window.kwaigame) {
            this.manager.start();
            return;
        }
        this.manager.start({
            duration: 200,
        });
    }

    stopCreate = function () {
        if (!this.manager) return;
        this.isCreateVing = false;
        if (window.kwaigame) {
            this.manager.stop();
            return;
        }
        this.manager.stop();
    }

    onShareVideo = function (cbFun) {
        if (this.videoPath == undefined) {
            conMager.getInstance().getPoolNode("w_tipNode", undefined, "暂无可分享的录屏!");
            return;
        }
        if (window.tt) {
            let self = this;
            tt.shareAppMessage({
                channel: "video",
                title: "测试分享视频",
                desc: "测试描述",
                imageUrl: "",
                templateId: "", // 替换成通过审核的分享ID
                query: "",
                extra: {
                    videoPath: self.videoPath, // 可替换成录屏得到的视频地址
                    videoTopics: ["我是老师"], //该字段已经被hashtag_list代替，为保证兼容性，建议两个都填写。
                    hashtag_list: ["我是老师"],
                    video_title: "体验当老师的乐趣", //生成的默认内容
                },
                success() {
                    console.log("分享视频成功");
                    if (cbFun) cbFun();
                },
                fail(e) {
                    console.log("分享视频失败");
                    if (cbFun) conMager.getInstance().getPoolNode("w_tipNode", undefined, "分享失败");
                },
            });
        }else if(window.kwaigame){
            this.manager.publishVideo({
                video: this.videoPath,
                callback: (error) => {
                    if (error != null && error  != undefined) {
                        conMager.getInstance().getPoolNode("w_tipNode", undefined, "分享失败");
                        console.log("分享录屏失败: " + JSON.stringify(error));
                        return;
                    }
                    console.log("分享录屏成功");
                    if (cbFun) cbFun();
                    this.videoPath = undefined;
                    conMager.getInstance().getPoolNode("w_tipNode", undefined, "分享成功");
                }
            });
        }
    }
};

