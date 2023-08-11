import MgrData from "./mgr_data/MgrData.js";
import DomRender from "./dom/DomRender.js";
import MgrSdk from "./mgr_sdk/MgrSdk.js";
import IndexGlobal from "./IndexGlobal.js";
import JWebgl from "./common/JWebgl.js";
Promise.resolve()
    // 初始化案例
    .then(() => {
    IndexGlobal.webgl = new JWebgl();
})
    // 等待文档加载成功
    .then(() => {
    return new Promise((resolve) => {
        window.addEventListener(`DOMContentLoaded`, resolve);
    });
})
    // 初始化 sdk
    .then(() => {
    return MgrSdk.inst.init();
})
    // 初始化数据
    .then(() => {
    return MgrData.inst.init();
})
    // 初始化渲染器
    .then(() => {
    return DomRender.inst.init();
})
    // 告知服务端已就绪
    .then(() => {
    // 跟服务端说，我已经就绪了
    return MgrSdk.inst.core.logToMain(`客户端就绪...`);
})
    // 自动 update
    .then(() => {
    // 关闭窗口时候自动存档一次
    window.addEventListener(`beforeunload`, () => {
        MgrSdk.inst.core.logToMain(`客户端关闭...`);
        MgrData.inst.save();
    });
    // 上一帧数据版本
    let lastDataVersion;
    // 更新
    let update = () => {
        if (lastDataVersion != MgrData.inst.dataVersion) {
            lastDataVersion = MgrData.inst.dataVersion;
            MgrData.inst.save();
            DomRender.inst.refresh();
        }
        ;
    };
    // 自循环装置
    let go = () => {
        update();
        requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
});
class IndexWindow {
}
;
export default IndexWindow;
