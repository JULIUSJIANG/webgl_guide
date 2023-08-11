import IndexGlobal from "../IndexGlobal.js";
import JWebglMatrix4 from "./JWebglMatrix4.js";
import JWebglProgramUniform from "./JWebglProgramUniform.js";

/**
 * 顶点数据 - 4 维数据
 */
export default class JWebglProgramUniformMat4 extends JWebglProgramUniform {

    onGetDefine (): string {
        return `mat4`;
    }

    /**
     * 核心数据
     */
    data = new Float32Array (16);

    /**
     * 使用普通数字填充数据
     * @param val0 
     * @param val1 
     * @param val2 
     * @param val3 
     */
    fillByNumber (
        v00: number, v01: number, v02: number, v03: number,
        v04: number, v05: number, v06: number, v07: number,
        v08: number, v09: number, v10: number, v11: number,
        v12: number, v13: number, v14: number, v15: number
    ) 
    {
        this.data [0] = v00;
        this.data [1] = v01;
        this.data [2] = v02;
        this.data [3] = v03;
        this.data [4] = v04;
        this.data [5] = v05;
        this.data [6] = v06;
        this.data [7] = v07;
        this.data [8] = v08;
        this.data [9] = v09;
        this.data [10] = v10;
        this.data [11] = v11;
        this.data [12] = v12;
        this.data [13] = v13;
        this.data [14] = v14;
        this.data [15] = v15;
        this.relProgram.relWebgl.useProgram (this.relProgram);
        this.relProgram.relWebgl.ctx.uniformMatrix4fv (this.location, false, this.data);
    }

    /**
     * 使用 4 维矩阵填充数据
     * @param mat4 
     */
    fillByMat4 (mat4: JWebglMatrix4) {
        this.relProgram.relWebgl.useProgram (this.relProgram);
        this.relProgram.relWebgl.ctx.uniformMatrix4fv (this.location, false, mat4.elements);
    }
}