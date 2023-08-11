import JWebgl from "./JWebgl.js";
import JWebglDemoInstance from "./JWebglDemoInstance.js";
import JWebglDemoInstanceRecordStatus from "./JWebglDemoInstanceRecordStatus.js";
import JWebglDemoInstanceRecordStatusDisabled from "./JWebglDemoInstanceRecordStatusDisabled.js";
import JWebglDemoInstanceRecordStatusEnabled from "./JWebglDemoInstanceRecordStatusEnabled.js";

/**
 * 案例对象的实例
 */
class JWebglDemoInstanceRecord {
    /**
     * webgl 环境
     */
    webgl: JWebgl;

    /**
     * 类型
     */
    type: typeof JWebglDemoInstance;

    /**
     * 真正的实例
     */
    inst: JWebglDemoInstance;

    constructor (args: {
        webgl: JWebgl,
        type: typeof JWebglDemoInstance
    })
    {
        this.webgl = args.webgl;
        this.type = args.type
        this.inst = new (args.type as any) ({
            webgl: this.webgl
        });

        this.statusDisabled = new JWebglDemoInstanceRecordStatusDisabled (this);
        this.statusEnabled = new JWebglDemoInstanceRecordStatusEnabled (this);
        this.enter (this.statusDisabled)
    }

    /**
     * 状态 - 未启用
     */
    statusDisabled: JWebglDemoInstanceRecordStatusDisabled;
    /**
     * 状态 - 已启用
     */
    statusEnabled: JWebglDemoInstanceRecordStatusEnabled;

    /**
     * 当前状态
     */
    currStatus: JWebglDemoInstanceRecordStatus;

    /**
     * 切换状态
     * @param status 
     */
    enter (status: JWebglDemoInstanceRecordStatus) {
        let rec = this.currStatus;
        this.currStatus = status;
        if (rec) {
            rec.onExit ();
        };
        this.currStatus.onEnter ();
    }
}

export default JWebglDemoInstanceRecord; 