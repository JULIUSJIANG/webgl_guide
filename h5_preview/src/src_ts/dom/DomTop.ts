import IndexGlobal from "../IndexGlobal";
import NodeModules from "../NodeModules";
import MgrData from "../mgr_data/MgrData";
import MgrDataItem from "../mgr_data/MgrDataItem";
import DomDefine from "./DomDefine";

/**
 * 列数
 */
const COLUMN_COUNT = 4;

/**
 * 下边栏
 */
export default class DomTop extends NodeModules.react.Component {
    render () {
        let listChildren: Array <any> = new Array ();
        for (let i = 0; i < IndexGlobal.webgl.listAllRecord.length; i+= COLUMN_COUNT) {
            let containerStyle = {
                style: {
                    [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_FLEX
                }
            };
            if (i + COLUMN_COUNT < IndexGlobal.webgl.listAllRecord.length) {
                containerStyle.style [DomDefine.STYLE_MARGIN_BOTTOM] = DomDefine.CONFIG_TXT_SPACING;
            };
            let listChildrenContainer: Array <any> = new Array ();
            for (let j = 0; j < COLUMN_COUNT; j++) {
                let listRecordIJ = IndexGlobal.webgl.listAllRecord [i + j];
                if (listRecordIJ == null) {
                    continue;
                };
                let propsBtn = {
                    onClick: () => {
                        MgrData.inst.set (MgrDataItem.CURRENT_DEMO, listRecordIJ.inst.getName ());
                    },
                    style: {
                        [DomDefine.STYLE_WIDTH]: 0,
                        [DomDefine.STYLE_FLEX_GROW]: 1
                    }
                };
                if (MgrData.inst.get (MgrDataItem.CURRENT_DEMO) == listRecordIJ.inst.getName ()) {
                    propsBtn [DomDefine.PROPS_TYPE] = DomDefine.PROPS_TYPE_PRIMARY;
                };
                if (j != 0) {
                    propsBtn.style [DomDefine.STYLE_MARGIN_LEFT] = DomDefine.CONFIG_TXT_SPACING;
                };
                listChildrenContainer.push (NodeModules.react.createElement (
                    NodeModules.antd.Button,
                    propsBtn,

                    listRecordIJ.inst.getName ()
                ));
            };
            listChildren.push (NodeModules.react.createElement (
                DomDefine.TAG_DIV,
                containerStyle,

                ...listChildrenContainer
            ));
        };
        return NodeModules.react.createElement (
            DomDefine.TAG_DIV,
            {
                style: {
                    [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_HALF_SPACING,
                    [DomDefine.STYLE_BACKGROUND_COLOR]: DomDefine.CONFIG_TXT_BG_COLOR,

                    [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_FLEX,
                    [DomDefine.STYLE_FLEX_DIRECTION]: DomDefine.STYLE_FLEX_DIRECTION_COLUMN
                }
            },

            // 滚动视图的遮罩
            NodeModules.react.createElement (
                DomDefine.TAG_DIV,
                {
                    style: {
                        [DomDefine.STYLE_MARGIN]: DomDefine.CONFIG_TXT_SPACING,
                    }
                },

                // 滚动的列表
                NodeModules.react.createElement (
                    DomDefine.TAG_DIV,
                    {
                        style: {
                            [DomDefine.STYLE_DISPLAY]: DomDefine.STYLE_DISPLAY_FLEX,
                            [DomDefine.STYLE_FLEX_DIRECTION]: DomDefine.STYLE_FLEX_DIRECTION_COLUMN,
                        }
                    },

                    ...listChildren
                )
            )
        );
    }
}