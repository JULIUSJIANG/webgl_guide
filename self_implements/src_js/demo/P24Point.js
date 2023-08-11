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
    onInit() {
        this.program = this.createProgram(Program);
    }
    onDraw() {
        this.relWebgl.drawArrays(this.program, JWebglEnum.DrawArraysMode.POINTS, 0, 1);
    }
}
