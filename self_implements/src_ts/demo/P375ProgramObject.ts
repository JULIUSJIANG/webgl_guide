import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramVaryingFloat from "../common/JWebglProgramVaryingFloat.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";

class ProgramA extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_NormalMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Normal: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
    vec3 lightDirection = vec3(0.0, 0.0, 1.0);
    vec4 color = vec4(0.0, 1.0, 1.0, 1.0);
    gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
    vec3 normal = normalize(vec3(${this.u_NormalMatrix} * ${this.a_Normal}));
    float nDotL = max(dot(normal, lightDirection), 0.0);
    ${this.v_Color} = vec4(color.rgb * nDotL, color.a);
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

class ProgramB extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_NormalMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler: JWebglProgramUniformSampler2D;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Normal: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec2)
    a_TexCoord: JWebglProgramAttributeVec2;

    @JWebglProgram.varying (JWebglProgramVaryingFloat)
    v_NdotL: JWebglProgramVaryingFloat;

    @JWebglProgram.varying (JWebglProgramVaryingVec2)
    v_TexCoord: JWebglProgramVaryingVec2;

    onGetShaderVTxt (): string {
        return `
void main() {
  vec3 lightDirection = vec3(0.0, 0.0, 1.0);
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 normal = normalize(vec3(${this.u_NormalMatrix} * ${this.a_Normal}));
  ${this.v_NdotL} = max(dot(normal, lightDirection), 0.0);
  ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  vec4 color = texture2D(${this.u_Sampler}, ${this.v_TexCoord});
  gl_FragColor = vec4(color.rgb * ${this.v_NdotL}, color.a);
}
        `;
    }
}

export default class P375ProgramObject extends JWebglDemoInstance {

    getName () {
        return `P375ProgramObject`;
    }

    @JWebglDemoInstance.program (ProgramA)
    programA: ProgramA;

    @JWebglDemoInstance.program (ProgramB)
    programB: ProgramB;

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
     * 顶点数据 - 法向量
     */
    normals = new Float32Array ([
        0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0, // v0-v1-v2-v3 front
        1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0, // v0-v3-v4-v5 right
        0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0, // v0-v5-v6-v1 up
       -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0, // v1-v6-v7-v2 left
        0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0, // v7-v4-v3-v2 down
        0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0, // v4-v7-v6-v5 back
    ]);
    /**
     * 顶点数据 - 取样点
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
     * 顶点数据 - 顺序
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
     * 模型矩阵
     */
    mMat4 = new JWebglMatrix4;
    /**
     * 视图投影矩阵
     */
    vpMat4 = (new JWebglMatrix4)
        .setPerspective (30, 1, 1, 100)
        .lookAt (
            0, 0, 15,
            0, 0, 0,
            0, 1, 0
        );
    /**
     * 模型视图投影矩阵
     */
    mvpMat4 = new JWebglMatrix4;
    /**
     * 法向量矩阵
     */
    nMat4 = new JWebglMatrix4;

    /**
     * 当前旋转角
     */
    currentAngle = 0;

    onUpdate (dt: number): void {
        this.currentAngle += dt / 1000 * 30;
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        this.mMat4.setTranslate (-2, 0, 0).rotate (20, 1, 0, 0).rotate (this.currentAngle, 0, 1, 0);
        this.nMat4.setInverseOf (this.mMat4).transpose ();
        this.mvpMat4.set (this.vpMat4).multiply (this.mMat4);
        this.programA.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programA.u_NormalMatrix.fillByMat4 (this.nMat4);
        this.programA.a_Position.fillByBuffer (this.vertices);
        this.programA.a_Normal.fillByBuffer (this.normals);
        this.programA.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);

        this.mMat4.setTranslate (2, 0, 0).rotate (20, 1, 0, 0).rotate (this.currentAngle, 0, 1, 0);
        this.nMat4.setInverseOf (this.mMat4).transpose ();
        this.mvpMat4.set (this.vpMat4).multiply (this.mMat4);
        this.programB.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programB.u_NormalMatrix.fillByMat4 (this.nMat4);
        this.programB.u_Sampler.fillByUrl (`./resources/sky.jpg`);
        this.programB.a_Position.fillByBuffer (this.vertices);
        this.programB.a_Normal.fillByBuffer (this.normals);
        this.programB.a_TexCoord.fillByBuffer (this.texCoords);
        this.programB.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}