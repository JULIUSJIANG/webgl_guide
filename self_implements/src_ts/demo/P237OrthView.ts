import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ProjMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_ProjMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  gl_FragColor = ${this.v_Color};
}
        `;
    }
}

export default class P237OrthView extends JWebglDemoInstance {

    getName() {
        return `P237OrthView`;
    }

    onGetInfo () {
        return `引入正射投影，按下左箭头：近裁剪面增加，按下右箭头：近裁剪面减少，按下上箭头：远裁剪面增加，按下下箭头：远裁剪面减少
`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据
     */
    vertices = new Float32Array([
         0.0,  0.6, -0.4, 1,    0.4, 1.0, 0.4, 1,
        -0.5, -0.4, -0.4, 1,    0.4, 1.0, 0.4, 1,
         0.5, -0.4, -0.4, 1,    1.0, 0.4, 0.4, 1,
 
         0.5,  0.4, -0.2, 1,    1.0, 0.4, 0.4, 1,
        -0.5,  0.4, -0.2, 1,    1.0, 1.0, 0.4, 1,
         0.0, -0.6, -0.2, 1,    1.0, 1.0, 0.4, 1,
 
         0.0,  0.5,  0.0, 1,    0.4, 0.4, 1.0, 1,
        -0.5, -0.5,  0.0, 1,    0.4, 0.4, 1.0, 1,
         0.5, -0.5,  0.0, 1,    1.0, 0.4, 0.4, 1,
    ]);

    /**
     * 视图矩阵
     */
    pMat4 = (new JWebglMatrix4 ());

    /**
     * 近裁切面
     */
    near = 0;

    /**
     * 远裁切面
     */
    far = 0.5;

    onKeyDown (key: string): void {
        switch (key) {
            case `ArrowLeft`: {
                this.near += 0.01;
                break;
            };
            case `ArrowRight`: {
                this.near -= 0.01;
                break;
            };
            case `ArrowUp`: {
                this.far += 0.01;
                break;
            };
            case `ArrowDown`: {
                this.far -= 0.01;
                break;
            };
        };
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        this.pMat4.setOrtho (-1, 1, -1, 1, this.near, this.far);
        this.program.u_ProjMatrix.fillByMat4 (this.pMat4);
        this.program.drawArrays (JWebglEnum.DrawArraysMode.TRIANGLES, this.vertices);
    }
}