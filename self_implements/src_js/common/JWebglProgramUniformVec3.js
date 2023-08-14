import JWebglProgramUniform from "./JWebglProgramUniform.js";
/**
 * 顶点数据 - 3 维数据
 */
export default class JWebglProgramUniformVec3 extends JWebglProgramUniform {
    onGetDefine() {
        return `vec3`;
    }
    /**
     * 填充数据
     * @param val0
     * @param val1
     * @param val2
     * @param val3
     */
    fillF(val0, val1, val2) {
        this.relProgram.relWebgl.useProgram(this.relProgram);
        this.relProgram.relWebgl.ctx.uniform3f(this.location, val0, val1, val2);
    }
    /**
     * 填充数据
     * @param val0
     * @param val1
     * @param val2
     * @param val3
     */
    fillV(data) {
        this.relProgram.relWebgl.useProgram(this.relProgram);
        this.relProgram.relWebgl.ctx.uniform3fv(this.location, data);
    }
}
