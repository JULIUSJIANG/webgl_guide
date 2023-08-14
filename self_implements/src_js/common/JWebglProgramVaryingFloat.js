import JWebglProgramVarying from "./JWebglProgramVarying.js";
/**
 * 着色器的固定数据 - 浮点数
 */
export default class JWebglProgramVaryingFloat extends JWebglProgramVarying {
    onGetDefine() {
        return `float`;
    }
}
