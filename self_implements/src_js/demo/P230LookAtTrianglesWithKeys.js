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
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_ViewMatrix} * ${this.a_Position};
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
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P230LookAtTrianglesWithKeys extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据
         */
        this.vertices = new Float32Array([
            0.0, 0.5, -0.4, 1, 0.4, 1.0, 0.4, 1,
            -0.5, -0.5, -0.4, 1, 0.4, 1.0, 0.4, 1,
            0.5, -0.5, -0.4, 1, 1.0, 0.4, 0.4, 1,
            0.5, 0.4, -0.2, 1, 1.0, 0.4, 0.4, 1,
            -0.5, 0.4, -0.2, 1, 1.0, 1.0, 0.4, 1,
            0.0, -0.6, -0.2, 1, 1.0, 1.0, 0.4, 1,
            0.0, 0.5, 0.0, 1, 0.4, 0.4, 1.0, 1,
            -0.5, -0.5, 0.0, 1, 0.4, 0.4, 1.0, 1,
            0.5, -0.5, 0.0, 1, 1.0, 0.4, 0.4, 1,
        ]);
        /**
         * 视图矩阵
         */
        this.viewMat4 = new JWebglMatrix4();
        /**
         * 观察点的 x 坐标
         */
        this.x = 0.2;
    }
    getName() {
        return `P230LookAtTrianglesWithKeys`;
    }
    onGetInfo() {
        return `按下键盘左箭头、右箭头以调整视点位置`;
    }
    onKeyDown(key) {
        switch (key) {
            case `ArrowLeft`:
                {
                    this.x -= 0.01;
                    break;
                }
                ;
            case `ArrowRight`:
                {
                    this.x += 0.01;
                    break;
                }
                ;
        }
        ;
        MgrData.inst.dataVersion++;
    }
    onEnable() {
        this.relWebgl.ctx.disable(JWebglEnum.EnableCap.DEPTH_TEST);
    }
    onDisable() {
        this.relWebgl.ctx.enable(JWebglEnum.EnableCap.DEPTH_TEST);
    }
    onDraw() {
        this.viewMat4.setLookAt(this.x, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
        this.program.u_ViewMatrix.fillByMat4(this.viewMat4);
        this.program.drawArrays(JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P230LookAtTrianglesWithKeys.prototype, "program", void 0);
