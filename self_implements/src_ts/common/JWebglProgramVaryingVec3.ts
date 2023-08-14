import JWebglProgramVarying from "./JWebglProgramVarying.js";

/**
 * 着色器的固定数据 - 3 维
 */
export default class JWebglProgramVaryingVec3 extends JWebglProgramVarying {

    onGetDefine (): string {
        return `vec3`;
    }
}