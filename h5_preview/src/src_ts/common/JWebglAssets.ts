import JWebgl from "./JWebgl";
import JWebglAssetsStatus from "./JWebglAssetsStatus";
import JWebglAssetsStatusFinished from "./JWebglAssetsStatusFinished";
import JWebglAssetsStatusLoading from "./JWebglAssetsStatusLoading";

/**
 * 资源数据
 */
export default class JWebglAssets {

    /**
     * 归属的环境
     */
    relWebgl: JWebgl;

    constructor (webgl: JWebgl) {
        this.relWebgl = webgl;

        this.statusLoading = new JWebglAssetsStatusLoading (this);
        this.statusFinished = new JWebglAssetsStatusFinished (this);
        this.enter (this.statusLoading);
    }

    /**
     * 状态 - 加载中
     */
    statusLoading: JWebglAssetsStatusLoading;
    /**
     * 状态 - 完成
     */
    statusFinished: JWebglAssetsStatusFinished;

    /**
     * 当前状态
     */
    currStatus: JWebglAssetsStatus;

    /**
     * 切换加载状态
     * @param status 
     */
    enter (status: JWebglAssetsStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec != null) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}