var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_ProjMatrix} * ${this.u_ViewMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  gl_FragColor = ${this.v_Color};
}
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_ViewMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_ProjMatrix", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P249PerspectiveView extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0.75, 1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            0.25, -1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            1.25, -1.0, -4.0, 1, 1.0, 0.4, 0.4, 1,
            0.75, 1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            0.25, -1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            1.25, -1.0, -2.0, 1, 1.0, 0.4, 0.4, 1,
            0.75, 1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            0.25, -1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            1.25, -1.0, 0.0, 1, 1.0, 0.4, 0.4, 1,
            -0.75, 1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            -1.25, -1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            -0.25, -1.0, -4.0, 1, 1.0, 0.4, 0.4, 1,
            -0.75, 1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            -1.25, -1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            -0.25, -1.0, -2.0, 1, 1.0, 0.4, 0.4, 1,
            -0.75, 1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            -1.25, -1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            -0.25, -1.0, 0.0, 1, 1.0, 0.4, 0.4, 1,
        ]);
        /**
         * 视图矩阵
         */
        this.viewMat4 = (new JWebglMatrix4).setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
        /**
         * 裁切矩阵
         */
        this.pMat4 = (new JWebglMatrix4).setPerspective(30, 1, 1, 100);
    }
    getName() {
        return `P249PerspectiveView`;
    }
    onGetInfo() {
        return `引入透视投影`;
    }
    onDraw() {
        this.program.u_ViewMatrix.fillByMat4(this.viewMat4);
        this.program.u_ProjMatrix.fillByMat4(this.pMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P249PerspectiveView.prototype, "program", void 0);
