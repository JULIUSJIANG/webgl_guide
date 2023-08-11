var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import MgrData from "../mgr_data/MgrData.js";
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
export default class P120Animate extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0, 0.3, 0.0, 1.0,
            -0.3, -0.3, 0.0, 1.0,
            0.3, -0.3, 0.0, 1.0
        ]);
        /**
         * 变换矩阵
         */
        this.mat4 = new JWebglMatrix4();
        /**
         * 当前旋转角
         */
        this.angle = 0;
    }
    getName() {
        return `P120Animate`;
    }
    onUpdate(dt) {
        this.angle += dt / 1000 * 45;
        MgrData.inst.dataVersion++;
    }
    onDraw() {
        this.program.a_Position.fillByBuffer(this.vertices);
        this.mat4.setRotate(this.angle, 0, 0, 1);
        this.program.u_xformMatrix.fillByMat4(this.mat4);
        this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.TRIANGLES, 0, this.vertices.length / this.program.a_Position.onGetSize());
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P120Animate.prototype, "program", void 0);
