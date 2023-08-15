import JWebglEnum from "../common/JWebglEnum";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

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

    onGetInfo () {
        return `使用矩阵库实现对三角形的先平移、后旋转的变换`;
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