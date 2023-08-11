import JWebglDefine from "./JWebglDefine.js";

/**
 * 其实就是 JWebglDefine 基础上的分类
 */
JWebglDefine.TEXTURE_2D
namespace JWebglEnum {
    /**
     * 格式
     */
    export enum TexImage2DFormat {
        RGB = JWebglDefine.RGB
    };
    /**
     * 纹理属性值
     */
    export enum TexParameteriParam {
        LINEAR = JWebglDefine.LINEAR
    };
    /**
     * 设置纹理属性
     */
    export enum TexParameteriPName {
        TEXTURE_MIN_FILTER = JWebglDefine.TEXTURE_MIN_FILTER
    };
    /**
     * 绑定纹理
     */
    export enum BindTexture {
        TEXTURE_2D = JWebglDefine.TEXTURE_2D
    };
    /**
     * 纹理槽位
     */
    export enum ActiveTexture {
        TEXTURE0 = JWebglDefine.TEXTURE0
    };
    /**
     * 纹理的预处理
     */
    export enum PixelStoreIPName {
        UNPACK_FLIP_Y_WEBGL = JWebglDefine.UNPACK_FLIP_Y_WEBGL
    }
    /**
     * 数据类型
     */
    export enum VertexAttriPointerType {
        BYTE = JWebglDefine.BYTE,
        UNSIGNED_BYTE = JWebglDefine.UNSIGNED_BYTE,
        SHORT = JWebglDefine.SHORT,
        UNSIGNED_SHORT = JWebglDefine.UNSIGNED_SHORT,
        INT = JWebglDefine.INT,
        UNSIGNED_INT = JWebglDefine.UNSIGNED_INT,
        FLOAT = JWebglDefine.FLOAT,
    };
    /**
     * 缓冲区用途
     */
    export enum BufferDataUsage {
        STATIC_DRAW = JWebglDefine.STATIC_DRAW,
        STREAM_DRAW = JWebglDefine.STREAM_DRAW,
        DYNAMIC_DRAW = JWebglDefine.DYNAMIC_DRAW,
    };
    /**
     * 缓冲区类型
     */
    export enum BindBufferTarget {
        ARRAY_BUFFER = JWebglDefine.ARRAY_BUFFER,
        ELEMENT_ARRAY_BUFFER = JWebglDefine.ELEMENT_ARRAY_BUFFER,
    };
    /**
     * 着色器类型
     */
    export enum CreateShaderType {
        VERTEX_SHADER = JWebglDefine.VERTEX_SHADER,
        FRAGMENT_SHADER = JWebglDefine.FRAGMENT_SHADER,
    };
    /**
     * 着色器情况
     */
    export enum GetShaderParameterPName {
        COMPILE_STATUS = JWebglDefine.COMPILE_STATUS,
    };
    /**
     * 着色程序情况
     */
    export enum GetProgramParameterPName {
        LINK_STATUS = JWebglDefine.LINK_STATUS,
    };
    /**
     * 绘制集合
     */
    export enum DrawArraysMode {
        POINTS = JWebglDefine.POINTS,
        LINES = JWebglDefine.LINES,
        LINE_LOOP = JWebglDefine.LINE_LOOP,
        LINE_STRIP = JWebglDefine.LINE_STRIP,
        TRIANGLES = JWebglDefine.TRIANGLES,
        TRIANGLE_STRIP = JWebglDefine.TRIANGLE_STRIP,
        TRIANGLE_FAN = JWebglDefine.TRIANGLE_FAN,
    }
    /**
     * 缓冲区
     */
    export enum ClearMask {
        COLOR_BUFFER_BIT = JWebglDefine.COLOR_BUFFER_BIT,
        DEPTH_BUFFER_BIT = JWebglDefine.DEPTH_BUFFER_BIT,
        STENCIL_BUFFER_BIT = JWebglDefine.STENCIL_BUFFER_BIT,
    }
}

export default JWebglEnum;