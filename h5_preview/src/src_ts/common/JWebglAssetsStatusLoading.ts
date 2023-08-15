import JWebglAssetsStatus from "./JWebglAssetsStatus";

/**
 * 资源数据 - 状态 - 加载中
 */
export default class JWebglAssetsStatusLoading extends JWebglAssetsStatus {

    onLoadFinish (): void {
        this.relAssets.enter (this.relAssets.statusFinished);
    }
}