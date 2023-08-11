import JWebglProgramVarying from "./JWebglProgramVarying.js";

/**
 * 着色器的固定数据 - 4 维
 */
export default class JWebglProgramVaryingVec4 extends JWebglProgramVarying {

    onGetDefine (): string {
        return `vec4`;
    }
}