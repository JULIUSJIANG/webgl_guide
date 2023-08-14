var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeFloat from "../common/JWebglProgramAttributeFloat.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.a_Position};
  gl_PointSize = ${this.a_PointSize};
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
        `;
    }
}
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeFloat)
], Program.prototype, "a_PointSize", void 0);
export default class P133MultiAttributeSize extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据 - 位置
         */
        this.vertices = new Float32Array([
            0, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 1.0,
            0.5, -0.5, 0.0, 1.0
        ]);
        /**
         * 顶点数据 - 尺寸
         */
        this.sizes = new Float32Array([
            10, 20, 30
        ]);
    }
    getName() {
        return `P133MultiAttributeSize`;
    }
    onDraw() {
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_PointSize.fillByBuffer(this.sizes);
        this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.POINTS, 0, this.vertices.length / this.program.a_Position.onGetSize());
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P133MultiAttributeSize.prototype, "program", void 0);
