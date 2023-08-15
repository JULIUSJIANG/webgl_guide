import JWebglEnum from "./JWebglEnum";
import JWebglProgramAttribute from "./JWebglProgramAttribute";

/**
 * 顶点数据 - 4 维数据
 */
export default class JWebglProgramAttributeVec4 extends JWebglProgramAttribute {

    onGetDefine (): string {
        return `vec4`;
    }

    onGetSize (): number {
        return 4;
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
    fillByVec4 (val0: number, val1: number, val2: number, val3: number) {
        this.relProgram.relWebgl.ctx.vertexAttrib4f (this.location, val0, val1, val2, val3);
    }
}