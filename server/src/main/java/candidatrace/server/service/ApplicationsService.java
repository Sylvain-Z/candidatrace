package candidatrace.server.service;

import org.springframework.stereotype.Service;

import candidatrace.server.exception.ApplicationNotFoundException;
import candidatrace.server.model.Applications;
import candidatrace.server.repository.ApplicationsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationsService {

    private ApplicationsRepository applicationsRepository;

    public ApplicationsService(ApplicationsRepository applicationsRepository) {
        this.applicationsRepository = applicationsRepository;
    }

    public List<Applications> getAllApplications() {
        return this.applicationsRepository.findAll();
    }

    public Applications getApplicationById(int id) {
        Optional<Applications> optionalApplications = this.applicationsRepository.findById(id);
        return optionalApplications.orElse(null);
    }

    public List<Applications> getApplicationsByUserId(int userId) {
        return this.applicationsRepository.findByUserId(userId);
    }

    public boolean create(Applications applications) {
        try {
            this.applicationsRepository.save(applications);
            return true;
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'application : " + e.getMessage());
            return false;
        }
    }

    public boolean update(int id, Applications updatedApplication) {
        Optional<Applications> applicationBDD = this.applicationsRepository.findById(id);
        if (applicationBDD.isEmpty()) {
            throw new ApplicationNotFoundException("Application non trouvée avec l'ID : " + id);
        } else {
            Applications existingApplication = applicationBDD.get();
            existingApplication.setCompany_name(updatedApplication.getCompany_name());
            existingApplication.setWebsite(updatedApplication.getWebsite());
            existingApplication.setApplication_link(updatedApplication.getApplication_link());
            existingApplication.setApplication_date(updatedApplication.getApplication_date());
            existingApplication.setNote(updatedApplication.getNote());
            existingApplication.setFirst_relaunch(updatedApplication.getFirst_relaunch());
            existingApplication.setSecond_relaunch(updatedApplication.getSecond_relaunch());
            existingApplication.setInterview_date(updatedApplication.getInterview_date());
            existingApplication.setFinal_response(updatedApplication.getFinal_response());
            existingApplication.setFinal_response_date(updatedApplication.getFinal_response_date());
            this.applicationsRepository.save(existingApplication);
            System.out.println("Mise à jour de l'application réussie");
            return true;
        }
    }

    public void deleteApplication(int id) {
        Optional<Applications> applicationBDD = this.applicationsRepository.findById(id);
        if (applicationBDD.isEmpty()) {
            System.out.println("L'application avec l'id " + id + " n'existe pas");
        } else {
            this.applicationsRepository.deleteById(id);
            System.out.println("Suppression de l'application réussie");
        }
    }

}
