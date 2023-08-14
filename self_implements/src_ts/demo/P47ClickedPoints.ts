import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebgl from "../common/JWebgl.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import MgrData from "../mgr_data/MgrData.js";

class Program extends JWebglProgram {
    
    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

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
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
        `;
    }
}

/**
 * 绘制一个点
 */
export default class P47ClickedPoints extends JWebglDemoInstance {

    getName () {
        return `P47ClickedPoints`;
    }

    /**
     * 着色器程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    onDraw (): void {
        for (let i = 0; i < this._listPoints.length; i += 2) {
            let x = this._listPoints [i + 0];
            let y = this._listPoints [i + 1];
            this.program.a_Position.fillByVec4 (x, y, 0, 1);
            this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
        };
    }

    _listPoints = new Array <number> ();

    onTouchStart (): void {
        this._listPoints.push (this.relWebgl.currentTouch.posProj [0], this.relWebgl.currentTouch.posProj [1]);
        MgrData.inst.dataVersion++;
    }
}