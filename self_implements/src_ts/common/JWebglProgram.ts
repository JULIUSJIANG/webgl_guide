import JWebgl from "./JWebgl.js";
import JWebglEnum from "./JWebglEnum.js";
import JWebglProgramAttribute from "./JWebglProgramAttribute.js";
import JWebglProgramUniform from "./JWebglProgramUniform.js";
import JWebglProgramVarying from "./JWebglProgramVarying.js";

/**
 * 着色器程序
 */
abstract class JWebglProgram {

    /**
     * 上下文
     */
    relWebgl: JWebgl;

    /**
     * 原生的着色器程序
     */
    program: WebGLProgram;
    /**
     * 顶点着色器
     */
    shaderV: WebGLShader;
    /**
     * 片元着色器
     */
    shaderF: WebGLShader;

    /**
     * 数据的缓冲区
     */
    buffer: WebGLBuffer;

    /**
     * 顶点数据的总尺寸
     */
    attTotalSize: number = 0;

    /**
     * 顶点属性的集合
     */
    _listAtt = new Array <JWebglProgramAttribute> ();
    /**
     * 静态属性的集合
     */
    _listUniform = new Array <JWebglProgramUniform> ();
    /**
     * 插值属性的集合
     */
    _listVarying = new Array <JWebglProgramVarying> ();

    /**
     * 顶点着色器头部定义
     */
    _listVertexHead = new Array <string> ();
    /**
     * 片元着色器头部定义
     */
    _listFragmentHead = new Array <string> (`precision mediump float;`);

    constructor (args: {
        webgl: JWebgl
    }) 
    {
        this.relWebgl = args.webgl;

        this.buffer = this.relWebgl.ctx.createBuffer ();
        if (!this.buffer) {
            this.relWebgl.error (`创建 buffer 失败`);
            return;
        };

        let symbolCache = JWebglProgram.getCache (this);
        symbolCache.mapKeyNameToAttributeClass.forEach ((attClass, propsName) => {
            let attribute: JWebglProgramAttribute = new (attClass as any) ({
                program: this,
                name: propsName,
                idx: this.attTotalSize
            });
            this.attTotalSize += attribute.onGetSize ();
            this [propsName] = attribute;
            this._listAtt.push (this [propsName]);
            
            let define = `attribute ${attribute.onGetDefine()} ${attribute};`;
            this._listVertexHead.push (define);
        });
        symbolCache.mapKeyNameToUniformClass.forEach ((attClass, propsName) => {
            let uniform: JWebglProgramUniform = new (attClass as any) ({
                program: this,
                name: propsName
            });
            this [propsName] = uniform;
            this._listUniform.push (this [propsName]);

            let define = `uniform ${uniform.onGetDefine()} ${uniform};`;
            this._listVertexHead.push (define);
            this._listFragmentHead.push (define);
        });
        symbolCache.mapKeyNameToVaryingClass.forEach ((attClass, propsName) => {
            let varying: JWebglProgramVarying = new (attClass as any) ({
                program: this,
                name: propsName
            });
            this [propsName] = varying;
            this._listVarying.push (varying);

            let define = `varying ${varying.onGetDefine()} ${varying};`;
            this._listVertexHead.push (define);
            this._listFragmentHead.push (define);
        });

        let txtShaderV = this._listVertexHead.join (`\n`) + this.onGetShaderVTxt ();
        this.shaderV = this.CreateShader (JWebglEnum.CreateShaderType.VERTEX_SHADER, txtShaderV);
        let txtShaderF = this._listFragmentHead.join (`\n`) + this.onGetShaderFTxt ();
        this.shaderF = this.CreateShader (JWebglEnum.CreateShaderType.FRAGMENT_SHADER, txtShaderF);
        this.program = this.relWebgl.ctx.createProgram ();
        if (this.program == null) {
            this.relWebgl.error (`着色程序创建失败`);
            return;
        };
        // 绑定着色器
        this.relWebgl.ctx.attachShader (this.program, this.shaderV);
        this.relWebgl.ctx.attachShader (this.program, this.shaderF);
        // 连接着色器
        this.relWebgl.ctx.linkProgram (this.program);
        // 获取连接状态
        let linked = this.relWebgl.ctx.getProgramParameter (this.program, JWebglEnum.GetProgramParameterPName.LINK_STATUS);
        if (linked == null) {
            let error = this.relWebgl.ctx.getProgramInfoLog (this.program);
            this.relWebgl.error (`着色器连接失败`, error);
            this.relWebgl.ctx.deleteProgram (this.program);
            return;
        };

        for (let i = 0; i < this._listAtt.length; i++) {
            let attI = this._listAtt [i];
            attI.onProgramReady ();
        };
        for (let i = 0; i < this._listUniform.length; i++) {
            let uniformI = this._listUniform [i];
            uniformI._onProgramReady ();
        };
    }

    /**
     * 构造着色器
     * @param type 
     * @param txt 
     * @returns 
     */
    private CreateShader (type: JWebglEnum.CreateShaderType, txt: string) {
        let shader = this.relWebgl.ctx.createShader (type);
        if (shader == null) {
            this.relWebgl.error (`着色器创建失败`);
            return;
        };
        // 设置着色器代码
        this.relWebgl.ctx.shaderSource (shader, txt);
        // 编译着色器代码
        this.relWebgl.ctx.compileShader (shader);
        // 获取编译状态
        let compiled = this.relWebgl.ctx.getShaderParameter (shader, JWebglEnum.GetShaderParameterPName.COMPILE_STATUS);
        // 编译出了问题
        if (!compiled) {
            let error = this.relWebgl.ctx.getShaderInfoLog (shader);
            this.relWebgl.error (`着色器编译失败`, txt, error);
            this.relWebgl.ctx.deleteShader (shader);
            return;
        };
        return shader;
    }

    /**
     * 关闭所有顶点缓冲区
     */
    disableVertexAttribArrayAll () {
        for (let i = 0; i < this._listAtt.length; i++) {
            let listAttI = this._listAtt [i];
            this.relWebgl.ctx.disableVertexAttribArray (listAttI.location);
        };
    }

    /**
     * 填充顶点数据
     * @param data 
     */
    fillAttByBuffer (data: Float32Array) {
        this.relWebgl.ctx.bindBuffer (JWebglEnum.BindBufferTarget.ARRAY_BUFFER, this.buffer);
        this.relWebgl.ctx.bufferData (JWebglEnum.BindBufferTarget.ARRAY_BUFFER, data, JWebglEnum.BufferDataUsage.STATIC_DRAW);
        for (let i = 0; i < this._listAtt.length; i++) {
            let att = this._listAtt [i];
            this.relWebgl.ctx.vertexAttribPointer (
                att.location, 
                att.onGetSize (), 
                att.onGetType (), 
                false, 
                this.attTotalSize * data.BYTES_PER_ELEMENT, 
                att.idx * data.BYTES_PER_ELEMENT
            );
            this.relWebgl.ctx.enableVertexAttribArray (att.location);
        };
    }

    /**
     * 绘制一批数据
     * @param mode 
     * @param data 
     */
    drawArrays (mode: JWebglEnum.DrawArraysMode, data: Float32Array) {
        this.fillAttByBuffer (data);
        this.relWebgl.drawArrays (this, mode, 0, data.length / this.attTotalSize);
    }

    /**
     * 获取顶点着色器文本
     */
    abstract onGetShaderVTxt (): string;
    /**
     * 获取片元着色器文本
     */
    abstract onGetShaderFTxt (): string;
}

namespace JWebglProgram {

    export const SYMBOL_KEY = `JWebglProgram.SYMBOL_KEY`;

    /**
     * 原型上的记录
     */
    export interface SymbolCache {
        /**
         * 属性名到顶点属性类的映射
         */
        mapKeyNameToAttributeClass: Map <string, typeof JWebglProgramAttribute>;
        /**
         * 属性名到静态属性类的映射
         */
        mapKeyNameToUniformClass: Map <string, typeof JWebglProgramUniform>;
        /**
         * 属性名到插值属性类的映射
         */
        mapKeyNameToVaryingClass: Map <string, typeof JWebglProgramVarying>;
    }

    /**
     * 获取类上面的枚举缓存
     * @param c 
     * @returns 
     */
    export function getCache (c): SymbolCache {
        if (!c [SYMBOL_KEY]) {
            let cache: SymbolCache = {
                mapKeyNameToAttributeClass: new Map (),
                mapKeyNameToUniformClass: new Map (),
                mapKeyNameToVaryingClass: new Map ()
            };
            c [SYMBOL_KEY] = cache;
        };
        return c [SYMBOL_KEY];
    }

    /**
     * 顶点属性
     * @param t 
     * @returns 
     */
    export function attribute <T extends typeof JWebglProgramAttribute> (t: T) {
        return function decorator (inst: JWebglProgram, propsName: string) {
            let cache = getCache (inst);
            cache.mapKeyNameToAttributeClass.set (propsName, t);
        };
    }

    /**
     * 静态属性
     * @param t 
     * @returns 
     */
    export function uniform <T extends typeof JWebglProgramUniform> (t: T) {
        return function decorator (inst: JWebglProgram, propsName: string) {
            let cache = getCache (inst);
            cache.mapKeyNameToUniformClass.set (propsName, t);
        };
    }

    /**
     * 插值属性
     * @param t 
     * @returns 
     */
    export function varying <T extends typeof JWebglProgramVarying> (t: T) {
        return function decorator (inst: JWebglProgram, propsName: string) {
            let cache = getCache (inst);
            cache.mapKeyNameToVaryingClass.set (propsName, t);
        };
    }
}

export default JWebglProgram;