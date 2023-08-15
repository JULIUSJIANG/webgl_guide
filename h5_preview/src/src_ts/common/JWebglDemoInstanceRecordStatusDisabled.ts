import JWebglDemoInstanceRecordStatus from "./JWebglDemoInstanceRecordStatus.js";

/**
 * 案例对象的实例 - 状态 - 未启用
 */
class JWebglDemoInstanceRecordStatusDisabled extends JWebglDemoInstanceRecordStatus {

    onEnable(): void {
        this.relMachine.enter (this.relMachine.statusEnabled);
    }
}

export default JWebglDemoInstanceRecordStatusDisabled;