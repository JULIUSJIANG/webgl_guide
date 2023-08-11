import JWebglEnum from "./JWebglEnum.js";
import JWebglProgramAttribute from "./JWebglProgramAttribute.js";
/**
 * 顶点数据 - 2 维数据
 */
export default class JWebglProgramAttributeVec2 extends JWebglProgramAttribute {
    onGetDefine() {
        return `vec2`;
    }
    onGetSize() {
        return 4;
    }
    onGetType() {
        return JWebglEnum.VertexAttriPointerType.FLOAT;
    }
    /**
     * 填充数据
     * @param val0
     * @param val1
     * @param val2
     * @param val3
     */
    fillByVec4(val0, val1) {
        this.relProgram.relWebgl.ctx.vertexAttrib2f(this.location, val0, val1);
    }
}
