import JWebglDemoInstanceRecordStatus from "./JWebglDemoInstanceRecordStatus.js";
/**
 * 案例对象的实例 - 状态 - 已启用
 */
class JWebglDemoInstanceRecordStatusEnabled extends JWebglDemoInstanceRecordStatus {
    constructor() {
        super(...arguments);
        /**
         * 已初始化完毕
         */
        this._isInited = false;
    }
    onEnter() {
        if (!this._isInited) {
            this._isInited = true;
            this.relMachine.inst.onInit();
        }
        ;
        this.relMachine.inst.onEnable();
    }
    onExit() {
        for (let i = 0; i < this.relMachine.inst._listProgram.length; i++) {
            let listProgramI = this.relMachine.inst._listProgram[i];
            listProgramI.disableVertexAttribArrayAll();
        }
        ;
        this.relMachine.inst.onDisable();
    }
    onDisable() {
        this.relMachine.enter(this.relMachine.statusDisabled);
    }
}
export default JWebglDemoInstanceRecordStatusEnabled;
