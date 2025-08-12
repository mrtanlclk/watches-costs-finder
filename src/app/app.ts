import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('watches-cost-finder');

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullName: [''],
      phone: [''],
      email: [''],
      brand: [''],
      model: [''],
      year: [null],
      condition: [''],
      box: [false],
      papers: [false],
      limitedEdition: [false],
      serviceHistory: [false],
      file: [null],
    });
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  onSubmit(event: Event) {
    if (this.form.valid) {
      emailjs
        .send(
          'service_hpzckig',
          'template_z1nkavg',
          {
            ...this.form.value,
          },
          {
            publicKey: 'ff99_4o7G_G1qNZga',
          }
        )
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error as EmailJSResponseStatus);
          }
        );
      alert('Form başarıyla gönderildi!');
      this.form.reset();
    }
  }
}
