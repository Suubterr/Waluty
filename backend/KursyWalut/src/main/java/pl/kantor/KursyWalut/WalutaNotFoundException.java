package pl.kantor.KursyWalut;

public class WalutaNotFoundException extends RuntimeException {
    WalutaNotFoundException(Long id) {
        super("Nie znaleziono waluty " + id);
    }
}
