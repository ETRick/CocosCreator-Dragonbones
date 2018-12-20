import CommonUtils from "./common/CommonUtils";
import AvatarNode from "./common/AvatarNode";

@cc._decorator.ccclass
export default class AnimationLayer extends cc.Component {
    private armature: dragonBones.Armature;
    private armatureDisplayComp: dragonBones.ArmatureDisplay;
    private avatarNode: AvatarNode;

    async start() {
        this.avatarNode = CommonUtils.GenerateDBNode("mecha_1004d/mecha_1004d", cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height / 2);
        this.avatarNode.initArmature("mecha_1004d/mecha_1004d", "mecha_1004d");
        await this.avatarNode.waitLoadComplete();
        this.armature = this.avatarNode.getArmature();
        this.armatureDisplayComp = this.avatarNode.getArmatureDisplay();
        this.avatarNode.play("walk");
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
    }

    private _animationEventHandler(eventObject: dragonBones.EventObject): void {
        let attackState = this.armature.animation.getState("attack_01");
        if (!attackState) {
            attackState = this.armature.animation.fadeIn("attack_01", 0.1, 1, 1);
            attackState.resetToPose = false;
            attackState.autoFadeOutTime = 0.1;
            attackState.addBoneMask("chest");
            attackState.addBoneMask("effect_l");
            attackState.addBoneMask("effect_r");
        }
    }
}
