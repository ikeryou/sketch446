import GUI from 'lil-gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Conf } from './conf';
import { Update } from '../libs/update';
import { FPS } from '../core/fps';

export class Param {
  private static _instance: Param;

  public fps: number = FPS.MIDDLE;
  public debug:HTMLElement = document.querySelector('.l-debug') as HTMLElement;

  public allChangeCnt: number = 0

  private _dat: any;
  private _stats: any;

  public light = {
    x:{value:0, min:-100, max:100},
    y:{value:0, min:-100, max:100},
    z:{value:0, min:-100, max:100},
    dist:{value:0, min:0, max:1000},
  }

  constructor() {
    if (Conf.FLG_PARAM) {
      this.makeParamGUI();
    }

    if (Conf.FLG_STATS) {
      this._stats = Stats();
      document.body.appendChild(this._stats.domElement);
    }

    Update.instance.add(() => {
      this._update();
    });
  }

  private _update(): void {
    if (this._stats != undefined) {
      this._stats.update();
    }
  }

  public static get instance(): Param {
    if (!this._instance) {
      this._instance = new Param();
    }
    return this._instance;
  }

  public makeParamGUI(): void {
    if (this._dat != undefined) return;

    this._dat = new GUI();
    this._add(this.light, 'light');
  }

  private _add(obj: any, folderName: string): void {
    const folder = this._dat.addFolder(folderName);
    for (var key in obj) {
      const val: any = obj[key];
      if (val.use == undefined) {
        if (val.type == 'color') {
          folder.addColor(val, 'value').name(key);
        } else {
          if (val.list != undefined) {
            folder.add(val, 'value', val.list).name(key);
          } else {
            folder.add(val, 'value', val.min, val.max).name(key);
          }
        }
      }
    }
  }
}
