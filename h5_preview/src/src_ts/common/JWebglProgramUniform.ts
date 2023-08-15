import IndexGlobal from "../IndexGlobal";
import JWebglProgram from "./JWebglProgram";


/**
 * 着色器的固定数据
 */
export default abstract class JWebglProgramUniform {

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
    location: WebGLUniformLocation;

    constructor (args: {
        program: JWebglProgram,
        name: string
    })
    {
        this.relProgram = args.program;
        this.name = args.name;
    }

    /**
     * 事件派发 - 着色程序就绪
     */
    _onProgramReady () {
        this.location = this.relProgram.relWebgl.ctx.getUniformLocation (this.relProgram.program, this.name);
        if (!this.location) {
            this.relProgram.relWebgl.error (`获取 uniform 内存地址失败`);
        };
        this.onProgramReady ();
    }

    /**
     * 事件派发 - 着色程序就绪
     */
    onProgramReady () {

    }

    /**
     * 获取定义的类型
     */
    abstract onGetDefine (): string;

    toString () {
        return this.name;
    }
}