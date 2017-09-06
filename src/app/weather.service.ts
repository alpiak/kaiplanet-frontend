/**
 * Created by qhyang on 2017/8/25.
 */

import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class WeatherService {
    constructor(private http: Http) { }

    getCurrentWeather(): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            this.http.post(require("../config.json").urlBase + "/weather", null).subscribe((res: any) => {
                res = res.json();

                if (res.code === 1) {
                    subscriber.next({
                        type: (() => {
                            switch (res.data.currently.icon) {
                                case "clear-day":
                                case "clear-night":
                                    return "sun";
                                case "rain":
                                case "fog":
                                    return "rain";
                                case "cloudy":
                                case "partly-cloudy-day":
                                case "partly-cloudy-night":
                                    return "cloud";
                                case "snow":
                                case "sleet":
                                case "hail":
                                    return "snow";
                                case "wind":
                                case "tornado":
                                    return "wind";
                            }
                        })(),
                        summary: (() => {
                            switch (res.data.currently.icon) {
                                case "clear-day":
                                    return "Sunny";
                                case "clear-night":
                                    return "Clear Night";
                                case "rain":
                                    return "Rain";
                                case "fog":
                                    return "Fog";
                                case "cloudy":
                                    return "Cloudy";
                                case "partly-cloudy-day" || "partly-cloudy-night":
                                    return "Partly Cloudy";
                                case "snow":
                                    return "Snow";
                                case "sleet":
                                    return "Sleet";
                                case "hail":
                                    return "Hail";
                                case "wind":
                                    return "Windy";
                                case "tornado":
                                    return "Tornado";
                            }
                        })(),
                        temperature: (res.data.currently.temperature - 32) * 5 / 9
                    });
                }
            });
        });
    }
}
