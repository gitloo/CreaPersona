import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {

  }

  ngOnInit(): void {

    this.personaForm = this.fb.group({
      id : [''], // id non sarà required
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      edad : ['', Validators.required],
      pais : ['', Validators.required],
      estado : ['', Validators.required]
    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }  // in caso di errore nella richiesta, stampiamo l'errore nella sezione Errori della console del browser
    );

    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }  // in caso di errore nella richiesta, stampiamo l'errore nella sezione Errori della console del browser
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(value => { // ERRORE: senza il ? il risultato era "Errore: pais è probabilmente nullo"
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => { console.error(error) } // in caso di errore nella richiesta, stampiamo l'errore nella sezione Errori della console del browser
      );
    })

  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset(); // una volta che il form è stato compilato e inviato , viene resettato
      this.personas = this.personas.filter((persona: { id: any; }) => resp.id !== persona.id);
      this.personas.push(resp); // per sopperire al fatto che i dati inseriti non vengono visualizzati istantaneamente sulla pagina, ma soltanto dopo averla ricaricata, poichè Postgre non effettua modifiche in tempo reale, dobbiamo aggiungere con un push le nuove persone aggiunte all'interno dell'array personas. In questo modo simuliamo la reattività.
    },
      error => { console.error(error) })
  }


  editar(persona : any){
    this.personaForm.setValue({
      id : persona.id,
      nombre : persona.nombre,
      apellido : persona.apellido,
      edad : persona.edad,
      pais : persona.pais,
      estado : persona.estado
    })
  }

  eliminar(persona : any){
    this.personaService.deletePersona(persona.id).subscribe(resp => {
      if(resp === true) {
        this.personas.pop(persona)
      }
    })
  }
}
