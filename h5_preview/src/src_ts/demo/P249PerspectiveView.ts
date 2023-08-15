import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";
import MgrData from "../mgr_data/MgrData";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ViewMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ProjMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_ProjMatrix} * ${this.u_ViewMatrix} * ${this.a_Position};
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

export default class P249PerspectiveView extends JWebglDemoInstance {

    getName() {
        return `P249PerspectiveView`;
    }

    onGetInfo() {
        return `引入透视投影`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    vertices = new Float32Array([
         0.75,  1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
         0.25, -1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
         1.25, -1.0, -4.0, 1,    1.0,  0.4,  0.4, 1,
         0.75,  1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
         0.25, -1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
         1.25, -1.0, -2.0, 1,    1.0,  0.4,  0.4, 1,
         0.75,  1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
         0.25, -1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
         1.25, -1.0,  0.0, 1,    1.0,  0.4,  0.4, 1,
        -0.75,  1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
        -1.25, -1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
        -0.25, -1.0, -4.0, 1,    1.0,  0.4,  0.4, 1,
        -0.75,  1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
        -1.25, -1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
        -0.25, -1.0, -2.0, 1,    1.0,  0.4,  0.4, 1,
        -0.75,  1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
        -1.25, -1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
        -0.25, -1.0,  0.0, 1,    1.0,  0.4,  0.4, 1,
    ]);

    /**
     * 视图矩阵
     */
    viewMat4 = (new JWebglMatrix4).setLookAt (0, 0, 5, 0, 0, -100, 0, 1, 0);

    /**
     * 裁切矩阵
     */
    pMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100);

    onDraw (): void {
        this.program.u_ViewMatrix.fillByMat4 (this.viewMat4);
        this.program.u_ProjMatrix.fillByMat4 (this.pMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}