import JWebglDemoInstance from "./JWebglDemoInstance.js";
import JWebglDemoInstanceRecord from "./JWebglDemoInstanceRecord.js";
import JWebglTouch from "./JWebglTouch.js";
import JWebglAssetsImage from "./JWebglAssetsImage.js";
import JWebglEnum from "./JWebglEnum.js";
import JWebglProgram from "./JWebglProgram.js";
import JWebglStatus from "./JWebglStatus.js";
import JWebglStatusFinished from "./JWebglStatusFinished.js";
import JWebglStatusLoading from "./JWebglStatusLoading.js";
import P16HelloCanvas from "../demo/P16HelloCanvas.js";
import P24HelloPoint1 from "../demo/P24HelloPoint1.js";
import P39HelloPoint2 from "../demo/P39HelloPoint2.js";
import P47ClickedPoints from "../demo/P47ClickedPoints.js";
import P56ColoredPoints from "../demo/P56ColoredPoints.js";
import P66MultiPoints from "../demo/P66MultiPoints.js";
import P80HelloTriangle from "../demo/P80HelloTriangle.js";
import P88TranslatedTriangle from "../demo/P88TranslatedTriangle.js";
import P94RotatedTriangle from "../demo/P94RotatedTriangle.js";
import P102RotatedTriangle_Matrix from "../demo/P102RotatedTriangle_Matrix.js";
import P115RotatedTranslatedTriangle from "../demo/P115RotatedTranslatedTriangle.js";
import P120RotatingTriangles from "../demo/P120RotatingTriangles.js";
import P133MultiAttributeSize from "../demo/P133MultiAttributeSize.js";
import P136MultiAttributeSize_Interleaved from "../demo/P136MultiAttributeSize_Interleaved.js";
import P141MultiAttributeColor from "../demo/P141MultiAttributeColor.js";
import P157TexturedQuad from "../demo/P157TexturedQuad.js";
import P178MultiTexture from "../demo/P178MultiTexture.js";
import P227LookAtRotatedTriangles from "../demo/P227LookAtRotatedTriangles.js";
import P221LookAtTriangles from "../demo/P221LookAtTriangles.js";
import P228LookAtRotatedTriangles_mvMatrix from "../demo/P228LookAtRotatedTriangles_mvMatrix.js";
import P230LookAtTrianglesWithKeys from "../demo/P230LookAtTrianglesWithKeys.js";
import P237OrthView from "../demo/P237OrthView.js";
import P244LookAtTrianglesWithKeys_ViewVolume from "../demo/P244LookAtTrianglesWithKeys_ViewVolume.js";
import P249PerspectiveView from "../demo/P249PerspectiveView.js";
import P254PerspectiveView_mvp from "../demo/P254PerspectiveView_mvp.js";
import P262DepthBuffer from "../demo/P262DepthBuffer.js";
import P265Zfighting from "../demo/P265Zfighting.js";
import P269HelloCubes from "../demo/P269HelloCubes.js";
import P276ColoredCube from "../demo/P276ColoredCube.js";
import P291LightedCube from "../demo/P291LightedCube.js";
import P298LightedCube_ambient from "../demo/P298LightedCube_ambient.js";
import P302LightedTranslatedRotatedCube from "../demo/P302LightedTranslatedRotatedCube.js";
import P305PointLightedCube from "../demo/P305PointLightedCube.js";
import P309PointLightedCube_perFragment from "../demo/P309PointLightedCube_perFragment.js";
import P315JointModel from "../demo/P315JointModel.js";
import P323MultiJointModel from "../demo/P323MultiJointModel.js";
import P327MultiJointModel_segment from "../demo/P327MultiJointModel_segment.js";
import P344RotateObject from "../demo/P344RotateObject.js";
import P348PickObject from "../demo/P348PickObject.js";
import P352PickFace from "../demo/P352PickFace.js";
import P361Fog from "../demo/P361Fog.js";
import P364Fog_w from "../demo/P364Fog_w.js";
import P366RoundedPoint from "../demo/P366RoundedPoint.js";
import P369LookAtBlendedTriangles from "../demo/P369LookAtBlendedTriangles.js";
import P371BlendedCube from "../demo/P371BlendedCube.js";
import P375ProgramObject from "../demo/P375ProgramObject.js";
import P383FramebufferObject from "../demo/P383FramebufferObject.js";
import P393Shadow from "../demo/P393Shadow.js";
import P400Shadow_highp from "../demo/P400Shadow_highp.js";

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
            P16HelloCanvas,
            P24HelloPoint1,
            P39HelloPoint2,
            P47ClickedPoints,
            P56ColoredPoints,
            P66MultiPoints,
            P80HelloTriangle,
            P88TranslatedTriangle,
            P94RotatedTriangle,
            P102RotatedTriangle_Matrix,
            P115RotatedTranslatedTriangle,
            P120RotatingTriangles,
            P133MultiAttributeSize,
            P136MultiAttributeSize_Interleaved,
            P141MultiAttributeColor,
            P157TexturedQuad,
            P178MultiTexture,
            P221LookAtTriangles,
            P227LookAtRotatedTriangles,
            P228LookAtRotatedTriangles_mvMatrix,
            P230LookAtTrianglesWithKeys,
            P237OrthView,
            P244LookAtTrianglesWithKeys_ViewVolume,
            P249PerspectiveView,
            P254PerspectiveView_mvp,
            P262DepthBuffer,
            P265Zfighting,
            P269HelloCubes,
            P276ColoredCube,
            P291LightedCube,
            P298LightedCube_ambient,
            P302LightedTranslatedRotatedCube,
            P305PointLightedCube,
            P309PointLightedCube_perFragment,
            P315JointModel,
            P323MultiJointModel,
            P327MultiJointModel_segment,
            P344RotateObject,
            P348PickObject,
            P352PickFace,
            P361Fog,
            P364Fog_w,
            P366RoundedPoint,
            P369LookAtBlendedTriangles,
            P371BlendedCube,
            P375ProgramObject,
            P383FramebufferObject,
            P393Shadow,
            P400Shadow_highp
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