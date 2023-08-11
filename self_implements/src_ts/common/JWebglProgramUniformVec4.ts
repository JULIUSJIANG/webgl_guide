import IndexGlobal from "../IndexGlobal.js";
import JWebglProgramUniform from "./JWebglProgramUniform.js";

/**
 * 顶点数据 - 4 维数据
 */
export default class JWebglProgramUniformVec4 extends JWebglProgramUniform {

    onGetDefine (): string {
        return `vec4`;
    }

    /**
     * 填充数据
     * @param val0 
     * @param val1 
     * @param val2 
     * @param val3 
     */
    fill (val0: number, val1: number, val2: number, val3: number) {
        this.relProgram.relWebgl.useProgram (this.relProgram);
        this.relProgram.relWebgl.ctx.uniform4f (this.location, val0, val1, val2, val3);
    }
}