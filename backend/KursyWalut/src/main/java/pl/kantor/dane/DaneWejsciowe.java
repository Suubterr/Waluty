package pl.kantor.dane;

import com.fasterxml.jackson.annotation.JsonAlias;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import pl.kantor.KursyWalut.Waluta;
import pl.kantor.KursyWalut.WalutyRepository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class DaneWejsciowe {

    static private String sciezkaDoPlikuWalutTXT = "c:\\KursyWalut\\Tablica.txt";
    static private String getSciezkaDoPlikuWalutJSON = "c:\\KursyWalut\\Tablica.json";

    static final File TXT_FILE = new File(sciezkaDoPlikuWalutTXT);
    static final File JSON_FILE = new File(getSciezkaDoPlikuWalutJSON);


    public static List<Waluta> stworzWalutyZPliku() {

        File f;

        if(JSON_FILE.exists() && TXT_FILE.exists()) {
            f = JSON_FILE.lastModified() > TXT_FILE.lastModified() ? JSON_FILE : TXT_FILE;
        } else if (JSON_FILE.exists()) {
            f = JSON_FILE;
        } else {
            f = TXT_FILE;
        }

        System.out.println("Nazwa pliku: " + f.getName());

        List<Waluta> waluty = new ArrayList<>();

        long id = 0;
        String kod = null;
        double skup = 0;
        double sprzedaz = 0;

        try {
            if(f.getName().toUpperCase().equals("TABLICA.TXT")) {
                System.out.println("czytane dla TABLICA.TXT");
                Scanner scanner = new Scanner(f);
                while (scanner.hasNext()) {
                    String liniaZPliku = scanner.nextLine();
                    kod = liniaZPliku.split(";")[0];
                    skup = Double.parseDouble(liniaZPliku.split(";")[1]);
                    sprzedaz = Double.parseDouble(liniaZPliku.split(";")[2]);
                    waluty.add(new Waluta(kod, skup, sprzedaz));
                }
            } else {
                System.out.println("czytane dla TABLICA.JSON");
                JSONParser jsonParser = new JSONParser();
                FileReader reader = new FileReader(f);
                Object obj = jsonParser.parse(reader);
                JSONArray listaWalut = (JSONArray) obj;
                for(Object o : listaWalut) {
                    id = Long.parseLong(((JSONObject) o).get("id").toString());
                    kod = (String)((JSONObject) o).get("kod");
                    skup = Double.parseDouble(((JSONObject) o).get("skup").toString());
                    sprzedaz = Double.parseDouble(((JSONObject) o).get("sprzedaz").toString());
                    waluty.add(new Waluta(id, kod, skup, sprzedaz));
                }
            }
            return waluty;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String zaladujWalutyDoRepo(List<Waluta> waluty, WalutyRepository repo) {
        repo.deleteAll();
        for(Waluta w : waluty) {
            repo.save(w);
        }
        return "Załadowano waluty do repo: " + waluty.toString();
    }

    public static String zaladujWalutyDoPliku(WalutyRepository repo) {
        File f = new File(getSciezkaDoPlikuWalutJSON);
        try {
            f.createNewFile();
            FileWriter fw = new FileWriter(getSciezkaDoPlikuWalutJSON);
            fw.write(repo.findAll().toString());
            fw.close();
            return "Załadowano waluty do pliku JSON: " + repo.findAll().toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


}
