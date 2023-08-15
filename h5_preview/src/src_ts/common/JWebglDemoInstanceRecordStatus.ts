import JWebglDemoInstanceRecord from "./JWebglDemoInstanceRecord";

/**
 * 案例对象的实例 - 状态
 */
abstract class JWebglDemoInstanceRecordStatus {

    /**
     * 归属的状态机
     */
    relMachine: JWebglDemoInstanceRecord;

    constructor (relMachine: JWebglDemoInstanceRecord) {
        this.relMachine = relMachine;
    }

    /**
     * 事件派发 - 进入状态
     */
    onEnter () {

    }

    /**
     * 事件派发 - 离开状态
     */
    onExit () {

    }

    /**
     * 事件派发 - 启用
     */
    onEnable () {

    }

    /**
     * 事件派发 - 关闭
     */
    onDisable () {

    }
}

export default JWebglDemoInstanceRecordStatus;