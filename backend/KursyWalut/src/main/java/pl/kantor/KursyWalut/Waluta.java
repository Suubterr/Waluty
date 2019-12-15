package pl.kantor.KursyWalut;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Waluta {

    private @Id @GeneratedValue Long id;
    private String kod;
    private double skup;
    private double sprzedaz;

    public Waluta(String kod, double skup, double sprzedaz) {
        this.kod = kod;
        this.skup = skup;
        this.sprzedaz = sprzedaz;
    }

    public Waluta(Long id, String kod, double skup, double sprzedaz) {
        this.id = id;
        this.kod = kod;
        this.skup = skup;
        this.sprzedaz = sprzedaz;
    }

    public Waluta() {
    }

//    @Override
//    public String toString() {
//        return kod + ';' + skup + ';' + sprzedaz + ';';
//    }
}
