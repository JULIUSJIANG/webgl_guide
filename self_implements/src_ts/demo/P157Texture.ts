import JWebglAssetsImage from "../common/JWebglAssetsImage";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

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

export default class P157Texture extends JWebglDemoInstance {

    getName () {
        return `P157Texture`;
    }

    /**
     * 着色程序
     */
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

    img: JWebglAssetsImage;

    onInit () {
        this.img = this.relWebgl.getImage (`./resources/sky.jpg`);
        this.program = this.createProgram (Program);
    }

    onDraw (): void {
        
    }
}