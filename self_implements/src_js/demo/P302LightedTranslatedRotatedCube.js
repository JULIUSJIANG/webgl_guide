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
import JWebglProgramUniformVec3 from "../common/JWebglProgramUniformVec3.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import JWebglVector3 from "../common/JWebglVector3.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 normal = normalize ((${this.u_NormalMatrix} * ${this.a_Normal}).xyz);
  float nDotL = max (dot (${this.u_LightDirection}, normal), 0.0);
  vec3 diffuse = ${this.u_LightColor} * ${this.a_Color}.rgb * nDotL;
  vec3 ambient = ${this.u_AmbientLight} * ${this.a_Color}.rgb;
  ${this.v_Color} = vec4 (diffuse + ambient, ${this.a_Color}.a);
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
    JWebglProgram.uniform(JWebglProgramUniformMat4)
], Program.prototype, "u_NormalMatrix", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec3)
], Program.prototype, "u_LightColor", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec3)
], Program.prototype, "u_LightDirection", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec3)
], Program.prototype, "u_AmbientLight", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Color", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Normal", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P302LightedTranslatedRotatedCube extends JWebglDemoInstance {
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
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
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
         * 模型矩阵
         */
        this.mMat4 = (new JWebglMatrix4).setTranslate(0, 0.9, 0).rotate(90, 0, 0, 1);
        /**
         * 模型矩阵 -逆转置矩阵
         */
        this.mMat4IT = new JWebglMatrix4;
        /**
         * 模型视图投影矩阵
         */
        this.mvpMat4 = (new JWebglMatrix4).setPerspective(30, 1, 1, 100).lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0).multiply(this.mMat4);
        /**
         * 光线角度
         */
        this.lightDirection = new JWebglVector3;
    }
    getName() {
        return `P302LightedTranslatedRotatedCube`;
    }
    onGetInfo() {
        return `让立方体经过变换以后的法向量保持正确，从而光照效果正确`;
    }
    onInit() {
        this.lightDirection.elements[0] = 0.5;
        this.lightDirection.elements[1] = 3;
        this.lightDirection.elements[2] = 4;
        this.lightDirection.normalize();
        this.mMat4IT.setInverseOf(this.mMat4);
        this.mMat4IT.transpose();
    }
    onDraw() {
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.program.u_LightColor.fillF(1, 1, 1);
        this.program.u_LightDirection.fillV(this.lightDirection.elements);
        this.program.u_NormalMatrix.fillByMat4(this.mMat4IT);
        this.program.u_AmbientLight.fillF(0.2, 0.2, 0.2);
        this.program.a_Position.fillByBuffer(this.vertices);
        this.program.a_Color.fillByBuffer(this.colors);
        this.program.a_Normal.fillByBuffer(this.normals);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P302LightedTranslatedRotatedCube.prototype, "program", void 0);
