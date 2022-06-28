package xyz.yoandroide.persona.rest;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.yoandroide.persona.model.Persona;
import xyz.yoandroide.persona.service.PersonaService;

@RestController
@RequestMapping("/personas/")
public class PersonaREST {

	@Autowired
	private PersonaService personaService;
	
	@GetMapping
	private ResponseEntity<List<Persona>> getAllPersonas() {
		return ResponseEntity.ok(personaService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<Persona> savePersona(@RequestBody Persona persona) {
		try { // se tutto a posto
			Persona personaGuardada = personaService.save(persona);
			return ResponseEntity.created(new URI("/personas/" + personaGuardada.getId())).body(personaGuardada);
		} catch (Exception e) { // se qualcosa va male
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deletePersona(@PathVariable ("id") Long id) {
		personaService.deleteById(id); // controllare sempre che i metodi utilizzati siano stati implementati nel Service relativo
		return ResponseEntity.ok(!(personaService.findById(id) != null)); // il risultato del return sarà true se l'elemento è stato eliminato, cioè se il metodo personaService.findById(id) non trova l'elemento cercato, dando come risultato false. La negazione di questo risultato sarà true, quindi ponendo un ! davanti a questo metodo otteniamo true.
	}
}
