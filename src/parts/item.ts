import { Color } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Line } from "./line";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _item: Array<HTMLElement | Line> = []

  private _size: number = 200
  public get size(): number {
    return this._size
  }

  constructor(opt:any) {
    super(opt)

    this.addClass('js-rect')

    for(let i = 0; i < 4; i++) {
      let item
      if(i % 2 != 0) {
        const lineEl = document.createElement('div')
        this.el.appendChild(lineEl)
        item = new Line({
          el: lineEl,
          id: (opt.id * 4) + i,
          num: i == 1 ? 10 : 2
        })
      } else {
        item = document.createElement('div')
        item.classList.add('l-shape')
        this.el.appendChild(item)

        const col = new Color(0,0,0).offsetHSL(Util.random(0, 0.2), 1, 0.5)
        Tween.set(item, {
          // border: '10px solid ' + col.getStyle(),
          backgroundColor: col.getStyle()
        })
      }

      this._item.push(item)
    }

    this._resize()
  }

  public setSize(size:number, itA:number, itB:number, _upd: boolean):void {
    Tween.set(this.el, {
      width: size,
      height: size * 0.5,
      scale: 1
    })

    this._item.forEach((item, i) => {
      let itemSize = size
      if(i === 1) {
        itemSize -= size * itA
      }
      if(i === 2) {
        itemSize -= size * itA + size * itB
      }
      if(i === 3) {
        itemSize -= size * itA + size * itB + size * itA
      }

      // if(upd && (item as any).checked !== undefined) {
      //   (item as any).checked = Util.hit(2)
      // }

      if(item instanceof Line) {
        item.setSize(itemSize)
        Tween.set(item.el, {
          width: itemSize,
          height: itemSize,
          x: size * 0.5 - itemSize * 0.5,
          y: size * 0.5 - itemSize * 0.5,
        })
      } else {
        Tween.set(item, {
          width: itemSize,
          height: itemSize,
          x: size * 0.5 - itemSize * 0.5,
          y: size * 0.5 - itemSize * 0.5,
        })
      }

    })
  }

  protected _update():void {
    super._update()
  }

  protected  _resize(): void {
    super._resize()
  }
}







