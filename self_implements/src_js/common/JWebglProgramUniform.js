/**
 * 着色器的固定数据
 */
export default class JWebglProgramUniform {
    constructor(args) {
        this.relProgram = args.program;
        this.name = args.name;
    }
    /**
     * 事件派发 - 着色程序就绪
     */
    _onProgramReady() {
        this.location = this.relProgram.relWebgl.ctx.getUniformLocation(this.relProgram.program, this.name);
        if (!this.location) {
            this.relProgram.relWebgl.error(`获取 uniform 内存地址失败`);
        }
        ;
        this.onProgramReady();
    }
    /**
     * 事件派发 - 着色程序就绪
     */
    onProgramReady() {
    }
    toString() {
        return this.name;
    }
}
