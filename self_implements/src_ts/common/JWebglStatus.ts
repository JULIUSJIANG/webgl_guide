import JWebgl from "./JWebgl.js";

/**
 * 示例的执行环境 - 状态
 */
export default abstract class JWebglStatus {

    /**
     * 归属的运行环境
     */
    relWebgl: JWebgl;

    constructor (relWebgl: JWebgl) {
        this.relWebgl = relWebgl;
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
     * 事件派发 - canvas 出现
     * @param canvas 
     */
    onCanvas (canvas: HTMLCanvasElement) {

    }

    /**
     * 刷新画面
     */
    onRefresh () {

    }

    /**
     * 获取描述
     */
    onGetInfo () {
        return ``;
    }
}