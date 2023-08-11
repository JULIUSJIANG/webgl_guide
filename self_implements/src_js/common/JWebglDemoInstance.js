const SIZE = [400, 400];
const COLOR = [0, 0, 0, 1];
/**
 * 案例对象
 */
class JWebglDemoInstance {
    constructor(args) {
        /**
         * 着色程序的集合
         */
        this._listProgram = new Array();
        this.relWebgl = args.webgl;
    }
    createProgram(t) {
        let program = new t({
            webgl: this.relWebgl
        });
        this._listProgram.push(program);
        return program;
    }
    /**
     * 获取画布尺寸
     * @returns
     */
    onGetCanvasSize() {
        return SIZE;
    }
    /**
     * 获取画布背景颜色
     * @returns
     */
    onGetBgColor() {
        return COLOR;
    }
    /**
     * 事件派发 - 初始化
     */
    onInit() {
    }
    /**
     * 事件派发 - 显示
     */
    onEnable() {
    }
    /**
     * 事件派发 - 刷新
     * @param dt
     */
    onUpdate(dt) {
    }
    /**
     * 事件派发 - 隐藏
     */
    onDisable() {
    }
    /**
     * 事件派发 - 重新绘制
     */
    onDraw() {
    }
    /**
     * 事件派发 - 交互开始
     */
    onTouchStart() {
    }
    /**
     * 事件派发 - 交互中
     */
    onTouchMove() {
    }
    /**
     * 事件派发 - 交互结束
     */
    onTouchEnd() {
    }
}
export default JWebglDemoInstance;
