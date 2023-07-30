import DemoInstanceRecordStatus from "./DemoInstanceRecordStatus.js";
/**
 * 案例对象的实例 - 状态 - 未启用
 */
class DemoInstanceRecordStatusDisabled extends DemoInstanceRecordStatus {
    onEnable() {
        this.relMachine.enter(this.relMachine.statusEnabled);
    }
}
export default DemoInstanceRecordStatusDisabled;
