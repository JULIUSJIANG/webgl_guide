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
import JWebglProgramVaryingFloat from "../common/JWebglProgramVaryingFloat.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";
class ProgramA extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
    vec3 lightDirection = vec3(0.0, 0.0, 1.0);
    vec4 color = vec4(0.0, 1.0, 1.0, 1.0);
    gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
    vec3 normal = normalize(vec3(${this.u_NormalMatrix} * ${this.a_Normal}));
    float nDotL = max(dot(normal, lightDirection), 0.0);
    ${this.v_Color} = vec4(color.rgb * nDotL, color.a);
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
], ProgramA.prototype, "u_MvpMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], ProgramA.prototype, "u_NormalMatrix", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], ProgramA.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], ProgramA.prototype, "a_Normal", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], ProgramA.prototype, "v_Color", void 0);
class ProgramB extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  vec3 lightDirection = vec3(0.0, 0.0, 1.0);
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 normal = normalize(vec3(${this.u_NormalMatrix} * ${this.a_Normal}));
  ${this.v_NdotL} = max(dot(normal, lightDirection), 0.0);
  ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  vec4 color = texture2D(${this.u_Sampler}, ${this.v_TexCoord});
  gl_FragColor = vec4(color.rgb * ${this.v_NdotL}, color.a);
}
        `;
    }
}
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], ProgramB.prototype, "u_MvpMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], ProgramB.prototype, "u_NormalMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformSampler2D)
], ProgramB.prototype, "u_Sampler", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], ProgramB.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], ProgramB.prototype, "a_Normal", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec2)
], ProgramB.prototype, "a_TexCoord", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingFloat)
], ProgramB.prototype, "v_NdotL", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec2)
], ProgramB.prototype, "v_TexCoord", void 0);
export default class P375ProgramObject extends JWebglDemoInstance {
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
         * 顶点数据 - 法向量
         */
        this.normals = new Float32Array([
            0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
            -1.0, 0.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0,
            0.0, -1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 1.0,
            0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0,
        ]);
        /**
         * 顶点数据 - 取样点
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
         * 顶点数据 - 顺序
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
         * 模型矩阵
         */
        this.mMat4 = new JWebglMatrix4;
        /**
         * 视图投影矩阵
         */
        this.vpMat4 = (new JWebglMatrix4)
            .setPerspective(30, 1, 1, 100)
            .lookAt(0, 0, 15, 0, 0, 0, 0, 1, 0);
        /**
         * 模型视图投影矩阵
         */
        this.mvpMat4 = new JWebglMatrix4;
        /**
         * 法向量矩阵
         */
        this.nMat4 = new JWebglMatrix4;
        /**
         * 当前旋转角
         */
        this.currentAngle = 0;
    }
    getName() {
        return `P375ProgramObject`;
    }
    onGetInfo() {
        return `通过切换着色程序以让不同着色器效果同时展示`;
    }
    onUpdate(dt) {
        this.currentAngle += dt / 1000 * 30;
        MgrData.inst.dataVersion++;
    }
    onDraw() {
        this.mMat4.setTranslate(-2, 0, 0).rotate(20, 1, 0, 0).rotate(this.currentAngle, 0, 1, 0);
        this.nMat4.setInverseOf(this.mMat4).transpose();
        this.mvpMat4.set(this.vpMat4).multiply(this.mMat4);
        this.programA.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.programA.u_NormalMatrix.fillByMat4(this.nMat4);
        this.programA.a_Position.fillByBuffer(this.vertices);
        this.programA.a_Normal.fillByBuffer(this.normals);
        this.programA.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
        this.mMat4.setTranslate(2, 0, 0).rotate(20, 1, 0, 0).rotate(this.currentAngle, 0, 1, 0);
        this.nMat4.setInverseOf(this.mMat4).transpose();
        this.mvpMat4.set(this.vpMat4).multiply(this.mMat4);
        this.programB.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.programB.u_NormalMatrix.fillByMat4(this.nMat4);
        this.programB.u_Sampler.fillByUrl(`./resources/sky.jpg`);
        this.programB.a_Position.fillByBuffer(this.vertices);
        this.programB.a_Normal.fillByBuffer(this.normals);
        this.programB.a_TexCoord.fillByBuffer(this.texCoords);
        this.programB.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(ProgramA)
], P375ProgramObject.prototype, "programA", void 0);
__decorate([
    JWebglDemoInstance.program(ProgramB)
], P375ProgramObject.prototype, "programB", void 0);
