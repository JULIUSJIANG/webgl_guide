import IndexGlobal from "../IndexGlobal.js";
import JWebglDemoInstanceRecordStatus from "./JWebglDemoInstanceRecordStatus.js";

/**
 * 案例对象的实例 - 状态 - 已启用
 */
class JWebglDemoInstanceRecordStatusEnabled extends JWebglDemoInstanceRecordStatus {

    /**
     * 已初始化完毕
     */
    private _isInited = false;

    onEnter (): void {
        if (!this._isInited) {
            this._isInited = true;
            this.relMachine.inst._onInit ();
        };
        this.relMachine.inst.onEnable ();
    }

    onExit (): void {
        for (let i = 0; i < this.relMachine.inst._listProgram.length; i++) {
            let listProgramI = this.relMachine.inst._listProgram [i];
            listProgramI.disableVertexAttribArrayAll ();
        };
        this.relMachine.inst.onDisable ();
    }

    onDisable (): void {
        this.relMachine.enter (this.relMachine.statusDisabled);
    }
}

export default JWebglDemoInstanceRecordStatusEnabled;