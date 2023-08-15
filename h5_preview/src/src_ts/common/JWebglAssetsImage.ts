import JWebgl from "./JWebgl";
import JWebglAssets from "./JWebglAssets";
import JWebglEnum from "./JWebglEnum";

/**
 * 资源数据 - 图片
 */
export default class JWebglAssetsImage extends JWebglAssets {
    /**
     * 资源路径
     */
    src: string;

    /**
     * 用于加载资源的图片标签
     */
    image: HTMLImageElement;

    /**
     * 贴图
     */
    texture: WebGLTexture;

    constructor (args: {
        webgl: JWebgl,
        src: string
    }) 
    {
        super (args.webgl);
        this.relWebgl = args.webgl;
        this.src = args.src;
        
        this.image = new Image ();
        if (!this.image) {
            this.relWebgl.error (`创建 Image 失败`);
            return;
        };

        this.texture = this.relWebgl.ctx.createTexture ();
        if (!this.texture) {
            this.relWebgl.error (`创建纹理失败`);
            return;
        };

        this.image.onload = () => {
            // y 轴反转
            this.relWebgl.ctx.pixelStorei (JWebglEnum.PixelStoreIPName.UNPACK_FLIP_Y_WEBGL, 1);
            this.relWebgl.ctx.activeTexture (JWebglEnum.ActiveTexture.TEXTURE0);
            this.relWebgl.ctx.bindTexture (JWebglEnum.BindTexture.TEXTURE_2D, this.texture);
            this.relWebgl.ctx.texParameteri (JWebglEnum.BindTexture.TEXTURE_2D, JWebglEnum.TexParameteriPName.TEXTURE_MIN_FILTER, JWebglEnum.TexParameteriParam.LINEAR);
            this.relWebgl.ctx.texImage2D (JWebglEnum.BindTexture.TEXTURE_2D, 0, JWebglEnum.TexImage2DFormat.RGBA, JWebglEnum.TexImage2DFormat.RGBA, JWebglEnum.VertexAttriPointerType.UNSIGNED_BYTE, this.image);
            this.currStatus.onLoadFinish ();
        };
        this.image.src = this.src;
    }
}