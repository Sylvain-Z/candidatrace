package candidatrace.server.service;

import candidatrace.server.exception.UserAlreadyExistsException;
import candidatrace.server.model.Users;
import candidatrace.server.repository.UsersRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) { // constructeur
        this.usersRepository = usersRepository;
    }

    public List<Users> getAllUsers() {
        return this.usersRepository.findAll();
    }

    public Users getUserById(int id) {
        Optional<Users> optionalUsers = this.usersRepository.findById(id);
        // if (optionalUsers.isPresent()){
        //     return optionalUsers.get();
        // } else {
        //     return null;
        // }
        return optionalUsers.orElse(null); // version optimisé du code juste au-dessus
    }

    public Users getUserByEmail(String email) {
        Optional<Users> optionalUsers = this.usersRepository.findByEmail(email);
        return optionalUsers.orElse(null);
    }

    public boolean create(Users users) {
        Optional<Users> userBDD = this.usersRepository.findByEmail(users.getEmail());
        if (userBDD.isPresent()) {
            throw new UserAlreadyExistsException("Un utilisateur avec cet email existe déjà.");
        } else {
            this.usersRepository.save(users);
            return true;
        }
    }

    // HACHAGE DU MOT DE PASSE POUR CREATE
    // IMPLEMENTATION FRONT A REPRENDRE ICI -------------------------------

    //  public void update(int id, Users users) {
    //      Optional<Users> userBDD = this.usersRepository.findById(id);
    //      if (userBDD.isEmpty()) {
    //          System.out.println("Echec de la modification des données");
    //     } else {
    //         users.setId(id);
    //         this.usersRepository.save(users);
    //         System.out.println("Modification des information réussie");
    //     }
    // }

    //  public void deleteUser(int id) {
    //     Optional<Users> userBDD = this.usersRepository.findById(id);
    //     if (userBDD.isEmpty()) {
    //         System.out.println("L'utilisateur avec l'id" + id + "n'existe pas");
    //     } else {
    //         this.usersRepository.deleteById(id);
    //         System.out.println("Suppression réussie");
    //     }
    // }

}
