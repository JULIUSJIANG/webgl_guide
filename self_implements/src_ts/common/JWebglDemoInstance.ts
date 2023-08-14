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

    _onInit () {
        let symbolCache = JWebglDemoInstance.getCache (this);
        symbolCache.mapKeyNameToProgramClass.forEach ((programClass, propsName) => {
            let program = this.createProgram (programClass);
            this [propsName] = program;
        });
        this.onInit ();
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

    /**
     * 按下按钮
     * @param key 
     */
    onKeyDown (key: string) {

    }
}

namespace JWebglDemoInstance {

    const SYMBOL_KEY = Symbol (`JWebglDemoInstance.SYMBOL_KEY`);

    /**
     * 原型上的记录
     */
    export interface SymbolCache {
        /**
         * 属性名到着色程序类的映射
         */
        mapKeyNameToProgramClass: Map <string, typeof JWebglProgram>;
    }

    /**
     * 获取缓存数据
     * @param c 
     * @returns 
     */
    export function getCache (c): SymbolCache {
        if (!c [SYMBOL_KEY]) {
            let cache: SymbolCache = {
                mapKeyNameToProgramClass: new Map ()
            };
            c [SYMBOL_KEY] = cache;
        };
        return c [SYMBOL_KEY];
    }

    /**
     * 着色程序
     * @param t 
     * @returns 
     */
    export function program <T extends typeof JWebglProgram> (t: T) {
        return function decorator (inst: JWebglDemoInstance, propsName: string) {
            let cache = getCache (inst);
            cache.mapKeyNameToProgramClass.set (propsName, t);
        };
    }
}

export default JWebglDemoInstance;