import MgrData from "../mgr_data/MgrData.js";
import MgrDataItem from "../mgr_data/MgrDataItem.js";
import JWebglEnum from "./JWebglEnum.js";
import JWebglStatus from "./JWebglStatus.js";

/**
 * 示例的执行环境 - 状态 - 加载完成
 */
export default class JWebglStatusFinished extends JWebglStatus {

    onEnter (): void {
        this.relWebgl.canvas.onmousedown = (ev: MouseEvent) => {
            this.relWebgl.touchStart.fill (ev);
            this.relWebgl.currentTouch = this.relWebgl.touchStart;
            this.relWebgl.currentDemo.inst.onTouchStart ();
        };
        this.relWebgl.canvas.onmousemove = (ev: MouseEvent) => {
            this.relWebgl.touchMove.fill (ev);
            this.relWebgl.currentTouch = this.relWebgl.touchMove;
            this.relWebgl.currentDemo.inst.onTouchMove ();
        };
        this.relWebgl.canvas.onmouseup = (ev: MouseEvent) => {
            this.relWebgl.touchEnd.fill (ev);
            this.relWebgl.currentTouch = this.relWebgl.touchEnd;
            this.relWebgl.currentDemo.inst.onTouchEnd ();
        };
        
        let start = Date.now ();
        let called = 0;
        let go = () => {
            let current = Date.now ();
            let calling = current - start - called;
            called += calling;
            this.relWebgl.currentDemo.inst.onUpdate (calling);
            requestAnimationFrame (go);
        };
        requestAnimationFrame (go);

        // 新存档，默认案例为第一个
        if (
            MgrData.inst.get (MgrDataItem.CURRENT_DEMO) == null 
            || this.relWebgl.mapNameToDemo.get (MgrData.inst.get (MgrDataItem.CURRENT_DEMO)) == null
        )
        {
            MgrData.inst.set (MgrDataItem.CURRENT_DEMO, this.relWebgl.listAllRecord [0].inst.getName ());
        };
        this.relWebgl.currentDemo = this.relWebgl.mapNameToDemo.get (MgrData.inst.get (MgrDataItem.CURRENT_DEMO));
        this.relWebgl.currentDemo.currStatus.onEnable ();
        MgrData.inst.dataVersion++;
    }

    onRefresh (): void {
        let rec = this.relWebgl.currentDemo;
        this.relWebgl.currentDemo = this.relWebgl.mapNameToDemo.get (MgrData.inst.get (MgrDataItem.CURRENT_DEMO));
        // 如果发生切换
        if (this.relWebgl.currentDemo != rec) {
            if (rec) {
                rec.currStatus.onDisable ();
            };
            this.relWebgl.currentDemo.currStatus.onEnable ();
        };
        let size = this.relWebgl.currentDemo.inst.onGetCanvasSize ();
        let color = this.relWebgl.currentDemo.inst.onGetBgColor ();
        this.relWebgl.canvas.width = size [0];
        this.relWebgl.canvas.height = size [1];
        this.relWebgl.ctx.viewport (0, 0, size [0], size [1]);
        this.relWebgl.ctx.clearColor (color [0], color [1], color [2], color [3]);
        this.relWebgl.ctx.clear (JWebglEnum.ClearMask.COLOR_BUFFER_BIT);
        this.relWebgl.currentDemo.inst.onDraw ();
    }
}