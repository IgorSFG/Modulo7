# Projeto Pokelist

O projeto pokelist é uma solução containerizada web que possibilita os usuários registrarem anotações em um banco de dados, e nada mais legal que notas sobre POKEMONS! Ele teve seu desenvolvimento a partir das tecnologias de html, css, javascript e docker.

# Como o Pokelist foi feito?

## Estrutura das Pastas

```
└───containers
    ├───application
    |   ├───node_modules
    |   └───frontend
    |       ├───pages
    |       └───scripts
    └───db
```

Para o funcionamento do pokelist foi idealizado uma estrutura de 7 pastas:
- containers: considerada a pasta raíz do projeto, ela armazena todo o conteudo para aplicação da solução containerizada.
- application: armazena a aplicação web. Itens como o frontend, servidor, lista de dependências e a pasta node_modules para seu armazenamento, arquivo para manipulçao do banco dos dados e o Dockerfile para configuração da imagem respectiva estão inseridos nessa pasta.
- frontend: pasta armazenada no application. Ela é responsável por toda a interface da aplicação. Nela está contida o arquivo style.css para customização do layot das páginas, e as pastas pages e scripts, que guardam a estrutura delas em html e suas funcionalidades em javascript respectivamente.
- db: esão armazenados o arquivo de inicialização da tabela com os valores de teste do usuário, e seu arquivo Dockerfile respectivo para criação da imagem.

# Arquitetura da Solução
![Pokelist](https://github.com/IgorSFG/Modulo7/blob/main/pond2/Pokelist.jpg)

A arquitetura da solução consiste em 2 containers, um para disponibilizar o banco de dados, enquanto outro ficaria com a aplicação em si. Ela foi idealizada dessa maneira, pois como o javascript é uma linguagem de programação voltada a web, suas funções costumam necessitar de tal para terem êxito em seu funcionamento, e para serem disponibilizadas nesse ambiente, precisam ser enviados por um servidor, sendo este o backend, tirando todo o sentido de separar as duas composições do sistema (backend e frontend).

A arquitetura consiste em 4 blocos principais:
- Backend: responsável por ativar o servidor e definir as rotas e suas respectivas funções, como envio de arquivos e rquisições ao banco de dados do postgres.
- Banco de dados do postgres: responsável por armazenar a tabela de usuarios logados no sistema e seus respectivos dados, como nome e senha. 
- Frontend: responsável pela estruta das páginas e suas funcionalidades, como inserção de texto e imagens, ele realiza requisições para o backend e se conecta com o supabase para o envio e recebimento de dados.
- Banco de dados do Supabase: responsável por disponibilizar o bucket para armazenamento de arquivos de imagem.

# Pokelist em Ação!
A imagem pode ser encontrada [no meu repositório](https://hub.docker.com/repository/docker/igorsfg/pokeapp/tags), basta apenas baixar a imagem com:
```
docker pull igorsfg/pokeapp:1.0
```

Clone esse repositório, vá para o diretório "/containers" e execute o comando:
```
docker compose up
```

Após a execução, o Pokelist irá aparecer [AQUI :D](http://127.0.0.1:5000)
