package pl;

import pl.kantor.KursyWalut.Waluta;
import pl.kantor.dane.DaneWejsciowe;

public class test {
    public static void main(String[] args) {
        for(Waluta w : DaneWejsciowe.stworzWalutyZPliku()) {
            System.out.println(w.toString());
        };
    }
}
