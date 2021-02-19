export default class shareEvent {
    constructor() {
    }
    // 构造一个广为人知的接口，供用户对该类进行实例化
    init() {
        this.judgeReward();
    }

    onShare = function () {
        if (window.tt) {
            var title = "小游戏分享标题";
            var url = "./other/share.jpg";
            //被动分享 显示
            window.tt.showShareMenu({
                withShareTicket: true
            })
            window.tt.aldShareAppMessage({
                title: title,
                imageUrl: url
            })
        } else if (window.kwaigame) {
            let params = { title: undefined, desc: undefined, iconUrl: undefined, imageUrl: undefined, extension: undefined, response: undefined };
            params.title = "最强大冒险2";
            params.desc = "物理老师都过不了解密小游戏";
            params.iconUrl = "游戏icon";
            params.imageUrl = "分享图片";
            params.extension = {
                name: "test"
            };
            params.response = (result) => {
                console.log("分享完成: " + JSON.stringify(result));
            }
            kwaigame.shareToMsg(params);
        }
    };

    judgeReward = function () {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) return;
        var title = "小游戏分享标题";
        var url = "./other/share.jpg";
        window.tt.showShareMenu({
            withShareTicket: false
        });
        window.tt.onShareAppMessage(function () {
            return {
                title: title,
                imageUrl: url,
                query: 'k1=v1&ke=v2'
            }
        });
        window.tt.onShow(function (res) {
        });
        window.tt.onHide(function (res) {
        });
    };
}

