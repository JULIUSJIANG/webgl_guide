import MgrData from "./mgr_data/MgrData.js";
import DomRender from "./dom/DomRender.js";
import MgrSdk from "./mgr_sdk/MgrSdk.js";
import MgrDataItem from "./mgr_data/MgrDataItem.js";
import IndexGlobal from "./IndexGlobal.js";
import JWebgl from "./common/JWebgl.js";
import JWebglDemoInstance from "./common/JWebglDemoInstance.js";
import P16Clear from "./demo/P16Clear.js";
import P24Point from "./demo/P24Point.js";
import P39Point from "./demo/P39Point.js";
import P47ClickPoint from "./demo/P47ClickPoint.js";
import P56Colored from "./demo/P56Colored.js";
import P66MultiPoint from "./demo/P66MultiPoint.js";
import P80Triangle from "./demo/P80Triangle.js";
import P88Translate from "./demo/P88Translate.js";
import P94Rotate from "./demo/P94Rotate.js";
import P102Matrix from "./demo/P102Matrix.js";
import P115Matrix from "./demo/P115Matrix.js";
import P120Animate from "./demo/P120Animate.js";
import P133MultiPoint from "./demo/P133MultiPoint.js";
import P136MultiPoint from "./demo/P136MultiPoint.js";
import P141Varying from "./demo/P141Varying.js";

Promise.resolve ()
    // 初始化案例
    .then (() => {
        IndexGlobal.webgl = new JWebgl ();
    })
    // 等待文档加载成功
    .then (() => {
        return new Promise ((resolve) => {
            window.addEventListener (`DOMContentLoaded`, resolve);
        });
    })
    // 初始化 sdk
    .then (() => {
        return MgrSdk.inst.init ();
    })
    // 初始化数据
    .then (() => {
        return MgrData.inst.init ();
    })
    // 初始化渲染器
    .then (() => {
        return DomRender.inst.init ();
    })
    // 告知服务端已就绪
    .then (() => {
        // 跟服务端说，我已经就绪了
        return MgrSdk.inst.core.logToMain (`客户端就绪...`);
    })
    // 自动 update
    .then (() => {
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