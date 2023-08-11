import JWebglDemoInstance from "./JWebglDemoInstance.js";
import JWebglDemoInstanceRecord from "./JWebglDemoInstanceRecord.js";
import JWebglTouch from "./JWebglTouch.js";
import JWebglAssetsImage from "./JWebglAssetsImage.js";
import JWebglEnum from "./JWebglEnum.js";
import JWebglProgram from "./JWebglProgram.js";
import JWebglStatus from "./JWebglStatus.js";
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

    /**
     * 标签
     */
    canvas: HTMLCanvasElement;

    /**
     * 上下文
     */
    ctx: WebGLRenderingContext;

    /**
     * 交互 - 起始
     */
    touchStart = new JWebglTouch ();
    /**
     * 交互 - 拖拽
     */
    touchMove = new JWebglTouch ();
    /**
     * 交互 - 结束
     */
    touchEnd = new JWebglTouch ();

    /**
     * 最新交互的记录
     */
    currentTouch: JWebglTouch;

    /**
     * 当前示例
     */
    currentDemo: JWebglDemoInstanceRecord;

    /**
     * 名称到实例的映射
     */
    mapNameToDemo: Map <string, JWebglDemoInstanceRecord> = new Map ();

    constructor () 
    {
        let listDemo: Array <typeof JWebglDemoInstance> = [
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
            let listDemoI = listDemo [i];
            this.createDemoInstanceRecord (listDemoI);
        };
        this.statusLoading = new JWebglStatusLoading (this);
        this.statusFinished = new JWebglStatusFinished (this);
        this.enter (this.statusLoading);
    }

    private _program: JWebglProgram;

    useProgram (program: JWebglProgram) {
        if (program == this._program) {
            return;
        };
        this._program = program;
        this.ctx.useProgram (this._program.program);
    }

    drawArrays (program: JWebglProgram, mode: JWebglEnum.DrawArraysMode, first: number, count: number) {
        this.useProgram (program);
        this.ctx.drawArrays (mode, first, count);
    }

    private _mapSrcToImg = new Map <string, JWebglAssetsImage> ();
    /**
     * 获取图片资源
     * @param src 
     * @returns 
     */
    getImage (src: string) {
        if (!this._mapSrcToImg.has (src)) {
            this._mapSrcToImg.set (src, new JWebglAssetsImage ({
                webgl: this,
                src: src
            }));
        };
        return this._mapSrcToImg.get (src);
    }

    /**
     * 状态 - 加载中
     */
    statusLoading: JWebglStatusLoading;
    /**
     * 状态 - 加载完成
     */
    statusFinished: JWebglStatusFinished;

    /**
     * 当前状态
     */
    currStatus: JWebglStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: JWebglStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec != null) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }

    /**
     * 示例的集合
     */
    listAllRecord = new Array <JWebglDemoInstanceRecord> ();

    /**
     * 创建示例
     * @param t 
     */
    createDemoInstanceRecord <T extends typeof JWebglDemoInstance> (t: T) {
        let record = new JWebglDemoInstanceRecord ({
            webgl: this,
            type: t
        });
        this.mapNameToDemo.set (record.inst.getName (), record);
        this.listAllRecord.push (record);
    }

    /**
     * 普通的日志打印
     * @param msg 
     */
    log (...msg) {
        console.log (...msg);
    }

    /**
     * 错误报告
     * @param msg 
     */
    error (...msg) {
        console.error (...msg);
    }
}

export default JWebgl;