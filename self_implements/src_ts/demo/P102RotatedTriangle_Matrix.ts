import JWebglEnum from "../common/JWebglEnum.js";
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

export default class P102RotatedTriangle_Matrix extends JWebglDemoInstance {

    getName () {
        return `P102RotatedTriangle_Matrix`;
    }

    onGetInfo () {
        return `通过矩阵实现三角形的旋转`;
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

    /**
     * 旋转角
     */
    angle = 90;
    
    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        let radian = Math.PI * this.angle / 180;
        let cosB = Math.cos (radian);
        let sinB = Math.sin (radian);
        this.program.u_xformMatrix.fillByNumber (
             cosB,      sinB,   0,  0,
            -sinB,      cosB,   0,  0,
             0,         0,      1,  0,
             0,         0,      0,  1
        );
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}