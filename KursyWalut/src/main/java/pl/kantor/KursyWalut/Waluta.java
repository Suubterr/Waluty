package pl.kantor.KursyWalut;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Data
@Entity
public class Waluta {

    private @Id @GeneratedValue Long id;
    private String kod;
    private double skup;
    private double sprzedaz;
    private Timestamp czas;

    public Waluta(String kod, double skup, double sprzedaz, Timestamp czas) {
        this.kod = kod;
        this.skup = skup;
        this.sprzedaz = sprzedaz;
        this.czas = czas;
    }

    public Waluta(Long id, String kod, double skup, double sprzedaz, Timestamp czas) {
        this.id = id;
        this.kod = kod;
        this.skup = skup;
        this.sprzedaz = sprzedaz;
        this.czas = czas;
    }

    public Waluta() {
    }

//    @Override
//    public String toString() {
//        char a = '"';
//        return a + kod + a + skup + ';' + sprzedaz + ';';
//    }
}
