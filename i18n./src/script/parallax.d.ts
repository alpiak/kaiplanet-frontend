/**
 * Created by qhyang on 2017/2/17.
 */

// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ If this library is callable (e.g. can be invoked as myLib(3)),
 *~ include those call signatures here.
 *~ Otherwise, delete this section.
 */
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
}
