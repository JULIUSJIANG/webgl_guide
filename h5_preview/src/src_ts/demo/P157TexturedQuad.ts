import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2";
import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler: JWebglProgramUniformSampler2D;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec2)
    a_TexCoord: JWebglProgramAttributeVec2;

    @JWebglProgram.varying (JWebglProgramVaryingVec2)
    v_TexCoord: JWebglProgramVaryingVec2;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position};
  ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  gl_FragColor = texture2D(${this.u_Sampler}, ${this.v_TexCoord});
}
        `;
    }
}

export default class P157TexturedQuad extends JWebglDemoInstance {

    getName () {
        return `P157TexturedQuad`;
    }

    onGetInfo () {
        return `加载纹理并且展示出来`;
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
        -0.5,  0.5, 0, 1,    0.0, 1.0,
        -0.5, -0.5, 0, 1,    0.0, 0.0,
         0.5,  0.5, 0, 1,    1.0, 1.0,
         0.5, -0.5, 0, 1,    1.0, 0.0
    ]);

    onDraw (): void {
        this.program.u_Sampler.fillByUrl (`./resources/sky.jpg`);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLE_STRIP, this.vertices);
    }
}