import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = 'https://api.saatinidegerle.com/EmailSender/send';

  constructor(private http: HttpClient) {}

  sendForm(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
