import JWebglDefine from "../common/JWebglDefine.js";
import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglKey from "../common/JWebglKey.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformVec2 from "../common/JWebglProgramUniformVec2.js";
import JWebglProgramUniformVec3 from "../common/JWebglProgramUniformVec3.js";
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4.js";
import JWebglProgramVarying from "../common/JWebglProgramVarying.js";
import JWebglProgramVaryingFloat from "../common/JWebglProgramVaryingFloat.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_ModelMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformVec4)
    u_Eye: JWebglProgramUniformVec4;

    @JWebglProgram.uniform (JWebglProgramUniformVec3)
    u_FogColor: JWebglProgramUniformVec3;

    @JWebglProgram.uniform (JWebglProgramUniformVec2)
    u_FogDist: JWebglProgramUniformVec2;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    @JWebglProgram.varying (JWebglProgramVaryingFloat)
    v_Dist: JWebglProgramVaryingFloat;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
  ${this.v_Dist} = gl_Position.w + distance (${this.u_ModelMatrix} * ${this.a_Position}, ${this.u_Eye}) * 0.0;
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  float fogFactor = clamp((${this.u_FogDist}.y - ${this.v_Dist}) / (${this.u_FogDist}.y - ${this.u_FogDist}.x), 0.0, 1.0);
  vec3 color = mix(${this.u_FogColor}, vec3(${this.v_Color}), fogFactor);
  gl_FragColor = vec4(color, ${this.v_Color}.a);
}
        `;
    }
}

export default class P364Fog_w extends JWebglDemoInstance {

    getName() {
        return `P364Fog_w`;
    }

    onGetInfo () {
        return `使用 w 分量替代视点到片元的距离以实现雾气效果`;
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
        1, 1, 1, 1,  -1, 1, 1, 1,  -1,-1, 1, 1,   1,-1, 1, 1, // v0-v1-v2-v3 front
        1, 1, 1, 1,   1,-1, 1, 1,   1,-1,-1, 1,   1, 1,-1, 1, // v0-v3-v4-v5 right
        1, 1, 1, 1,   1, 1,-1, 1,  -1, 1,-1, 1,  -1, 1, 1, 1, // v0-v5-v6-v1 up
       -1, 1, 1, 1,  -1, 1,-1, 1,  -1,-1,-1, 1,  -1,-1, 1, 1, // v1-v6-v7-v2 left
       -1,-1,-1, 1,   1,-1,-1, 1,   1,-1, 1, 1,  -1,-1, 1, 1, // v7-v4-v3-v2 down
        1,-1,-1, 1,  -1,-1,-1, 1,  -1, 1,-1, 1,   1, 1,-1, 1, // v4-v7-v6-v5 back
    ]);

    /**
     * 顶点数据 - 颜色
     */
    colors = new Float32Array ([
        0.4, 0.4, 1.0, 1.0,  0.4, 0.4, 1.0, 1.0,  0.4, 0.4, 1.0, 1.0,  0.4, 0.4, 1.0, 1.0,  // v0-v1-v2-v3 front
        0.4, 1.0, 0.4, 1.0,  0.4, 1.0, 0.4, 1.0,  0.4, 1.0, 0.4, 1.0,  0.4, 1.0, 0.4, 1.0,  // v0-v3-v4-v5 right
        1.0, 0.4, 0.4, 1.0,  1.0, 0.4, 0.4, 1.0,  1.0, 0.4, 0.4, 1.0,  1.0, 0.4, 0.4, 1.0,  // v0-v5-v6-v1 up
        1.0, 1.0, 0.4, 1.0,  1.0, 1.0, 0.4, 1.0,  1.0, 1.0, 0.4, 1.0,  1.0, 1.0, 0.4, 1.0,  // v1-v6-v7-v2 left
        1.0, 1.0, 1.0, 1.0,  1.0, 1.0, 1.0, 1.0,  1.0, 1.0, 1.0, 1.0,  1.0, 1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
        0.4, 1.0, 1.0, 1.0,  0.4, 1.0, 1.0, 1.0,  0.4, 1.0, 1.0, 1.0,  0.4, 1.0, 1.0, 1.0,  // v4-v7-v6-v5 back
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
       20,21,22,  20,22,23,    // back
    ]);

    /**
     * 眼睛的位置
     */
    eye = new Float32Array ([25, 65, 35, 1.0]);

    /**
     * 模型矩阵
     */
    mMat4 = (new JWebglMatrix4).setScale (10, 10, 10);

    /**
     * 模型 - 视图矩阵
     */
    mvpMat4 = (new JWebglMatrix4)

    /**
     * 雾的颜色
     */
    fogColor = new Float32Array ([0.137, 0.231, 0.423, 1.0]);

    /**
     * 雾气的起始距离以及终点距离
     */
    fogDistance = [55, 80];

    onInit (): void {
        this.mvpMat4
            .setPerspective (30, 1, 1, 100)
            .lookAt (
                this.eye [0], this.eye [1], this.eye [2], 
                0, 2, 0, 
                0, 1, 0
            )
            .multiply (this.mMat4)
    }

    onKeyDown (key: string): void {
        switch (key) {
            case JWebglKey ["ArrowUp"]: {
                this.fogDistance [1] += 1;
                break;
            };
            case JWebglKey ["ArrowDown"]: {
                this.fogDistance [1] -=  1;
                this.fogDistance [1] = Math.max (this.fogDistance [1], this.fogDistance [0]);
                break;
            };
        };
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.u_ModelMatrix.fillByMat4 (this.mMat4);
        this.program.u_Eye.fill (this.eye [0], this.eye [1], this.eye [2], this.eye [3]);
        this.program.u_FogColor.fillF (this.fogColor [0], this.fogColor [1], this.fogColor [2]);
        this.program.u_FogDist.fill (this.fogDistance [0], this.fogDistance [1]);
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_Color.fillByBuffer (this.colors);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }

    onGetBgColor (): number[] {
        return [this.fogColor [0], this.fogColor [1], this.fogColor [2], this.fogColor [3]];
    }
}