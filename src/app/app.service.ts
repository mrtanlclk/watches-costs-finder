import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = 'https://api.satinidegerle.com/EmailSender/send';
  apiUrlW = 'https://api.satinidegerle.com/WeatherForecast';

  constructor(private http: HttpClient) {}

  sendForm(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }

  getWeather() {
    return this.http.get(`${this.apiUrlW}`);
  }
}
