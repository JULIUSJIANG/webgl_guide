import JWebglProgramUniform from "./JWebglProgramUniform.js";
/**
 * 顶点数据 - 4 维数据
 */
export default class JWebglProgramUniformMat4 extends JWebglProgramUniform {
    constructor() {
        super(...arguments);
        /**
         * 核心数据
         */
        this.data = new Float32Array(16);
    }
    onGetDefine() {
        return `mat4`;
    }
    /**
     * 使用普通数字填充数据
     * @param val0
     * @param val1
     * @param val2
     * @param val3
     */
    fillByNumber(v00, v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v12, v13, v14, v15) {
        this.data[0] = v00;
        this.data[1] = v01;
        this.data[2] = v02;
        this.data[3] = v03;
        this.data[4] = v04;
        this.data[5] = v05;
        this.data[6] = v06;
        this.data[7] = v07;
        this.data[8] = v08;
        this.data[9] = v09;
        this.data[10] = v10;
        this.data[11] = v11;
        this.data[12] = v12;
        this.data[13] = v13;
        this.data[14] = v14;
        this.data[15] = v15;
        this.relProgram.relWebgl.useProgram(this.relProgram);
        this.relProgram.relWebgl.ctx.uniformMatrix4fv(this.location, false, this.data);
    }
    /**
     * 使用 4 维矩阵填充数据
     * @param mat4
     */
    fillByMat4(mat4) {
        this.relProgram.relWebgl.useProgram(this.relProgram);
        this.relProgram.relWebgl.ctx.uniformMatrix4fv(this.location, false, mat4.elements);
    }
}
