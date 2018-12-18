declare namespace dragonBones {
    class CCFactory extends BaseFactory {
        static readonly getInstance(): CCFactory;

        buildArmatureDisplay(armatureName, dragonBonesName, comp) : dragonBones.Armature;

        createArmatureNode (comp, armatureName, node) : dragonBones.ArmatureDisplay;
    }

    type DBAssetGroup = {
        dragonBonesAsset: dragonBones.DragonBonesAsset,
        dragonBonesAtlasAsset: dragonBones.DragonBonesAtlasAsset
    }
}