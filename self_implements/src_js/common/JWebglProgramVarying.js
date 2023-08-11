/**
 * 着色器的固定数据
 */
export default class JWebglProgramVarying {
    constructor(args) {
        this.relProgram = args.program;
        this.name = args.name;
    }
    toString() {
        return this.name;
    }
}
