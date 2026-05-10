package candidatrace.server.controller;

import candidatrace.server.exception.ApplicationNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import candidatrace.server.model.Applications;
import candidatrace.server.service.ApplicationsService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "applications")
public class ApplicationsController {

    private ApplicationsService applicationsService;

    public ApplicationsController(ApplicationsService applicationsService) {
        this.applicationsService = applicationsService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "all", produces = APPLICATION_JSON_VALUE)
    public List<Applications> getAllApplications() {
        return this.applicationsService.getAllApplications();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "id/{id}", produces = APPLICATION_JSON_VALUE)
    public Applications getApplicationById(@PathVariable int id) {
        return this.applicationsService.getApplicationById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "user/{userId}", produces = APPLICATION_JSON_VALUE)
    public List<Applications> getApplicationsByUserId(@PathVariable int userId) {
        return this.applicationsService.getApplicationsByUserId(userId);
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(path = "create", consumes = APPLICATION_JSON_VALUE, produces = "text/plain")
    public ResponseEntity<String> create(@RequestBody Applications applications) {
        boolean isCreated = applicationsService.create(applications);
        if (isCreated) {
            System.out.println("ApplicationsController : Création de l'application réussi");
            return ResponseEntity.status(HttpStatus.CREATED).body("Application créée avec succès.");
        } else {
            System.out.println("ApplicationsController : Création de l'application échoué");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Échec de la création de l'application.");
        }
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PutMapping(path = "update/{id}", consumes = APPLICATION_JSON_VALUE, produces = "text/plain")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Applications applications) {
        boolean isUpdated = applicationsService.update(id, applications);
        if (isUpdated) {
            System.out.println("ApplicationsController : Mise à jour de l'application réussi");
            return ResponseEntity.status(HttpStatus.OK).body("Application mise à jour.");
        } else {
            System.out.println("ApplicationsController : Mise à jour de l'application échoué");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application non trouvée.");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "delete/{id}")
    public void deleteApplication(@PathVariable int id) {
        this.applicationsService.deleteApplication(id);
    }
}

