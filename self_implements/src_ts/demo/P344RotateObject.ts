import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import MgrData from "../mgr_data/MgrData.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler: JWebglProgramUniformSampler2D;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec2)
    a_TexCoord: JWebglProgramAttributeVec2;

    @JWebglProgram.varying (JWebglProgramVaryingVec2)
    v_TexCoord: JWebglProgramVaryingVec2;

    onGetShaderVTxt (): string {
        return `
void main () {
    gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
    ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main () {
    gl_FragColor = texture2D (${this.u_Sampler}, ${this.v_TexCoord});
}
            
        `;
    }
}

export default class P344RotateObject extends JWebglDemoInstance {

    getName () {
        return `P344RotateObject`;
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
     * 顶点数据 - 取样
     */
    texCoords = new Float32Array ([
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
        0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
        1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
    ]);
    /**
     * 顶点数据 - 索引
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
     * 视图投影矩阵
     */
    vpMat4 = (new JWebglMatrix4)
        .setPerspective (30, 1, 1, 100)
        .lookAt (
            3, 3, 7,
            0, 0, 0,
            0, 1, 0
        );

    /**
     * 模型视图投影矩阵
     */
    mvpMat4 = new JWebglMatrix4;

    /**
     * 当前旋转角
     */
    currentAngle = [0, 0];

    /**
     * 拖拽中
     */
    dragging = false;

    /**
     * 上一次交互的位置 x
     */
    lastX = -1;
    /**
     * 上一次交互的位置 y
     */
    lastY = -1;

    onTouchStart (): void {
        let rect = this.relWebgl.canvas.getBoundingClientRect ();
        let x = this.relWebgl.touchStart.posClient [0];
        let y = this.relWebgl.touchStart.posClient [1];
        if (
            rect.left <= x
            && x <= rect.right
            && rect.top <= y
            && y <= rect.bottom
        ) 
        {
            this.lastX = x;
            this.lastY = y;
            this.dragging = true;
        };
    }

    onTouchMove (): void {
        let x = this.relWebgl.touchMove.posClient [0];
        let y = this.relWebgl.touchMove.posClient [1];
        if (this.dragging) {
            let factor = 100 / this.relWebgl.canvas.height;
            let dx = factor * (x - this.lastX);
            let dy = factor * (y - this.lastY);
            this.currentAngle [0] = Math.max (Math.min (this.currentAngle [0] + dy, 90), -90);
            this.currentAngle [1] = this.currentAngle [1] + dx;
        };
        this.lastX = x;
        this.lastY = y;
        MgrData.inst.dataVersion++;
    }

    onTouchEnd (): void {
        this.dragging = false;
    }

    onDraw (): void {
        this.mvpMat4.set (this.vpMat4).rotate (this.currentAngle [0], 1, 0, 0).rotate (this.currentAngle [1], 0, 1, 0);
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.u_Sampler.fillByUrl (`./resources/sky.jpg`);
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_TexCoord.fillByBuffer (this.texCoords);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}