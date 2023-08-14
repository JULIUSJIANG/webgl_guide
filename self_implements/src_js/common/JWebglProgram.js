import JWebglEnum from "./JWebglEnum.js";
/**
 * 着色器程序
 */
class JWebglProgram {
    constructor(args) {
        /**
         * 顶点数据的总尺寸
         */
        this.attTotalSize = 0;
        /**
         * 顶点属性的集合
         */
        this._listAtt = new Array();
        /**
         * 静态属性的集合
         */
        this._listUniform = new Array();
        /**
         * 插值属性的集合
         */
        this._listVarying = new Array();
        /**
         * 顶点着色器头部定义
         */
        this._listVertexHead = new Array(`precision mediump float;`);
        /**
         * 片元着色器头部定义
         */
        this._listFragmentHead = new Array(`precision mediump float;`);
        /**
         * 纹理索引
         */
        this.textureIdx = 0;
        this.relWebgl = args.webgl;
        this.attributeBuffer = this.relWebgl.ctx.createBuffer();
        if (!this.attributeBuffer) {
            this.relWebgl.error(`创建 buffer 失败`);
            return;
        }
        ;
        this.elementBuffer = this.relWebgl.ctx.createBuffer();
        if (!this.elementBuffer) {
            this.relWebgl.error(`创建 buffer 失败`);
            return;
        }
        ;
        let symbolCache = JWebglProgram.getCache(this);
        symbolCache.mapKeyNameToAttributeClass.forEach((attClass, propsName) => {
            let attribute = new attClass({
                program: this,
                name: propsName,
                idx: this.attTotalSize
            });
            this.attTotalSize += attribute.onGetSize();
            this[propsName] = attribute;
            this._listAtt.push(this[propsName]);
            let define = `attribute ${attribute.onGetDefine()} ${attribute};`;
            this._listVertexHead.push(define);
        });
        symbolCache.mapKeyNameToUniformClass.forEach((attClass, propsName) => {
            let uniform = new attClass({
                program: this,
                name: propsName
            });
            this[propsName] = uniform;
            this._listUniform.push(this[propsName]);
            let define = `uniform ${uniform.onGetDefine()} ${uniform};`;
            this._listVertexHead.push(define);
            this._listFragmentHead.push(define);
        });
        symbolCache.mapKeyNameToVaryingClass.forEach((attClass, propsName) => {
            let varying = new attClass({
                program: this,
                name: propsName
            });
            this[propsName] = varying;
            this._listVarying.push(varying);
            let define = `varying ${varying.onGetDefine()} ${varying};`;
            this._listVertexHead.push(define);
            this._listFragmentHead.push(define);
        });
        let txtShaderV = this._listVertexHead.join(`\n`) + this.onGetShaderVTxt();
        this.shaderV = this.CreateShader(JWebglEnum.CreateShaderType.VERTEX_SHADER, txtShaderV);
        let txtShaderF = this._listFragmentHead.join(`\n`) + this.onGetShaderFTxt();
        this.shaderF = this.CreateShader(JWebglEnum.CreateShaderType.FRAGMENT_SHADER, txtShaderF);
        this.program = this.relWebgl.ctx.createProgram();
        if (this.program == null) {
            this.relWebgl.error(`着色程序创建失败`);
            return;
        }
        ;
        // 绑定着色器
        this.relWebgl.ctx.attachShader(this.program, this.shaderV);
        this.relWebgl.ctx.attachShader(this.program, this.shaderF);
        // 连接着色器
        this.relWebgl.ctx.linkProgram(this.program);
        // 获取连接状态
        let linked = this.relWebgl.ctx.getProgramParameter(this.program, JWebglEnum.GetProgramParameterPName.LINK_STATUS);
        if (linked == null) {
            let error = this.relWebgl.ctx.getProgramInfoLog(this.program);
            this.relWebgl.error(`着色器连接失败`, error);
            this.relWebgl.ctx.deleteProgram(this.program);
            return;
        }
        ;
        for (let i = 0; i < this._listAtt.length; i++) {
            let attI = this._listAtt[i];
            attI.onProgramReady();
        }
        ;
        for (let i = 0; i < this._listUniform.length; i++) {
            let uniformI = this._listUniform[i];
            uniformI._onProgramReady();
        }
        ;
    }
    /**
     * 构造着色器
     * @param type
     * @param txt
     * @returns
     */
    CreateShader(type, txt) {
        let shader = this.relWebgl.ctx.createShader(type);
        if (shader == null) {
            this.relWebgl.error(`着色器创建失败`);
            return;
        }
        ;
        // 设置着色器代码
        this.relWebgl.ctx.shaderSource(shader, txt);
        // 编译着色器代码
        this.relWebgl.ctx.compileShader(shader);
        // 获取编译状态
        let compiled = this.relWebgl.ctx.getShaderParameter(shader, JWebglEnum.GetShaderParameterPName.COMPILE_STATUS);
        // 编译出了问题
        if (!compiled) {
            let error = this.relWebgl.ctx.getShaderInfoLog(shader);
            this.relWebgl.error(`着色器编译失败`, txt, error);
            this.relWebgl.ctx.deleteShader(shader);
            return;
        }
        ;
        return shader;
    }
    /**
     * 关闭所有顶点缓冲区
     */
    disableVertexAttribArrayAll() {
        for (let i = 0; i < this._listAtt.length; i++) {
            let listAttI = this._listAtt[i];
            this.relWebgl.ctx.disableVertexAttribArray(listAttI.location);
        }
        ;
    }
    /**
     * 填充顶点数据
     * @param data
     */
    fillAttByBuffer(data) {
        this.relWebgl.ctx.bindBuffer(JWebglEnum.BindBufferTarget.ARRAY_BUFFER, this.attributeBuffer);
        this.relWebgl.ctx.bufferData(JWebglEnum.BindBufferTarget.ARRAY_BUFFER, data, JWebglEnum.BufferDataUsage.STATIC_DRAW);
        for (let i = 0; i < this._listAtt.length; i++) {
            let att = this._listAtt[i];
            this.relWebgl.ctx.vertexAttribPointer(att.location, att.onGetSize(), att.onGetType(), false, this.attTotalSize * data.BYTES_PER_ELEMENT, att.idx * data.BYTES_PER_ELEMENT);
            this.relWebgl.ctx.enableVertexAttribArray(att.location);
        }
        ;
    }
    /**
     * 绘制一批数据
     * @param mode
     * @param data
     */
    drawArrays(mode, data) {
        this.fillAttByBuffer(data);
        this.relWebgl.ctx.useProgram(this.program);
        this.relWebgl.ctx.drawArrays(mode, 0, data.length / this.attTotalSize);
    }
    /**
     * 绘制元素
     * @param mode
     * @param vertices
     * @param indices
     */
    drawElements(mode, indices) {
        this.relWebgl.ctx.bindBuffer(JWebglEnum.BindBufferTarget.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
        this.relWebgl.ctx.bufferData(JWebglEnum.BindBufferTarget.ELEMENT_ARRAY_BUFFER, indices, JWebglEnum.BufferDataUsage.STATIC_DRAW);
        this.relWebgl.ctx.useProgram(this.program);
        this.relWebgl.ctx.drawElements(mode, indices.length, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, 0);
    }
}
(function (JWebglProgram) {
    const SYMBOL_KEY = Symbol(`JWebglProgram.SYMBOL_KEY`);
    /**
     * 获取类上面的枚举缓存
     * @param c
     * @returns
     */
    function getCache(c) {
        if (!c[SYMBOL_KEY]) {
            let cache = {
                mapKeyNameToAttributeClass: new Map(),
                mapKeyNameToUniformClass: new Map(),
                mapKeyNameToVaryingClass: new Map()
            };
            c[SYMBOL_KEY] = cache;
        }
        ;
        return c[SYMBOL_KEY];
    }
    JWebglProgram.getCache = getCache;
    /**
     * 顶点属性
     * @param t
     * @returns
     */
    function attribute(t) {
        return function decorator(inst, propsName) {
            let cache = getCache(inst);
            cache.mapKeyNameToAttributeClass.set(propsName, t);
        };
    }
    JWebglProgram.attribute = attribute;
    /**
     * 静态属性
     * @param t
     * @returns
     */
    function uniform(t) {
        return function decorator(inst, propsName) {
            let cache = getCache(inst);
            cache.mapKeyNameToUniformClass.set(propsName, t);
        };
    }
    JWebglProgram.uniform = uniform;
    /**
     * 插值属性
     * @param t
     * @returns
     */
    function varying(t) {
        return function decorator(inst, propsName) {
            let cache = getCache(inst);
            cache.mapKeyNameToVaryingClass.set(propsName, t);
        };
    }
    JWebglProgram.varying = varying;
})(JWebglProgram || (JWebglProgram = {}));
export default JWebglProgram;
