/**
 * 4 维向量
 */
export default class JWebglVector4 {
    constructor(opt_src = null) {
        var v = new Float32Array(4);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
            v[3] = opt_src[3];
        }
        this.elements = v;
    }
}
