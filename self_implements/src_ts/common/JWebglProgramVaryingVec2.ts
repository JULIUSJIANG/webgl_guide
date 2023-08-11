import JWebglProgramVarying from "./JWebglProgramVarying.js";

/**
 * 着色器的固定数据 - 2 维
 */
export default class JWebglProgramVaryingVec2 extends JWebglProgramVarying {

    onGetDefine (): string {
        return `vec2`;
    }
}