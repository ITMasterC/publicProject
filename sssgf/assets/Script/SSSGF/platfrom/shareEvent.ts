export default class shareEvent {
    constructor() {
    }
    // 构造一个广为人知的接口，供用户对该类进行实例化
    init() {
        this.judgeReward();
    }

    onShare = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var title = "小游戏分享标题";
            var url = "./other/share.jpg";
            //被动分享 显示
            window.wx.showShareMenu({
                withShareTicket: true
            })
            window.wx.aldShareAppMessage({
                title: title,
                imageUrl: url
            })

            if (cc.sys.platform === cc.sys.WECHAT_GAME && window.wx.aldStage) {
                window.wx.aldSendEvent('分享', {
                    "行为": "按钮分享",
                });
            }
        }
    };

    judgeReward = function () {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        var title = "小游戏分享标题";
        var url = "./other/share.jpg";
        window.wx.showShareMenu({
            withShareTicket: false
        });
        window.wx.onShareAppMessage(function () {
            return {
                title: title,
                imageUrl: url,
                query: 'k1=v1&ke=v2'
            }
        });
        window.wx.onShow(function (res) {
        });
        window.wx.onHide(function (res) {
        });
    };
}

