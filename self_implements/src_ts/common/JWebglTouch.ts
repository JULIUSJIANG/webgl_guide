/**
 * 交互
 */
export default class JWebglTouch {
    
    /**
     * 在投影矩阵中的位置
     */
    posP = new Float32Array([0, 0, 0, 0]);

    /**
     * 填充数据
     * @param evt 
     */
    fill (evt: MouseEvent) {
        let x = evt.clientX;
        let y = evt.clientY;
        let canvas = evt.target as HTMLCanvasElement;
        let rect = canvas.getBoundingClientRect ();
        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
        this.posP [0] = x;
        this.posP [1] = y;
        this.posP [2] = 0;
        this.posP [3] = 1;
    }
}