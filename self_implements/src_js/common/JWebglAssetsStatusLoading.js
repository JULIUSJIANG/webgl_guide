import JWebglAssetsStatus from "./JWebglAssetsStatus.js";
/**
 * 资源数据 - 状态 - 加载中
 */
export default class JWebglAssetsStatusLoading extends JWebglAssetsStatus {
    onLoadFinish() {
        this.relAssets.enter(this.relAssets.statusFinished);
    }
}
