var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
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
  vec4 color0 = texture2D(${this.u_Sampler0}, ${this.v_TexCoord});
  vec4 color1 = texture2D(${this.u_Sampler1}, ${this.v_TexCoord});
  gl_FragColor = color0 * color1;
}
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformSampler2D)
], Program.prototype, "u_Sampler0", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformSampler2D)
], Program.prototype, "u_Sampler1", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec2)
], Program.prototype, "a_TexCoord", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec2)
], Program.prototype, "v_TexCoord", void 0);
export default class P178MultiTexture extends JWebglDemoInstance {
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
        return `P178MultiTexture`;
    }
    onDraw() {
        this.program.u_Sampler0.fillByUrl(`./resources/sky.jpg`);
        this.program.u_Sampler1.fillByUrl(`./resources/circle.gif`);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLE_STRIP, this.vertices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P178MultiTexture.prototype, "program", void 0);
