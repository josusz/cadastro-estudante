import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudante';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudanteService } from './../estudante.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit{
  estudantes: Estudante[] = [];
  formGroupEstudante: FormGroup;
  isEditing: boolean = false;

  constructor(private EstudanteService: EstudanteService, formBuilder: FormBuilder){
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      course: [''],
      semester: ['']
    });
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes(){
    this.EstudanteService.getEstudantes().subscribe({
        next: data => this.estudantes = data,
        error: (msg) => console.log("Erro ao chamar o endpoint" + msg)
      }
    )
  }

  save(){
    if(this.isEditing){
      this.EstudanteService.update(this.formGroupEstudante.value).subscribe({
        next: () => {this.loadEstudantes();
          this.formGroupEstudante.reset();
          this.isEditing = false;
        }
      });
    }
    else{
      this.EstudanteService.save(this.formGroupEstudante.value).subscribe({
        next: data => {
          this.estudantes.push(data);
          this.formGroupEstudante.reset();
        }
      });
    }
  }

  remove(estudante: Estudante): void{
    this.EstudanteService.remove(estudante).subscribe({
      next: () => this.loadEstudantes()
    });
  }

  edit(estudante: Estudante): void{
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }
}
