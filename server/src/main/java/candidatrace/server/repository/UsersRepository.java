package candidatrace.server.repository;

import candidatrace.server.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//@Repository n'est pas nécessaire car avec la class JpaRepository l'annotation est redondante
public interface UsersRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email); //méthode native à spring qui traduit à la bdd "SELECT * users WHERE email = ?"


}
