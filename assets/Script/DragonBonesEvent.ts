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

        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.armature.animation.fadeIn("skill_03", 0.2);
        }, this);
    }

    private _soundEventHandler(eventObject: dragonBones.EventObject): void {
        console.log(eventObject.name);
    }

    private _animationEventHandler(eventObject: dragonBones.EventObject): void {
        if (eventObject.animationState.name === "skill_03") {
            this.armature.animation.fadeIn("walk", 0.2);
        }
    }
}
