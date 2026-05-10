package candidatrace.server.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "applications")
public class Applications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "company_name")
    private String company_name;

    @Column(name = "website", columnDefinition = "MEDIUMTEXT")
    private String website;

    @Column(name = "application_link", columnDefinition = "MEDIUMTEXT")
    private String application_link;

    @Column(name = "application_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date application_date;

    @Column(name = "note", columnDefinition = "MEDIUMTEXT")
    private String note;

    @Column(name = "first_relaunch")
    @Temporal(TemporalType.TIMESTAMP)
    private Date first_relaunch;

    @Column(name = "second_relaunch")
    @Temporal(TemporalType.TIMESTAMP)
    private Date second_relaunch;

    @Column(name = "interview_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date interview_date;

    @Column(name = "final_response", columnDefinition = "TINYINT(1)")
    private Boolean final_response;

    @Column(name = "final_response_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date final_response_date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    public Applications() {
    }

    public Applications(int id, String company_name, String website, String application_link, Date application_date,
                       String note, Date first_relaunch, Date second_relaunch, Date interview_date,
                       Boolean final_response, Date final_response_date, Users user) {
        this.id = id;
        this.company_name = company_name;
        this.website = website;
        this.application_link = application_link;
        this.application_date = application_date;
        this.note = note;
        this.first_relaunch = first_relaunch;
        this.second_relaunch = second_relaunch;
        this.interview_date = interview_date;
        this.final_response = final_response;
        this.final_response_date = final_response_date;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getApplication_link() {
        return application_link;
    }

    public void setApplication_link(String application_link) {
        this.application_link = application_link;
    }

    public Date getApplication_date() {
        return application_date;
    }

    public void setApplication_date(Date application_date) {
        this.application_date = application_date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getFirst_relaunch() {
        return first_relaunch;
    }

    public void setFirst_relaunch(Date first_relaunch) {
        this.first_relaunch = first_relaunch;
    }

    public Date getSecond_relaunch() {
        return second_relaunch;
    }

    public void setSecond_relaunch(Date second_relaunch) {
        this.second_relaunch = second_relaunch;
    }

    public Date getInterview_date() {
        return interview_date;
    }

    public void setInterview_date(Date interview_date) {
        this.interview_date = interview_date;
    }

    public Boolean getFinal_response() {
        return final_response;
    }

    public void setFinal_response(Boolean final_response) {
        this.final_response = final_response;
    }

    public Date getFinal_response_date() {
        return final_response_date;
    }

    public void setFinal_response_date(Date final_response_date) {
        this.final_response_date = final_response_date;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Applications{" +
                "id=" + id +
                ", company_name='" + company_name + '\'' +
                ", website='" + website + '\'' +
                ", application_link='" + application_link + '\'' +
                ", application_date=" + application_date +
                ", note='" + note + '\'' +
                ", first_relaunch=" + first_relaunch +
                ", second_relaunch=" + second_relaunch +
                ", interview_date=" + interview_date +
                ", final_response=" + final_response +
                ", final_response_date=" + final_response_date +
                ", user=" + user +
                '}';
    }
}
