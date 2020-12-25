# hello-world
Hello world new project template.


## [conMager](https://github.com/ITMasterC/publicProject/tree/master/sssgf/assets/Script/SSSGF/conMagers): 动态资源控制器
   **winNodeMager:** 弹窗预制体资源控制器，弹窗预制体资源存放在 “[prefabsWinNodes](https://github.com/ITMasterC/publicProject/tree/master/sssgf/assets/prefabsWinNodes)” 文件夹下，通过 [KEY.TS](https://github.com/ITMasterC/publicProject/blob/master/sssgf/assets/Script/KEY.ts) 中的【ui 弹窗配置】配置好对应的资源详细路径。（按需加载实例化）  
   
   **audioMager:**  音效资源、音效播放控制器，音效资源放在 “[audioRes](https://github.com/ITMasterC/publicProject/tree/master/sssgf/assets/audioRes)” 文件夹下，通过资源的名称进行播放。   
   
   **poolNodeMager:** 需要通过动态获取的小件预制体，资源存放在 “[prefabsPoolNodes](https://github.com/ITMasterC/publicProject/tree/master/sssgf/assets/prefabsPoolNodes)” 文件夹下，通过 KEY.TS 中的【用到对象池的预制体配置】配置好对应的资源详细路径。“usePool” 字段标识是否使用对象池进行管理.   
   

## 优化数据存储、音效播放、添加UIaction简易控制脚本、添加消息事件
