import JWebglEnum from "./JWebglEnum";
import JWebglProgramAttribute from "./JWebglProgramAttribute";

/**
 * 顶点数据 - 2 维数据
 */
export default class JWebglProgramAttributeVec2 extends JWebglProgramAttribute {

    onGetDefine (): string {
        return `vec2`;
    }

    onGetSize (): number {
        return 2;
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
    fillByVec4 (val0: number, val1: number) {
        this.relProgram.relWebgl.ctx.vertexAttrib2f (this.location, val0, val1);
    }
}