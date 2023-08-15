import JWebgl from "../common/JWebgl";
import JWebglEnum from "../common/JWebglEnum";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeFloat from "../common/JWebglProgramAttributeFloat";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

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

export default class P133MultiAttributeSize extends JWebglDemoInstance {

    getName () {
        return `P133MultiAttributeSize`;
    }

    onGetInfo () {
        return `通过 attribute 设定点的尺寸`;
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

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_PointSize.fillByBuffer (this.sizes);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}