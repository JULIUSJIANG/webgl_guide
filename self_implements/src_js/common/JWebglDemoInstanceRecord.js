import JWebglDemoInstanceRecordStatusDisabled from "./JWebglDemoInstanceRecordStatusDisabled.js";
import JWebglDemoInstanceRecordStatusEnabled from "./JWebglDemoInstanceRecordStatusEnabled.js";
/**
 * 案例对象的实例
 */
class JWebglDemoInstanceRecord {
    constructor(args) {
        this.webgl = args.webgl;
        this.type = args.type;
        this.inst = new args.type({
            webgl: this.webgl
        });
        this.statusDisabled = new JWebglDemoInstanceRecordStatusDisabled(this);
        this.statusEnabled = new JWebglDemoInstanceRecordStatusEnabled(this);
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
export default JWebglDemoInstanceRecord;
