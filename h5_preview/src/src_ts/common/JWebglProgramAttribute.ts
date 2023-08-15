import JWebglEnum from "./JWebglEnum.js";
import JWebglProgram from "./JWebglProgram.js";

/**
 * 着色器的顶点数据
 */
export default abstract class JWebglProgramAttribute {

    /**
     * 归属的程序
     */
    relProgram: JWebglProgram;

    /**
     * 变量名字
     */
    name: string;

    /**
     * 内存地址
     */
    location: number;

    /**
     * 数据的缓冲区
     */
    buffer: WebGLBuffer;

    /**
     * 在总顶点数据中的索引
     */
    idx: number;

    constructor (args: {
        program: JWebglProgram,
        name: string,
        idx: number
    })
    {
        this.relProgram = args.program;
        this.name = args.name;
        this.idx = args.idx;
    }

    /**
     * 事件派发 - 着色程序就绪
     */
    onProgramReady () {
        this.location = this.relProgram.relWebgl.ctx.getAttribLocation (this.relProgram.program, this.name);
        if (this.location < 0) {
            this.relProgram.relWebgl.error (`获取 attribute 内存地址失败`);
            return;
        };

        this.buffer = this.relProgram.relWebgl.ctx.createBuffer ();
        if (!this.buffer) {
            this.relProgram.relWebgl.error (`创建 buffer 失败`);
            return;
        };
    }

    /**
     * 往缓冲区填充数据
     * @param data 
     */
    fillByBuffer (data: Float32Array) {
        this.relProgram.relWebgl.ctx.bindBuffer (JWebglEnum.BindBufferTarget.ARRAY_BUFFER, this.buffer);
        this.relProgram.relWebgl.ctx.bufferData (JWebglEnum.BindBufferTarget.ARRAY_BUFFER, data, JWebglEnum.BufferDataUsage.STATIC_DRAW);
        this.relProgram.relWebgl.ctx.vertexAttribPointer (this.location, this.onGetSize (), this.onGetType (), false, 0, 0);
        this.relProgram.relWebgl.ctx.enableVertexAttribArray (this.location);
    }

    toString () {
        return this.name;
    }

    /**
     * 获取定义
     */
    abstract onGetDefine (): string;
    /**
     * 获取类型
     */
    abstract onGetSize (): number;
    /**
     * 获取类型
     */
    abstract onGetType (): JWebglEnum.VertexAttriPointerType;
}