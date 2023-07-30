import DemoInstanceRecordStatus from "./DemoInstanceRecordStatus.js";
/**
 * 案例对象的实例 - 状态 - 已启用
 */
class DemoInstanceRecordStatusEnabled extends DemoInstanceRecordStatus {
    onEnter() {
        this.relMachine.inst.onInit();
    }
    onExit() {
        this.relMachine.inst.onRelease();
    }
    onDisable() {
        this.relMachine.enter(this.relMachine.statusDisabled);
    }
}
export default DemoInstanceRecordStatusEnabled;
