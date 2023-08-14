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
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 lightDirection = normalize (vec3 (0.0, 0.5, 0.7));
  vec4 color = vec4 (1.0, 0.4, 0.0, 1.0);
  vec3 normal = normalize ((${this.u_NormalMatrix} * ${this.a_Normal}).xyz);
  float nDotL = max (dot (normal, lightDirection), 0.0);
  ${this.v_Color} = vec4 (color.rgb * nDotL + vec3 (0.1), color.a);
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
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Normal", void 0);
__decorate([
    JWebglProgram.varying(JWebglProgramVaryingVec4)
], Program.prototype, "v_Color", void 0);
export default class P327MultiJointModel_segment extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        this.vertices_base = new Float32Array([
            5.0, 2.0, 5.0, 1.0, -5.0, 2.0, 5.0, 1.0, -5.0, 0.0, 5.0, 1.0, 5.0, 0.0, 5.0, 1.0,
            5.0, 2.0, 5.0, 1.0, 5.0, 0.0, 5.0, 1.0, 5.0, 0.0, -5.0, 1.0, 5.0, 2.0, -5.0, 1.0,
            5.0, 2.0, 5.0, 1.0, 5.0, 2.0, -5.0, 1.0, -5.0, 2.0, -5.0, 1.0, -5.0, 2.0, 5.0, 1.0,
            -5.0, 2.0, 5.0, 1.0, -5.0, 2.0, -5.0, 1.0, -5.0, 0.0, -5.0, 1.0, -5.0, 0.0, 5.0, 1.0,
            -5.0, 0.0, -5.0, 1.0, 5.0, 0.0, -5.0, 1.0, 5.0, 0.0, 5.0, 1.0, -5.0, 0.0, 5.0, 1.0,
            5.0, 0.0, -5.0, 1.0, -5.0, 0.0, -5.0, 1.0, -5.0, 2.0, -5.0, 1.0, 5.0, 2.0, -5.0, 1.0,
        ]);
        this.vertices_arm1 = new Float32Array([
            1.5, 10.0, 1.5, 1.0, -1.5, 10.0, 1.5, 1.0, -1.5, 0.0, 1.5, 1.0, 1.5, 0.0, 1.5, 1.0,
            1.5, 10.0, 1.5, 1.0, 1.5, 0.0, 1.5, 1.0, 1.5, 0.0, -1.5, 1.0, 1.5, 10.0, -1.5, 1.0,
            1.5, 10.0, 1.5, 1.0, 1.5, 10.0, -1.5, 1.0, -1.5, 10.0, -1.5, 1.0, -1.5, 10.0, 1.5, 1.0,
            -1.5, 10.0, 1.5, 1.0, -1.5, 10.0, -1.5, 1.0, -1.5, 0.0, -1.5, 1.0, -1.5, 0.0, 1.5, 1.0,
            -1.5, 0.0, -1.5, 1.0, 1.5, 0.0, -1.5, 1.0, 1.5, 0.0, 1.5, 1.0, -1.5, 0.0, 1.5, 1.0,
            1.5, 0.0, -1.5, 1.0, -1.5, 0.0, -1.5, 1.0, -1.5, 10.0, -1.5, 1.0, 1.5, 10.0, -1.5, 1.0,
        ]);
        this.vertices_arm2 = new Float32Array([
            2.0, 10.0, 2.0, 1.0, -2.0, 10.0, 2.0, 1.0, -2.0, 0.0, 2.0, 1.0, 2.0, 0.0, 2.0, 1.0,
            2.0, 10.0, 2.0, 1.0, 2.0, 0.0, 2.0, 1.0, 2.0, 0.0, -2.0, 1.0, 2.0, 10.0, -2.0, 1.0,
            2.0, 10.0, 2.0, 1.0, 2.0, 10.0, -2.0, 1.0, -2.0, 10.0, -2.0, 1.0, -2.0, 10.0, 2.0, 1.0,
            -2.0, 10.0, 2.0, 1.0, -2.0, 10.0, -2.0, 1.0, -2.0, 0.0, -2.0, 1.0, -2.0, 0.0, 2.0, 1.0,
            -2.0, 0.0, -2.0, 1.0, 2.0, 0.0, -2.0, 1.0, 2.0, 0.0, 2.0, 1.0, -2.0, 0.0, 2.0, 1.0,
            2.0, 0.0, -2.0, 1.0, -2.0, 0.0, -2.0, 1.0, -2.0, 10.0, -2.0, 1.0, 2.0, 10.0, -2.0, 1.0,
        ]);
        this.vertices_palm = new Float32Array([
            1.0, 2.0, 3.0, 1.0, -1.0, 2.0, 3.0, 1.0, -1.0, 0.0, 3.0, 1.0, 1.0, 0.0, 3.0, 1.0,
            1.0, 2.0, 3.0, 1.0, 1.0, 0.0, 3.0, 1.0, 1.0, 0.0, -3.0, 1.0, 1.0, 2.0, -3.0, 1.0,
            1.0, 2.0, 3.0, 1.0, 1.0, 2.0, -3.0, 1.0, -1.0, 2.0, -3.0, 1.0, -1.0, 2.0, 3.0, 1.0,
            -1.0, 2.0, 3.0, 1.0, -1.0, 2.0, -3.0, 1.0, -1.0, 0.0, -3.0, 1.0, -1.0, 0.0, 3.0, 1.0,
            -1.0, 0.0, -3.0, 1.0, 1.0, 0.0, -3.0, 1.0, 1.0, 0.0, 3.0, 1.0, -1.0, 0.0, 3.0, 1.0,
            1.0, 0.0, -3.0, 1.0, -1.0, 0.0, -3.0, 1.0, -1.0, 2.0, -3.0, 1.0, 1.0, 2.0, -3.0, 1.0,
        ]);
        this.vertices_finger = new Float32Array([
            0.5, 2.0, 0.5, 1.0, -0.5, 2.0, 0.5, 1.0, -0.5, 0.0, 0.5, 1.0, 0.5, 0.0, 0.5, 1.0,
            0.5, 2.0, 0.5, 1.0, 0.5, 0.0, 0.5, 1.0, 0.5, 0.0, -0.5, 1.0, 0.5, 2.0, -0.5, 1.0,
            0.5, 2.0, 0.5, 1.0, 0.5, 2.0, -0.5, 1.0, -0.5, 2.0, -0.5, 1.0, -0.5, 2.0, 0.5, 1.0,
            -0.5, 2.0, 0.5, 1.0, -0.5, 2.0, -0.5, 1.0, -0.5, 0.0, -0.5, 1.0, -0.5, 0.0, 0.5, 1.0,
            -0.5, 0.0, -0.5, 1.0, 0.5, 0.0, -0.5, 1.0, 0.5, 0.0, 0.5, 1.0, -0.5, 0.0, 0.5, 1.0,
            0.5, 0.0, -0.5, 1.0, -0.5, 0.0, -0.5, 1.0, -0.5, 2.0, -0.5, 1.0, 0.5, 2.0, -0.5, 1.0,
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
         * 法线矩阵
         */
        this.nMat4 = new JWebglMatrix4;
        /**
         * 模型矩阵
         */
        this.mMat4 = new JWebglMatrix4;
        /**
         * 视图投影矩阵
         */
        this.vpMat4 = (new JWebglMatrix4)
            .setPerspective(50, 1, 1, 100)
            .lookAt(20, 10, 30, 0, 0, 0, 0, 1, 0);
        /**
         * 模型视图投影矩阵
         */
        this.mvpMat4 = new JWebglMatrix4;
        /**
         * 角度的变化间隔
         */
        this.angleStep = 3;
        /**
         * 手臂 1 的角度
         */
        this.g_arm1Angle = 90;
        /**
         * 关节 1 的角度
         */
        this.g_joint1Angle = 45;
        /**
         * 关节 2 的角度
         */
        this.g_joint2Angle = 0;
        /**
         * 关节 3 的角度
         */
        this.g_joint3Angle = 0;
        this._backupMat4 = new JWebglMatrix4;
        this._mMat4 = new JWebglMatrix4;
    }
    getName() {
        return `P327MultiJointModel_segment`;
    }
    onKeyDown(key) {
        switch (key) {
            case JWebglKey["ArrowUp"]:
                {
                    this.g_joint1Angle += this.angleStep;
                    this.g_joint1Angle = Math.min(this.g_joint1Angle, 135);
                    break;
                }
                ;
            case JWebglKey["ArrowDown"]:
                {
                    this.g_joint1Angle -= this.angleStep;
                    this.g_joint1Angle = Math.max(this.g_joint1Angle, -135);
                    break;
                }
                ;
            case JWebglKey["ArrowRight"]:
                {
                    this.g_arm1Angle += this.angleStep;
                    break;
                }
                ;
            case JWebglKey["ArrowLeft"]:
                {
                    this.g_arm1Angle -= this.angleStep;
                    break;
                }
                ;
            case JWebglKey["z"]:
                {
                    this.g_joint2Angle += this.angleStep;
                    break;
                }
                ;
            case JWebglKey["x"]:
                {
                    this.g_joint2Angle -= this.angleStep;
                    break;
                }
                ;
            case JWebglKey["v"]:
                {
                    this.g_joint3Angle += this.angleStep;
                    this.g_joint3Angle = Math.min(this.g_joint3Angle, 60);
                    break;
                }
                ;
            case JWebglKey["c"]:
                {
                    this.g_joint3Angle -= this.angleStep;
                    this.g_joint3Angle = Math.max(this.g_joint3Angle, -60);
                    break;
                }
                ;
        }
        ;
        MgrData.inst.dataVersion++;
    }
    onDraw() {
        this.program.a_Normal.fillByBuffer(this.normals);
        let baseHeight = 2;
        this.mMat4.setTranslate(0, -12, 0);
        this.draw(this.vertices_base);
        let arm1Length = 10;
        this.mMat4.translate(0, baseHeight, 0).rotate(this.g_arm1Angle, 0, 1, 0);
        this.draw(this.vertices_arm1);
        let arm2Length = 10;
        this.mMat4.translate(0, arm1Length, 0).rotate(this.g_joint1Angle, 0, 0, 1);
        this.draw(this.vertices_arm2);
        let palmLength = 2;
        this.mMat4.translate(0, arm2Length, 0).rotate(this.g_joint2Angle, 0, 1, 0);
        this.draw(this.vertices_palm);
        this.mMat4.translate(0, palmLength, 0);
        this._backupMat4.set(this.mMat4);
        this.mMat4.translate(0, 0, 2).rotate(this.g_joint3Angle, 1, 0, 0);
        this.draw(this.vertices_finger);
        this.mMat4.set(this._backupMat4);
        this.mMat4.translate(0, 0, -2).rotate(-this.g_joint3Angle, 1, 0, 0);
        this.draw(this.vertices_finger);
    }
    draw(vertices) {
        this._mMat4.set(this.mMat4);
        this.program.a_Position.fillByBuffer(vertices);
        this.mvpMat4.set(this.vpMat4).multiply(this._mMat4);
        this.program.u_MvpMatrix.fillByMat4(this.mvpMat4);
        this.nMat4.setInverseOf(this._mMat4);
        this.nMat4.transpose();
        this.program.u_NormalMatrix.fillByMat4(this.nMat4);
        this.program.drawElements(JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P327MultiJointModel_segment.prototype, "program", void 0);
