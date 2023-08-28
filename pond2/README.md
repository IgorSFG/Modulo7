# Projeto Pokelist

O projeto pokelist é uma solução containerizada web que possibilita os usuários registrarem anotações em um banco de dados, e nada mais legal que notas sobre POKEMONS! Ele teve seu desenvolvimento a partir das tecnologias de html, css, javascript e docker.

# Como o Pokelist foi feito?

Pokelist é uma aplicação de multiplos containers. A arquitetura da solução idealiazada, seria um container responsável por disponibilizar o banco de dados, enquanto outro ficaria com a aplicação em si. Ela foi idealizada dessa maneira, pois como o javascript é uma linguagem de programação voltada a web, suas funções costumam necessitar de tal para terem êxito em seu funcionamento, e para serem disponibilizadas nesse ambiente, precisam ser enviados por um servidor, sendo este o backend, tirando todo o sentido de separar as duas composições do sistema (backend e frontend).

## Estrutura das Pastas

```
└───containers
    ├───application
    |   └───frontend
    |       ├───pages
    |       └───scripts
    └───postgres
```

# Arquitetura da Solução
![Pokelist](https://github.com/IgorSFG/Modulo7/blob/main/pond2/Pokelist.jpg)

# Pokelist em Ação!
