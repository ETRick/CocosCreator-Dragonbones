import CommonUtils from "./common/CommonUtils";
import AvatarNode from "./common/AvatarNode";

@cc._decorator.ccclass
export default class DragonBonesEvent extends cc.Component {
    private armature: dragonBones.Armature;
    private armatureDisplayComp: dragonBones.ArmatureDisplay;
    private avatarNode: AvatarNode;

    async start() {
        this.avatarNode = CommonUtils.GenerateDBNode("mecha_1004d", cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height / 2);
        this.avatarNode.initArmature("mecha_1004d/mecha_1004d", "mecha_1004d");
        await this.avatarNode.waitLoadComplete();
        this.avatarNode.play("idle");
        this.armature = this.avatarNode.getArmature();
        this.armatureDisplayComp = this.avatarNode.getArmatureDisplay();

        // dragonBones.CCFactory.getInstance();
        // 这个动画带有事件，cocos 的dragonbones 初始化的时候没有传入eventmanger
        // 我自己改了引擎的 dragonbones extension， 实例化 Dragonbones的时候传入了ccArmatureDisplay
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.armature.animation.fadeIn("skill_03", 0.2);
        }, this);
    }

    // 暂时找不到原来示例中的SoundManager
    private _soundEventHandler(eventObject: dragonBones.EventObject): void {
        console.log(eventObject.name);
    }

    private _animationEventHandler(eventObject: dragonBones.EventObject): void {
        if (eventObject.animationState.name === "skill_03") {
            this.armature.animation.fadeIn("walk", 0.2);
        }
    }
}
