import conMager from "../../conMagers/conMager";

export default class videoAdEvent {
    /*使用方式
        1 实例化对象后，注意只调用一次onInitVedio()函数预加载广告
        2 this.videoAd.onClose 中设置何时给何种奖励
        3 需要显示的地方调用 startVideoAd()
    */
    videoAd = undefined;
    failCb = undefined;
    successCb = undefined;
    videoLoad = false;
    autoAgainPlayTimes = 0;
    autoPlayFlag = false;
    adId = "";
    isDisable = false;
    idDebug: boolean = false;

    // 构造一个广为人知的接口，供用户对该类进行实例化
    init(adId) {
        this.adId = adId;
        this.onInitVedio();
    }

    onInitVedio = function () {
        if (window.tt) {
            this.videoAd = tt.createRewardedVideoAd({
                adUnitId: this.adId
            });
            this.videoAd.onLoad((err) => {
                this.videoLoad = true;
                console.log('Video 加载成功!')
            });
            this.videoAd.onError(err => {
                this.videoLoad = false;
                console.log('Video 加载失败!', err)
            })
        } else {
            this.videoAd = kwaigame.createRewardedVideoAd({
                adUnitId: this.adId
            });
            if (!this.videoAd) {
                conMager.getInstance().getPoolNode("w_tipNode", undefined, "广告尚未准备好");
                console.log("激励广告组件获取失败: ");
                return;
            }
        }
        this.videoAd.onClose(res => {
            if (window.kwaigame) return;
            this.videoAd.load().then(() => {
                console.log("手动加载成功");
            }).catch((err) => {
                console.log("广告组件出现问题", err);
                this.videoAd.load().then(() => {
                    console.log("手动加载成功");
                });
            });
            if (res.isEnded) {
                if (this.successCb) {
                    this.successCb();
                }
            } else {
                if (this.failCb) {
                    this.failCb();
                }
                conMager.getInstance().getPoolNode("w_tipNode", undefined, "观看完整视频才能获得奖励");
                this.successCb = undefined;
                this.failCb = undefined;
            }
        });
        if (window.kwaigame) {
            this.videoAd.onReward(res => {
                if (this.successCb) {
                    this.successCb();
                }
            });
        }
    };


    startVideoAd = function () {
        if (this.isDisable) return;
        this.isDisable = true;
        setTimeout(() => {
            this.isDisable = false;
        }, 800);
        if (window.tt) {
            if (tt.env.VERSION == "preview") {
                if (this.successCb) {
                    this.successCb();
                }
                return;
            }
            if (this.videoLoad) {
                this.videoAd.show();
            } else {
                if (!this.autoPlayFlag) conMager.getInstance().getPoolNode("tipNode", undefined, "广告获取失败,请重试");
                this.videoAd.load().then(() => {
                    console.log("手动加载成功");
                    if (this.autoPlayFlag) return this.videoAd.show();
                }).catch((err) => {
                    console.log("广告组件出现问题", err);
                    this.videoAd.load().then(() => {
                        console.log("手动加载成功");
                        if (this.autoPlayFlag) return this.videoAd.show();
                    });
                });
            }
        }else if(window.kwaigame){
            if (this.videoAd) {
                // window._ui_mager.getNodeByPool("w_tipNode", "存在广告组件实例" + JSON.stringify(this.videoAd.show));
                this.videoAd.show({
                    success: () => {
                        console.log("激励视频播放成功1");
                    },
                    fail: (error) => {
                        console.log("激励视频播放失败: " + JSON.stringify(error));
                        // window._ui_mager.getNodeByPool("w_tipNode", "暂无广告,请稍后再试"+JSON.stringify(error));
                        conMager.getInstance().getPoolNode("tipNode", undefined, "广告获取失败,请重试");
                    },
                    testFail: true,
                })
            } else {
                this.onInitKuaiShouVideo();
            }
        } else {
            // conMager.getInstance().getPoolNode("tipNode", undefined, "暂无广告,请稍后再试");
            if (this.successCb) {
                this.successCb();
            }
        }
    }
};