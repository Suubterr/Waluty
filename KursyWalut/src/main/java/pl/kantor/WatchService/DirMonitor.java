package pl.kantor.WatchService;

import java.io.IOException;
import java.nio.file.*;

public class DirMonitor {
    public void monitoring() {
        try {
            WatchService ws = FileSystems.getDefault().newWatchService();
            Path path = Paths.get("c:\\test");
            path.register(ws, StandardWatchEventKinds.ENTRY_CREATE);
            WatchKey key;
            while ((key = ws.take()) != null) {
                for (WatchEvent<?> event : key.pollEvents()) {
                    System.out.println("Event kind:" + event.kind()
                            + ". File affected: " + event.context() + ".");
                }
                key.reset();
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
