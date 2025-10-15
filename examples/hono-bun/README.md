Hono + Bun example

Este exemplo mostra um pequeno servidor Hono que roda sobre Bun.

Como rodar (local, precisa Bun instalado):

1. Instale Bun: https://bun.sh/
2. No diretório deste exemplo rode:

```bash
bun install
bun run index.tsx
```

Endpoints:
- GET / -> retorna "Hello world!"
- GET /api/health -> retorna { status: "ok" }

Como salvar este exemplo em um novo repositório GitHub (requer `gh` autenticado):

```bash
# do diretório raiz do repo atual
git checkout -b save-hono-example
mkdir -p examples/hono-bun
# copie os arquivos para examples/hono-bun (já estão aqui)
git add examples/hono-bun
git commit -m "add hono bun example"
gh repo create your-username/hono-bun-example --public --source=. --remote=origin
git push -u origin save-hono-example
```
