import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler0: JWebglProgramUniformSampler2D;

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler1: JWebglProgramUniformSampler2D;

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
  vec4 color0 = texture2D(${this.u_Sampler0}, ${this.v_TexCoord});
  vec4 color1 = texture2D(${this.u_Sampler1}, ${this.v_TexCoord});
  gl_FragColor = color0 * color1;
}
        `;
    }
}

export default class P178MultiTexture extends JWebglDemoInstance {

    getName () {
        return `P178MultiTexture`;
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
        this.program.u_Sampler0.fillByUrl (`./resources/sky.jpg`);
        this.program.u_Sampler1.fillByUrl (`./resources/circle.gif`);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLE_STRIP, this.vertices);
    }
}