import MgrData from "../mgr_data/MgrData.js";
import JWebglAssetsStatus from "./JWebglAssetsStatus.js";

/**
 * 资源数据 - 状态 - 加载完成
 */
export default class JWebglAssetsStatusFinished extends JWebglAssetsStatus {

    onEnter (): void {
        MgrData.inst.dataVersion++;
    }
}