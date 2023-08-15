import JWebglEnum from "../common/JWebglEnum.js";
import JWebglProgram from "../common/JWebglProgram.js";
import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";

/**
 * 着色程序
 */
class Program extends JWebglProgram {

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 10.0;
}
        `;
    }

    onGetShaderFTxt (): string {
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
export default class P24HelloPoint1 extends JWebglDemoInstance {

    getName () {
        return `P24HelloPoint1`;
    }

    onGetInfo () {
        return `在画面中绘制出一个点`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    onDraw (): void {
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
    }
}