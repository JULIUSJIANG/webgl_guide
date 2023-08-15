import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ModelViewMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_ModelViewMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  gl_FragColor = ${this.v_Color};
}
        `;
    }
}

export default class P228LookAtRotatedTriangles_mvMatrix extends JWebglDemoInstance {

    getName() {
        return `P228LookAtRotatedTriangles_mvMatrix`;
    }

    onGetInfo () {
        return `把模型矩阵、视图矩阵合并为 “模型视图矩阵”`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    vertices = new Float32Array([
         0.0,  0.5, -0.4, 1,    0.4,  1.0,  0.4, 1,
        -0.5, -0.5, -0.4, 1,    0.4,  1.0,  0.4, 1,
         0.5, -0.5, -0.4, 1,    1.0,  0.4,  0.4, 1,

         0.5,  0.4, -0.2, 1,    1.0,  0.4,  0.4, 1,
        -0.5,  0.4, -0.2, 1,    1.0,  1.0,  0.4, 1,
         0.0, -0.6, -0.2, 1,    1.0,  1.0,  0.4, 1,

         0.0,  0.5,  0.0, 1,    0.4,  0.4,  1.0, 1,
        -0.5, -0.5,  0.0, 1,    0.4,  0.4,  1.0, 1,
         0.5, -0.5,  0.0, 1,    1.0,  0.4,  0.4, 1,
    ]);

    /**
     * 视图矩阵
     */
    viewMat4 = (new JWebglMatrix4 ()).setLookAt (
        0.2, 0.25, 0.25, 
        0, 0, 0, 
        0, 1, 0
    );

    /**
     * 模型矩阵
     */
    modelMat4 = (new JWebglMatrix4 ()).setRotate (-10, 0, 0, 1);

    /**
     * 模型 - 视图矩阵
     */
    mvMat4: JWebglMatrix4;

    onInit (): void {
        this.mvMat4 = this.viewMat4.multiply (this.modelMat4);
    }

    onEnable (): void {
        this.relWebgl.ctx.disable (JWebglEnum.EnableCap.DEPTH_TEST);
    }

    onDisable (): void {
        this.relWebgl.ctx.enable (JWebglEnum.EnableCap.DEPTH_TEST);
    }

    onDraw (): void {
        this.program.u_ModelViewMatrix.fillByMat4 (this.mvMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}