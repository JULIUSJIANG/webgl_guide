import JWebgl from "../common/JWebgl";
import JWebglEnum from "../common/JWebglEnum";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeFloat from "../common/JWebglProgramAttributeFloat";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

class Program extends JWebglProgram {

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position};
  gl_PointSize = 10.0;
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }

    onGetShaderFTxt(): string {
        return `
void main() {
  gl_FragColor = ${this.v_Color};
}
        `;
    }
}

export default class P141MultiAttributeColor extends JWebglDemoInstance {

    getName () {
        return `P141MultiAttributeColor`;
    }

    onGetInfo () {
        return `把点的位置信息、颜色信息存储在同一个 Float32Array 里面`;
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
         0,    0.5,  0.0,  1.0,    1, 0, 0, 1,
        -0.5, -0.5,  0.0,  1.0,    0, 1, 0, 1,
         0.5, -0.5,  0.0,  1.0,    0, 0, 1, 1
    ]);

    onDraw (): void {
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}