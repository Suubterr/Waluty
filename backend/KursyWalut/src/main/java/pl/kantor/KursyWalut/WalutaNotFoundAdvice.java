package pl.kantor.KursyWalut;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class WalutaNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(WalutaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String walutaNotFoundHandler(WalutaNotFoundException ex) {
        return ex.getMessage();
    }
}
