import { join } from "path";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import MgrData from "../mgr_data/MgrData.js";

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

export default class P120Animate extends JWebglDemoInstance {

    getName () {
        return `P120Animate`;
    }

    /**
     * 顶点数据
     */
    vertices = new Float32Array ([
        0, 0.3, 0.0, 1.0,
        -0.3, -0.3, 0.0, 1.0,
        0.3, -0.3, 0.0, 1.0
    ]);

    /**
     * 着色程序
     */
    program: Program;

    /**
     * 变换矩阵
     */
    mat4 = new JWebglMatrix4 ();

    /**
     * 当前旋转角
     */
    angle: number = 0;

    onInit (): void {
        this.program = this.createProgram (Program);
    }

    onUpdate (dt: number): void {
        this.angle += dt / 1000 * 45;
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.mat4.setRotate (this.angle, 0, 0, 1);
        this.program.u_xformMatrix.fillByMat4 (this.mat4);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}