import videoAdEvent from './adEvent/videoEvent';
import bannerEvent from './adEvent/bannerEvent'
import interstitialEvent from './adEvent/interstitialEvent';
import shareEvent from './shareEvent';
import createVideoEvent from './createVideo';
export default class _pl_fun{
    private static instance: _pl_fun;
    private systemIfon: any;
    private screenIfon: any;
    private ad_videoEvent: any;
    private createVideoEvent: any;
    private shareEvent: any;
    private ad_bannerEvent: any;
    private ad_interstitial: any;

    public static getInstance(): _pl_fun{
        if(!this.instance){
            this.instance = new _pl_fun();
        }
        return this.instance;
    }

    public  init() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.systemIfon = wx.getSystemInfoSync(); //获取设备数据
            this.screenIfon = wx.getLaunchOptionsSync();//启动小游戏的场景值
        }
        this.ad_videoEvent = new videoAdEvent();
        this.ad_videoEvent.init('q0qhb4stuq1fajlao1');
        this.ad_bannerEvent =new bannerEvent();
        this.ad_bannerEvent.init(['adunit-f0c76553c3742a44', 'adunit-31311959cf5f090f', 'adunit-ccb098880f98cf09']);
        this.ad_interstitial = new interstitialEvent();
        this.ad_interstitial.init('i9724633jn81479466');
        this.shareEvent = new shareEvent();
        this.shareEvent.init();
        this.createVideoEvent = new createVideoEvent();
        this.createVideoEvent.init();
    }

    public showAdVideo(successCb, failCb = undefined, autoPlayFlag = false) {
        this.ad_videoEvent.autoAgainPlayTimes = 0;
        this.ad_videoEvent.autoPlayFlag = autoPlayFlag;
        this.ad_videoEvent.successCb = successCb;
        this.ad_videoEvent.failCb = failCb;
        this.ad_videoEvent.startVideoAd();
    }

    public showBanner(isPop = 2) {
        this.ad_bannerEvent.isShowBanner = true;
        if (cc.sys.platform === cc.sys.WECHAT_GAME){
            this.ad_bannerEvent.showBannerAd(isPop);
        }
    }

    public updateBanner(){
        if (cc.sys.platform === cc.sys.WECHAT_GAME){
            this.ad_bannerEvent.showBannerAd(4);
        }
    }

    public hideBanner() {
        this.ad_bannerEvent.isShowBanner = false;
        if (cc.sys.platform === cc.sys.WECHAT_GAME){
            this.ad_bannerEvent.showBannerAd();
        }
    }

    public showInterstitalAd(){
       this.ad_interstitial.showAd();
    }

    public startCreateVideo(){
        this.createVideoEvent.startCreate();
    }

    public stopCreateVideo(){
        this.createVideoEvent.stopCreate();
    }

    public onShare(){
        this.shareEvent.onShare();
    }
}