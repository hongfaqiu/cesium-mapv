# cesium-mapv [![npm version](https://img.shields.io/npm/v/cesium-mapv.svg)](https://www.npmjs.com/package/cesium-mapv)

This is a fork from [mapv](https://github.com/huiyan-fe/mapv), enable working in morden es module cesium project.

## Install

```base
yarn add cesium-mapv
```

## Usage

```ts
import { CesiumMapLayer, DataSet, MapVDataSet, MapVOptions } from 'cesium-mapv'

const randomCount = 100
const data: MapVDataSet = []
while (randomCount--) {
  data.push({
    geometry: {
      type: 'Point',
      coordinates: [-125.8 + Math.random() * 50, 30.3 + Math.random() * 20]
    },
    count: 30 * Math.random()
  })
}

const opts: MapVOptions = {
  fillStyle: 'rgba(55, 50, 250, 0.8)',
  shadowColor: 'rgba(255, 250, 50, 1)',
  shadowBlur: 20,
  max: 100,
  size: 50,
  label: {
      show: true,
      fillStyle: 'white',
      // shadowColor: 'yellow',
      // font: '20px Arial',
      // shadowBlur: 10,
  },
  globalAlpha: 0.5,
  gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
  draw: 'honeycomb'
}

const dataSet = new DataSet(data)
const layer = new CesiumMapLayer(viewer, dataSet, opts)
```

## Example

<img style="vertical-align: top;" src="./asset/honeycomb.png?raw=true" alt="logo">

## API

Detail please reference to [mapv's API doc](https://github.com/huiyan-fe/mapv/blob/master/API.md), or [TS define(incomplete)](https://github.com/hongfaqiu/cesium-mapv/blob/master/typings/index.d.ts)

```ts
class DataSet {
  constructor(data: MapVDataSet);
  /**
   * 通过此方法可以获取当前数据集的数据
   * 同时可通过filter参数方法获取过滤后的数据
   */
  get(opts?: {
    filter: (item: MapVDataSetItem) => boolean
  }): MapVDataSet;

  /** 通过此方法可以修改数据集的内容 */
  set(MapVDataSet): void
}

class CesiumMapLayer {
  mapvBaseLayer: MapVRenderer;
  mapVOptions: MapVOptions;
  container: HTMLElement;
  map: Viewer;
  /**
   *Creates an instance of CesiumMapLayer.
  * @param {*} viewer
  * @param {*} dataset
  * @param {*} options
  * @param {*} container default viewer.container
  * @memberof CesiumMapLayer
  */
  constructor(viewer: Viewer, dataSet: DataSet, options: MapVOptions, container?: HTMLElement);

  render(): void;
  remove(): void;
  resizeCanvas(): void;

  update(opts: {
    data?: MapVDataSet;
    options?: MapVOptions;
  })

  /** 销毁当前图层 */
  destroy(): void;
}

class MapVRenderer {
  dataSet: MapVDataSet;
  options: MapVOptions;
  /** get or set layer visible */
  show: boolean;
  /**
   *Creates an instance of MapVLayer.
  * @param {*} viewer
  * @param {*} dataset
  * @param {*} options
  * @param {*} container default viewer.container
  * @memberof MapVLayer
  */
  constructor(viewer: Viewer, dataSet: DataSet, options: MapVOptions, mapVLayer: CesiumMapLayer);
  /** 修改配置 */
  update(options: Partial<MapVOptions>): void;
  /** 重新设置配置 */
  setOptions(options: Partial<MapVOptions>): void;
  /** 销毁当前图层 */
  destroy(): void;
}
```

## Credit

<https://github.com/huiyan-fe/mapv>
