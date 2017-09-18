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
    backgroundColor?: string;
}
interface WidgetData {
    imgUrl?: string;
}

interface User {
    userId: number
}

export { Widget, WidgetConfig, User };
