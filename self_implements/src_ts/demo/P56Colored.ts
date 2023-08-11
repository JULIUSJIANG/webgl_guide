import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebgl from "../common/JWebgl.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import MgrData from "../mgr_data/MgrData.js";
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4.js";

class Program extends JWebglProgram {
    
    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.uniform (JWebglProgramUniformVec4)
    u_FragColor: JWebglProgramUniformVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.a_Position};
  gl_PointSize = 10.0;
}
        `;
    }

    onGetShaderFTxt(): string {
        return `
void main() {
  gl_FragColor = ${this.u_FragColor};
}
        `;
    }
}

/**
 * 绘制一个点
 */
export default class P56Colored extends JWebglDemoInstance {

    getName () {
        return `P56ColoredPoint`;
    }

    /**
     * 着色程序
     */
    program: Program;

    onInit (): void {
        this.program = this.createProgram (Program);
    }

    onDraw (): void {
        for (let i = 0; i < this._listPoints.length; i += 6) {
            let x = this._listPoints [i + 0];
            let y = this._listPoints [i + 1];
            let r = this._listPoints [i + 2];
            let g = this._listPoints [i + 3];
            let b = this._listPoints [i + 4];
            let a = this._listPoints [i + 5];
            this.program.a_Position.fillByVec4 (x, y, 0, 1);
            this.program.u_FragColor.fill (r, g, b, a);
            this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
        };
    }

    _listPoints = new Array <number> ();

    onTouchStart (): void {
        this._listPoints.push (this.relWebgl.currentTouch.posP [0], this.relWebgl.currentTouch.posP [1]);
        if (0 <= this.relWebgl.currentTouch.posP [0] && 0 <= this.relWebgl.currentTouch.posP [1]) {
            this._listPoints.push (1, 0, 0, 1);
        }
        else if (this.relWebgl.currentTouch.posP [0] < 0 && this.relWebgl.currentTouch.posP [1] < 0) {
            this._listPoints.push (0, 1, 0, 1);
        }
        else {
            this._listPoints.push (0, 0, 1, 1);
        };
        MgrData.inst.dataVersion++;
    }
}