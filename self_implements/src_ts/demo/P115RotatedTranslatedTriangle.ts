import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_xformMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
    gl_Position = ${this.u_xformMatrix} * ${this.a_Position};
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

export default class P115RotatedTranslatedTriangle extends JWebglDemoInstance {

    getName () {
        return `P115RotatedTranslatedTriangle`;
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
        0, 0.3, 0.0, 1.0,
        -0.3, -0.3, 0.0, 1.0,
        0.3, -0.3, 0.0, 1.0
    ]);

    /**
     * 变换矩阵
     */
    mat4 = new JWebglMatrix4 ();
    
    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        // this.mat4.setIdentity ();
        this.mat4.setRotate (60, 0, 0, 1);
        this.mat4.translate (0.5, 0, 0);
        this.program.u_xformMatrix.fillByMat4 (this.mat4);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}