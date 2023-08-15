import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
/**
 * 清空画布
 */
export default class P16HelloCanvas extends JWebglDemoInstance {
    getName() {
        return `P16HelloCanvas`;
    }
    onGetInfo() {
        return `展示一个纯色的 canvas`;
    }
    onDraw() {
        // 设置背景颜色
        this.relWebgl.ctx.clearColor(1, 0, 0, 1);
        // 正式清除颜色缓冲区
        this.relWebgl.ctx.clear(IndexGlobal.webgl.ctx.COLOR_BUFFER_BIT);
    }
}
