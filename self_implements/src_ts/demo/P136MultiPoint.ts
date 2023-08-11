import JWebgl from "../common/JWebgl.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeFloat from "../common/JWebglProgramAttributeFloat.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";

class Program extends JWebglProgram {

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeFloat)
    a_PointSize: JWebglProgramAttributeFloat;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position};
  gl_PointSize = ${this.a_PointSize};
}
        `;
    }

    onGetShaderFTxt(): string {
        return `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
        `;
    }
}

export default class P136MultiPoint extends JWebglDemoInstance {

    getName () {
        return `P136MultiPoint`;
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
         0,    0.5,  0.0,  1.0,    10,
        -0.5, -0.5,  0.0,  1.0,    20,
         0.5, -0.5,  0.0,  1.0,    30
    ]);

    onDraw (): void {
        this.program.fillAttByBuffer (this.vertices);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, this.vertices.length / this.program.attTotalSize);
    }
}