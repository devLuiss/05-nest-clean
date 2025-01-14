# Resumo para Leigos em NestJS

## Controllers:

- São a **porta de entrada** da aplicação através do HTTP.
- Quando o usuário faz uma requisição HTTP, o primeiro lugar que o Nest usa para processar a requisição é o **Controller**.
- No NestJS, os Controllers são identificados com o decorator `@Controller`. Esse decorator transforma a classe em um controlador, permitindo que seus métodos sejam mapeados para rotas HTTP.
- **Métodos HTTP** como `@Get`, `@Post`, `@Put`, `@Delete` são decorators usados nos métodos da classe Controller para definir as rotas e os tipos de requisições que esses métodos lidam.
- Por exemplo, um método com o decorator `@Get()` será acionado quando uma requisição GET for feita à rota associada.
- Você pode passar parâmetros para os decorators `@Controller` e `@Get` para definir **prefixos e rotas** específicas. Exemplo: `@Controller('api')` vai prefixar todas as rotas desse controller com `/api`, e `@Get('hello')` vai responder à rota `/api/hello`.
- Isso facilita organizar rotas e criar APIs RESTful de maneira eficiente.

## Pipe/s

- sao midlewares / interceptadores
- validacoes por exemplo

## Decorators:

- **Decorators** são funções especiais que adicionam comportamento a **classes**, **métodos**, **propriedades**, ou até **parâmetros**.
- Eles são usados extensivamente no NestJS e são herdados de conceitos do TypeScript e até do Java (JSF, JSP).
- Em termos simples, eles são como funções que recebem uma classe ou um método como argumento e **modificam seu comportamento** de alguma maneira.
- Exemplo de decorators no NestJS:
  - `@Controller`: Marca uma classe como um controlador HTTP.
  - `@Get`, `@Post`: Definem métodos que respondem a requisições HTTP específicas.
  - `@Injectable`: Marca uma classe como algo que pode ser **injetado** em outras classes (injeção de dependência).
- Você pode criar seus próprios decorators para reutilizar lógicas e comportamentos personalizados.

## Módulos (Modules):

- Um **módulo** no NestJS é responsável por **organizar** e **reunir** várias partes da aplicação como controllers, serviços, configurações e conexões com bancos de dados.
- **Módulos** são a base estrutural da aplicação no NestJS, funcionando como "pacotes" que agrupam diferentes funcionalidades.
- Um módulo agrupa controllers e providers (serviços) que o módulo irá usar.
  - **Controllers**: São os controllers que fazem parte desse módulo.
  - **Providers**: São classes ou serviços que implementam lógica de negócio ou se conectam a um banco de dados, e que podem ser injetados em controllers ou em outros serviços.

## Inversão de Dependência e Injeção de Dependências:

- O **NestJS** utiliza um padrão conhecido como **Inversão de Dependência** (Dependency Injection) que facilita a gestão de dependências entre classes.
- Em vez de o Controller criar uma instância do serviço que ele precisa diretamente (fazendo `new`), ele **recebe** a instância do serviço por meio do construtor. Isso é gerido pelo próprio Nest.
- A injeção de dependência é configurada automaticamente através dos módulos. Ao listar um serviço nos **Providers** de um módulo, o Nest garante que esse serviço pode ser injetado em qualquer lugar necessário (ex: em um Controller).
- Para que uma classe possa ser injetada em outras classes, ela precisa ser decorada com `@Injectable()`.

## Services (Serviços/Providers):

- Um **serviço** (ou **Provider** no contexto do Nest) é qualquer classe que contenha lógica de negócio, acesso a banco de dados, ou outras funções reutilizáveis.
- **Providers** podem ser injetados em Controllers ou em outros Providers.
- Exemplo: `AppService` pode ser um serviço que contém lógica para buscar ou manipular dados e que é injetado em um Controller para lidar com requisições HTTP.
- Todos os serviços precisam ser marcados com o decorator `@Injectable()` para que possam ser injetados como dependências em outras partes da aplicação.

## Guards (Proteção de Rotas)

- **Guards** no NestJS são usados para proteger rotas e determinar se uma requisição pode ou não ser processada com base em certas condições. Eles funcionam como "porteiros" para as rotas, decidindo se a requisição deve ou não seguir adiante.
- Um **Guard** é basicamente uma classe que implementa a interface `CanActivate`, que tem um método `canActivate()` que retorna `true` (se a requisição pode prosseguir) ou `false` (se ela deve ser bloqueada). Esse método pode ser **assíncrono** e também pode retornar uma `Promise<boolean>`.

## Organização de Módulos:

- Com o tempo, conforme a aplicação cresce, você pode querer dividir seu código em múltiplos módulos menores para **organizar melhor** e **facilitar a manutenção**.
- O conceito de **Import e Export** no Nest permite que você organize sua aplicação modularmente, importando um módulo dentro de outro e exportando funcionalidades para que sejam reutilizadas em diferentes partes do sistema.
- Isso é útil quando você quer dividir a lógica em diferentes módulos, como um módulo para **autenticação**, outro para **usuários**, outro para **pedidos**, etc.

```

```
