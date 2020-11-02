# hello-world
Hello world new project template.


conMager: 动态资源控制器
    winNodeMager: 弹窗预制体资源控制器，弹窗预制体资源存放在 “prefabsWinNodes” 文件夹下，通过 KEY.TS 中的【ui 弹窗配置】配置好对应的资源详细路径。（按需加载实例化）
    audioMager: 音效资源、音效播放控制器，音效资源放在 “audioRes” 文件夹下，通过资源的名称进行播放。
    poolNodeMager: 需要通过动态获取的小件预制体，资源存放在 “prefabsPoolNodes” 文件夹下，通过 KEY.TS 中的【用到对象池的预制体配置】配置好对应的资源详细路径。“usePool” 字段标识是否使用对象池进行管理.