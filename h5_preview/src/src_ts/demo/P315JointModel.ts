import JWebglDemoInstance from "../common/JWebglDemoInstance";
import JWebglEnum from "../common/JWebglEnum";
import JWebglKey from "../common/JWebglKey";
import JWebglMatrix4 from "../common/JWebglMatrix4";
import JWebglProgram from "../common/JWebglProgram";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4";
import JWebglProgramUniformVec3 from "../common/JWebglProgramUniformVec3";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4";
import JWebglVector3 from "../common/JWebglVector3";
import MgrData from "../mgr_data/MgrData";

class Program extends JWebglProgram {

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
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  vec3 lightDirection = normalize (vec3 (0.0, 0.5, 0.7));
  vec4 color = vec4 (1.0, 0.4, 0.0, 1.0);
  vec3 normal = normalize ((${this.u_NormalMatrix} * ${this.a_Normal}).xyz);
  float nDotL = max (dot (normal, lightDirection), 0.0);
  ${this.v_Color} = vec4 (color.rgb * nDotL + vec3 (0.1), color.a);
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

export default class P315JointModel extends JWebglDemoInstance {

    getName() {
        return `P315JointModel`;
    }

    onGetInfo () {
        return `通过键盘上、右、下、左箭头控制模型`;
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
        1.5, 10.0, 1.5, 1.0,  -1.5, 10.0, 1.5, 1.0,  -1.5,  0.0, 1.5, 1.0,   1.5,  0.0, 1.5, 1.0, // v0-v1-v2-v3 front
        1.5, 10.0, 1.5, 1.0,   1.5,  0.0, 1.5, 1.0,   1.5,  0.0,-1.5, 1.0,   1.5, 10.0,-1.5, 1.0, // v0-v3-v4-v5 right
        1.5, 10.0, 1.5, 1.0,   1.5, 10.0,-1.5, 1.0,  -1.5, 10.0,-1.5, 1.0,  -1.5, 10.0, 1.5, 1.0, // v0-v5-v6-v1 up
       -1.5, 10.0, 1.5, 1.0,  -1.5, 10.0,-1.5, 1.0,  -1.5,  0.0,-1.5, 1.0,  -1.5,  0.0, 1.5, 1.0, // v1-v6-v7-v2 left
       -1.5,  0.0,-1.5, 1.0,   1.5,  0.0,-1.5, 1.0,   1.5,  0.0, 1.5, 1.0,  -1.5,  0.0, 1.5, 1.0, // v7-v4-v3-v2 down
        1.5,  0.0,-1.5, 1.0,  -1.5,  0.0,-1.5, 1.0,  -1.5, 10.0,-1.5, 1.0,   1.5, 10.0,-1.5, 1.0, // v4-v7-v6-v5 back
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
     * 法线矩阵
     */
    nMat4 = new JWebglMatrix4;

    /**
     * 模型矩阵
     */
    mMat4 = new JWebglMatrix4;

    /**
     * 视图投影矩阵
     */
    vpMat4 = (new JWebglMatrix4)
        .setPerspective (50, 1, 1, 100)
        .lookAt (
            20, 10, 30, 
             0,  0,  0, 
             0,  1,  0
        );

    /**
     * 模型视图投影矩阵
     */
    mvpMat4 = new JWebglMatrix4;

    /**
     * 角度的变化间隔
     */
    angleStep = 3;
    /**
     * 手臂 1 的角度
     */
    g_arm1Angle = -90;
    /**
     * 关节 1 的角度
     */
    g_joint1Angle = 0;

    onKeyDown (key: string): void {
        switch (key) {
            case JWebglKey ["ArrowUp"]: {
                this.g_joint1Angle += this.angleStep;
                this.g_joint1Angle = Math.min (this.g_joint1Angle, 135);
                break;
            };
            case JWebglKey ["ArrowDown"]: {
                this.g_joint1Angle -= this.angleStep;
                this.g_joint1Angle = Math.max (this.g_joint1Angle, -135);
                break;
            };
            case JWebglKey ["ArrowRight"]: {
                this.g_arm1Angle += this.angleStep;
                break;
            };
            case JWebglKey ["ArrowLeft"]: {
                this.g_arm1Angle -= this.angleStep;
                break;
            };
        };
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        this.program.a_Position.fillByBuffer (this.vertices);
        this.program.a_Normal.fillByBuffer (this.normals);

        this.mMat4.setTranslate (0, -12, 0).rotate (this.g_arm1Angle, 0, 1, 0);
        this.draw ();

        this.mMat4.translate (0, 10, 0).rotate (this.g_joint1Angle, 0, 0, 1).scale (1.3, 1, 1.3);
        this.draw ();
    }

    draw () {
        this.mvpMat4.set (this.vpMat4).multiply (this.mMat4);
        this.program.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.nMat4.setInverseOf (this.mMat4);
        this.nMat4.transpose ();
        this.program.u_NormalMatrix.fillByMat4 (this.nMat4);

        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.indices);
    }
}