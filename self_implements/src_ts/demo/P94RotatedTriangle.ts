import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformFloat)
    u_CosB: JWebglProgramUniformFloat;

    @JWebglProgram.uniform (JWebglProgramUniformFloat)
    u_SinB: JWebglProgramUniformFloat;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
    gl_Position.x = ${this.a_Position}.x * ${this.u_CosB} - ${this.a_Position}.y * ${this.u_SinB};
    gl_Position.y = ${this.a_Position}.x * ${this.u_SinB} + ${this.a_Position}.y * ${this.u_CosB};
    gl_Position.z = ${this.a_Position}.z;
    gl_Position.w = 1.0;
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

export default class P94RotatedTriangle extends JWebglDemoInstance {

    getName () {
        return `P94RotatedTriangle`;
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
        this.program.u_CosB.fill (cosB);
        this.program.u_SinB.fill (sinB);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}