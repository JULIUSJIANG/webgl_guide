var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
    gl_Position = ${this.u_xformMatrix} * ${this.a_Position};
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
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_xformMatrix", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
export default class P102Matrix extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 1.0,
            0.5, -0.5, 0.0, 1.0
        ]);
        /**
         * 旋转角
         */
        this.angle = 90;
    }
    getName() {
        return `P102Matrix`;
    }
    onDraw() {
        this.program.a_Position.fillByBuffer(this.vertices);
        let radian = Math.PI * this.angle / 180;
        let cosB = Math.cos(radian);
        let sinB = Math.sin(radian);
        this.program.u_xformMatrix.fillByNumber(cosB, sinB, 0, 0, -sinB, cosB, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize());
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P102Matrix.prototype, "program", void 0);
