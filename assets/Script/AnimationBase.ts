import CommonUtils from "./common/CommonUtils";
import AvatarNode from "./common/AvatarNode";

@cc._decorator.ccclass
export default class AnimationBase extends cc.Component {
    private armature: dragonBones.Armature;
    private armatureDisplayComp: dragonBones.ArmatureDisplay;
    private avatarNode: AvatarNode;

    async start() {
        this.avatarNode = CommonUtils.GenerateDBNode("progress_bar", cc.view.getVisibleSize().width / 2, cc.view.getVisibleSize().height / 2);
        this.avatarNode.initArmature("progress_bar/progress_bar", "progress_bar");
        await this.avatarNode.waitLoadComplete();
        this.armature = this.avatarNode.getArmature();
        this.armatureDisplayComp = this.avatarNode.getArmatureDisplay();
       
        // Add animation event listener.
        // 这里的addEventListener API设计有问题，传递的listener声明不对，我自己改了creator.d.ts
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.START, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.FADE_IN, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.FADE_OUT, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this.armatureDisplayComp.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._animationEventHandler, this);
        this.armature.animation.play("idle");
        // 
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchHandler, this);
    }

    private _touchHandler(event: cc.Event.EventTouch): void {
        const progress = Math.min(Math.max((event.touch.getLocationX() - this.node.x + 300.0) / 600.0, 0.0), 1.0);

        switch (event.type) {
            case cc.Node.EventType.TOUCH_START:
                this.armature.animation.gotoAndStopByProgress("idle", progress);
                break;

            case cc.Node.EventType.TOUCH_END:
                this.armature.animation.play();
                break;

            case cc.Node.EventType.TOUCH_MOVE:
                const animationState = this.armature.animation.getState("idle");
                if (animationState) {
                    animationState.currentTime = animationState.totalTime * progress;
                }
                break;
        }
    }

    /**
     * 这里不用cc.Event
     * @param eventObject  
     */
    private _animationEventHandler(eventObject: dragonBones.EventObject): void {
        console.log(eventObject.animationState.name, eventObject.type, eventObject.name);
    }
}
