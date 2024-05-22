package candidatrace.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"candidatrace.server.config", "candidatrace.server.controller", "candidatrace.server.service", "candidatrace.server.repository"})
public class ServerApplication {

    public static void main(String[] args) {

        SpringApplication.run(ServerApplication.class, args);

        System.out.println("Server actif");
    }


}
