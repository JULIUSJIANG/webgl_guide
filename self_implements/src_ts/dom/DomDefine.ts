/**
 * 组件里面经常用到的常量都放在该文件
 */
class DomDefine {

}

namespace DomDefine {
    //【标签名】
    export const TAG_DIV = "div";
    export const TAG_CANVAS = "canvas";
    export const TAG_SPAN = "span";
    export const TAG_INPUT = "input";

    //【样式名以及具体值】
    export const STYLE_WIDTH = "width";
    export const STYLE_WIDTH_PERCENTAGE_0 = "0%";
    export const STYLE_WIDTH_PERCENTAGE_100 = "100%";

    export const STYLE_HEIGHT = "height";
    export const STYLE_HEIGHT_PERCENTAGE_0 = "0%";
    export const STYLE_HEIGHT_PERCENTAGE_100 = "100%";

    export const STYLE_DISPLAY = "display";
    export const STYLE_DISPLAY_FLEX = "flex";
    export const STYLE_DISPLAY_BLOCK = "block";
    export const STYLE_DISPLAY_NONE = "none";

    export const STYLE_FLEX_DIRECTION = "flexDirection";
    export const STYLE_FLEX_DIRECTION_COLUMN = "column";
    export const STYLE_FLEX_DIRECTION_ROW = "row";

    export const STYLE_FLEX_GROW = "flexGrow";

    export const STYLE_BACKGROUND_COLOR = "backgroundColor";
    
    export const STYLE_MARGIN = "margin";
    export const STYLE_MARGIN_TOP = "marginTop";
    export const STYLE_MARGIN_RIGHT = "marginRight";
    export const STYLE_MARGIN_BOTTOM = "marginBottom";
    export const STYLE_MARGIN_LEFT = "marginLeft";

    export const STYLE_PADDING = "padding";

    export const STYLE_FLEX = "flex";

    export const STYLE_OVERFLOW_X = "overflowX";
    export const STYLE_OVERFLOW_X_HIDDEN = "hidden";
    export const STYLE_OVERFLOW_X_SCROLL = "scroll";

    export const STYLE_OVERFLOW_Y = "overflowY";
    export const STYLE_OVERFLOW_Y_HIDDEN = "hidden";
    export const STYLE_OVERFLOW_Y_SCROLL = "scroll";

    export const STYLE_ALIGN_ITEMS = "alignItems";
    export const STYLE_ALIGN_ITEMS_CENTER = "center";

    export const STYLE_JUSTIFY_CONTENT = "justifyContent";
    export const STYLE_JUSTIFY_CONTENT_CENTER = "center";

    export const STYLE_FONT_SIZE = "fontSize";
    export const STYLE_FONT_SIZE_14 = "14px";

    //【其他的属性名】
    export const PROPS_CLASS_NAME = "className";
    export const PROPS_VALUE = "value";
    export const PROPS_ON_CHANGE = "onChange";
    export const PROPS_TYPE = "type";
    export const PROPS_TYPE_PRIMARY = "primary";

    //【样式中各元素需要统一的值放这里】
    /**
     * 外边距 - 数字形式
     */
    export const CONFIG_NUMBER_SPACING = 8;
    /**
     * 外边距 - 文本形式
     */
    export const CONFIG_TXT_SPACING = `${CONFIG_NUMBER_SPACING}px`;
    /**
     * 外边距 - 一半
     */
    export const CONFIG_TXT_HALF_SPACING = `${CONFIG_NUMBER_SPACING / 2}px`;
    /**
     * 外边距 - 2 倍
     */
    export const CONFIG_TXT_DOUBLE_SPACING = `${CONFIG_NUMBER_SPACING * 2}px`;
    /**
     * 分块的背景颜色
     */
    export const CONFIG_TXT_BG_COLOR = "#0000000A";
}

export default DomDefine;