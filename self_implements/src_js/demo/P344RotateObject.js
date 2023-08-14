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
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main () {
    gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
    ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main () {
    gl_FragColor = texture2D (${this.u_Sampler}, ${this.v_TexCoord});
}
            
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_MvpMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformSampler2D)
], Program.prototype, "u_Sampler", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec2)
], Program.prototype, "a_TexCoord", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec2)
], Program.prototype, "v_TexCoord", void 0);
export default class P344RotateObject extends JWebglDemoInstance {
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
         * 顶点数据 - 取样
         */
        this.texCoords = new Float32Array([
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0 // v4-v7-v6-v5 back
        ]);
        /**
         * 顶点数据 - 索引
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
         * 视图投影矩阵
         */
        this.vpMat4 = (new JWebglMatrix4)
            .setPerspective(30, 1, 1, 100)
            .lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
        /**
         * 模型视图投影矩阵
         */
        this.mvpMat4 = new JWebglMatrix4;
        /**
         * 当前旋转角
         */
        this.currentAngle = [0, 0];
        /**
         * 拖拽中
         */
        this.dragging = false;
        /**
         * 上一次交互的位置 x
         */
        this.lastX = -1;
        /**
         * 上一次交互的位置 y
         */
        this.lastY = -1;
    }
    getName() {
        return `P344RotateObject`;
    }
    onTouchStart() {
        let rect = this.relWebgl.canvas.getBoundingClientRect();
        let x = this.relWebgl.touchStart.posClient[0];
        let y = this.relWebgl.touchStart.posClient[1];
        if (rect.left <= x
            && x <= rect.right
            && rect.top <= y
            && y <= rect.bottom) {
            this.lastX = x;
            this.lastY = y;
            this.dragging = true;
        }
        ;
    }
    onTouchMove() {
        let x = this.relWebgl.touchMove.posClient[0];
        let y = this.relWebgl.touchMove.posClient[1];
        if (this.dragging) {
            let factor = 100 / this.relWebgl.canvas.height;
            let dx = factor * (x - this.lastX);
            let dy = factor * (y - this.lastY);
            this.currentAngle[0] = Math.max(Math.min(this.currentAngle[0] + dy, 90), -90);
            this.currentAngle[1] = this.currentAngle[1] + dx;
        }
        ;
        this.lastX = x;
        this.lastY = y;
        MgrData.inst.dataVersion++;
    }
    onTouchEnd() {
        this.dragging = false;
    }
    onDraw() {
        this.mvpMat4.set(this.vpMat4).rotate(this.currentAngle[0], 1, 0, 0).rotate(this.currentAngle[1], 0, 1, 0);
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.program.u_Sampler.fillByUrl(`./resources/sky.jpg`);
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_TexCoord.fillByBuffer(this.texCoords);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P344RotateObject.prototype, "program", void 0);
