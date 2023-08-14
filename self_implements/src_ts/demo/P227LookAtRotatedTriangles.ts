import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ViewMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ModelMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_ViewMatrix} * ${this.u_ModelMatrix} * ${this.a_Position};
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

export default class P227LookAtRotatedTriangles extends JWebglDemoInstance {

    getName() {
        return `P227LookAtRotatedTriangles`;
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
         0.0,  0.5, -0.4, 1,    0.4,  1.0,  0.4, 1,
        -0.5, -0.5, -0.4, 1,    0.4,  1.0,  0.4, 1,
         0.5, -0.5, -0.4, 1,    1.0,  0.4,  0.4, 1,

         0.5,  0.4, -0.2, 1,    1.0,  0.4,  0.4, 1,
        -0.5,  0.4, -0.2, 1,    1.0,  1.0,  0.4, 1,
         0.0, -0.6, -0.2, 1,    1.0,  1.0,  0.4, 1,

         0.0,  0.5,  0.0, 1,    0.4,  0.4,  1.0, 1,
        -0.5, -0.5,  0.0, 1,    0.4,  0.4,  1.0, 1,
         0.5, -0.5,  0.0, 1,    1.0,  0.4,  0.4, 1,
    ]);

    /**
     * 视图矩阵
     */
    viewMat4 = (new JWebglMatrix4 ()).setLookAt (
        0.2, 0.25, 0.25, 
        0, 0, 0, 
        0, 1, 0
    );

    /**
     * 模型矩阵
     */
    modelMat4 = (new JWebglMatrix4 ()).setRotate (-10, 0, 0, 1);

    onDraw (): void {
        this.program.u_ViewMatrix.fillByMat4 (this.viewMat4);
        this.program.u_ModelMatrix.fillByMat4 (this.modelMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}