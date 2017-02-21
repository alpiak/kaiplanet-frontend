/**
 * Created by qhyang on 2017/2/17.
 */

import {Component} from "@angular/core";

@Component({
    selector: "crystal-nav",
    template: `
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
    `,
    styles: [require("./crystal-nav.component.scss")]
})
export class CrystalNavComponent{ }