import LoaderManager from "./LoaderManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AvatarNode extends cc.Component {
    // log用的tag
    private _logTag: string = "[AvatarNode]";
    // ---------
    private dbResPath: string;
    private armatureName: string;
    private _loadCompleteCallback: (boolean)=>void;
    // ----------

    private armature: dragonBones.Armature;
    private armatureDisplay: dragonBones.ArmatureDisplay;

    onLoad() {
        // 只有添加到场景上才会调用到onLoad和start,而且是添加到场景上后马上就会执行
        this.armatureDisplay = this.getComponent<dragonBones.ArmatureDisplay>(dragonBones.ArmatureDisplay);
        if (!this.armatureDisplay) {
            console.error(this._logTag + "can not find component for dragonBones.ArmatureDisplay.");
        }
    }

    async start() {
        console.log(this._logTag + "start");
        // 给armatureDisplay 赋dragonbones assets 必须要等其start之后
        this.loadDBAssets();
    }

    /**
     * 设置armture信息
     * @param avatarResPath
     * @param armatureName 
     */
    public initArmature(avatarResPath: string, armatureName: string) {
        console.log("initArmature");
        this.dbResPath = avatarResPath;
        this.armatureName = armatureName;
    }

    /**
     * 等待armature生成完毕
     */
    public waitLoadComplete(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.armature) {
                resolve(true);
            } else {
                this._loadCompleteCallback = (flag: boolean) => {
                    if(flag){
                        resolve(true);
                    }else{
                        reject("waitLoadComplete failed");
                    }
                }
            }
        });
    }

    /**
     * 播放动画
     * @param animName 
     * @param playTimes 
     */
    public play(animName: string, playTimes: number = -1): dragonBones.AnimationState {
        return this.armature.animation.play(animName, playTimes);
    }

    /**
     * 加载资源，显示armature
     */
    private async loadDBAssets() {
        try {
            let dbAssets = await LoaderManager.Instance.loadDBAssets(this.dbResPath);
            this.armatureDisplay.dragonAsset = dbAssets.dragonBonesAsset;
            this.armatureDisplay.dragonAtlasAsset = dbAssets.dragonBonesAtlasAsset;

            this.armatureDisplay.armatureName = this.armatureName;
            this.armature = this.armatureDisplay.armature();
            if(this._loadCompleteCallback){
                this._loadCompleteCallback(true);
            }
        } catch (e) {
            console.error(this._logTag + " loadDBAssets error");
            if(this._loadCompleteCallback){
                this._loadCompleteCallback(false);
            }
        }
    }
}
