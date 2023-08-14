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
  gl_Position = ${this.u_mvpMatrix} * ${this.a_Position};
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
], Program.prototype, "u_mvpMatrix", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P262Depth extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0.0, 1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            -0.5, -1.0, 0.0, 1, 0.4, 0.4, 1.0, 1,
            0.5, -1.0, 0.0, 1, 1.0, 0.4, 0.4, 1,
            0.0, 1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            -0.5, -1.0, -2.0, 1, 1.0, 1.0, 0.4, 1,
            0.5, -1.0, -2.0, 1, 1.0, 0.4, 0.4, 1,
            0.0, 1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            -0.5, -1.0, -4.0, 1, 0.4, 1.0, 0.4, 1,
            0.5, -1.0, -4.0, 1, 1.0, 0.4, 0.4, 1,
        ]);
        /**
         * 模型矩阵
         */
        this.modelMat4 = new JWebglMatrix4();
        /**
         * 视图矩阵
         */
        this.viewMat4 = (new JWebglMatrix4).setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
        /**
         * 投影矩阵
         */
        this.projMat4 = (new JWebglMatrix4).setPerspective(30, 1, 1, 100);
        /**
         * 模型 - 视图矩阵
         */
        this.mvpMat4 = new JWebglMatrix4;
    }
    getName() {
        return `P262Depth`;
    }
    onDraw() {
        this.modelMat4.setTranslate(0.75, 0, 0);
        this.mvpMat4.set(this.projMat4).multiply(this.viewMat4).multiply(this.modelMat4);
        this.program.u_mvpMatrix.fillByMat4(this.mvpMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
        this.modelMat4.setTranslate(-0.75, 0, 0);
        this.mvpMat4.set(this.projMat4).multiply(this.viewMat4).multiply(this.modelMat4);
        this.program.u_mvpMatrix.fillByMat4(this.mvpMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P262Depth.prototype, "program", void 0);
