package pl.kantor.KursyWalut;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.kantor.dane.DaneWejsciowe;

import java.util.List;

@Configuration
@Slf4j
public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(WalutyRepository repository) {

        List<Waluta> waluty = new DaneWejsciowe().stworzWalutyZPliku();

        return args -> {log.info("Ladowanie walut z pliku -> " + DaneWejsciowe.zaladujWalutyDoRepo(waluty, repository));};
    }
}