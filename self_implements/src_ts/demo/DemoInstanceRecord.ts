import DemoInstance from "./DemoInstance.js";
import DemoInstanceRecordStatus from "./DemoInstanceRecordStatus.js";
import DemoInstanceRecordStatusDisabled from "./DemoInstanceRecordStatusDisabled.js";
import DemoInstanceRecordStatusEnabled from "./DemoInstanceRecordStatusEnabled.js";

/**
 * 案例对象的实例
 */
class DemoInstanceRecord {

    /**
     * 类型
     */
    type: typeof DemoInstance;

    /**
     * 真正的实例
     */
    inst: DemoInstance;

    constructor (args: {
        type: typeof DemoInstance
    })
    {
        this.type = args.type
        this.inst = new (args.type as any);

        this.statusDisabled = new DemoInstanceRecordStatusDisabled (this);
        this.statusEnabled = new DemoInstanceRecordStatusEnabled (this);
        this.enter (this.statusDisabled)
    }

    /**
     * 状态 - 未启用
     */
    statusDisabled: DemoInstanceRecordStatusDisabled;
    /**
     * 状态 - 已启用
     */
    statusEnabled: DemoInstanceRecordStatusEnabled;

    /**
     * 当前状态
     */
    currStatus: DemoInstanceRecordStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: DemoInstanceRecordStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}

export default DemoInstanceRecord; 