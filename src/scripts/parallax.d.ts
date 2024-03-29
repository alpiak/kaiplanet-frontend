/**
 * Created by qhyang on 2017/2/17.
 */

// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ Write your module's methods and properties in this class */
declare class Parallax {
    constructor(scene: HTMLElement);

    enable(): void;
    disable(): void;
    updateLayers(): void;
    calibrate(calibrateX: boolean, calibrateY: boolean): void;
    invert(invertX: boolean, invertY: boolean): void;
    limit(limitX: boolean|number, limitY: boolean|number): void;
    scalar(scalarX: boolean|number, scalarY: boolean|number): void;
    friction(frictionX: boolean|number, frictionY: boolean|number): void;
    origin(originX: boolean|number, originY: boolean|number): void;
    destroy(): void;
}
