import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeFloat from "../common/JWebglProgramAttributeFloat";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformFloat from "../common/JWebglProgramUniformFloat";
import JWebglProgramUniformInt from "../common/JWebglProgramUniformInt";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";
import MgrData from "../mgr_data/MgrData";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformFloat)
    u_PickedFace: JWebglProgramUniformFloat;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeFloat)
    a_Face: JWebglProgramAttributeFloat;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 color = ${this.a_Face} == ${this.u_PickedFace} ? vec3 (1.0) : ${this.a_Color}.rgb;
  if (${this.u_PickedFace} == 0.0) {
    ${this.v_Color} = vec4 (color, ${this.a_Face} / 255.0);
  }
  else {
    ${this.v_Color} = vec4 (color, ${this.a_Color}.a);
  };
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

export default class P352PickFace extends JWebglDemoInstance {

    getName() {
        return `P352PickFace`;
    }

    onGetInfo () {
        return `精确判断鼠标点到的立方体的面，并且更换为白色`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据 - 位置
     */
    vertices = new Float32Array ([
        1.0, 1.0, 1.0, 1.0,  -1.0, 1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0, // v0-v1-v2-v3 front
        1.0, 1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0, // v0-v3-v4-v5 right
        1.0, 1.0, 1.0, 1.0,   1.0, 1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0, 1.0, 1.0, 1.0, // v0-v5-v6-v1 up
       -1.0, 1.0, 1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, 1.0, // v1-v6-v7-v2 left
       -1.0,-1.0,-1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0,-1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0, // v7-v4-v3-v2 down
        1.0,-1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0, // v4-v7-v6-v5 back
    ]);
    /**
     * 顶点数据 - 颜色
     */
    colors = new Float32Array ([
        0.32, 0.18, 0.56, 1.0,  0.32, 0.18, 0.56, 1.0,  0.32, 0.18, 0.56, 1.0,  0.32, 0.18, 0.56, 1.0, // v0-v1-v2-v3 front
         0.5, 0.41, 0.69, 1.0,   0.5, 0.41, 0.69, 1.0,   0.5, 0.41, 0.69, 1.0,   0.5, 0.41, 0.69, 1.0, // v0-v3-v4-v5 right
        0.78, 0.69, 0.84, 1.0,  0.78, 0.69, 0.84, 1.0,  0.78, 0.69, 0.84, 1.0,  0.78, 0.69, 0.84, 1.0, // v0-v5-v6-v1 up
         0.0, 0.32, 0.61, 1.0,   0.0, 0.32, 0.61, 1.0,   0.0, 0.32, 0.61, 1.0,   0.0, 0.32, 0.61, 1.0, // v1-v6-v7-v2 left
        0.27, 0.58, 0.82, 1.0,  0.27, 0.58, 0.82, 1.0,  0.27, 0.58, 0.82, 1.0,  0.27, 0.58, 0.82, 1.0, // v7-v4-v3-v2 down
        0.73, 0.82, 0.93, 1.0,  0.73, 0.82, 0.93, 1.0,  0.73, 0.82, 0.93, 1.0,  0.73, 0.82, 0.93, 1.0, // v4-v7-v6-v5 back
    ]);
    faces = new Float32Array ([
        1, 1, 1, 1,     // v0-v1-v2-v3 front
        2, 2, 2, 2,     // v0-v3-v4-v5 right
        3, 3, 3, 3,     // v0-v5-v6-v1 up
        4, 4, 4, 4,     // v1-v6-v7-v2 left
        5, 5, 5, 5,     // v7-v4-v3-v2 down
        6, 6, 6, 6,     // v4-v7-v6-v5 back
    ]);

    /**
     * 绘制顺序
     */
    indices = new Uint8Array ([
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
       12,13,14,  12,14,15,    // left
       16,17,18,  16,18,19,    // down
       20,21,22,  20,22,23     // back
    ]);

    /**
     * 模型视图矩阵
     */
    vpMat4 = (new JWebglMatrix4)
        .setPerspective (30, 1, 1, 100)
        .lookAt (
            0, 0, 7,
            0, 0, 0,
            0, 1, 0
        );

    /**
     * 模型视图投影矩阵
     */
    mvpMat4 = new JWebglMatrix4;
    
    /**
     * 当前角度
     */
    angle = 0;

    /**
     * 挑选了的面
     */
    pickedFace = -1;

    onUpdate (dt: number): void {
        dt = Math.min (dt, 16);
        this.angle += 20 * dt / 1000;
        MgrData.inst.dataVersion ++;
    }

    /**
     * 交互坐标 x
     */
    x = 0;

    /**
     * 交互坐标 y
     */
    y = 0;

    /**
     * 取样颜色
     */
    pixels = new Uint8Array (4);

    onTouchStart (): void {
        this.x = this.relWebgl.touchStart.posCanvas [0];
        this.y = this.relWebgl.touchStart.posCanvas [1];

        let rec = this.pickedFace;
        this.pickedFace = 0;
        this.draw ();
        this.relWebgl.ctx.readPixels (this.x, this.y, 1, 1, JWebglEnum.TexImage2DFormat.RGBA, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, this.pixels);
        if (0 < this.pixels [3]) {
            this.pickedFace = this.pixels [3];
        }
        else {
            this.pickedFace = rec;
        };
        this.draw ();
    }

    onDraw (): void {
        this.draw ();
    }

    onEnable (): void {
        this.relWebgl.ctx.disable (JWebglEnum.EnableCap.BLEND);
    }

    onDisable (): void {
        this.relWebgl.ctx.enable (JWebglEnum.EnableCap.BLEND);
    }

    draw () {
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);

        this.mvpMat4.set (this.vpMat4).rotate (this.angle, 1, 0, 0).rotate (this.angle, 0, 1, 0).rotate (this.angle, 0, 0, 1);
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.u_PickedFace.fill (this.pickedFace);
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_Color.fillByBuffer (this.colors);
        this.program.a_Face.fillByBuffer (this.faces);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}