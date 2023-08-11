import JWebglEnum from "./JWebglEnum.js";
import JWebglProgramUniform from "./JWebglProgramUniform.js";
/**
 * 顶点数据 - 纹理
 */
export default class JWebglProgramUniformSampler2D extends JWebglProgramUniform {
    onGetDefine() {
        return `sampler2D`;
    }
    fill(src, idx) {
        this.relProgram.relWebgl.ctx.useProgram(this.relProgram.program);
        let img = this.relProgram.relWebgl.getImage(src);
        this.relProgram.relWebgl.ctx.activeTexture(JWebglEnum.ActiveTexture.TEXTURE0 + idx);
        this.relProgram.relWebgl.ctx.bindTexture(JWebglEnum.BindTexture.TEXTURE_2D, img.texture);
        this.relProgram.relWebgl.ctx.uniform1i(this.location, idx);
    }
}
