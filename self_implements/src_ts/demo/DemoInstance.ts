/**
 * 案例对象
 */
abstract class DemoInstance {

    /**
     * 获取名字
     */
    abstract getName ();

    /**
     * 事件派发 - 初始化
     */
    onInit () {

    }

    /**
     * 事件派发 - 释放
     */
    onRelease () {

    }

    /**
     * 事件派发 - 重新绘制
     */
    onDraw () {

    }
}

export default DemoInstance;