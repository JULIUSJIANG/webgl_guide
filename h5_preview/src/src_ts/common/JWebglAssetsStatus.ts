import JWebglAssets from "./JWebglAssets";

/**
 * 资源数据 - 状态
 */
export default abstract class JWebglAssetsStatus {

    /**
     * 归属的状态机
     */
    relAssets: JWebglAssets;

    constructor (relMachine: JWebglAssets) {
        this.relAssets = relMachine;
    }

    /**
     * 事件派发 - 离开状态
     */
    onExit () {

    }

    /**
     * 事件派发 - 进入状态
     */
    onEnter () {

    }

    /**
     * 事件派发 - 加载完成
     */
    onLoadFinish () {

    }
}