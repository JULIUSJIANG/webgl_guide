import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebgl from "../common/JWebgl.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";

class Program extends JWebglProgram {
    
    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position};
  gl_PointSize = 10.0;
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

/**
 * 绘制一个点
 */
export default class P39HelloPoint2 extends JWebglDemoInstance {

    getName () {
        return `P39HelloPoint2`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    onDraw (): void {
        this.program.a_Position.fillByVec4 (0.5, 0.5, 0, 1);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
    }
}