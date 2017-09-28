/**
 * Created by qhyang on 2017/3/23.
 */

interface Widget {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
    zIndex?: number;
    config?: WidgetConfig;
    data?: WidgetData;
}
interface WidgetConfig {
    type?: string;
    types?: Object[];
    background?: Background;
}
interface WidgetData {
    imgUrl?: string;
    images?: Image[];
}
interface Background {
    color?: string;
    images?: Image[];
}
interface Image {
    url: string,
    title: string
}

interface User {
    userId: number
}

export { Widget, WidgetConfig, Image, User };
