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

    // 构造一个广为人知的接口，供用户对该类进行实例化
    init(adId) {
        this.adId = adId;
        this.onInitVedio();
    }

    onInitVedio = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME && wx.createRewardedVideoAd) {
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: this.adId
            });
            this.videoAd.onLoad((err) => {
                this.videoLoad = true;
                console.log('---------------window.globalData.comFunVideo 加载成功!')
            });
            this.videoAd.onError(err => {
                this.videoLoad = false;
                console.log('---------------window.globalData.comFunVideo 加载失败!', err)
            })
            this.videoAd.onClose(res => {
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
                    if (this.autoAgainPlayTimes == 0 && this.autoPlayFlag) {
                        this.autoAgainPlayTimes++;
                        this.successCb = undefined;
                        this.failCb = undefined;
                        this.startVideoAd();
                        return;
                    }
                } else {
                    if (this.autoPlayFlag && this.autoAgainPlayTimes == 0) {
                        this.autoAgainPlayTimes++;
                        this.startVideoAd();
                    } else {
                        if (this.failCb) {
                            this.failCb();
                        }
                        conMager.getInstance().getPoolNode("w_tipNode", undefined, "观看完整视频才能获得奖励");
                        this.successCb = undefined;
                        this.failCb = undefined;
                    }
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
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (this.videoLoad) {
                this.videoAd.show();
            } else {
                if (!this.autoPlayFlag) conMager.getInstance().getPoolNode("w_tipNode", undefined, "广告获取失败,请重试");
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
        } else {
            conMager.getInstance().getPoolNode("w_tipNode",undefined, "暂无广告,请稍后再试");
        }
    }
};