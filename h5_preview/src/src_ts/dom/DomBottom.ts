import NodeModules from "../NodeModules.js";
import DomDefine from "./DomDefine.js";
import DomBottomLeftWebgl from "./DomBottomLeftWebgl.js";
import DomBottomRightTxt from "./DomBottomRightTxt.js";

/**
 * 下边栏
 */
export default class DomBottom extends NodeModules.react.Component {
    render () {
        return NodeModules.react.createElement (
            DomDefine.TAG_DIV,
            {
                style: {
                    [DomDefine.STYLE_FLEX]: `${400 + DomDefine.CONFIG_NUMBER_SPACING * 2}px`,
                    [DomDefine.STYLE_FLEX_GROW]: 0,

                    [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_FLEX,
                }
            },

            NodeModules.react.createElement (DomBottomLeftWebgl),
            NodeModules.react.createElement (DomBottomRightTxt)
        );
    }
}