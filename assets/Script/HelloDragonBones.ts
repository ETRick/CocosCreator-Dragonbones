import LoaderManager from "./common/LoaderManager";
import AvatarNode from "./common/AvatarNode";

/**
 * 掩饰如何动态加载dragonbones armature进场景（cocos creator 2.0）
 * cocos creator 2等某几个版本dragonbones库可能有问题，该问题已经修复https://github.com/cocos-creator/engine/pull/3623,
 * 可以自己参考引擎定制工作流程，将引擎里面dragonbones相关代码替换
 * https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html
 */
@cc._decorator.ccclass
export default class HelloDragonBones extends cc.Component {
    async start() {
        let dbNode = new cc.Node();
        dbNode.setParent(cc.director.getScene());
        dbNode.x = cc.view.getVisibleSize().width / 2;
        dbNode.y = 0;
        dbNode.addComponent(dragonBones.ArmatureDisplay);
        let avatarNode = dbNode.addComponent(AvatarNode);
        avatarNode.initArmature("mecha_1002_101d_show/mecha_1002_101d_show", "mecha_1002_101d");
        await avatarNode.waitLoadComplete();
        avatarNode.play("idle");
    }
}
