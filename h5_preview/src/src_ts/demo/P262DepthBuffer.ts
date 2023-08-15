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

export default class P262DepthBuffer extends JWebglDemoInstance {

    getName() {
        return `P262DepthBuffer`;
    }

    onGetInfo () {
        return `开启深度测试，解决遮挡问题`;
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
         0.0,  1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
        -0.5, -1.0,  0.0, 1,    0.4,  0.4,  1.0, 1,
         0.5, -1.0,  0.0, 1,    1.0,  0.4,  0.4, 1,
         0.0,  1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
        -0.5, -1.0, -2.0, 1,    1.0,  1.0,  0.4, 1,
         0.5, -1.0, -2.0, 1,    1.0,  0.4,  0.4, 1,
         0.0,  1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
        -0.5, -1.0, -4.0, 1,    0.4,  1.0,  0.4, 1,
         0.5, -1.0, -4.0, 1,    1.0,  0.4,  0.4, 1,
    ]);


    /**
     * 模型矩阵
     */
    modelMat4 = new JWebglMatrix4 ();

    /**
     * 视图矩阵
     */
    viewMat4 = (new JWebglMatrix4).setLookAt (
        0, 0, 5,
        0, 0, -100, 
        0, 1, 0
    );

    /**
     * 投影矩阵
     */
    projMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100);

    /**
     * 模型 - 视图矩阵
     */
    mvpMat4 = new JWebglMatrix4;

    onDraw (): void {
        this.modelMat4.setTranslate (0.75, 0, 0);
        this.mvpMat4.set (this.projMat4).multiply (this.viewMat4).multiply (this.modelMat4);
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);

        this.modelMat4.setTranslate (-0.75, 0, 0);
        this.mvpMat4.set (this.projMat4).multiply (this.viewMat4).multiply (this.modelMat4);
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}