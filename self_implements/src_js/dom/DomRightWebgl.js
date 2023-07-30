import NodeModules from "../NodeModules.js";
import DemoGlobal from "../demo/DemoGlobal.js";
import DomDefine from "./DomDefine.js";
/**
 * 右边栏 - 图片预览
 */
class DomRightPreview extends NodeModules.react.Component {
    constructor() {
        super(...arguments);
        /**
         * 实例引用
         */
        this.webglCanvasRef = NodeModules.react.createRef();
    }
    componentDidMount() {
        DemoGlobal.ctxWebgl = this.webglCanvasRef.current.getContext(`webgl`);
        this.componentDidUpdate();
    }
    componentDidUpdate() {
        DemoGlobal.onDraw();
    }
    render() {
        // 滚动视图的容器
        return NodeModules.react.createElement(DomDefine.TAG_DIV, {
            style: {
                [DomDefine.STYLE_HEIGHT]: DomDefine.STYLE_HEIGHT_PERCENTAGE_0,
                [DomDefine.STYLE_FLEX_GROW]: 1,
                [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                [DomDefine.STYLE_BACKGROUND_COLOR]: DomDefine.CONFIG_TXT_BG_COLOR,
                [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_FLEX,
                [DomDefine.STYLE_FLEX_DIRECTION]: DomDefine.STYLE_FLEX_DIRECTION_COLUMN
            }
        }, 
        // 滚动视图的遮罩
        NodeModules.react.createElement(DomDefine.TAG_DIV, {
            style: {
                [DomDefine.STYLE_HEIGHT]: DomDefine.STYLE_HEIGHT_PERCENTAGE_0,
                [DomDefine.STYLE_FLEX_GROW]: 1,
                [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_SPACING,
                [DomDefine.STYLE_OVERFLOW_X]: DomDefine.STYLE_OVERFLOW_X_SCROLL,
                [DomDefine.STYLE_OVERFLOW_Y]: DomDefine.STYLE_OVERFLOW_Y_SCROLL
            }
        }, 
        // 源 - 圆角矩形
        NodeModules.react.createElement(DomDefine.TAG_CANVAS, {
            ref: this.webglCanvasRef,
            style: {
                [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_BLOCK,
                border: "black 1px dashed"
            }
        })));
    }
}
export default DomRightPreview;
