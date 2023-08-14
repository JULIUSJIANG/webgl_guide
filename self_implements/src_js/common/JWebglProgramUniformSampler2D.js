import JWebglEnum from "./JWebglEnum.js";
import JWebglProgramUniform from "./JWebglProgramUniform.js";
/**
 * 顶点数据 - 纹理
 */
export default class JWebglProgramUniformSampler2D extends JWebglProgramUniform {
    onGetDefine() {
        return `sampler2D`;
    }
    onProgramReady() {
        this.idx = this.relProgram.textureIdx++;
    }
    /**
     * 使用路径填充
     * @param src
     */
    fillByUrl(src) {
        this.relProgram.relWebgl.ctx.useProgram(this.relProgram.program);
        let img = this.relProgram.relWebgl.getImage(src);
        this.fillByTexture(img.texture);
    }
    /**
     * 使用 texture 填充
     * @param texture
     */
    fillByTexture(texture) {
        this.relProgram.relWebgl.ctx.activeTexture(JWebglEnum.ActiveTexture.TEXTURE0 + this.idx);
        this.relProgram.relWebgl.ctx.bindTexture(JWebglEnum.BindTexture.TEXTURE_2D, texture);
        this.relProgram.relWebgl.ctx.uniform1i(this.location, this.idx);
    }
}
