import DemoInstance from "./DemoInstance.js";
/**
 * 普通地展示一个三角形
 */
class HelloTriangleB extends DemoInstance {
    getName() {
        return `HelloTriangleB`;
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
export default HelloTriangleB;
