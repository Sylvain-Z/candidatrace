package candidatrace.server.repository;

import candidatrace.server.model.Applications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//@Repository n'est pas nécessaire car avec la class JpaRepository l'annotation est redondante
public interface ApplicationsRepository extends JpaRepository<Applications, Integer> {

    List<Applications> findByUserId(int userId); //Find applications by user ID

    Optional<Applications> findById(int id); //Find application by ID

}
