import NodeModules from "../NodeModules.js";
import DomDefine from "./DomDefine.js";
/**
 * 右边栏
 */
export default class DomTopRightTxt extends NodeModules.react.Component {
    render() {
        return NodeModules.react.createElement(DomDefine.TAG_DIV, {
            style: {
                [DomDefine.STYLE_WIDTH]: DomDefine.STYLE_WIDTH_PERCENTAGE_0,
                [DomDefine.STYLE_FLEX_GROW]: 1,
                [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                "fontSize": "14px"
                // [DomDefine.STYLE_PADDING]: DomDefine.CONFIG_TXT_HALF_SPACING,
                // [DomDefine.STYLE_BACKGROUND_COLOR]: DomDefine.CONFIG_TXT_BG_COLOR,
            }
        }, `你好`);
    }
}
