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

export default class P269HelloCubes extends JWebglDemoInstance {

    getName() {
        return `P269HelloCubes`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    vertices = new Float32Array ([
         1.0,  1.0,  1.0, 1,    1.0,  1.0,  1.0, 1, 
        -1.0,  1.0,  1.0, 1,    1.0,  0.0,  1.0, 1,
        -1.0, -1.0,  1.0, 1,    1.0,  0.0,  0.0, 1,
         1.0, -1.0,  1.0, 1,    1.0,  1.0,  0.0, 1,
         1.0, -1.0, -1.0, 1,    0.0,  1.0,  0.0, 1,
         1.0,  1.0, -1.0, 1,    0.0,  1.0,  1.0, 1,
        -1.0,  1.0, -1.0, 1,    0.0,  0.0,  1.0, 1,
        -1.0, -1.0, -1.0, 1,    0.0,  0.0,  0.0, 1,
    ]);

    /**
     * 绘制顺序
     */
    indices = new Uint8Array ([
        0, 1, 2,   0, 2, 3,
        0, 3, 4,   0, 4, 5,
        0, 5, 6,   0, 6, 1,
        1, 6, 7,   1, 7, 2,
        7, 4, 3,   7, 3, 2,
        4, 7, 6,   4, 6, 5 
    ]);

    /**
     * 模型 - 视图矩阵
     */
    mvpMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100).lookAt (3, 3, 7, 0, 0, 0, 0, 1, 0);

    onDraw (): void {
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.fillAttByBuffer (this.vertices);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}