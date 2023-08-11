import JWebglDemoInstanceRecord from "./JWebglDemoInstanceRecord.js";
import JWebglTouch from "./JWebglTouch.js";
import JWebglAssetsImage from "./JWebglAssetsImage.js";
import JWebglStatusFinished from "./JWebglStatusFinished.js";
import JWebglStatusLoading from "./JWebglStatusLoading.js";
import P16Clear from "../demo/P16Clear.js";
import P24Point from "../demo/P24Point.js";
import P39Point from "../demo/P39Point.js";
import P47ClickPoint from "../demo/P47ClickPoint.js";
import P56Colored from "../demo/P56Colored.js";
import P66MultiPoint from "../demo/P66MultiPoint.js";
import P80Triangle from "../demo/P80Triangle.js";
import P88Translate from "../demo/P88Translate.js";
import P94Rotate from "../demo/P94Rotate.js";
import P102Matrix from "../demo/P102Matrix.js";
import P115Matrix from "../demo/P115Matrix.js";
import P120Animate from "../demo/P120Animate.js";
import P133MultiPoint from "../demo/P133MultiPoint.js";
import P136MultiPoint from "../demo/P136MultiPoint.js";
import P141Varying from "../demo/P141Varying.js";
/**
 * 示例的执行环境
 */
class JWebgl {
    constructor() {
        /**
         * 交互 - 起始
         */
        this.touchStart = new JWebglTouch();
        /**
         * 交互 - 拖拽
         */
        this.touchMove = new JWebglTouch();
        /**
         * 交互 - 结束
         */
        this.touchEnd = new JWebglTouch();
        /**
         * 名称到实例的映射
         */
        this.mapNameToDemo = new Map();
        this._mapSrcToImg = new Map();
        /**
         * 示例的集合
         */
        this.listAllRecord = new Array();
        let listDemo = [
            P16Clear,
            P24Point,
            P39Point,
            P47ClickPoint,
            P56Colored,
            P66MultiPoint,
            P80Triangle,
            P88Translate,
            P94Rotate,
            P102Matrix,
            P115Matrix,
            P120Animate,
            P133MultiPoint,
            P136MultiPoint,
            P141Varying
        ];
        for (let i = 0; i < listDemo.length; i++) {
            let listDemoI = listDemo[i];
            this.createDemoInstanceRecord(listDemoI);
        }
        ;
        this.statusLoading = new JWebglStatusLoading(this);
        this.statusFinished = new JWebglStatusFinished(this);
        this.enter(this.statusLoading);
    }
    useProgram(program) {
        if (program == this._program) {
            return;
        }
        ;
        this._program = program;
        this.ctx.useProgram(this._program.program);
    }
    drawArrays(program, mode, first, count) {
        this.useProgram(program);
        this.ctx.drawArrays(mode, first, count);
    }
    /**
     * 获取图片资源
     * @param src
     * @returns
     */
    getImage(src) {
        if (!this._mapSrcToImg.has(src)) {
            this._mapSrcToImg.set(src, new JWebglAssetsImage({
                webgl: this,
                src: src
            }));
        }
        ;
        return this._mapSrcToImg.get(src);
    }
    /**
     * 切换状态
     * @param status
     */
    enter(status) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec != null) {
            rec.onExit();
        }
        ;
        this.currStatus.onEnter();
    }
    /**
     * 创建示例
     * @param t
     */
    createDemoInstanceRecord(t) {
        let record = new JWebglDemoInstanceRecord({
            webgl: this,
            type: t
        });
        this.mapNameToDemo.set(record.inst.getName(), record);
        this.listAllRecord.push(record);
    }
    /**
     * 普通的日志打印
     * @param msg
     */
    log(...msg) {
        console.log(...msg);
    }
    /**
     * 错误报告
     * @param msg
     */
    error(...msg) {
        console.error(...msg);
    }
}
export default JWebgl;
