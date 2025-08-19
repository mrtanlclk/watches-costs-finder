import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { AppService } from './app.service';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, MatExpansionModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('watches-cost-finder');

  form: FormGroup;
  selectedFiles: File[] = [];
  hasFormSent = false;
  readonly panelOpenState = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.form = this.formBuilder.group({
      fullName: [''],
      phone: [''],
      email: [''],
      brand: [''],
      model: [''],
      productionYear: [null],
      condition: [''],
      hasBox: [false],
      hasPapers: [false],
      isLimited: [false],
      hasServiceHistory: [false],
      note: [''],
      photos: [[]],
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles.push(...Array.from(input.files)); // FileList -> Array
    }
  }

  onSubmit() {
    // if (this.form.invalid) {
    //   return;
    // }

    this.hasFormSent = true;

    const formValue = this.form.getRawValue();
    const formData = new FormData();
    // Fotoğrafları ekle
    this.selectedFiles.forEach((file) => {
      formData.append('Photos', file); // backend tarafı array bekliyorsa 'files'
    });

    // Diğer alanları ekle
    Object.keys(formValue).forEach((key) => {
      if (key !== 'photos') {
        // photos alanını atla
        const value = formValue[key];
        if (value !== null && value !== undefined) {
          formData.append(key.charAt(0).toUpperCase() + key.slice(1), value);
        }
      }
    });

    this.appService.sendForm(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert('Form başarıyla gönderildi!');
        this.form.reset();
        this.hasFormSent = false;
      },
      error: (error) => {
        // console.error('Error submitting form:', error);
        // alert('Form gönderilirken bir hata oluştu! \n' + error);
        this.hasFormSent = false;
      },
    });

    // Debug
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
  }
}