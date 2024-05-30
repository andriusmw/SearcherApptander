import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SearchFormComponent {
  searchForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.searchForm = this.fb.group({
      tipoPersona: ['', Validators.required],
      criterio: ['', Validators.required],
      documento: [''],
      nombre: ['']
    });
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      this.errorMessage = 'Debes completar todos los campos obligatorios.';
      return;
    }

    const tipoPersona = this.searchForm.get('tipoPersona')?.value ?? '';
    const criterio = this.searchForm.get('criterio')?.value ?? '';
    const documento = this.searchForm.get('documento')?.value ?? '';
    const nombre = this.searchForm.get('nombre')?.value ?? '';

    this.dataService.search(tipoPersona, criterio, documento, nombre).subscribe(
      results => {
        if (results.length === 0) {
          this.errorMessage = 'No se han encontrado datos.';
        } else {
          this.errorMessage = '';
          this.dataService.updateResults(results);
        }
      },
      error => {
        this.errorMessage = 'Error en la búsqueda de datos.';
      }
    );
  }
}
