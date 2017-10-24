/**
 * Created by qhyang on 2017/4/7.
 */

import { Pipe, PipeTransform } from "@angular/core";

/*
 * Convert an object into array
 * Usage:
 *   value | array
 * Example:
 *   {{ types |  array }}
 */
@Pipe({name: "array"})
export class ArrayPipe implements PipeTransform {
    transform(value: Object): Object[] {
        let array = [];
        for (let key in value) {
            array.push({key: key, value: value[key]});
        }
        return array;
    }
}
