import LoaderManager from "./common/LoaderManager";
import AvatarNode from "./common/AvatarNode";
import CommonUtils from "./common/CommonUtils";

@cc._decorator.ccclass
export default class BoneOffset extends cc.Component {
    async start() {
        
        // avatarNode.play("idle");

        for (let i = 0; i < 100; ++i) {
            let avatarNode = CommonUtils.GenerateDBNode("bullet_01/bullet_01", cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height / 2);
            avatarNode.initArmature("bullet_01/bullet_01", "bullet_01");
            await avatarNode.waitLoadComplete();
            let armatureDisplayComp = avatarNode.getArmatureDisplay();
            // 因为在_animationEventHandler 里面拿不到dragonbones.ArmatureDisplay, 临时这么加了一下
            armatureDisplayComp.armature().proxy["_comp"] = armatureDisplayComp;
            armatureDisplayComp.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
            this._moveTo(armatureDisplayComp);
        }
    }

    private _animationEventHandler(eventObject: dragonBones.EventObject): void {
        this._moveTo(eventObject.armature.proxy["_comp"] as dragonBones.ArmatureDisplay);
    }

    private _moveTo(armatureComponent: dragonBones.ArmatureDisplay): void {
        const fromX = armatureComponent.node.x;
        const fromY = armatureComponent.node.y;

        const canvas = this.getComponent(cc.Canvas);
        const size = canvas.designResolution;

        const toX = Math.random() * size.width - size.width * 0.5;
        const toY = Math.random() * size.height - size.height * 0.5;
        const dX = toX - fromX;
        const dY = toY - fromY;
        const rootSlot = armatureComponent.armature().getBone("root");
        const bulletSlot = armatureComponent.armature().getBone("bullet");
        // Modify root and bullet bone offset.
        rootSlot.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100.0; // Bullet translate distance is 100 px.
        rootSlot.offset.rotation = Math.atan2(dY, dX);
        rootSlot.offset.skew = Math.random() * Math.PI - Math.PI * 0.5; // Random skew.
        bulletSlot.offset.scaleX = 0.5 + Math.random() * 0.5; // Random scale.
        bulletSlot.offset.scaleY = 0.5 + Math.random() * 0.5;
        // Update root and bullet bone.
        rootSlot.invalidUpdate();
        bulletSlot.invalidUpdate();
        //
        armatureComponent.armature().animation.timeScale = 0.5 + Math.random() * 1.0; // Random animation speed.
        armatureComponent.armature().animation.play("idle", 1);
    }
}
