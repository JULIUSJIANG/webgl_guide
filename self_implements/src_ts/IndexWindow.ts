import MgrData from "./mgr_data/MgrData.js";
import DomRender from "./dom/DomRender.js";
import MgrSdk from "./mgr_sdk/MgrSdk.js";
import MgrDataItem from "./mgr_data/MgrDataItem.js";
import DemoGlobal from "./demo/DemoGlobal.js";

Promise.resolve ()
    // 初始化案例
    .then (() => {
        DemoGlobal.init ();
    })
    // 等待文档加载成功
    .then (() => {
        return new Promise ((resolve) => {
            window.addEventListener (`DOMContentLoaded`, resolve);
        });
    })
    // 初始化 sdk
    .then (() => {
        console.log (`c_sdk init...`);
        return MgrSdk.inst.init ();
    })
    // 初始化数据
    .then (() => {
        console.log (`c_data init...`);
        return MgrData.inst.init ();
    })
    // 初始化渲染器
    .then (() => {
        console.log (`c_render init...`);
        return DomRender.inst.init ();
    })
    // 告知服务端已就绪
    .then (() => {
        // 跟服务端说，我已经就绪了
        return MgrSdk.inst.core.logToMain (`客户端就绪...`);
    })
    // 自动 update
    .then (() => {
        // 新存档，默认案例为第一个
        if (MgrData.inst.get (MgrDataItem.CURRENT_DEMO) == null || DemoGlobal.mapNameToDemo.get (MgrData.inst.get (MgrDataItem.CURRENT_DEMO)) == null) {
            MgrData.inst.set (MgrDataItem.CURRENT_DEMO, DemoGlobal.listAllRecord [0].inst.getName ());
        };

        // 关闭窗口时候自动存档一次
        window.addEventListener (`beforeunload`, () => {
            MgrSdk.inst.core.logToMain (`客户端关闭...`);
            MgrData.inst.save ();
        });

        // 上一帧数据版本
        let lastDataVersion: number;
        // 更新
        let update = () => {
            if (lastDataVersion != MgrData.inst.dataVersion) {
                lastDataVersion = MgrData.inst.dataVersion;
                MgrData.inst.save ();
                DomRender.inst.refresh ();
            };
        };
        // 自循环装置
        let go = () => {
            update ();
            requestAnimationFrame (go);
        };
        requestAnimationFrame (go);
    });

class IndexWindow {

}

namespace IndexWindow {

};

export default IndexWindow;