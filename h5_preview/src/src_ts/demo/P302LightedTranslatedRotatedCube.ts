import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import JWebglProgramUniformVec3 from "../common/JWebglProgramUniformVec3";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";
import JWebglVector3 from "../common/JWebglVector3";

class Program extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_NormalMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformVec3)
    u_LightColor: JWebglProgramUniformVec3;

    @JWebglProgram.uniform (JWebglProgramUniformVec3)
    u_LightDirection: JWebglProgramUniformVec3;

    @JWebglProgram.uniform (JWebglProgramUniformVec3)
    u_AmbientLight: JWebglProgramUniformVec3;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Normal: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 normal = normalize ((${this.u_NormalMatrix} * ${this.a_Normal}).xyz);
  float nDotL = max (dot (${this.u_LightDirection}, normal), 0.0);
  vec3 diffuse = ${this.u_LightColor} * ${this.a_Color}.rgb * nDotL;
  vec3 ambient = ${this.u_AmbientLight} * ${this.a_Color}.rgb;
  ${this.v_Color} = vec4 (diffuse + ambient, ${this.a_Color}.a);
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

export default class P302LightedTranslatedRotatedCube extends JWebglDemoInstance {

    getName() {
        return `P302LightedTranslatedRotatedCube`;
    }

    onGetInfo () {
        return `让立方体经过变换以后的法向量保持正确，从而光照效果正确`;
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
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v0-v1-v2-v3 front
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v0-v3-v4-v5 right
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v0-v5-v6-v1 up
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v1-v6-v7-v2 left
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v7-v4-v3-v2 down
        1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,  1, 0, 0, 1,     // v4-v7-v6-v5 back
    ]);

    /**
     * 顶点数据 - 法向量
     */
    normals = new Float32Array ([
        0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0,   0.0, 0.0, 1.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0,   1.0, 0.0, 0.0, 1.0,  // v0-v3-v4-v5 right
        0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0,   0.0, 1.0, 0.0, 1.0,  // v0-v5-v6-v1 up
       -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0,  -1.0, 0.0, 0.0, 1.0,  // v1-v6-v7-v2 left
        0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0,   0.0,-1.0, 0.0, 1.0,  // v7-v4-v3-v2 down
        0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0,   0.0, 0.0,-1.0, 1.0,  // v4-v7-v6-v5 back
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
     * 模型矩阵
     */
    mMat4 = (new JWebglMatrix4).setTranslate (0, 0.9, 0).rotate (90, 0, 0, 1);

    /**
     * 模型矩阵 -逆转置矩阵
     */
    mMat4IT = new JWebglMatrix4;

    /**
     * 模型视图投影矩阵
     */
    mvpMat4 = (new JWebglMatrix4).setPerspective (30, 1, 1, 100).lookAt (3, 3, 7, 0, 0, 0, 0, 1, 0).multiply (this.mMat4);

    /**
     * 光线角度
     */
    lightDirection = new JWebglVector3;

    onInit (): void {
        this.lightDirection.elements [0] = 0.5;
        this.lightDirection.elements [1] = 3;
        this.lightDirection.elements [2] = 4;
        this.lightDirection.normalize ();

        this.mMat4IT.setInverseOf (this.mMat4);
        this.mMat4IT.transpose ();
    }

    onDraw (): void {
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.program.u_LightColor.fillF (1, 1, 1);
        this.program.u_LightDirection.fillV (this.lightDirection.elements);
        this.program.u_NormalMatrix.fillByMat4 (this.mMat4IT);
        this.program.u_AmbientLight.fillF (0.2, 0.2, 0.2);
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_Color.fillByBuffer (this.colors);
        this.program.a_Normal.fillByBuffer (this.normals);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}