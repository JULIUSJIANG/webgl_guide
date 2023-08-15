import JWebglStatus from "./JWebglStatus";

/**
 * 示例的执行环境 - 状态 - 加载中
 */
export default class JWebglStatusLoading extends JWebglStatus {

    onCanvas (canvas: HTMLCanvasElement): void {
        this.relWebgl.canvas = canvas;
        this.relWebgl.ctx = this.relWebgl.canvas.getContext (`webgl`);
        this.relWebgl.enter (this.relWebgl.statusFinished);
    }
}