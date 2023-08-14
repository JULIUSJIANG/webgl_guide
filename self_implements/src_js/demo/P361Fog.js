var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglKey from "../common/JWebglKey.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformVec2 from "../common/JWebglProgramUniformVec2.js";
import JWebglProgramUniformVec3 from "../common/JWebglProgramUniformVec3.js";
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4.js";
import JWebglProgramVaryingFloat from "../common/JWebglProgramVaryingFloat.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
  ${this.v_Dist} = distance (${this.u_ModelMatrix} * ${this.a_Position}, ${this.u_Eye});
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  float fogFactor = clamp((${this.u_FogDist}.y - ${this.v_Dist}) / (${this.u_FogDist}.y - ${this.u_FogDist}.x), 0.0, 1.0);
  vec3 color = mix(${this.u_FogColor}, vec3(${this.v_Color}), fogFactor);
  gl_FragColor = vec4(color, ${this.v_Color}.a);
}
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_MvpMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_ModelMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec4)
], Program.prototype, "u_Eye", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec3)
], Program.prototype, "u_FogColor", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec2)
], Program.prototype, "u_FogDist", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingFloat)
], Program.prototype, "v_Dist", void 0);
export default class P361Fog extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        /**
         * 顶点数据 - 位置
         */
        this.vertices = new Float32Array([
            1, 1, 1, 1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1, 1, 1,
            1, 1, 1, 1, 1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1, 1,
            1, 1, 1, 1, 1, 1, -1, 1, -1, 1, -1, 1, -1, 1, 1, 1,
            -1, 1, 1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1,
            -1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1,
            1, -1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, 1, 1, -1, 1,
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
            20, 21, 22, 20, 22, 23,
        ]);
        /**
         * 眼睛的位置
         */
        this.eye = new Float32Array([25, 65, 35, 1.0]);
        /**
         * 模型矩阵
         */
        this.mMat4 = (new JWebglMatrix4).setScale(10, 10, 10);
        /**
         * 模型 - 视图矩阵
         */
        this.mvpMat4 = (new JWebglMatrix4);
        /**
         * 雾的颜色
         */
        this.fogColor = new Float32Array([0.137, 0.231, 0.423, 1.0]);
        /**
         * 雾气的起始距离以及终点距离
         */
        this.fogDistance = [55, 80];
    }
    getName() {
        return `P361Fog`;
    }
    onInit() {
        this.mvpMat4
            .setPerspective(30, 1, 1, 100)
            .lookAt(this.eye[0], this.eye[1], this.eye[2], 0, 2, 0, 0, 1, 0)
            .multiply(this.mMat4);
    }
    onKeyDown(key) {
        switch (key) {
            case JWebglKey["ArrowUp"]:
                {
                    this.fogDistance[1] += 1;
                    break;
                }
                ;
            case JWebglKey["ArrowDown"]:
                {
                    this.fogDistance[1] -= 1;
                    this.fogDistance[1] = Math.max(this.fogDistance[1], this.fogDistance[0]);
                    break;
                }
                ;
        }
        ;
        MgrData.inst.dataVersion++;
    }
    onDraw() {
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.program.u_ModelMatrix.fillByMat4(this.mMat4);
        this.program.u_Eye.fill(this.eye[0], this.eye[1], this.eye[2], this.eye[3]);
        this.program.u_FogColor.fillF(this.fogColor[0], this.fogColor[1], this.fogColor[2]);
        this.program.u_FogDist.fill(this.fogDistance[0], this.fogDistance[1]);
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_Color.fillByBuffer(this.colors);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
    onGetBgColor() {
        return [this.fogColor[0], this.fogColor[1], this.fogColor[2], this.fogColor[3]];
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P361Fog.prototype, "program", void 0);
