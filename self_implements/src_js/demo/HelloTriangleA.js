import DemoInstance from "./DemoInstance.js";
/**
 * 普通地展示一个三角形
 */
class HelloTriangleA extends DemoInstance {
    getName() {
        return `HelloTriangleA`;
    }
    onInit() {
        console.log(`[${this.getName()}] onInit`);
    }
    onDraw() {
        console.log(`[${this.getName()}] onDraw`);
    }
    onRelease() {
        console.log(`[${this.getName()}] onRelease`);
    }
}
export default HelloTriangleA;
