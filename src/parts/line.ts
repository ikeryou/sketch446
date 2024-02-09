import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Slider } from "./slider";

// -----------------------------------------
//
// -----------------------------------------
export class Line extends MyDisplay {

  private _item: Array<Slider> = []
  private _isPlaying: boolean = false;

  private _size: number = 200
  public get size(): number {
    return this._size
  }

  constructor(opt:any) {
    super(opt)

    this.addClass('js-line-wrapper')

    const num = opt.num
    for(let i = 0; i < num; i++) {
      const item = document.createElement('input') as HTMLInputElement
      item.type = 'range'
      item.classList.add('js-line-item')
      this.useGPU(item)

      item.value = '0'

      this.el.appendChild(item)

      this._item.push(new Slider({
        el: item,
      }))
    }

    this.start()

    this._resize()
  }

  public setSize(size:number):void {
    this._size = size

    const w = ((size * Math.PI) / this._item.length) * 1
    const h = 10

    this._item.forEach((item, i) => {
      const cx = size * 0.5
      const cy = size * 0.5

      const ang = (360 / this._item.length) * i
      const rad = Util.radian(ang)

      const radius = size * 0.5
      const x = cx + Math.sin(rad) * radius
      const y = cy + Math.cos(rad) * radius

      const rot = Util.degree(Math.atan2(cy - y, cx - x)) + 90

      Tween.set(item.el, {
        width: w,
        height: h,
        x: x - w * 0.5,
        y: y - h * 0.5,
        rotationZ: rot,
      })
    })
  }

  public start():void {
    if(this._isPlaying) return
    this._isPlaying = true

    this._item.forEach((val,i) => {
      val.start(i * 0.1, (i === this._item.length - 1 ? () => {this._eCompleteMotion()} : null))
    })
  }

  private _eCompleteMotion():void {
    this._isPlaying = false
  }

  protected _update():void {
    super._update()

    if(Util.hit(50)) {
      this.start()
    }

    // if(this._item.length < 6) return

    // if(this._c % 1 == 0) {
    //   this._item.forEach((val,i) => {
    //     const ang = (this._lineId + i) * 10 + this._c * 10
    //     const r = Util.map(Math.sin(Util.radian(ang)), 0, 1, -1, 1)

    //     val.value = String(r * 100)
    //   })
    // }

  }

  protected  _resize(): void {
    super._resize()
  }
}







