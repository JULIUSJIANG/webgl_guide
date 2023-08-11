import JWebglAssetsStatusFinished from "./JWebglAssetsStatusFinished.js";
import JWebglAssetsStatusLoading from "./JWebglAssetsStatusLoading.js";
/**
 * 资源数据
 */
export default class JWebglAssets {
    constructor(webgl) {
        this.relWebgl = webgl;
        this.statusLoading = new JWebglAssetsStatusLoading(this);
        this.statusFinished = new JWebglAssetsStatusFinished(this);
        this.enter(this.statusLoading);
    }
    /**
     * 切换加载状态
     * @param status
     */
    enter(status) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec != null) {
            rec.onExit();
        }
        ;
        this.currStatus.onEnter();
    }
}
