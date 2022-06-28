import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private API_SERVER = "http://localhost:8080/personas/"; // confrontare sempre questo percorso con il percorso nel @RequestMapping della pagina REST del relativo Service: devono essere uguali. 

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPersonas(): Observable<any>{ // metodo che restituisce la lista di persone registrate
    return this.httpClient.get(this.API_SERVER); // this.API_SERVER = "http://localhost:8080/personas/";
  }

  public savePersona(persona : any): Observable<any>{ // PersonaREST.java --> private ResponseEntity<Persona> savePersona (@RequestBody Persona persona){...} --> dato che avevamo messo l'annotation @PostMapping, il return non sarà get ma post
    return this.httpClient.post(this.API_SERVER, persona);
  }

  public deletePersona(id : any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/" + id);
  }
}
