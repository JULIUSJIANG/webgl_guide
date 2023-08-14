import JWebglDemoInstance from "../common/JWebglDemoInstance.js";
import JWebglEnum from "../common/JWebglEnum.js";
import JWebglMatrix4 from "../common/JWebglMatrix4.js";
import JWebglProgram from "../common/JWebglProgram.js";
import JWebglProgramAttributeVec2 from "../common/JWebglProgramAttributeVec2.js";
import JWebglProgramAttributeVec4 from "../common/JWebglProgramAttributeVec4.js";
import JWebglProgramUniformMat4 from "../common/JWebglProgramUniformMat4.js";
import JWebglProgramUniformSampler2D from "../common/JWebglProgramUniformSampler2D.js";
import JWebglProgramUniformVec4 from "../common/JWebglProgramUniformVec4.js";
import JWebglProgramVaryingVec2 from "../common/JWebglProgramVaryingVec2.js";
import JWebglProgramVaryingVec4 from "../common/JWebglProgramVaryingVec4.js";
import MgrData from "../mgr_data/MgrData.js";

class ProgramShadow extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    onGetShaderVTxt (): string {
        return `
void main () {
    gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main () {
    gl_FragColor = vec4 (gl_FragCoord.z, 0.0, 0.0, 1.0);
}
        `;
    }
}

class ProgramMain extends JWebglProgram {

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrixFromLight: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_ShadowMap: JWebglProgramUniformSampler2D;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Color: JWebglProgramAttributeVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_PositionFromLight: JWebglProgramVaryingVec4;

    @JWebglProgram.varying (JWebglProgramVaryingVec4)
    v_Color: JWebglProgramVaryingVec4;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_PositionFromLight} = ${this.u_MvpMatrixFromLight} * ${this.a_Position};
  ${this.v_Color} = ${this.a_Color};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  vec3 shadowCoord = (${this.v_PositionFromLight}.xyz/${this.v_PositionFromLight}.w)/2.0 + 0.5;
  vec4 rgbaDepth = texture2D(${this.u_ShadowMap}, shadowCoord.xy);
  float depth = rgbaDepth.r;
  float visibility = (shadowCoord.z > depth + 0.005) ? 0.7 : 1.0;
  gl_FragColor = vec4(${this.v_Color}.rgb * visibility, v_Color.a);
}
        `;
    }
}

/**
 * 帧缓冲区宽
 */
const OFFSETSCREEN_WIDTH = 2048;
/**
 * 帧缓冲区高
 */
const OFFSETSCREEN_HEIGHT = 2048;

/**
 * 光源位置 x
 */
const LIGHT_X = 0;
/**
 * 光源位置 y
 */
const LIGHT_Y = 7;
/**
 * 光源位置 z
 */
const LIGHT_Z = 2;

export default class P393Shadow extends JWebglDemoInstance {

    getName () {
        return `P393Shadow`;
    }

    /**
     * 着色程序 - 阴影
     */
    @JWebglDemoInstance.program (ProgramShadow)
    programShadow: ProgramShadow;

    /**
     * 光源的视图投影矩阵
     */
    lightVPMat4 = (new JWebglMatrix4)
        .setPerspective (70, 1, 1, 100)
        .lookAt (
            LIGHT_X, LIGHT_Y, LIGHT_Z,
            0, 0, 0,
            0, 1, 0
        );

    /**
     * 着色程序 - 主要
     */
    @JWebglDemoInstance.program (ProgramMain)
    programMain: ProgramMain;

    /**
     * 主内容的视图投影矩阵
     */
    mainVPMat4 = (new JWebglMatrix4)
        .setPerspective (45, 1, 1, 100)
        .lookAt (
            0, 7, 9,
            0, 0, 0,
            0, 1, 0
        );

    /**
     * 帧缓冲区
     */
    frameBuffer: WebGLFramebuffer;
    /**
     * 帧缓冲区的纹理
     */
    frameBufferTexture: WebGLTexture;

    /**
     * 位置
     */
    planeVertices = new Float32Array ([
         3.0,-1.7, 2.5, 1.0,  
        -3.0,-1.7, 2.5, 1.0,  
        -3.0,-1.7,-2.5, 1.0,   
         3.0,-1.7,-2.5, 1.0,
    ]);
    /**
     * 颜色
     */
    planeColors = new Float32Array ([
        1.0, 1.0, 1.0, 1.0,   
        1.0, 1.0, 1.0, 1.0, 
        1.0, 1.0, 1.0, 1.0,  
        1.0, 1.0, 1.0, 1.0,
    ]);
    /**
     * 顺序
     */
    planeIndices = new Uint8Array ([
        0, 1, 2,   
        0, 2, 3
    ]);

    /**
     * 位置
     */
    triangleVertices = new Float32Array ([
        -0.8, 3.5, 0.0, 1.0,  
         0.8, 3.5, 0.0, 1.0,  
         0.0, 3.5, 1.8, 1.0,
    ]);
    /**
     * 颜色
     */
    triangleColors = new Float32Array ([
        1.0, 0.5, 0.0, 1.0,  
        1.0, 0.5, 0.0, 1.0,  
        1.0, 0.0, 0.0, 1.0,
    ]);
    /**
     * 顺序
     */
    triangleIndices = new Uint8Array ([
        0, 1, 2
    ]);

    /**
     * 主内容的模型矩阵
     */
    mMat4 = new JWebglMatrix4;
    /**
     * 主内容的模型视图投影矩阵
     */
    mvpMat4 = new JWebglMatrix4;

    /**
     * 备份 1
     */
    mvpMat4_t = new JWebglMatrix4;
    /**
     * 备份 2
     */
    mvpMat4_p = new JWebglMatrix4;

    onInit (): void {
        let frameBuffer = this.relWebgl.ctx.createFramebuffer ();
        this.frameBuffer = frameBuffer;
        if (!frameBuffer) {
            this.relWebgl.error (`创建帧缓冲区失败`);
            return;
        };

        let texture = this.relWebgl.ctx.createTexture ();
        this.frameBufferTexture = texture;
        if (!texture) {
            this.relWebgl.error (`创建纹理失败`);
            return;
        };

        this.relWebgl.ctx.bindTexture (JWebglEnum.BindTexture.TEXTURE_2D, texture);
        this.relWebgl.ctx.texImage2D (
            JWebglEnum.BindTexture.TEXTURE_2D, 
            0, 
            JWebglEnum.TexImage2DFormat.RGBA, 
            OFFSETSCREEN_WIDTH, 
            OFFSETSCREEN_HEIGHT, 
            0,
            JWebglEnum.TexImage2DFormat.RGBA,
            JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE,
            null
        );
        this.relWebgl.ctx.texParameteri (JWebglEnum.BindTexture.TEXTURE_2D, JWebglEnum.TexParameteriPName.TEXTURE_MIN_FILTER, JWebglEnum.TexParameteriParam.LINEAR);
        
        let depthBuffer = this.relWebgl.ctx.createRenderbuffer ();
        if (!depthBuffer) {
            this.relWebgl.error (`创建深度缓冲区失败`);
            return;
        };

        this.relWebgl.ctx.bindRenderbuffer (JWebglEnum.BindRenderbuffer.RENDERBUFFER, depthBuffer);
        this.relWebgl.ctx.renderbufferStorage (JWebglEnum.BindRenderbuffer.RENDERBUFFER, JWebglEnum.RenderbufferStorageInternalFormat.DEPTH_COMPONENT16, OFFSETSCREEN_WIDTH, OFFSETSCREEN_HEIGHT);
    
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, frameBuffer);
        this.relWebgl.ctx.framebufferTexture2D (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, JWebglEnum.FramebufferTexture2DAttachment.COLOR_ATTACHMENT0, JWebglEnum.BindTexture.TEXTURE_2D, texture, 0);
        this.relWebgl.ctx.framebufferRenderbuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, JWebglEnum.FramebufferRenderbufferAttachment.DEPTH_ATTACHMENT, JWebglEnum.BindRenderbuffer.RENDERBUFFER, depthBuffer);
    
        var e = this.relWebgl.ctx.checkFramebufferStatus (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER);
        if (this.relWebgl.ctx.FRAMEBUFFER_COMPLETE !== e) {
            this.relWebgl.error (`帧缓冲区初始化失败`);
          return;
        }
      
        // Unbind the buffer object
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, null);
        this.relWebgl.ctx.bindTexture (JWebglEnum.BindTexture.TEXTURE_2D, null);
        this.relWebgl.ctx.bindRenderbuffer (JWebglEnum.BindRenderbuffer.RENDERBUFFER, null);
    }

    currentAngle = 0;

    onUpdate (dt: number): void {
        this.currentAngle += dt / 1000 * 40;
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        // 生成阴影贴图
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, this.frameBuffer);
        this.relWebgl.ctx.viewport (0, 0, OFFSETSCREEN_WIDTH, OFFSETSCREEN_HEIGHT);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT | JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);

        this.mMat4.setRotate (this.currentAngle, 0, 1, 0);
        this.mvpMat4.set (this.lightVPMat4).multiply (this.mMat4);
        this.mvpMat4_t.set (this.mvpMat4);

        this.programShadow.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programShadow.a_Position.fillByBuffer (this.triangleVertices);
        this.programShadow.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.triangleIndices);

        this.mMat4.setRotate (-45, 0, 1, 1);
        this.mvpMat4.set (this.lightVPMat4).multiply (this.mMat4);
        this.mvpMat4_p.set (this.mvpMat4);

        this.programShadow.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programShadow.a_Position.fillByBuffer (this.planeVertices);
        this.programShadow.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.planeIndices);

        // 绘制主场景
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, null);
        this.relWebgl.ctx.viewport (0, 0, this.relWebgl.canvas.width, this.relWebgl.canvas.height);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT | JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);

        this.mMat4.setRotate (this.currentAngle, 0, 1, 0);
        this.mvpMat4.set (this.mainVPMat4).multiply (this.mMat4);

        this.programMain.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programMain.u_MvpMatrixFromLight.fillByMat4 (this.mvpMat4_t);
        this.programMain.u_ShadowMap.fillByTexture (this.frameBufferTexture);
        this.programMain.a_Position.fillByBuffer (this.triangleVertices);
        this.programMain.a_Color.fillByBuffer (this.triangleColors);
        this.programMain.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.triangleIndices);

        this.mMat4.setRotate (-45, 0, 1, 1);
        this.mvpMat4.set (this.mainVPMat4).multiply (this.mMat4);

        this.programMain.u_MvpMatrix.fillByMat4 (this.mvpMat4);
        this.programMain.u_MvpMatrixFromLight.fillByMat4 (this.mvpMat4_p);
        this.programMain.u_ShadowMap.fillByTexture (this.frameBufferTexture);
        this.programMain.a_Position.fillByBuffer (this.planeVertices);
        this.programMain.a_Color.fillByBuffer (this.planeColors);
        this.programMain.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.planeIndices);
    }
}