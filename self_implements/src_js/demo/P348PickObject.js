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
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color} * step (${this.u_Clicked}, 0.5) + vec4 (1.0, 0.0, 0.0, 1.0) * step (0.5, ${this.u_Clicked});
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
    JWebglProgram.uniform(JWebglProgramUniformFloat)
], Program.prototype, "u_Clicked", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P348PickObject extends JWebglDemoInstance {
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
            0.2, 0.58, 0.82, 1.0, 0.2, 0.58, 0.82, 1.0, 0.2, 0.58, 0.82, 1.0, 0.2, 0.58, 0.82, 1.0,
            0.5, 0.41, 0.69, 1.0, 0.5, 0.41, 0.69, 1.0, 0.5, 0.41, 0.69, 1.0, 0.5, 0.41, 0.69, 1.0,
            0.0, 0.32, 0.61, 1.0, 0.0, 0.32, 0.61, 1.0, 0.0, 0.32, 0.61, 1.0, 0.0, 0.32, 0.61, 1.0,
            0.78, 0.69, 0.84, 1.0, 0.78, 0.69, 0.84, 1.0, 0.78, 0.69, 0.84, 1.0, 0.78, 0.69, 0.84, 1.0,
            0.32, 0.18, 0.56, 1.0, 0.32, 0.18, 0.56, 1.0, 0.32, 0.18, 0.56, 1.0, 0.32, 0.18, 0.56, 1.0,
            0.73, 0.82, 0.93, 1.0, 0.73, 0.82, 0.93, 1.0, 0.73, 0.82, 0.93, 1.0, 0.73, 0.82, 0.93, 1.0,
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
         * 模型视图矩阵
         */
        this.vpMat4 = (new JWebglMatrix4)
            .setPerspective(30, 1, 1, 100)
            .lookAt(0, 0, 7, 0, 0, 0, 0, 1, 0);
        /**
         * 模型视图投影矩阵
         */
        this.mvpMat4 = new JWebglMatrix4;
        /**
         * 当前角度
         */
        this.angle = 0;
        /**
         * 交互坐标 x
         */
        this.x = 0;
        /**
         * 交互坐标 y
         */
        this.y = 0;
        /**
         * 取样颜色
         */
        this.pixels = new Uint8Array(4);
    }
    getName() {
        return `P348PickObject`;
    }
    onGetInfo() {
        return `精确判断鼠标是否点击到立方体，成功点到的时候弹出提示`;
    }
    onUpdate(dt) {
        dt = Math.min(dt, 16);
        this.angle += 20 * dt / 1000;
        MgrData.inst.dataVersion++;
    }
    onTouchStart() {
        this.x = this.relWebgl.touchStart.posCanvas[0];
        this.y = this.relWebgl.touchStart.posCanvas[1];
        this.draw(1);
        this.relWebgl.ctx.readPixels(this.x, this.y, 1, 1, JWebglEnum.TexImage2DFormat.RGBA, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, this.pixels);
        this.draw(0);
        if (this.pixels[0] == 255) {
            alert(`点中方块！`);
        }
        ;
    }
    onDraw() {
        this.draw(0);
    }
    draw(clicked) {
        this.relWebgl.ctx.clear(JWebglEnum.ClearMask.COLOR_BUFFER_BIT);
        this.relWebgl.ctx.clear(JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);
        this.mvpMat4.set(this.vpMat4).rotate(this.angle, 1, 0, 0).rotate(this.angle, 0, 1, 0).rotate(this.angle, 0, 0, 1);
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.program.u_Clicked.fill(clicked);
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_Color.fillByBuffer(this.colors);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P348PickObject.prototype, "program", void 0);
