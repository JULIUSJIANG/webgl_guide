/**
 * 案例对象的实例
 */
class DemoInstanceRecord {
    constructor(args) {
        this.type = args.type;
        this.inst = new args.type;
    }
}
export default DemoInstanceRecord;
