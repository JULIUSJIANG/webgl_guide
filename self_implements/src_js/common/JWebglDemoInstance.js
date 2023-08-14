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
    _onInit() {
        let symbolCache = JWebglDemoInstance.getCache(this);
        symbolCache.mapKeyNameToProgramClass.forEach((programClass, propsName) => {
            let program = this.createProgram(programClass);
            this[propsName] = program;
        });
        this.onInit();
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
    /**
     * 按下按钮
     * @param key
     */
    onKeyDown(key) {
    }
}
(function (JWebglDemoInstance) {
    const SYMBOL_KEY = Symbol(`JWebglDemoInstance.SYMBOL_KEY`);
    /**
     * 获取缓存数据
     * @param c
     * @returns
     */
    function getCache(c) {
        if (!c[SYMBOL_KEY]) {
            let cache = {
                mapKeyNameToProgramClass: new Map()
            };
            c[SYMBOL_KEY] = cache;
        }
        ;
        return c[SYMBOL_KEY];
    }
    JWebglDemoInstance.getCache = getCache;
    /**
     * 着色程序
     * @param t
     * @returns
     */
    function program(t) {
        return function decorator(inst, propsName) {
            let cache = getCache(inst);
            cache.mapKeyNameToProgramClass.set(propsName, t);
        };
    }
    JWebglDemoInstance.program = program;
})(JWebglDemoInstance || (JWebglDemoInstance = {}));
export default JWebglDemoInstance;
