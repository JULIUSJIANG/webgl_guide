import JWebgl from "./JWebgl.js";
import JWebglProgram from "./JWebglProgram.js";
import IndexGlobal from "../IndexGlobal.js";

const SIZE = [400, 400];

const COLOR = [0, 0, 0, 1];

/**
 * 案例对象
 */
abstract class JWebglDemoInstance {

    /**
     * webgl 环境
     */
    relWebgl: JWebgl;

    constructor (args: {
        webgl: JWebgl
    }) 
    {
        this.relWebgl = args.webgl;
    }

    /**
     * 着色程序的集合
     */
    _listProgram: Array <JWebglProgram> = new Array ();

    createProgram <T extends typeof JWebglProgram> (t: T) {
        let program = new (t as any) ({
            webgl: this.relWebgl
        });
        this._listProgram.push (program);
        return program;
    }

    /**
     * 获取名字
     */
    abstract getName ();

    /**
     * 获取画布尺寸
     * @returns 
     */
    onGetCanvasSize () {
        return SIZE;
    }

    /**
     * 获取画布背景颜色
     * @returns 
     */
    onGetBgColor () {
        return COLOR;
    }

    /**
     * 事件派发 - 初始化
     */
    onInit () {

    }

    /**
     * 事件派发 - 显示
     */
    onEnable () {

    }

    /**
     * 事件派发 - 刷新
     * @param dt 
     */
    onUpdate (dt: number) {

    }

    /**
     * 事件派发 - 隐藏
     */
    onDisable () {

    }

    /**
     * 事件派发 - 重新绘制
     */
    onDraw () {

    }

    /**
     * 事件派发 - 交互开始
     */
    onTouchStart () {

    }

    /**
     * 事件派发 - 交互中
     */
    onTouchMove () {

    }

    /**
     * 事件派发 - 交互结束
     */
    onTouchEnd () {

    }
}

export default JWebglDemoInstance;