declare module 'cesium-mapv' {
  import { Viewer } from "cesium";

  export interface MapVDataSetItem {
    geometry: GeoJSON.Geometry;
    count?: number;
    /** 点数据时候使用 */
    size?: string;
    /** 点数据时候使用 */
    fillStyle?: string;
    /** 线数据时候使用 */
    strokeStyle?: string;
    /** 文本内容 */
    text?: string;
    /** 加载好的Image对象 */
    icon?: HTMLImageElement;
    [key: string]: any;
  }

  export type MapVCommonOptions = {
    /** 层级 */
    zIndex?: number;
    /** 大小值 */
    size?: number;
    /** 'px': 以像素为单位绘制,默认值。'm': 以米制为单位绘制，会跟随地图比例放大缩小 */
    unit?: 'px' | 'm';
    /** 不同图层之间的叠加模式，参考[https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) */
    mixBlendMode?: string;
    /** 填充颜色 */
    fillStyle?: string;
    /** 描边颜色 */
    strokeStyle?: string;
    /** 描边宽度 */
    lineWidth?: number;
    /** 透明度 */
    globalAlpha?: number;
    /** 颜色叠加方式, 默认'source-over' */
    globalCompositeOperation?: 'lighter' | 'source-over';
    /** 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认) */
    coordType?: 'bd09mc' | 'bd09ll';
    /** 投影颜色 */
    shadowColor?: string;
    /** 投影模糊级数 */
    shadowBlur?: number;
    /** 重绘回调函数，如果是时间动画、返回当前帧的时间 */
    updateCallback?: (time?: number) => void;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    /** 可选2d和webgl，webgl目前只支持画simple模式的点和线 */
    context?: '2d' | 'webgl';
    lineCap?: 'butt';
    lineJoin?: 'miter';
    miterLimit?: number;
    /** 一些事件回调函数 */
    methods?: {
      /** 点击事件，返回对应点击元素的对象值 */
      click?: (item?: any) => void;
      /**  鼠标移动事件，对应鼠标经过的元素对象值 */
      mousemove?: (item?: any) => void;
      /** 只针对移动端,点击事件 */
      tap?: (item?: any) => void;
    };
    animation?: {
      /** 按时间展示动画 */
      type: 'time';
      /** 动画时间范围,time字段中值 */
      stepsRange?: {
        start?: number;
        end?: number;
      };
      /** 时间动画的拖尾大小 */
      trails?: number;
      /** 单个动画的时间，单位秒 */
      duration?: number;
    };
  }

  export type GradientColor = Record<number, string>

  export type MapVLabelOptions = {
    show: boolean;
    fillStyle?: string;
    shadowColor?: string;
    font?: string;
    shadowBlur?: number;
  }

  /** 普通绘制方式 */
  export type MapVSimpleOptions = {
    draw: 'simple';
  }

  /** 蜂窝状聚类图配置 */
  export type MapVHoneycombOptions = {
    draw: 'honeycomb';
    size?: number;
    /** 网格中显示累加的值总和 */
    label?: MapVLabelOptions
    gradient?: GradientColor
  }

  /** 聚类图配置 */
  export type MapVClusterOptions = {
    draw: 'cluster';
    label?: MapVLabelOptions;
  }

  /** 气泡图配置 */
  export type MapVBubbleOptions = {
    draw: 'bubble';
    /** 显示的圆最大半径大小 */
    maxsize?: number;
    /** 数值最大值范围 */
    max?: number;
  }

  /** 热力图配置 */
  export type MapVHeatmapOptions = {
    draw: 'heatmap';
    /** 每个热力点半径大小 */
    size?: number;
    /** 热力图渐变色 */
    gradient?: GradientColor;
    /** 最大权重值 */
    max?: number;
  }

  /** 网格聚类图配置 */
  export type MapVGridOptions = {
    draw: 'grid';
    size?: number;
    gradient?: GradientColor;
    /** 网格中显示累加的值总和 */
    label?: MapVLabelOptions
  }

  /** 颜色渐变图配置 */
  export type MapVIntensityOptions = {
    draw: 'intensity';
    /** 最小阈值 */
    min?: number;
    /** 最大阈值 */
    max?: number;
    gradient?: GradientColor;
  }

  /** 颜色分类图配置 */
  export type MapVCategoryOptions = {
    draw: 'category';
    splitList?: {
      other: string;
      [key: string | number]: string;
    }
  }

  /** 值区间分类图配置 */
  export type MapVChoroplethOptions = {
    draw: 'choropleth';
    /** 按数值区间来展示不同颜色的点 */
    splitList?: {
      start: number;
      end: number;
      color: string;
    }[]
  }

  /** 文本配置 */
  export type MapVTextOptions = {
    draw: 'text';
    fillStyle?: string;
    textAlign?: 'center';
    /** 开启文本标注避让 */
    avoid?: boolean;
    textBaseline?: 'middle';
    /** 文本偏移值 */
    offset?: {
        x?: number;
        y?: number;
    };
  }

  export type MapVIconOptions = {
    draw: 'icon';
    /** 图片旋转角度 */
    rotate?: string;
    /** 规定图像的宽度 */
    width?: number;
    /** 规定图像的高度 */
    height?: number;
    /** 添加点击事件时候可以用来设置点击范围 */
    size?: number;
    /** 开始剪切的 x 坐标位置 */
    sx?: number;
    /** 开始剪切的 y 坐标位置 */
    sy?: number;
    /** 被剪切图像的宽度 */
    swidth?: number;
    /** 被剪切图像的高度 */
    sheight?: number;
  }

  export type MapVDataSet = MapVDataSetItem[]

  /** MapV配置 */
  export type MapVOptions = MapVCommonOptions & (MapVBubbleOptions | MapVCategoryOptions | MapVChoroplethOptions | MapVClusterOptions | MapVGridOptions | MapVHeatmapOptions | MapVHoneycombOptions | MapVIntensityOptions | MapVSimpleOptions | MapVTextOptions | MapVIconOptions)
  
  /**
   * DataSet
   *
   * A data set can:
   * - add/remove/update data
   * - gives triggers upon changes in the data
   * - can  import/export data in various data formats
   * @param {Array} [data]    Optional array with initial data
   * the field geometry is like geojson, it can be:
   * {
   *     "type": "Point",
   *     "coordinates": [125.6, 10.1]
   * }
   * {
   *     "type": "LineString",
   *     "coordinates": [
   *         [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
   *     ]
   * }
   * {
   *     "type": "Polygon",
   *     "coordinates": [
   *         [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
   *           [100.0, 1.0], [100.0, 0.0] ]
   *     ]
   * }
   * @param {Object} [options]   Available options:
   * 
   */
  export class DataSet {
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

  export class CesiumMapLayer {
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

  export class MapVRenderer {
    dataSet: MapVDataSet;
    options: MapVOptions;
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
    /** 显示图层 */
    show(): void;
    /** 隐藏图层 */
    hide(): void;
    /** 销毁当前图层 */
    destroy(): void;
  }
}
