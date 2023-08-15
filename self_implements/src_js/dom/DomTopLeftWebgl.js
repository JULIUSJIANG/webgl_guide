import NodeModules from "../NodeModules.js";
import IndexGlobal from "../IndexGlobal.js";
import DomDefine from "./DomDefine.js";
/**
 * 右边栏 - 图片预览
 */
class DomTopLeftWebgl extends NodeModules.react.Component {
    constructor() {
        super(...arguments);
        /**
         * 实例引用
         */
        this.webglCanvasRef = NodeModules.react.createRef();
    }
    componentDidMount() {
        IndexGlobal.webgl.currStatus.onCanvas(this.webglCanvasRef.current);
    }
    componentDidUpdate() {
        IndexGlobal.webgl.currStatus.onRefresh();
    }
    render() {
        // 滚动视图的容器
        return NodeModules.react.createElement(DomDefine.TAG_CANVAS, {
            ref: this.webglCanvasRef,
            style: {
                [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_BLOCK,
            }
        });
    }
}
export default DomTopLeftWebgl;
