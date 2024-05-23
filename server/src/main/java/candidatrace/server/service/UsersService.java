package candidatrace.server.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import candidatrace.server.exception.UserAlreadyExistsException;
import candidatrace.server.exception.UserNotFoundException;
import candidatrace.server.exception.AuthenticationException;
import candidatrace.server.model.Users;
import candidatrace.server.repository.UsersRepository;


import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) { // constructeur
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
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
            users.setPassword(passwordEncoder.encode(users.getPassword()));
            this.usersRepository.save(users);
            return true;
        }
    }

    public String authenticate(String email, String password) {
        Users user = getUserByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }
        // For simplicity, return a message instead of a token
        return "Connexion réussi";
    }

    public boolean update(int id, Users updatedUser) {
        Optional<Users> userBDD = this.usersRepository.findById(id);
        if (userBDD.isEmpty()) {
            throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        } else {
            Users existingUser = userBDD.get();
            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setCity(updatedUser.getCity());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setEmail(updatedUser.getEmail());
            this.usersRepository.save(existingUser);
            System.out.println("Modification des information réussie");
            return true;
        }
    }

    public void deleteUser(int id) {
        Optional<Users> userBDD = this.usersRepository.findById(id);
        if (userBDD.isEmpty()) {
            System.out.println("L'utilisateur avec l'id" + id + "n'existe pas");
        } else {
            this.usersRepository.deleteById(id);
            System.out.println("Suppression réussie");
        }
    }

}
