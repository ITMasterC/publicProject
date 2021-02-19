import { Global } from "../config/Global";
import { LoadMgr } from "./LoadMgr";

/**
 * 音乐管理器
 */
class CMusicMgr {
    
    /** 音乐AudioSource */
    private MusicAudioSource: cc.AudioSource;
    /** 音效AudioSource */
    private MusicEffectAudioSource: cc.AudioSource;
    /** 初始化音频组件 */
    public init() {
        let _audioSourceName = "musicAudioSource", _audioSoundSourceName = "soundAudioSource";
        var MusicAudioSource = cc.find(_audioSourceName);
        var MusicEffectAudioSource = cc.find(_audioSoundSourceName);
        if (!MusicAudioSource) {
            MusicAudioSource = new cc.Node(_audioSourceName);
            MusicAudioSource.addComponent(cc.AudioSource);
            cc.director.getScene().addChild(MusicAudioSource);
        }
        if (!MusicEffectAudioSource) {
            MusicEffectAudioSource = new cc.Node(_audioSoundSourceName);
            MusicEffectAudioSource.addComponent(cc.AudioSource);
            cc.director.getScene().addChild(MusicEffectAudioSource);
        }
        if (!cc.game.isPersistRootNode(MusicAudioSource) && !cc.game.isPersistRootNode(MusicEffectAudioSource)
        ) {
            cc.game.addPersistRootNode(MusicAudioSource);
            cc.game.addPersistRootNode(MusicEffectAudioSource);
            this.MusicAudioSource = MusicAudioSource.getComponent(cc.AudioSource);
            this.MusicEffectAudioSource = MusicEffectAudioSource.getComponent(cc.AudioSource);

            console.log("【初始化音频组件及数据】");
        } else {
            console.log("【音频组件及数据已初始化！】");
        }
    }
   
     /**
      * 播放音乐
      * @param musicName    音乐名称
      * @param isLoop       是否循环
      */
     public PlayMusicByName(musicName: string, isLoop = true) {
        var state = this.isMusicMute();
        if (state == false) {
            return;
        }
        let clip = LoadMgr.getRes(musicName, cc.AudioClip);
        if (clip == null) {
            let url = LoadMgr.getMusicUrl(musicName);
            LoadMgr.loadRes(url, cc.AudioClip, null).then((clip) => {
                this.playMusicByClip(clip, isLoop);
            });
        } else {
            this.playMusicByClip(clip, isLoop);
        }
    }

    /**
     * 播放音效
     * @param audioClip 音效名称
     * @param isLoop 是否循环
     */
    private playMusicByClip(audioClip: cc.AudioClip, isLoop = true) {
        this.MusicAudioSource.loop = isLoop;
        this.MusicAudioSource.volume = 1;
        this.MusicAudioSource.clip = audioClip;
        this.MusicAudioSource.stop();
        this.MusicAudioSource.play();
    }
    /**
     * 播放音效
     * @param musicName    音效名称
     * @param isLoop       是否循环
     */
    public PlaySoundByName(musicName: string, isLoop = false) {
        var state = this.isSoundMute();
        var isOpen = state ? true : false;
        if (isOpen == false) {
            return;
        }
        let clip = LoadMgr.getRes(musicName, cc.AudioClip);
        if (clip == null) {
            let url = LoadMgr.getMusicUrl(musicName);
            LoadMgr.loadRes(url, cc.AudioClip, null).then((clip) => {
                this.playSoundByClip(clip, isLoop);
            });
        } else {
            this.playSoundByClip(clip, isLoop);
        }
    }
    private playSoundByClip(audioClip: cc.AudioClip, isLoop = false) {
        this.MusicEffectAudioSource.loop = isLoop;
        this.MusicEffectAudioSource.volume = 1;
        this.MusicEffectAudioSource.clip = audioClip;
        this.MusicEffectAudioSource.stop();
        this.MusicEffectAudioSource.play();
    }
    /**音乐开关事件 */
    public OnMusicSwitch() {
        var state = this.isMusicMute();
        if (state == true) {
            this.MusicAudioSource.stop();
        } else {
            this.MusicAudioSource.play();
        }
        state = !state;
        this.setMusicMute(state);
    }
    /**音效开关事件 */
    public OnSoundSwitch() {
        var state = this.isSoundMute();
        if (state == true) {
            this.MusicEffectAudioSource.stop();
        }
        state = !state;
        this.setSoundMute(state);
    }
    /** 背景音乐是否静音 返回 boolean*/
    private isMusicMute():boolean{
        return Global.getAudioControl().music
    }
     /**
     * 设置音乐是否静音
     * @param Mute 是否静音
     */
    private setMusicMute(Mute:boolean){
        let param = {
            music : Mute
        }
        Global.setAudioControl(param)
    }
    /** 音效是否静音 返回 boolean */

    private isSoundMute():boolean{
        return Global.getAudioControl().sound
    }
    /**
     * 设置音效是否静音
     * @param Mute 是否静音
     */
    private setSoundMute(Mute:boolean){
        let param = {
            sound : Mute
        }
        Global.setAudioControl(param)
    }
}
let MusicMgr = new CMusicMgr
export {MusicMgr}