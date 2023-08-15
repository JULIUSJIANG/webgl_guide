import IndexGlobal from "../IndexGlobal";
import JWebglProgramUniform from "./JWebglProgramUniform";

/**
 * 顶点数据 - 1 维数据
 */
export default class JWebglProgramUniformInt extends JWebglProgramUniform {

    onGetDefine (): string {
        return `int`;
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
        this.relProgram.relWebgl.ctx.uniform1i (this.location, val);
    }
}