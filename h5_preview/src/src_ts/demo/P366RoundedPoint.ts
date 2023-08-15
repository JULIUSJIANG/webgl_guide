import JWebgl from "../common/JWebgl";
import JWebglEnum from "../common/JWebglEnum";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import IndexGlobal from "../IndexGlobal";
import JWebglDemoInstance from "../common/JWebglDemoInstance";

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
  float d = distance (gl_PointCoord, vec2 (0.5, 0.5));
  if (d < 0.5) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
  else {
    discard;
  };
}
        `;
    }
}

export default class P366RoundedPoint extends JWebglDemoInstance {

    getName () {
        return `P366RoundedPoint`;
    }

    onGetInfo () {
      return `绘制出圆形点`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    vertices = new Float32Array ([
        0, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0
    ]);

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.relWebgl.drawArrays (this.program, JWebglEnum.DrawArraysMode.POINTS, 0, this.vertices.length / this.program.a_Position.onGetSize ());
    }
}