package pl.kantor.KursyWalut;

import org.springframework.web.bind.annotation.*;
import pl.kantor.dane.DaneWejsciowe;

import javax.xml.crypto.Data;
import java.util.List;

@RestController
public class WalutyController {

    private static WalutyRepository repository;

    public static WalutyRepository getRepository() {
        return repository;
    }

    public WalutyController(WalutyRepository repository) {
        this.repository = repository;
    }

    // zwraca listę walut z bazy
    @CrossOrigin
    @GetMapping("/waluta")
    List<Waluta> wszystkie() {
        return repository.findAll();
    }

    // dodaje walutę do bazy
    @PostMapping("/waluta")
    Waluta nowaWaluta(@RequestBody Waluta nowaWaluta) {
        return repository.save(nowaWaluta);
    }

    // laduje waluty z pliku do bazy
    @PostMapping("/waluta/ladujzpliku")
    String ladujZPliku(){return DaneWejsciowe.zaladujWalutyDoRepo(DaneWejsciowe.stworzWalutyZPliku(),repository);}

    // laduje waluty z bazy do pliku JSON
    @PostMapping("/waluta/ladujdopliku")
    String ladujDoPliku(){return DaneWejsciowe.zaladujWalutyDoPliku(repository);}

    // pobiera informacje dla waluty o danym id
    @GetMapping("/waluta/{id}")
    Waluta jedna(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new WalutaNotFoundException(id));
    }

    // aktualizuje indormacje dla waluty o danym id
    @PutMapping("/waluta/{id}")
    Waluta zmienWalute(@RequestBody Waluta nowaWaluta, @PathVariable Long id) {
        return repository.findById(id)
                .map(waluta -> {
                    waluta.setKod(nowaWaluta.getKod());
                    waluta.setSkup(nowaWaluta.getSkup());
                    waluta.setSprzedaz(nowaWaluta.getSprzedaz());
                    return repository.save(waluta);
                })
                .orElseGet(() -> {
                    nowaWaluta.setId(id);
                    return repository.save(nowaWaluta);
                });
    }

    // usuwa walutę o danym id
    @DeleteMapping("/waluta/{id}")
    void usunWalute(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
