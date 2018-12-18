import AvatarNode from "./AvatarNode";

export default class CommonUtils{
    public static GenerateDBNode(name: string, x: number, y: number): AvatarNode{
        let dbNode = new cc.Node(name);
        dbNode.setParent(cc.director.getScene());
        dbNode.x = x;
        dbNode.y = y;
        dbNode.addComponent(dragonBones.ArmatureDisplay);
        return dbNode.addComponent(AvatarNode);
    }
}