import IndexGlobal from "../IndexGlobal";
import JWebglProgramUniform from "./JWebglProgramUniform";

/**
 * 顶点数据 - 2 维数据
 */
export default class JWebglProgramUniformVec2 extends JWebglProgramUniform {

    onGetDefine (): string {
        return `vec2`;
    }

    /**
     * 填充数据
     * @param val0 
     * @param val1 
     * @param val2 
     * @param val3 
     */
    fill (val0: number, val1: number) {
        this.relProgram.relWebgl.useProgram (this.relProgram);
        this.relProgram.relWebgl.ctx.uniform2f (this.location, val0, val1);
    }
}