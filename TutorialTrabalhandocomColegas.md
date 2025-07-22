# Trabalhaando em Equipe com GitHub Usando Branches

### Passo a passo para colaborar com um colega no mesmo projeto

---

##  1. Clonar o projeto

 Primeiro, apenas **uma pessoa cria o repositório no GitHub**.  
Depois, os colegas fazem uma cópia do projeto no computador com os comandos:

```bash
git clone https://github.com/nome-do-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

---

## 2. Criar uma branch com seu nome ou tarefa

Cada pessoa cria uma **branch separada** para fazer suas alterações:

```bash
git checkout -b nome-da-branch
```

**Exemplos de nomes:**
- `login`
- `dalvana-menu`
- `jose-formulario`

🔄 Isso evita que todos mexam no mesmo lugar ao mesmo tempo.

---

##  3. Fazer mudanças no projeto

Agora você pode:
- Criar arquivos
- Editar códigos
- Mexer no HTML, CSS, JS etc.

---

##  4. Salvar e registrar as mudanças

Depois de editar, use estes comandos para **salvar** as alterações:

```bash
git add .
git commit -m "Descreva aqui o que foi feito"
```

**Exemplo:**

```bash
git commit -m "Adiciona a tela de login com botão"
```

---

##  5. Enviar sua branch para o GitHub

Agora envie sua branch com o comando:

```bash
git push origin nome-da-branch
```

---

##  6. Criar um Pull Request

No site do **GitHub**:

1. Vá até o repositório
2. Clique em **"Compare & pull request"**
3. Escreva uma mensagem clara explicando a alteração
4. Clique em **"Create pull request"**

---

##  7. Revisar e Mesclar no GitHub

- O colega pode revisar o código
- Se estiver tudo certo, clique em **"Merge pull request"**
- Isso une sua branch à branch principal (`main`)

---

##  8. Atualizar o projeto local

Antes de começar um novo trabalho, atualize seu código com:

```bash
git checkout main
git pull origin main
```

---

baixar uma branch
git clone --branch nome-da-branch --single-branch https://github.com/usuario/repositorio.git

##  Dicas finais

- Cada funcionalidade nova → uma nova branch
-  Nunca trabalhe diretamente na `main`
-  Use nomes simples nas branches: `formulario`, `menu`, `galeria`
-  Sempre atualize sua `main` com `git pull` antes de começar algo novo
-  Combine com seu colega para evitar conflitos!

---
*
