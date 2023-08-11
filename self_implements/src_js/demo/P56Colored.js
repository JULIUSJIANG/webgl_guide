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
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4.js";
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
  gl_FragColor = ${this.u_FragColor};
}
        `;
    }
}
__decorate([
    JWebglProgram.attribute(JWebglProgramAttributeVec4)
], Program.prototype, "a_Position", void 0);
__decorate([
    JWebglProgram.uniform(JWebglProgramUniformVec4)
], Program.prototype, "u_FragColor", void 0);
/**
 * 绘制一个点
 */
export default class P56Colored extends JWebglDemoInstance {
    constructor() {
        super(...arguments);
        this._listPoints = new Array();
    }
    getName() {
        return `P56ColoredPoint`;
    }
    onInit() {
        this.program = this.createProgram(Program);
    }
    onDraw() {
        for (let i = 0; i < this._listPoints.length; i += 6) {
            let x = this._listPoints[i + 0];
            let y = this._listPoints[i + 1];
            let r = this._listPoints[i + 2];
            let g = this._listPoints[i + 3];
            let b = this._listPoints[i + 4];
            let a = this._listPoints[i + 5];
            this.program.a_Position.fillByVec4(x, y, 0, 1);
            this.program.u_FragColor.fill(r, g, b, a);
            this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
        }
        ;
    }
    onTouchStart() {
        this._listPoints.push(this.relWebgl.currentTouch.posP[0], this.relWebgl.currentTouch.posP[1]);
        if (0 <= this.relWebgl.currentTouch.posP[0] && 0 <= this.relWebgl.currentTouch.posP[1]) {
            this._listPoints.push(1, 0, 0, 1);
        }
        else if (this.relWebgl.currentTouch.posP[0] < 0 && this.relWebgl.currentTouch.posP[1] < 0) {
            this._listPoints.push(0, 1, 0, 1);
        }
        else {
            this._listPoints.push(0, 0, 1, 1);
        }
        ;
        MgrData.inst.dataVersion++;
    }
}
