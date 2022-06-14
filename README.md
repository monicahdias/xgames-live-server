# Projeto (Módulo 4): Xbox Live

## Backend - Estrutura básica requerida
Criar uma API backend com usuários, perfis, jogos e gêneros.

### Estrutura da Entidade: Usuários (Users)
- Name;
- Email;
- Password;
- CPF;
- isAdmin;

### Estrutura da Entidade: Perfis (Profiles)
- Title;
- ImageUrl;

### Estrutura da Entidade: Jogos (Games)
- Title;
- CoverImageUrl;
- Description;
- Year;
- ImdbScore (0 a 5);
- TrailerYouTubeUrl;
- TrailerYouTubeUrl;

### Estrutura da Entidade: Gêneros (Genres)
- Name;

### Relações
- Um usuário x muitos perfis;
- Muitos jogos x muitos gêneros;
- Muitos perfis x muitos jogos (jogos favoritos);

### Endpoints
[Create] Usuários (não precisa de autenticação);
[AUTH] [GET] Homepage: lista de jogos favoritos; lista de jogos, classificados por gênero;
[AUTH] [CRUD] Perfis; Favoritar jogo;
[AUTH] [ADMIN] [CRUD] Usuários (apenas admins podem gerenciar usuários);
[AUTH] [ADMIN] [CRUD] Jogos (apenas admins podem criar jogos);
[AUTH] [ADMIN] [CRUD] Gêneros (apenas admins podem criar gêneros).

### Requisitos
- Validação de dados em todos os endpoints com class-validator;
- Status Code corretos em todos os endpoints:
    - 200, 201, 400, 404, etc.
- Persistência de Dados no SQL com Prisma;
- Formatação do código utilizando o Prettier/ESLint;
- Documentação dos endpoints com Swagger;
- Diagrama de relacionamentos do banco de dados;
- Cors habilitado;
- Deploy do projeto;
- Deploy do banco de dados.
