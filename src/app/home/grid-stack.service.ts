/**
 * Created by qhyang on 2017/3/12.
 */

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscriber } from "rxjs/Subscriber";
import { share } from "rxjs/operator/share";

import { Injectable } from "@angular/core";
import { MdSnackBar, MdSnackBarRef } from "@angular/material";

import { Widget } from "../interfaces";

import { UserService } from "../user.service";

let jQuery = require("jquery");

@Injectable()
export class GridStackService {
    private gridStackEl: HTMLElement;
    private widgetTypes = {
        plain: {
            text: "Plain",
            id: "plain",
            config: {
                types: [
                    {
                        text: "Wind and sand",
                        id: "wind-and-sand"
                    },
                    {
                        text: "Random walkers",
                        id: "random-walkers"
                    }
                ]
            }
        },
        carousel: {
            text: "Carousel",
            id: "carousel"
        },
        drawingBoard: {
            text: "Drawing board",
            id: "drawing-board"
        },
        richText: {
            text: "Rich text",
            id: "rich-text"
        },
        moonOcean: {
            text: "Moon and Ocean",
            id: "moon-ocean"
        },
        weatherCard: {
            text: "Weather card",
            id: "weather-card"
        },
        sns: {
            text: "SNS",
            id: "sns",
            config: {
                types: [
                    {
                        text: "Weibo",
                        src: "https://passport.weibo.cn/signin/welcome",
                        id: "weibo"
                    },
                    {
                        text: "Mop",
                        src: "http://m.mop.com/passport.html?targetUrl=//3g3.mop.com/hi/index.html#/loginByAccount",
                        id: "mop"
                    }
                ]
            }
        },
        // waterfall: {
        //     text: "Waterfall",
        //     id: "waterfall"
        // }
    };
    private widgets: Widget[];
    private isInit: boolean = false;
    private initSubject: Subject<any> = new Subject();
    private updateSubject: Subject<any> = new Subject();
    private enterManageModeSubject: Subject<any> = new Subject();
    private leaveManageModeSubject: Subject<any> = new Subject();
    private resizeStartObservable: Observable<any>;
    private resizeStopObservable: Observable<any>;
    private dragStartObservable: Observable<any>;
    private dragStopObservable: Observable<any>;
    private snackBarRef: MdSnackBarRef<any>;

    constructor(private userService: UserService, private snackBar: MdSnackBar) { }

    getWidgetData(): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            if (this.widgets.length) {
                subscriber.next(jQuery.extend(true, [], this.widgets));
                subscriber.complete();
            } else {
                this.prepare().subscribe(() => {
                    subscriber.next(jQuery.extend(true, [], this.widgets));
                    subscriber.complete();
                });
            }
        });
    }
    prepare() {
        return Observable.create((subscriber: Subscriber<any>) => {
            this.userService.getUserGridStackData().subscribe((res:any) => {
                res = res.json();
                if (res.code === 1) {
                    this.widgets = JSON.parse(res.data);
                } else if (res.code === -1) {
                    this.widgets = JSON.parse("[{\"x\":\"0\",\"y\":\"0\",\"width\":\"12\",\"height\":\"2\",\"type\":\"header\",\"zIndex\":3,\"config\":{\"background\":{\"color\":\"\",\"images\":[{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/fd3081c6c60cceccf9d1decadf7ec1fa_34.jpg\",\"title\":\"34.jpg\"}]}},\"data\":{}},{\"type\":\"weather-card\",\"x\":\"9\",\"y\":\"2\",\"width\":\"3\",\"height\":\"4\",\"zIndex\":0},{\"type\":\"drawing-board\",\"x\":\"0\",\"y\":\"2\",\"width\":\"5\",\"height\":\"2\",\"zIndex\":0,\"config\":{\"background\":{\"images\":[],\"color\":\"rgba(241,241,241,0.54)\"},\"type\":\"wind-and-sand\"},\"data\":{\"imgUrl\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/4_2_drawingboard.png\"}},{\"type\":\"carousel\",\"x\":\"2\",\"y\":\"5\",\"width\":\"6\",\"height\":\"3\",\"zIndex\":1,\"config\":{\"background\":{\"images\":[],\"color\":\"rgba(231,236,238,1)\"}},\"data\":{\"images\":[{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/9e62f99e7d7f95b674c6be1cdd4d0bc7_screenshot2.jpg\",\"title\":\"screenshot2.jpg\"},{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/66581f93e4ba203a00ff713ecc87df59_screenshot2.jpg\",\"title\":\"screenshot2.jpg\"},{\"url\":\"http://bubblesoft.oss-ap-southeast-1.aliyuncs.com/f5b956fb9722323cc1cf683931c9ff88_19.jpg\",\"title\":\"19.jpg\"}],\"linkUrl\":\"/earth\"}},{\"x\":\"5\",\"y\":\"2\",\"width\":\"4\",\"height\":\"3\",\"type\":\"rich-text\",\"zIndex\":0,\"config\":{\"background\":{\"color\":\"rgba(235,227,148,0.571875)\"}},\"data\":{\"text\":{\"ops\":[{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"size\":\"large\",\"font\":\"reenie\",\"color\":\"#0066cc\"},\"insert\":\"Welcome!😝\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"reenie\"},\"insert\":\"this is a little site from Eric💻\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"reenie\"},\"insert\":\"though there is not much to be showed here now🤔\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"reenie\"},\"insert\":\"I'm going to make something \"},{\"attributes\":{\"font\":\"reenie\",\"size\":\"large\",\"color\":\"#9933ff\"},\"insert\":\"Cool\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"reenie\"},\"insert\":\"anyhow\"},{\"attributes\":{\"font\":\"reenie\",\"size\":\"large\"},\"insert\":\"😽\"},{\"attributes\":{\"font\":\"reenie\"},\"insert\":\", I wish you\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"reenie\",\"color\":\"#0066cc\",\"size\":\"large\"},\"insert\":{\"image\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAaCAYAAAAEy1RnAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA1hSURBVHja1FhrbJVHen6+me9+7scH+9g+Nr4SG3BwCJcm20ISkrAJBEgiLX/aTXab3VbZZpNKW7VqVCnNj7SqlEpbtWXFJksbVZvd7kKr9ELAC4FsAlkTjCEcbGMOPjb2sc/9+t1v/WGwIFt1lapVNo80f755Nd8877zzzDPD4CZaW1vx1d/5KuqNOnx+GUq9gXKlCk3X0bW6C6qqQJJEeB5w6tQpXLp0CQ888ACee+456JqOD898eNf777+/QCltsCyLO+FBUTQEAn40Nzejt6cHG++9F0eOHEapVIHnugiFQxgYGECj0UAikUDqegrdXd0wTROzc7MYGhrC1amrcGwbxVIRgiCio6MDtVoNsVgTPv74YzQ1xRCNRiHLMiKRCBiGQa1WAwBIkgTXdQEAn57drwTDMLBtGwCgqiqq1Soymcymq1evfrhnz54ey7IajuPcEQ8wsCwD1VoduWwWt/d/HvjMpD3PA8dxYBgGsixjfmE+/tY/vvWffr8vd/r06YWpqamVWEII6vU6eJ7Hrl2PQRRleJ53MxFfINLFYhFf+tJvYt/efZhJz9x/8HsH/9127MiuXbsH3n77h1AUBRzHwXVdOI6DWGwVNm7cAJZlYZomfh3wmUkLgoBoNBK8MX/j1R//6McvMoTBiy+++LDf75/iOA4cx4FSCo7jEYs14amnnoYo8piYSIIQ7otFmuM4RCIRFArFJw4cOPBGsVhsXrt27djOnTt/Px6PnyuVSjBNE57rId4eB8/zSCQSIIRBqVQCwzD/72V96x/LSV9OMKX0lzSE/Z8GAACe5xGJhFEoFL/8zjv/9u2xsbHHurpWe88888zzlJIDruuhXK7AMAxs3LQRhmZAFESUK2VomgbLsv7PyN6eOI7jIIoibNtGMBiAIAgQRRGyLIMQ8pRlWSbLsmkAjuu6E67r/rJ6G4axkplAIAACBrphyoVC4f6RkZEXzp8/v8fzPGzetPmnre2tL+bz+Uw6ncbw8DA6O5swPj6Gvt5elIplZBbmVxT+s5IihKw0n88HlmUhyzKi0SgkSYJpGBAEsV1RlK58Pn/X0tKSvLi4uO7a9DXf9HRqczgcii8tLYU1TYPjOIhGo3jppZfulyTp7C2ObH9/P1iWBSEE0WgUyrySmJ6+tntqcnLb3NyNJwqFgp9lWXR2dv583759r/A8f/K1116D67oQRREDAwPw+WRQlkJVVZimCYYhd6wIsKz4LCuA53n4fL6bJESIogjPdSFJEmRZhmEYTRzHhQghoXQ6HTNMozWVSu3KZrO96Zl0Tmk0ejVDX1MulXHLD7Asi2g0ClVV6q7r5Nvb2+cqlQolhJFWrWouj42NlSmlsCwLruuC3bt3LzZt2oTR0dEvj/xs5I/OnTv3kG7ooIRi9erV+d7enh/09PT9oKWl+WJLSwtqtRqefvppzM7OwjAMMAwDURBlQRAk27YZlmUpIYRhGMajlBLDMOL1Rj1erVapbXv+XC7PMAxiHpCYmpr2FYslkee4iJyX6ezsbFcmk7mbEMLYto1qtQoAEEURuq5DkiREo9Fa86pVU0Prhy4vLGQmYrGmSZ8sf/LQjh3s2NjYpKIo6tatWzE/P4/W1jh1PTh/8dprd+5p0zTZ0dHRPzx06NBflctlDA4OpIaHh98MhyLvhcLhC8ViwWg0GigWi3w2m/3OzMzMlkajwReKRc4yTffYsWOBc6PnBsqVUtAwTcbQDVKr1cCyLCRJRjKZhGM7sB0HpmlAEERcv57CqVOnIcvL57bt2NB0TeV5nuno6Mh4nnfN7/enm5qaWFVVpwcGBsYDgcDcxMSEIknSQiQSVpqbW3D06LsghIDxAFmWoWkayuVlLXEcB3Nzc44kySvadPfdd4NSCmbHjh33nThx4kxXd3f2oQcf/AN43r+8e+yY09fXh8cffxyXL19GKpUCy7I9U1NTKdM0Icuy5biu5ZNlUxAEwzRNz+fzlQWBp4IgzLIsJzQajUK1WskuLi4xa/rW6D293arreVlCSapWrZuOY5FHH31UaW1t444efffqxOREtSORIDt27FBN07Rv3LiBdevX40oyiba2NsiyjJMnT8I0TTQ1RREMhnD9+gwikTAs00RPby8mJiagGRoEQUC9Wsfo6C+wbt16JBIJeJ4Hv9+P+fl5sIIg2MsCRpYefvjhnx4+fBiZTAaZTAae56GjoxOO44BSmr7vvi3rurp6XUJINpvNWYQwVjwet2VZZgzDsA3DQCgUQiKRwOXLl3Hq1HuIRCLo6OxAf38/LNtGvVGHY7twHAstLS3o7OwEIQzq9Tp0XYemaTAMA5qmQVFV8DyP8QsXMHruHPx+P7Zt2w7LMpDJZDA4OIh7792IKxMTuDE3h2g0ilA4hJPvnYRru9A0HdVaDbuHh5HL5ZDL5aDrOmhLS8vS8PAG/0dnP3pydnb2K93d3adCoVB+zZp+qKoKhgEM3UC8Ne5xHJtnGFIQRVHnOM4UBNHp7+vzksnLbiaTwezsHJtKpdxQKARN0yBJIpqaonAcG5Sy4DgOS0tL8DxveYUsCxMTE6hUKmhvb4cgCCiVSqhUKqjVqshlc5BlGSPHjyOdTiMUCmHz5s3QdR3VahWhUASrV3eiWCzCMAx4ABKJdlQqlaZgIKj19PSgr68vnllY+FqhWPytQrHwkCAIRTaZTLrf+tbz34nH48bBg9//08nJyU+effbZ325qanp7fn4es7OzsGwL8XgciqLAdV2EwyGwLAtF0UKapvZnc7m7lIa6u7ml+dVIJDKhqirq9Tq6urqhKA0sLCyAEIJAILCs+ryASCQK07SwsLAASik6OzuRz+extLQEQRDgug6KxSIopdi2bRva2ttRLBbhuq7g8/k6KKWqaRpCJrMwWCgUGE1VnUq1GuY5ro8l9Ml8oTDXubrjyoULF56bnJxsviViTz755H1MPB7Hpk33oru7B9Vq9evHjx9/c2lpCdu3b//boaF1L6XTc04qldqQSCQeV1XVLwgCZRiEyuXyUKlc6clls62Dg4MIBAL/2qg3Dq8fWs9yHJctFotVv99vKUrDKZfLZnNziz8YDPoWFhZCDJhStClq8zzPV2tV1jKtSDgcnlAUpVdRlCAhxGk06oKuGzxhGDkUCsU6Olc3X7mSFCuV8sZ6vT5QLJbgui5M0wTHcRAEAaZp3qzO5fOe4zgQQtDf139xZmamKxQOGXv37vszprm5GblcDgDQ3d2N/fv3bxgZ+dnb589/PLhu3dqPH3jgwT2Tk5P3nT59+rDjOJAkCeFwGJVKBaqqglIKQRTBUgrbtiEIAgghaDQaoJSCUgrP81bOU9NatqqEEMDzwHE8CCXQDR0CL8CyrJV427ZhGMaKlbw1dktLS4rn+RrDMJwgCNccxy5JkqR1dHRe4zguq2kaTynVANRampvrbW1t586PjbVRSvRU6vrSHaQBYOfOnfjGN77pO3Dg7//mxIkTX49Go9bu3bu/xrJsjlIqXbp06cb27dsK6fRc08ULF8S169ay3b09vZ7rOZRQks1npelr01G4aFMURRNF0WIYxlUUFRxHNFn2BVzPE+q1ui4IPAOP0cHArNfqUcrSGqWUF0XJXbt2cBGAIMuyoev6xPj4BSUWi5GORIfZnkhcTKVSXiwWg9/vRzL5CViWw113DYDneVQqFZimiVqthuZVqyBJEq7PzGB09BeYmUkv21CGYVaya5omKpWKcs899/xuOBz++dmzZw++9dZb//TII4+8smfPnj+nhILjBIiieMOybASDQWzatPkDVVEQ9AcxOT2Jaq2K1pZWLC4ugmEIXNeDaerwPAft7Qk4jotisQhe4Feum5FwBK5jQ5B88Plk9Pf3w7YthEJhLC4uAgBu+Wdd16GqKlRVvfmYoUEQXCiKslLitm3Dtm1YlnVTI9wVjuTT/pcQAsuyUKlU0dbW9g/79u3rGhpa/5ORkZFXXn311ZJl208IgoAHH9yO4Y3DWMgs4EoyCUIIKtUKLMsCpRSNRgO6rsMwDJimAcMwYFnWymR1XYeu6zANE6ZpLsdZFgxj+buiKFAUdeUo8zwPnufh9ovDrW+fxdv/t6Rv72w0GqjX65mtW3/jK/v373+pVCpF3nzzjXcujo9/e82aAcRiMWiaBl03MDOTxut//TqOHD4CVVURCoUgCDx+HUF+VWZc10WpVEIikfjuyy+/fH9XV9fM4SOHv/vGG9//u/b29qhpWq8LghjMZDKYmppCMpnE2Q/O4syZM6jX65BlCQDzxSF9O6rVKgKBwNm9e/ds3LJly7lDhw49f/LkyZ/4/f6nPvrozH/4fPLK9mg06hgfH8epU6eRSqVAKfnc38X+Vy8nDLNsFUulcmX//v1bE4nE944cOfJNWZZh21ZXMBj8y0cefvRPkleSEEURAKDrOhoNFSzL3hTLLxjpW8SXRa7sbdgw9Hs8z584evToQVVVQx988MEfP/bYrtd5UcjjNnKEUtRqVaiqCr9f+mKV96f3eT5fQDwe/+cXXnhhy+Dg2ouKouRT16dpo1FDrVZZbvUKyqU8LNtEJBq5w6h8nvivAQA6tNJKcVdg2gAAAABJRU5ErkJggg==\"}},{\"attributes\":{\"font\":\"reenie\",\"color\":\"#0066cc\",\"size\":\"large\"},\"insert\":\" have fun!     \"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\\n\"}]}}}]");
                }
                subscriber.next(jQuery.extend(true, [], this.widgets));
                subscriber.complete();
            });
        });
    }

    init(el: HTMLElement, options: Object): Observable<any> {
        this.gridStackEl = el;
        jQuery(el).addClass("static")

            //TODO: remove when the gridstack customization feature added
            .css({
                "width": "1200px",
                "margin-left": "auto",
                "margin-right": "auto"
            })

            .gridstack(options);


        window["componentHandler"].upgradeElements(el);
        this.resizeStartObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("resizestart", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.resizeStopObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("resizestop", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.dragStartObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("dragstart", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.dragStopObservable = Observable.create((subscriber: Subscriber<any>) => {
            jQuery(el).on("dragstop", (event: Event) => {
                subscriber.next(event);
            });
        });
        this.isInit = true;
        this.initSubject.next();
        this.initSubject.complete();

        return Observable.create((subscriber: Subscriber<any>) => {
            subscriber.next();
            subscriber.complete();
        });
    }

    destroy() {
        this.leaveManageMode();
        jQuery(this.gridStackEl).off("resizestart resizestop dragstart dragstop");
        this.widgets = [];
    }

    getWidgetTypes(): any {
        return this.widgetTypes;
    }

    removeWidget(index: number): void {
        this.updateSubject.next({ remove: [ index ] });

        let $gridStackItem = jQuery(this.gridStackEl)
            .children("[data-index=" + index + "]")
            .fadeOut("fast", () => {
                jQuery(this.gridStackEl)
                    .data("gridstack")
                    .removeWidget($gridStackItem.get(0), false);
                this.widgets.splice(index, 1);
            });
    }

    addWidget(widget: Widget): number {
        let len = this.widgets.push(widget);

        this.updateSubject.next({ add: [ len - 1 ] });

        return len - 1;
    }

    enterManageMode() {
        jQuery(this.gridStackEl)
            .removeClass("static")
            .data("gridstack")
            .enable();
        this.snackBarRef = this.snackBar.open("Click \"Finish\" to apply the changes", "Finish");
        this.enterManageModeSubject.next();
        this.snackBarRef.onAction().subscribe(() => {
            this.updateGridStackPositionData();
            this.leaveManageMode();
            this.snackBarRef.dismiss();
        });
        jQuery(this.gridStackEl)
            .find(".grid-stack-item")
            .addClass("grid-stack-item__shake");
    }

    leaveManageMode() {
        if (this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
        jQuery(this.gridStackEl)
            .addClass("static")
            .data("gridstack")
            .disable();
        jQuery(this.gridStackEl)
            .find(".grid-stack-item")
            .removeClass("grid-stack-item__shake");
        this.leaveManageModeSubject.next();
    }

    updateGridStackPositionData() {
        jQuery(this.gridStackEl)
            .children(".grid-stack-item")
            .each((index: number, el: HTMLElement) => {
                const $el = jQuery(el);

                if (this.widgets[$el.attr("data-index")]) {
                    this.widgets[$el.attr("data-index")].x = $el.attr("data-gs-x");
                    this.widgets[$el.attr("data-index")].y = $el.attr("data-gs-y");
                    this.widgets[$el.attr("data-index")].width = $el.attr("data-gs-width");
                    this.widgets[$el.attr("data-index")].height = $el.attr("data-gs-height");
                }
            });
        this.userService.updateGridStackData(JSON.stringify(this.widgets)).subscribe(); //TODO: add error handler
    }

    updateGridStackData(index: number, gridData: Widget) {
        this.widgets[index] = jQuery.extend(true, {}, gridData);
        this.userService.updateGridStackData(JSON.stringify(this.widgets)).subscribe(); //TODO: add error handler
        this.updateSubject.next({ update: [ index ] });
    }

    getWidgetWidth(index: number) {
        return jQuery(this.gridStackEl)
            .find(".grid-stack-item[data-index=" + index + "]")
            .width();
    }

    on(eventType: string): Observable<any> {
        switch (eventType) {
            case "init":
                if (this.isInit) {
                    return Observable.create((subscriber: Subscriber<any>) => {
                        subscriber.next();
                        subscriber.complete();
                    });
                } else {
                    return this.initSubject;
                }
            case "update":
                return this.updateSubject;
            case "entermanagemode":
                return this.enterManageModeSubject;
            case "leavemanagemode":
                return this.leaveManageModeSubject;
            case "resizestart":
                return share.call(this.resizeStartObservable);
            case "resizestop":
                return share.call(this.resizeStopObservable);
            case "dragstart":
                return share.call(this.dragStartObservable);
            case "dragstop":
                return share.call(this.dragStopObservable);
        }
    }
}
