// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const { ccclass, property } = cc._decorator;
// @ccclass
export default class _audioMager {

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
    _audioId: number = undefined;

    init() {
        cc.assetManager.loadBundle("audioRes", (err, bundle) => {
            this.bundle = bundle;
            // this.loadAudios();
        })
    }

    loadAudios(type: string = "click", loop: boolean = false, isBgm: boolean = false) {
        let map = this.bundle._config.assetInfos._map;
        console.log('-------map:', map);
        for (const key of Object.keys(map)) {
            if (map[key].path.indexOf(type) != -1) {
                this.bundle.load(map[key].path, cc.AudioClip, (finifh, total, item) => {
                }, (err, clip) => {
                    this.audioNames[clip.name] = clip;
                    console.log('-------clip.name:', clip.name);
                    if(isBgm){
                        if (this.audioEngine) this.bgmId = this.audioEngine.playMusic(this.audioNames[type], true);
                    }else if (clip.name == type) {
                        if (loop) {
                            this._audioId = this.audioEngine.play(this.audioNames[type], loop, 1);
                        } else {
                            this.audioEngine.play(this.audioNames[type], loop, 1);
                        }
                    }
                });
            }
        }
    }

    playAudioEff(type: string = "click", loop: boolean = false, volume: number = 1) {
        this._oldName = type;
        if (this._flagTime) return;
        if (this._oldName == "yxcj_chb") {
            this._flagTime = true;
            setTimeout(() => {
                this._flagTime = false;
            }, 1000);
        }
        if (this.audioNames[type]) {
            if (loop) {
                this._audioId = this.audioEngine.play(this.audioNames[type], loop, volume);
            } else {
                this.audioEngine.play(this.audioNames[type], loop, volume);
            }
        } else {
            this.loadAudios(type, loop)
        }
    }

    stopAudioEff() {
        this.audioEngine.stop(this._audioId);
    }

    playBGM(bgmName: string) {
        if (this.audioEngine.isMusicPlaying()) return;
        if(this.audioNames[bgmName]){            
            if (this.audioEngine) this.bgmId = this.audioEngine.playMusic(this.audioNames[bgmName], true);
        }else{
            this.loadAudios(bgmName, true, true)
        }
    }

    stopBGM() {
        if (!this.audioEngine.isMusicPlaying()) return;
        this.audioEngine.stopMusic(this.bgmId);
    }
};