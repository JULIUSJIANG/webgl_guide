import JWebglAssets from "./JWebglAssets.js";
import JWebglEnum from "./JWebglEnum.js";
/**
 * 资源数据 - 图片
 */
export default class JWebglAssetsImage extends JWebglAssets {
    constructor(args) {
        super();
        this.relWebgl = args.webgl;
        this.src = args.src;
        this.image = new Image();
        if (!this.image) {
            this.relWebgl.error(`创建 Image 失败`);
            return;
        }
        ;
        this.image.onload = () => {
            this.texture = this.relWebgl.ctx.createTexture();
            if (!this.texture) {
                this.relWebgl.error(`创建纹理失败`);
                return;
            }
            ;
            this.relWebgl.ctx.pixelStorei(JWebglEnum.PixelStoreIPName.UNPACK_FLIP_Y_WEBGL, 1);
            this.relWebgl.ctx.activeTexture(JWebglEnum.ActiveTexture.TEXTURE0);
            this.relWebgl.ctx.bindTexture(JWebglEnum.BindTexture.TEXTURE_2D, this.texture);
            this.relWebgl.ctx.texParameteri(JWebglEnum.BindTexture.TEXTURE_2D, JWebglEnum.TexParameteriPName.TEXTURE_MIN_FILTER, JWebglEnum.TexParameteriParam.LINEAR);
            this.relWebgl.ctx.texImage2D(JWebglEnum.BindTexture.TEXTURE_2D, 0, JWebglEnum.TexImage2DFormat.RGB, JWebglEnum.TexImage2DFormat.RGB, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, this.image);
            this.currStatus.onLoadFinish();
        };
    }
}
