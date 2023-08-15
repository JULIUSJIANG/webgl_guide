import JWebgl from "../common/JWebgl";
import JWebglEnum from "../common/JWebglEnum";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformVec4)
    u_Translation: JWebglProgramUniformVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position} + ${this.u_Translation};
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

export default class P88TranslatedTriangle extends JWebglDemoInstance {

    getName () {
        return `P88TranslatedTriangle`;
    }

    onGetInfo () {
        return `绘制出一个经过平移的三角形`;
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
        0, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0
    ]);

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.u_Translation.fill (0.2, 0.2, 0.2, 0);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}