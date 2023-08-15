import IndexGlobal from "../IndexGlobal";
import JWebglProgramUniform from "./JWebglProgramUniform";

/**
 * 顶点数据 - 1 维数据
 */
export default class JWebglProgramUniformFloat extends JWebglProgramUniform {

    onGetDefine (): string {
        return `float`;
    }

    /**
     * 填充数据
     * @param val0 
     * @param val1 
     * @param val2 
     * @param val3 
     */
    fill (val: number) {
        this.relProgram.relWebgl.useProgram (this.relProgram);
        this.relProgram.relWebgl.ctx.uniform1f (this.location, val);
    }
}