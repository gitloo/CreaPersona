package xyz.yoandroide.persona.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.yoandroide.persona.model.Pais;
import xyz.yoandroide.persona.service.PaisService;

@RestController
@RequestMapping ("/pais/") //ci da la url base per accedere a questo servizio
public class PaisREST {

	@Autowired
	private PaisService paisService;
	
	@GetMapping //annotazione che comunica che ci viene permesso tramite richieste get di creare, tramite richieste di get dare una risposta
	private ResponseEntity<List<Pais>> getAllPaises() { // metodo che returna una lista di paesi
		return ResponseEntity.ok(paisService.findAll());
	}
}
