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

export default class P133MultiPoint extends JWebglDemoInstance {

    getName () {
        return `P133MultiPoint`;
    }

    /**
     * 着色程序
     */
    program: Program;

    /**
     * 顶点数据 - 位置
     */
    vertices = new Float32Array ([
        0, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0
    ]);

    /**
     * 顶点数据 - 尺寸
     */
    sizes = new Float32Array ([
        10, 20, 30
    ]);

    onInit (): void {
        this.program = this.createProgram (Program);
    }

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_PointSize.fillByBuffer (this.sizes);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}