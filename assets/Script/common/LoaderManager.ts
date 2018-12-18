export default class LoaderManager {
    private static _instance: LoaderManager;
    public static get Instance(): LoaderManager{
        if(!LoaderManager._instance){
            LoaderManager._instance = new LoaderManager();
        }
        return LoaderManager._instance;
    }

    /**
     * 异步加载资源
     * @param url 
     * @param assetType 
     */
    public loadAssetAsync(url: string, assetType: typeof cc.Asset): Promise<any>{
        return new Promise((resolve, reject)=>{
            let res = cc.loader.getRes(url, assetType);
            if(res){
                resolve(res);
            }else{
                cc.loader.loadRes(url, assetType, (err: any, res: any): void => {
                    if (err) {
                        cc.warn("loadAsset error", url);
                        reject(`load url ${url} failed`);
                        return;
                    }
                    resolve(res);
                });
            }
        });
    }

    /**
     * 加载dragonbones资源
     * @param path 
     */
    public async loadDBAssets(path: string): Promise<dragonBones.DBAssetGroup> {
        try {
            let dragonBonesAsset = await this.loadAssetAsync(path + "_ske", dragonBones.DragonBonesAsset);
            let dragonBonesAtlasAsset = await this.loadAssetAsync(path + "_tex", dragonBones.DragonBonesAtlasAsset);
            return {
                dragonBonesAsset: dragonBonesAsset,
                dragonBonesAtlasAsset: dragonBonesAtlasAsset
            }
        } catch (e) {
            return null;
        }
    }
}