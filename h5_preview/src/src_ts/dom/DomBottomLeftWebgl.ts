import NodeModules from "../NodeModules";
import IndexGlobal from "../IndexGlobal";
import DomDefine from "./DomDefine";

/**
 * 下边栏 - 左侧：webgl 展示
 */
class DomBottomLeftWebgl extends NodeModules.react.Component {
    /**
     * 实例引用
     */
    webglCanvasRef = NodeModules.react.createRef <HTMLCanvasElement> ();

    componentDidMount () {
        IndexGlobal.webgl.currStatus.onCanvas (this.webglCanvasRef.current);
    }

    componentDidUpdate () {
        IndexGlobal.webgl.currStatus.onRefresh ();
    }

    render () {
        // 滚动视图的容器
        return NodeModules.react.createElement (
            DomDefine.TAG_CANVAS,
            {
                ref: this.webglCanvasRef,
                style: {
                    [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                    [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_BLOCK,
                }
            }
        )
    }
}

export default DomBottomLeftWebgl;