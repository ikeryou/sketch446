import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _line: number = 6
  private _item:Array<Item> = []
  private _changeCnt: number = 0

  constructor(opt:any) {
    super(opt)

    for(let i = 0; i < this._line * this._line; i++) {
      const item = document.createElement('div')
      item.classList.add('js-item')
      this.el.appendChild(item)

      this._item.push(new Item({
        el: item,
        id: i,
      }))
    }



    this._c = 1
    this._resize()
  }


  protected _update():void {
    super._update()

    if(this._c % 180 === 0) {
      this._resize()
    }
  }

  protected  _resize(): void {
    const sw = Func.sw()
    const sh = Func.sh()

    const radius = Math.max(sh, sw) * (this._changeCnt % 2 === 0 ? Util.random(0.1, 0.12) : Util.random(0.3, 0.32))
    const itA = 0.2
    const itB = 0.4

    Tween.set(this.el, {
      rotationZ: this._changeCnt % 2 === 0 ? Util.range(10) : Util.range(60),
    })

    this._item.forEach((item,i) => {
      item.setSize(radius * 2, itA, itB, this._c % 10 === 0)

      const ix = i % this._line
      const iy = Math.floor(i / this._line)

      const it2 = (radius * 2 - radius * 1 * itA)
      let x = it2 * ix
      let y = radius * 1 * -iy

      let rot = 180

      if(iy % 2 != 0) {
        x -= radius - (radius - radius * itA - radius * itB) * 1
        rot = 0
      }

      // x += it2 * this._line * 0.5
      // y += radius * 0.75 * this._line * 0.5

      Tween.set(item.el, {
        x: x + sw * 0.5 - (radius * this._line) * 1 + radius,
        y: sh * 0.5 + y + (radius * this._line) * 0.5 - radius,
        rotationZ: rot,
      })
    })

    if(this._changeCnt % 2 === 0) {
      document.body.classList.remove('-fill')
      if(this._changeCnt % 4 === 0) document.body.classList.add('-fill')
    } else {
      document.body.classList.add('-fill')
    }

    this._changeCnt++
  }
}