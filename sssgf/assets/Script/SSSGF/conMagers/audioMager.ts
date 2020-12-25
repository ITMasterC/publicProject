// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const { ccclass, property } = cc._decorator;
// @ccclass
export default class _audioMager{

    //@property
    audioNames: any = {};
    //@property
    bundle: any;
    //@property
    audioEngine: any = cc.audioEngine;
    //@property
    bgmId: any;

    _flagTime: boolean = false;
    _oldName: string = "";
    _audioId : number = undefined;

    init() {
        cc.assetManager.loadBundle("audioRes", (err, bundle) => {
            this.bundle = bundle;
            this.loadAudios();
        })
    }

    loadAudios() {
        let map = this.bundle._config.assetInfos._map;
        for (const key of Object.keys(map)) {
            this.bundle.load(map[key].path, cc.AudioClip,(finifh, total, item)=>{
            }, (err, clip) => {
                this.audioNames[clip.name] = clip;
            });
        }
    }
    
    playAudioEff(type: string = "click", loop: boolean = false, volume: number = 1) {
        this._oldName = type;
        if(this._flagTime)return;
        if (this._oldName == "yxcj_chb") {
            this._flagTime = true;
            setTimeout(() => {
                this._flagTime = false;
            }, 1000);
        }
        if(loop){
            this._audioId = this.audioEngine.play(this.audioNames[type], loop, volume);
        }else{
            this.audioEngine.play(this.audioNames[type], loop, volume);
        }
    }

    stopAudioEff(){
        this.audioEngine.stop(this._audioId);
    }

    playBGM(bgmName: string) {
        if (this.audioEngine.isMusicPlaying()) return;
        if (this.audioEngine) this.bgmId = this.audioEngine.playMusic(this.audioNames[bgmName], true);
    }

    stopBGM() {
        if (!this.audioEngine.isMusicPlaying()) return;
        this.audioEngine.stopMusic(this.bgmId);
    }
};