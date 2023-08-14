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

    @JWebglProgram.attribute (JWebglProgramAttributeVec4)
    a_Position: JWebglProgramAttributeVec4;

    @JWebglProgram.attribute (JWebglProgramAttributeVec2)
    a_TexCoord: JWebglProgramAttributeVec2;

    @JWebglProgram.uniform (JWebglProgramUniformMat4)
    u_MvpMatrix: JWebglProgramUniformMat4;

    @JWebglProgram.uniform (JWebglProgramUniformSampler2D)
    u_Sampler: JWebglProgramUniformSampler2D;

    @JWebglProgram.varying (JWebglProgramVaryingVec2)
    v_TexCoord: JWebglProgramVaryingVec2;

    onGetShaderVTxt (): string {
        return `
void main() {
  gl_Position = ${this.u_MvpMatrix} * ${this.a_Position};
  ${this.v_TexCoord} = ${this.a_TexCoord};
}
        `;
    }

    onGetShaderFTxt (): string {
        return `
void main() {
  gl_FragColor = texture2D (${this.u_Sampler}, ${this.v_TexCoord});
}
        `;
    }
}

export default class P383FramebufferObject extends JWebglDemoInstance {

    getName () {
        return `P383FramebufferObject`;
    }

    /**
     * 着色程序
     */
    @JWebglDemoInstance.program (Program)
    program: Program;

    /**
     * 顶点数据 - 位置
     */
    cubeVertices = new Float32Array ([
        1.0, 1.0, 1.0, 1.0,  -1.0, 1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0,    // v0-v1-v2-v3 front
        1.0, 1.0, 1.0, 1.0,   1.0,-1.0, 1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0,    // v0-v3-v4-v5 right
        1.0, 1.0, 1.0, 1.0,   1.0, 1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0, 1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
       -1.0, 1.0, 1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, 1.0,    // v1-v6-v7-v2 left
       -1.0,-1.0,-1.0, 1.0,   1.0,-1.0,-1.0, 1.0,   1.0,-1.0, 1.0, 1.0,  -1.0,-1.0, 1.0, 1.0,    // v7-v4-v3-v2 down
        1.0,-1.0,-1.0, 1.0,  -1.0,-1.0,-1.0, 1.0,  -1.0, 1.0,-1.0, 1.0,   1.0, 1.0,-1.0, 1.0,    // v4-v7-v6-v5 back
    ]);
    /**
     * 顶点数据 - 取样位置
     */
    cubeTexCoords = new Float32Array ([
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
        0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
        1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
    ]);
    /**
     * 绘制顺序
     */
    cubeIndices = new Uint8Array ([
        0, 1, 2,   0, 2, 3,    // front
        4, 5, 6,   4, 6, 7,    // right
        8, 9,10,   8,10,11,    // up
       12,13,14,  12,14,15,    // left
       16,17,18,  16,18,19,    // down
       20,21,22,  20,22,23     // back
    ]);
    /**
     * 方块的模型矩阵
     */
    cubeMMat4 = new JWebglMatrix4;
    /**
     * 方块的视图投影矩阵
     */
    cubeVPMat4 = (new JWebglMatrix4)
        .setPerspective (30, 1, 1, 100)
        .lookAt (
            0, 2, 7,
            0, 0, 0,
            0, 1, 0
        );
    /**
     * 方块的模型视图投影矩阵
     */
    cubeMVPMat4 = new JWebglMatrix4;

    /**
     * 顶点数据 - 位置
     */
    planeVertices = new Float32Array ([
         1.0, 1.0, 0.0, 1.0,
        -1.0, 1.0, 0.0, 1.0,
        -1.0,-1.0, 0.0, 1.0,
         1.0,-1.0, 0.0, 1.0,
    ]);
    /**
     * 顶点数据 - 取样位置
     */
    planeTexCoords = new Float32Array ([
        1.0, 1.0,   
        0.0, 1.0,   
        0.0, 0.0,   
        1.0, 0.0
    ]);
    /**
     * 绘制顺序
     */
    planeIndices = new Uint8Array ([
        0, 1, 2,   
        0, 2, 3
    ]);
    /**
     * 片的模型矩阵
     */
    planeMMat4 = new JWebglMatrix4;
    /**
     * 片的视图投影矩阵
     */
    planeVPMat4 = (new JWebglMatrix4)
        .setPerspective (30, 1, 1,  100)
        .lookAt (
            0, 0, 7,
            0, 0, 0,
            0, 1, 0
        );
    /**
     * 片的模型视图投影矩阵
     */
    planeMVPMat4 = new JWebglMatrix4;
    
    /**
     * 帧缓冲区宽
     */
    offsetWidth = 256;
    /**
     * 帧缓冲区高
     */
    offsetHeight = 256;

    /**
     * 帧缓冲区
     */
    frameBuffer: WebGLFramebuffer;
    /**
     * 帧缓冲区的纹理
     */
    frameBufferTexture: WebGLTexture;

    /**
     * 当前旋转角
     */
    currentAngle = 0;

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
            this.offsetWidth, 
            this.offsetHeight, 
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
        this.relWebgl.ctx.renderbufferStorage (JWebglEnum.BindRenderbuffer.RENDERBUFFER, JWebglEnum.RenderbufferStorageInternalFormat.DEPTH_COMPONENT16, this.offsetWidth, this.offsetHeight);
    
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

    onUpdate (dt: number): void {
        this.currentAngle += dt / 1000 * 30;
        MgrData.inst.dataVersion++;
    }

    onDraw (): void {
        // 绘制方块
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, this.frameBuffer);
        this.relWebgl.ctx.viewport (0, 0, this.offsetWidth, this.offsetHeight);

        this.relWebgl.ctx.clearColor (0.2, 0.2, 0.4, 1.0);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT | JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);
       
        this.cubeMMat4.setRotate (20, 1, 0, 0).rotate (this.currentAngle, 0, 1, 0);
        this.cubeMVPMat4.set (this.cubeVPMat4).multiply (this.cubeMMat4);
        this.program.u_MvpMatrix.fillByMat4 (this.cubeMVPMat4);
        this.program.u_Sampler.fillByUrl (`./resources/sky_cloud.jpg`);
        this.program.a_Position.fillByBuffer (this.cubeVertices);
        this.program.a_TexCoord.fillByBuffer (this.cubeTexCoords);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.cubeIndices);

        // 绘制片
        this.relWebgl.ctx.bindFramebuffer (JWebglEnum.BindFramebufferTarget.FRAMEBUFFER, null);
        this.relWebgl.ctx.viewport (0, 0, this.relWebgl.canvas.width, this.relWebgl.canvas.height);

        this.relWebgl.ctx.clearColor (0, 0, 0, 1.0);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT | JWebglEnum.ClearMask.DEPTH_BUFFER_BIT);

        this.planeMMat4.setTranslate (0, 0, 1).rotate (20, 1, 0, 0).rotate (this.currentAngle, 0, 1, 0);
        this.planeMVPMat4.set (this.planeVPMat4).multiply (this.planeMMat4);
        this.program.u_MvpMatrix.fillByMat4 (this.planeMVPMat4);
        this.program.u_Sampler.fillByTexture (this.frameBufferTexture);
        this.program.a_Position.fillByBuffer (this.planeVertices);
        this.program.a_TexCoord.fillByBuffer (this.planeTexCoords);
        this.program.drawElements (JWebglEnum.DrawArraysMode.TRIANGLES, this.planeIndices);
    }
}