/**
 * Created by qhyang on 2017/4/1.
 */
import { Input } from "@angular/core";

abstract class ScrollSceneDirective {
    @Input("offset") offset: string;
    @Input("duration") duration: string;
}

export { ScrollSceneDirective };