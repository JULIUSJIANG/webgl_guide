import JWebglAssets from "./JWebglAssets.js";

/**
 * 资源数据 - 状态
 */
export default abstract class JWebglAssetsStatus {

    /**
     * 归属的状态机
     */
    relMachine: JWebglAssets;

    constructor (relMachine: JWebglAssets) {
        this.relMachine = relMachine;
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