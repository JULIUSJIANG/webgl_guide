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

export default class P371BlendedCube extends JWebglDemoInstance {

    getName() {
        return `P371BlendedCube`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据 - 位置
     */
    vertices = new Float32Array ([
        1.0, 1.0, 1.0, 1.0,  -1.0, 1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0, // v0-v1-v2-v3 front
        1.0, 1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0, // v0-v3-v4-v5 right
        1.0, 1.0, 1.0, 1.0,   1.0, 1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0, 1.0, 1.0, 1.0, // v0-v5-v6-v1 up
       -1.0, 1.0, 1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, 1.0, // v1-v6-v7-v2 left
       -1.0,-1.0,-1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0,-1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0, // v7-v4-v3-v2 down
        1.0,-1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0, // v4-v7-v6-v5 back
    ]);
    /**
     * 顶点数据 - 颜色
     */
    colors = new Float32Array ([
        0.4, 0.4, 1.0, 0.4,  0.4, 0.4, 1.0, 0.4,  0.4, 0.4, 1.0, 0.4,  0.4, 0.4, 1.0, 0.4,  // v0-v1-v2-v3 front(blue)
        0.4, 1.0, 0.4, 0.4,  0.4, 1.0, 0.4, 0.4,  0.4, 1.0, 0.4, 0.4,  0.4, 1.0, 0.4, 0.4,  // v0-v3-v4-v5 right(green)
        1.0, 0.4, 0.4, 0.4,  1.0, 0.4, 0.4, 0.4,  1.0, 0.4, 0.4, 0.4,  1.0, 0.4, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
        1.0, 1.0, 0.4, 0.4,  1.0, 1.0, 0.4, 0.4,  1.0, 1.0, 0.4, 0.4,  1.0, 1.0, 0.4, 0.4,  // v1-v6-v7-v2 left
        1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  1.0, 1.0, 1.0, 0.4,  // v7-v4-v3-v2 down
        0.4, 1.0, 1.0, 0.4,  0.4, 1.0, 1.0, 0.4,  0.4, 1.0, 1.0, 0.4,  0.4, 1.0, 1.0, 0.4,  // v4-v7-v6-v5 back
    ])

    /**
     * 绘制顺序
     */
    indices = new Uint8Array ([
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
       12,13,14,  12,14,15,    // left
       16,17,18,  16,18,19,    // down
       20,21,22,  20,22,23     // back
    ]);

    /**
     * 模型 - 视图矩阵
     */
    mvpMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100).lookAt (3, 3, 7, 0, 0, 0, 0, 1, 0);

    onEnable (): void {
        this.relWebgl.ctx.disable (JWebglEnum.EnableCap.DEPTH_TEST);
    }

    onDisable (): void {
        this.relWebgl.ctx.enable (JWebglEnum.EnableCap.DEPTH_TEST);
    }

    onDraw (): void {
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_Color.fillByBuffer (this.colors);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}