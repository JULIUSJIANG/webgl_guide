import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  gl_FragColor = ${this.v_Color};
}
        `;
    }
}

export default class P265Zfighting extends JWebglDemoInstance {

    getName() {
        return `P265Zfighting`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    verticesA = new Float32Array([
         0.0,  2.5, -5.0, 1,    0.4,  1.0,  0.4, 1,
        -2.5, -2.5, -5.0, 1,    0.4,  1.0,  0.4, 1,
         2.5, -2.5, -5.0, 1,    1.0,  0.4,  0.4, 1,
    ]);

    /**
     * 顶点数据
     */
    verticesB = new Float32Array([
        0.0,  3.0, -5.0, 1,    1.0,  0.4,  0.4, 1,
       -3.0, -3.0, -5.0, 1,    1.0,  1.0,  0.4, 1,
        3.0, -3.0, -5.0, 1,    1.0,  1.0,  0.4, 1,
   ]);

    /**
     * 模型 - 视图矩阵
     */
    mvpMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100).lookAt (3.06, 2.5, 10, 0, 0, -2, 0, 1, 0);

    onDraw (): void {
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.verticesA);
        this.relWebgl.ctx.enable (JWebglEnum.EnableCap.POLYGON_OFFSET_FILL);
        this.relWebgl.ctx.polygonOffset (1, 1);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.verticesB);
        this.relWebgl.ctx.disable (JWebglEnum.EnableCap.POLYGON_OFFSET_FILL);
    }
}