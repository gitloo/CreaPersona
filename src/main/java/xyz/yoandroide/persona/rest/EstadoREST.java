package xyz.yoandroide.persona.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.yoandroide.persona.model.Estado;
import xyz.yoandroide.persona.service.EstadoService;

@RestController
@RequestMapping ("/estados/")
public class EstadoREST {
	
	@Autowired
	private EstadoService estadoService;

	@GetMapping
	private ResponseEntity<List<Estado>> getAllEstados() { // metodo che returna una lista di TUTTI gli Stati (metodo superfluo e poco utile)
		return ResponseEntity.ok(estadoService.findAll());
	}
	
	@GetMapping ("{id}")
	private ResponseEntity<List<Estado>> getAllEstadosByPais(@PathVariable("id") Long idPais) { // metodo che returna una lista di Stati filtrati in base al loro Paese di appartenenza
		return ResponseEntity.ok(estadoService.findAllByCountry(idPais)); 
		
	}
}
