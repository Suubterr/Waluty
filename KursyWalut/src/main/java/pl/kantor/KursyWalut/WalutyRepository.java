package pl.kantor.KursyWalut;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WalutyRepository extends JpaRepository<Waluta, Long> {
}
