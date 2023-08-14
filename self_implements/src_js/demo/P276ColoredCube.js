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
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
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
], Program.prototype, "u_MvpMatrix", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P276ColoredCube extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据 - 位置
         */
        this.vertices = new Float32Array([
            1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
            -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
            1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
        ]);
        /**
         * 顶点数据 - 颜色
         */
        this.colors = new Float32Array([
            0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0,
            0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0, 0.4, 1.0,
            1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0,
            1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0,
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
            0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0,
        ]);
        /**
         * 绘制顺序
         */
        this.indices = new Uint8Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23 // back
        ]);
        /**
         * 模型 - 视图矩阵
         */
        this.mvpMat4 = (new JWebglMatrix4).setPerspective(30, 1, 1, 100).lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
    }
    getName() {
        return `P276ColoredCube`;
    }
    onDraw() {
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_Color.fillByBuffer(this.colors);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P276ColoredCube.prototype, "program", void 0);
