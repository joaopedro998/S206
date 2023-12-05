Feature: Testes da API PokeAPI.co

Background:
  * url 'https://pokeapi.co/api/v2'

Scenario: Consulta de informações válidas de um Pokémon
  Given path '/pokemon/1'
  When method GET
  Then status 200
  And match response.name == 'bulbasaur'
  And match response.types[0].type.name == 'grass'


Scenario: Consulta de informações inválidas de um Pokémon
  Given path '/pokemon/10000'
  When method GET
  Then status 404

Scenario: Pesquisa de um Pokémon por nome
  Given path '/pokemon/charizard'
  When method GET
  Then status 200
  And match response.name == 'charizard'
  And match response.types[0].type.name == 'fire'

Scenario: Consulta de informações de um tipo de Pokémon
  Given path '/type/water'
  When method GET
  Then status 200
  And match response.name == 'water'
  And match response.damage_relations.double_damage_from[0].name == 'grass'

Scenario: Consulta de informações de uma habilidade de um Pokémon
  Given path '/ability/34'
  When method GET
  Then status 200
  And match response.name == 'chlorophyll'
  And match response.flavor_text_entries[0].flavor_text == 'Raises SPEED in sunshine.'

Scenario: Excluir um Pokémon existente
  Given path '/pokemon/6'
  When method delete
  Then status 204
