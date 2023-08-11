import JWebglEnum from "./JWebglEnum.js";
import JWebglProgramAttribute from "./JWebglProgramAttribute.js";

/**
 * 顶点数据 - 1 维数据
 */
export default class JWebglProgramAttributeFloat extends JWebglProgramAttribute {

    onGetDefine (): string {
        return `float`;
    }

    onGetSize (): number {
        return 1;
    }

    onGetType (): JWebglEnum.VertexAttriPointerType {
        return JWebglEnum.VertexAttriPointerType.FLOAT
    }

    /**
     * 填充数据
     * @param val0 
     * @param val1 
     * @param val2 
     * @param val3 
     */
    fill (val: number) {
        this.relProgram.relWebgl.ctx.vertexAttrib1f (this.location, val);
    }
}