import JWebglDefine from "./JWebglDefine.js";
/**
 * 其实就是 JWebglDefine 基础上的分类
 */
JWebglDefine.TEXTURE_2D;
var JWebglEnum;
(function (JWebglEnum) {
    /**
     * 格式
     */
    let TexImage2DFormat;
    (function (TexImage2DFormat) {
        TexImage2DFormat[TexImage2DFormat["RGB"] = JWebglDefine.RGB] = "RGB";
    })(TexImage2DFormat = JWebglEnum.TexImage2DFormat || (JWebglEnum.TexImage2DFormat = {}));
    ;
    /**
     * 纹理属性值
     */
    let TexParameteriParam;
    (function (TexParameteriParam) {
        TexParameteriParam[TexParameteriParam["LINEAR"] = JWebglDefine.LINEAR] = "LINEAR";
    })(TexParameteriParam = JWebglEnum.TexParameteriParam || (JWebglEnum.TexParameteriParam = {}));
    ;
    /**
     * 设置纹理属性
     */
    let TexParameteriPName;
    (function (TexParameteriPName) {
        TexParameteriPName[TexParameteriPName["TEXTURE_MIN_FILTER"] = JWebglDefine.TEXTURE_MIN_FILTER] = "TEXTURE_MIN_FILTER";
    })(TexParameteriPName = JWebglEnum.TexParameteriPName || (JWebglEnum.TexParameteriPName = {}));
    ;
    /**
     * 绑定纹理
     */
    let BindTexture;
    (function (BindTexture) {
        BindTexture[BindTexture["TEXTURE_2D"] = JWebglDefine.TEXTURE_2D] = "TEXTURE_2D";
    })(BindTexture = JWebglEnum.BindTexture || (JWebglEnum.BindTexture = {}));
    ;
    /**
     * 纹理槽位
     */
    let ActiveTexture;
    (function (ActiveTexture) {
        ActiveTexture[ActiveTexture["TEXTURE0"] = JWebglDefine.TEXTURE0] = "TEXTURE0";
    })(ActiveTexture = JWebglEnum.ActiveTexture || (JWebglEnum.ActiveTexture = {}));
    ;
    /**
     * 纹理的预处理
     */
    let PixelStoreIPName;
    (function (PixelStoreIPName) {
        PixelStoreIPName[PixelStoreIPName["UNPACK_FLIP_Y_WEBGL"] = JWebglDefine.UNPACK_FLIP_Y_WEBGL] = "UNPACK_FLIP_Y_WEBGL";
    })(PixelStoreIPName = JWebglEnum.PixelStoreIPName || (JWebglEnum.PixelStoreIPName = {}));
    /**
     * 数据类型
     */
    let VertexAttriPointerType;
    (function (VertexAttriPointerType) {
        VertexAttriPointerType[VertexAttriPointerType["BYTE"] = JWebglDefine.BYTE] = "BYTE";
        VertexAttriPointerType[VertexAttriPointerType["UNSIGNED_BYTE"] = JWebglDefine.UNSIGNED_BYTE] = "UNSIGNED_BYTE";
        VertexAttriPointerType[VertexAttriPointerType["SHORT"] = JWebglDefine.SHORT] = "SHORT";
        VertexAttriPointerType[VertexAttriPointerType["UNSIGNED_SHORT"] = JWebglDefine.UNSIGNED_SHORT] = "UNSIGNED_SHORT";
        VertexAttriPointerType[VertexAttriPointerType["INT"] = JWebglDefine.INT] = "INT";
        VertexAttriPointerType[VertexAttriPointerType["UNSIGNED_INT"] = JWebglDefine.UNSIGNED_INT] = "UNSIGNED_INT";
        VertexAttriPointerType[VertexAttriPointerType["FLOAT"] = JWebglDefine.FLOAT] = "FLOAT";
    })(VertexAttriPointerType = JWebglEnum.VertexAttriPointerType || (JWebglEnum.VertexAttriPointerType = {}));
    ;
    /**
     * 缓冲区用途
     */
    let BufferDataUsage;
    (function (BufferDataUsage) {
        BufferDataUsage[BufferDataUsage["STATIC_DRAW"] = JWebglDefine.STATIC_DRAW] = "STATIC_DRAW";
        BufferDataUsage[BufferDataUsage["STREAM_DRAW"] = JWebglDefine.STREAM_DRAW] = "STREAM_DRAW";
        BufferDataUsage[BufferDataUsage["DYNAMIC_DRAW"] = JWebglDefine.DYNAMIC_DRAW] = "DYNAMIC_DRAW";
    })(BufferDataUsage = JWebglEnum.BufferDataUsage || (JWebglEnum.BufferDataUsage = {}));
    ;
    /**
     * 缓冲区类型
     */
    let BindBufferTarget;
    (function (BindBufferTarget) {
        BindBufferTarget[BindBufferTarget["ARRAY_BUFFER"] = JWebglDefine.ARRAY_BUFFER] = "ARRAY_BUFFER";
        BindBufferTarget[BindBufferTarget["ELEMENT_ARRAY_BUFFER"] = JWebglDefine.ELEMENT_ARRAY_BUFFER] = "ELEMENT_ARRAY_BUFFER";
    })(BindBufferTarget = JWebglEnum.BindBufferTarget || (JWebglEnum.BindBufferTarget = {}));
    ;
    /**
     * 着色器类型
     */
    let CreateShaderType;
    (function (CreateShaderType) {
        CreateShaderType[CreateShaderType["VERTEX_SHADER"] = JWebglDefine.VERTEX_SHADER] = "VERTEX_SHADER";
        CreateShaderType[CreateShaderType["FRAGMENT_SHADER"] = JWebglDefine.FRAGMENT_SHADER] = "FRAGMENT_SHADER";
    })(CreateShaderType = JWebglEnum.CreateShaderType || (JWebglEnum.CreateShaderType = {}));
    ;
    /**
     * 着色器情况
     */
    let GetShaderParameterPName;
    (function (GetShaderParameterPName) {
        GetShaderParameterPName[GetShaderParameterPName["COMPILE_STATUS"] = JWebglDefine.COMPILE_STATUS] = "COMPILE_STATUS";
    })(GetShaderParameterPName = JWebglEnum.GetShaderParameterPName || (JWebglEnum.GetShaderParameterPName = {}));
    ;
    /**
     * 着色程序情况
     */
    let GetProgramParameterPName;
    (function (GetProgramParameterPName) {
        GetProgramParameterPName[GetProgramParameterPName["LINK_STATUS"] = JWebglDefine.LINK_STATUS] = "LINK_STATUS";
    })(GetProgramParameterPName = JWebglEnum.GetProgramParameterPName || (JWebglEnum.GetProgramParameterPName = {}));
    ;
    /**
     * 绘制集合
     */
    let DrawArraysMode;
    (function (DrawArraysMode) {
        DrawArraysMode[DrawArraysMode["POINTS"] = JWebglDefine.POINTS] = "POINTS";
        DrawArraysMode[DrawArraysMode["LINES"] = JWebglDefine.LINES] = "LINES";
        DrawArraysMode[DrawArraysMode["LINE_LOOP"] = JWebglDefine.LINE_LOOP] = "LINE_LOOP";
        DrawArraysMode[DrawArraysMode["LINE_STRIP"] = JWebglDefine.LINE_STRIP] = "LINE_STRIP";
        DrawArraysMode[DrawArraysMode["TRIANGLES"] = JWebglDefine.TRIANGLES] = "TRIANGLES";
        DrawArraysMode[DrawArraysMode["TRIANGLE_STRIP"] = JWebglDefine.TRIANGLE_STRIP] = "TRIANGLE_STRIP";
        DrawArraysMode[DrawArraysMode["TRIANGLE_FAN"] = JWebglDefine.TRIANGLE_FAN] = "TRIANGLE_FAN";
    })(DrawArraysMode = JWebglEnum.DrawArraysMode || (JWebglEnum.DrawArraysMode = {}));
    /**
     * 缓冲区
     */
    let ClearMask;
    (function (ClearMask) {
        ClearMask[ClearMask["COLOR_BUFFER_BIT"] = JWebglDefine.COLOR_BUFFER_BIT] = "COLOR_BUFFER_BIT";
        ClearMask[ClearMask["DEPTH_BUFFER_BIT"] = JWebglDefine.DEPTH_BUFFER_BIT] = "DEPTH_BUFFER_BIT";
        ClearMask[ClearMask["STENCIL_BUFFER_BIT"] = JWebglDefine.STENCIL_BUFFER_BIT] = "STENCIL_BUFFER_BIT";
    })(ClearMask = JWebglEnum.ClearMask || (JWebglEnum.ClearMask = {}));
})(JWebglEnum || (JWebglEnum = {}));
export default JWebglEnum;
