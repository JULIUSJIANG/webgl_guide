import MgrData from "./mgr_data/MgrData.js";
import DomRender from "./dom/DomRender.js";
import MgrSdk from "./mgr_sdk/MgrSdk.js";
import MgrDataItem from "./mgr_data/MgrDataItem.js";
import IndexGlobal from "./IndexGlobal.js";
import JWebgl from "./common/JWebgl.js";
import JWebglDemoInstance from "./common/JWebglDemoInstance.js";
import P16HelloCanvas from "./demo/P16HelloCanvas.js";
import P24HelloPoint1 from "./demo/P24HelloPoint1.js";
import P39HelloPoint2 from "./demo/P39HelloPoint2.js";
import P47ClickedPoints from "./demo/P47ClickedPoints.js";
import P56ColoredPoints from "./demo/P56ColoredPoints.js";
import P66MultiPoints from "./demo/P66MultiPoints.js";
import P80HelloTriangle from "./demo/P80HelloTriangle.js";
import P88TranslatedTriangle from "./demo/P88TranslatedTriangle.js";
import P94RotatedTriangle from "./demo/P94RotatedTriangle.js";
import P102RotatedTriangle_Matrix from "./demo/P102RotatedTriangle_Matrix.js";
import P115RotatedTranslatedTriangle from "./demo/P115RotatedTranslatedTriangle.js";
import P120RotatingTriangles from "./demo/P120RotatingTriangles.js";
import P133MultiAttributeSize from "./demo/P133MultiAttributeSize.js";
import P136MultiAttributeSize_Interleaved from "./demo/P136MultiAttributeSize_Interleaved.js";
import P141MultiAttributeColor from "./demo/P141MultiAttributeColor.js";

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