import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiUrl = 'http://45.94.4.245:5294/EmailSender/send';

  constructor(private http: HttpClient) {}

  sendForm(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
