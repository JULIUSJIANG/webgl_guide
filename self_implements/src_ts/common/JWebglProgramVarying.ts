import JWebglProgram from "./JWebglProgram.js";

/**
 * 着色器的固定数据
 */
export default abstract class JWebglProgramVarying {

    /**
     * 归属的程序
     */
    relProgram: JWebglProgram;

    /**
     * 变量名字
     */
    name: string;

    constructor (args: {
        program: JWebglProgram,
        name: string
    })
    {
        this.relProgram = args.program;
        this.name = args.name;
    }

    /**
     * 获取定义的类型
     */
    abstract onGetDefine (): string;

    toString () {
        return this.name;
    }
}