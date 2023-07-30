import MgrData from "../mgr_data/MgrData.js";
import MgrDataItem from "../mgr_data/MgrDataItem.js";
import DemoInstanceRecord from "./DemoInstanceRecord.js";
import HelloTriangleA from "./HelloTriangleA.js";
import HelloTriangleB from "./HelloTriangleB.js";
/**
 * 案例的全局共享内容
 */
class DemoGlobal {
}
(function (DemoGlobal) {
    /**
     * 所有类型的集合
     */
    DemoGlobal.listAllType = [];
    /**
     * 所有实例的集合
     */
    DemoGlobal.listAllRecord = [];
    /**
     * 名称到实例的映射
     */
    DemoGlobal.mapNameToDemo = new Map();
    /**
     * 初始化
     */
    function init() {
        DemoGlobal.listAllType.push(HelloTriangleA, HelloTriangleB);
        for (let i = 0; i < DemoGlobal.listAllType.length; i++) {
            let listAllTypeI = DemoGlobal.listAllType[i];
            let record = new DemoInstanceRecord({
                type: listAllTypeI
            });
            DemoGlobal.listAllRecord.push(record);
            DemoGlobal.mapNameToDemo.set(record.inst.getName(), record);
        }
        ;
    }
    DemoGlobal.init = init;
    /**
     * 当前的案例
     */
    let current;
    /**
     * 事件派发 - 应当重新绘制
     */
    function onDraw() {
        let rec = current;
        current = DemoGlobal.mapNameToDemo.get(MgrData.inst.get(MgrDataItem.CURRENT_DEMO));
        // 如果发生切换
        if (current != rec) {
            if (rec) {
                rec.currStatus.onDisable();
            }
            ;
            current.currStatus.onEnable();
        }
        ;
        current.inst.onDraw();
    }
    DemoGlobal.onDraw = onDraw;
})(DemoGlobal || (DemoGlobal = {}));
export default DemoGlobal;
