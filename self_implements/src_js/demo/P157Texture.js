var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2";
import JWebglDemoInstance from "../common/JWebglDemoInstance";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.a_Position};
  ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  gl_FragColor = texture2D(${this.u_Sampler}, ${this.v_TexCoord});
}
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformSampler2D)
], Program.prototype, "u_Sampler", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec2)
], Program.prototype, "a_TexCoord", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec2)
], Program.prototype, "v_TexCoord", void 0);
export default class P157Texture extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            -0.5, 0.5, 0, 1, 0.0, 1.0,
            -0.5, -0.5, 0, 1, 0.0, 0.0,
            0.5, 0.5, 0, 1, 1.0, 1.0,
            0.5, -0.5, 0, 1, 1.0, 0.0
        ]);
    }
    getName() {
        return `P157Texture`;
    }
    onInit() {
        this.img = this.relWebgl.getImage(`./resources/sky.jpg`);
        this.program = this.createProgram(Program);
    }
    onDraw() {
    }
}
