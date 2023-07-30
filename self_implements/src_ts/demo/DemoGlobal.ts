import MgrData from "../mgr_data/MgrData.js";
import MgrDataItem from "../mgr_data/MgrDataItem.js";
import DemoInstance from "./DemoInstance.js";
import DemoInstanceRecord from "./DemoInstanceRecord.js";
import HelloTriangleA from "./HelloTriangleA.js";
import HelloTriangleB from "./HelloTriangleB.js";

/**
 * 案例的全局共享内容
 */
class DemoGlobal {

}

namespace DemoGlobal {
    /**
     * 所有类型的集合
     */
    export const listAllType: Array <typeof DemoInstance> = [];

    /**
     * 所有实例的集合
     */
    export const listAllRecord: Array <DemoInstanceRecord> = [];

    /**
     * 名称到实例的映射
     */
    export const mapNameToDemo: Map <string, DemoInstanceRecord> = new Map ();

    /**
     * 初始化
     */
    export function init () {
        listAllType.push (
            HelloTriangleA,
            HelloTriangleB
        );
        for (let i = 0; i < listAllType.length; i++) {
            let listAllTypeI = listAllType [i];
            let record = new DemoInstanceRecord ({
                type: listAllTypeI
            });
            listAllRecord.push (record);
            mapNameToDemo.set (record.inst.getName (), record);
        };
    }

    /**
     * 上下文 - webgl
     */
    export let ctxWebgl: WebGLRenderingContext;

    /**
     * 当前的案例
     */
    let current: DemoInstanceRecord;
    /**
     * 事件派发 - 应当重新绘制
     */
    export function onDraw () {
        let rec = current;
        current = mapNameToDemo.get (MgrData.inst.get (MgrDataItem.CURRENT_DEMO));
        // 如果发生切换
        if (current != rec) {
            if (rec) {
                rec.currStatus.onDisable ();
            };
            current.currStatus.onEnable ();
        };
        current.inst.onDraw ();
    }
}

export default DemoGlobal;