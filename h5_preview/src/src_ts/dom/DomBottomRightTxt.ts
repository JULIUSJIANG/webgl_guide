import IndexGlobal from "../IndexGlobal.js";
import NodeModules from "../NodeModules.js";
import DomDefine from "./DomDefine.js";

/**
 * 下边栏 - 右侧：文本展示
 */
export default class DomBottomRightTxt extends NodeModules.react.Component {
    render () {
        return NodeModules.react.createElement (
            DomDefine.TAG_DIV,
            {
                style: {
                    [DomDefine.STYLE_WIDTH]: DomDefine.STYLE_WIDTH_PERCENTAGE_0,
                    [DomDefine.STYLE_FLEX_GROW]: 1,
                    [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                    "fontSize": "14px"
                }
            },

            IndexGlobal.webgl.currStatus.onGetInfo ()
        )
    }
}