import JWebglEnum from "./JWebglEnum";
import JWebglProgramUniform from "./JWebglProgramUniform";

/**
 * 顶点数据 - 纹理
 */
export default class JWebglProgramUniformSampler2D extends JWebglProgramUniform {

    onGetDefine (): string {
        return `sampler2D`;
    }

    texture: WebGLTexture;

    onProgramReady (): void {
        this.texture = this.relProgram.relWebgl.ctx.createTexture ();
        if (!this.texture) {
            this.relProgram.relWebgl.error (`创建纹理失败`);
            return;
        };

        let image = new Image ();
        if (!image) {
            this.relProgram.relWebgl.error (`创建 Image 失败`);
            return;
        };

        image.onload = () => {
            this.relProgram.relWebgl.ctx.pixelStorei (JWebglEnum.PixelStoreIPName.UNPACK_FLIP_Y_WEBGL, 1);
            this.relProgram.relWebgl.ctx.activeTexture (JWebglEnum.ActiveTexture.TEXTURE0);
            this.relProgram.relWebgl.ctx.bindTexture (JWebglEnum.BindTexture.TEXTURE_2D, this.texture);
            this.relProgram.relWebgl.ctx.texParameteri (JWebglEnum.BindTexture.TEXTURE_2D, JWebglEnum.TexParameteriPName.TEXTURE_MIN_FILTER, JWebglEnum.TexParameteriParam.LINEAR);
            this.relProgram.relWebgl.ctx.texImage2D (JWebglEnum.BindTexture.TEXTURE_2D, 0, JWebglEnum.TexImage2DFormat.RGB, JWebglEnum.TexImage2DFormat.RGB, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, image);
            this.relProgram.relWebgl.ctx.uniform1i (this.location, 0);
        };
    }
}