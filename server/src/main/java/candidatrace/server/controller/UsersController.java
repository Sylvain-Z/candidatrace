package candidatrace.server.controller;

import candidatrace.server.exception.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import candidatrace.server.model.Users;
import candidatrace.server.service.UsersService;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "users")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "all", produces = APPLICATION_JSON_VALUE)
    public List<Users> getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "id/{id}", produces = APPLICATION_JSON_VALUE)
    public Users getUserById(@PathVariable int id) {
        return this.usersService.getUserById(id);
    }

    @GetMapping(path = "email/{email}", produces = APPLICATION_JSON_VALUE)
    public Users getUserByEmail(@PathVariable String email) {
        return this.usersService.getUserByEmail(email);
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(path = "create", consumes = APPLICATION_JSON_VALUE, produces = "text/plain")
    // meme chose que : consumes = "application/json"
    public ResponseEntity<String> create(@RequestBody Users users) {
        boolean isCreated = usersService.create(users);
        if (isCreated) {
            System.out.println("UserController : Création du compte réussi");
            return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur créé avec succès.");
        } else {
            System.out.println("UserController : Création du compte échoué");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Un utilisateur avec cet email existe déjà.");
        }
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping(path = "signin", consumes = APPLICATION_JSON_VALUE, produces = "text/plain")
    public ResponseEntity<String> authenticate(@RequestBody Users users) {
        try {
            String message = usersService.authenticate(users.getEmail(), users.getPassword());
            System.out.println("UserController : Connexion réussi");
            return ResponseEntity.ok(message);
        } catch (AuthenticationException e) {
            System.out.println("UserController : Connexion échouée");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @PutMapping(path = "update_infos/{id}", consumes = APPLICATION_JSON_VALUE, produces = "text/plain")
    // meme chose que : consumes = "application/json"
    public ResponseEntity<String> create(@PathVariable int id, @RequestBody Users users) {
        boolean isUpdated = usersService.update(id, users);
        if (isUpdated) {
            System.out.println("UserController : Modification des information réussi");
            return ResponseEntity.status(HttpStatus.CREATED).body("Informations modifiées.");
        } else {
            System.out.println("UserController : Modification des information échoué");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Echec de la modification.");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "delete/{id}")
    public void deleteUser(@PathVariable int id){
        this.usersService.deleteUser(id);
    }
}
