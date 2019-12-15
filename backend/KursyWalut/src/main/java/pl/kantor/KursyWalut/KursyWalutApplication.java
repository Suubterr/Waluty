package pl.kantor.KursyWalut;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KursyWalutApplication {

	public static void main(String[] args) {
		SpringApplication.run(KursyWalutApplication.class, args);
	}
/*
	TODO:
		1. Aplikacja powinna przed zamknięciem zapisać stan repository do pliku.
//		2. Obmyślić mechanizm ładowania danych z pliku w trakcie pracy aplikacji.
*/

}
