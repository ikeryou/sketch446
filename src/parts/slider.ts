import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Val } from "../libs/val";

// -----------------------------------------
//
// -----------------------------------------
export class Slider extends MyDisplay {

  private _rate: Val = new Val()

  constructor(opt:any) {
    super(opt)

    this._resize()
  }

  public start(d: number, onComplete: any):void {
    const tg = this._rate.val == 0 ? 1 : 0
    Tween.a(this._rate, {
      val: tg
    }, 1, d, Tween.ExpoEaseInOut, null, () => {
      this.el.value = String(this._rate.val * 100)
    }, onComplete)
  }
}







