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
  gl_Position = ${this.u_ProjMatrix} * ${this.u_ViewMatrix} * ${this.u_ModelMatrix} * ${this.a_Position};
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
], Program.prototype, "u_ModelMatrix", void 0);
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
export default class P254PerspectiveView_mvp extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0.0, 1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            -0.5, -1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            0.5, -1.0, -4.0, 1, 1.0, 0.4, 0.4, 1,
            0.0, 1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            -0.5, -1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            0.5, -1.0, -2.0, 1, 1.0, 0.4, 0.4, 1,
            0.0, 1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            -0.5, -1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            0.5, -1.0, 0.0, 1, 1.0, 0.4, 0.4, 1,
        ]);
        /**
         * 模型矩阵
         */
        this.mMat4 = new JWebglMatrix4();
        /**
         * 视图矩阵
         */
        this.vMat4 = (new JWebglMatrix4).setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
        /**
         * 投影矩阵
         */
        this.pMat4 = (new JWebglMatrix4).setPerspective(30, 1, 1, 100);
    }
    getName() {
        return `P254PerspectiveView_mvp`;
    }
    onGetInfo() {
        return `把模型矩阵、视图矩阵、投影矩阵复合为模型视图投影矩阵`;
    }
    onDraw() {
        this.program.u_ViewMatrix.fillByMat4(this.vMat4);
        this.program.u_ProjMatrix.fillByMat4(this.pMat4);
        this.mMat4.setTranslate(0.75, 0, 0);
        this.program.u_ModelMatrix.fillByMat4(this.mMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
        this.mMat4.setTranslate(-0.75, 0, 0);
        this.program.u_ModelMatrix.fillByMat4(this.mMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P254PerspectiveView_mvp.prototype, "program", void 0);
