var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
/**
 * 着色程序
 */
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 10.0;
}
        `;
    }
    onGetShaderFTxt() {
        return `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
        `;
    }
}
/**
 * 绘制一个点
 */
export default class P24Point extends JWebglDemoInstance {
    getName() {
        return `P24Point`;
    }
    onDraw() {
        this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P24Point.prototype, "program", void 0);
