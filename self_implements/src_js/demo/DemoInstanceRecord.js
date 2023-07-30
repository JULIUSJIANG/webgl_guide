import DemoInstanceRecordStatusDisabled from "./DemoInstanceRecordStatusDisabled.js";
import DemoInstanceRecordStatusEnabled from "./DemoInstanceRecordStatusEnabled.js";
/**
 * 案例对象的实例
 */
class DemoInstanceRecord {
    constructor(args) {
        this.type = args.type;
        this.inst = new args.type;
        this.statusDisabled = new DemoInstanceRecordStatusDisabled(this);
        this.statusEnabled = new DemoInstanceRecordStatusEnabled(this);
        this.enter(this.statusDisabled);
    }
    /**
     * 切换状态
     * @param status
     */
    enter(status) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit();
        }
        ;
        this.currStatus.onEnter();
    }
}
export default DemoInstanceRecord;
