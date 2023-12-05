package prova.pokemon;

import com.intuit.karate.junit5.Karate;

public class PokemonRunner {

    @Karate.Test
    Karate testUsers() {
        return Karate.run("pokemon").relativeTo(getClass());
    }
}