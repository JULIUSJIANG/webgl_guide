var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import MgrData from "../mgr_data/MgrData.js";
class Program extends JWebglProgram {
    onGetShaderVTxt() {
        return `
void main() {
  gl_Position = ${this.a_Position};
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
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
/**
 * 绘制一个点
 */
export default class P47ClickPoint extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        this._listPoints = new Array();
    }
    getName() {
        return `P47ClickPoint`;
    }
    onDraw() {
        for (let i = 0; i < this._listPoints.length; i += 2) {
            let x = this._listPoints[i + 0];
            let y = this._listPoints[i + 1];
            this.program.a_Position.fillByVec4(x, y, 0, 1);
            this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
        }
        ;
    }
    onTouchStart() {
        this._listPoints.push(this.relWebgl.currentTouch.posP[0], this.relWebgl.currentTouch.posP[1]);
        MgrData.inst.dataVersion++;
    }
}
__decorate([
    JWebglDemoInstance.program(Program)
], P47ClickPoint.prototype, "program", void 0);
