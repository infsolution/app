# Plano: Configuração do Frontend para Tech Provider

## Estado Atual

O frontend Next.js 14 App Router + Tailwind + TypeScript já está implementado com as páginas obrigatórias:

- `app/connect/page.tsx` — Conecta via Facebook SDK, envia code para backend
- `app/test-send/page.tsx` — Formulário de teste de envio de mensagens
- `app/templates/page.tsx` — Criação e listagem de templates
- `app/privacy/page.tsx` — Política de privacidade (básica)
- `app/terms/page.tsx` — Termos de serviço (básicos)
- `app/layout.tsx` — Layout raiz com Navbar + Footer
- `lib/api.ts` — Camada de chamadas ao backend
- `lib/facebook.ts` — Utilitários do Facebook SDK (verificar existência)

## Problema Identificado

As variáveis de ambiente `.env` e `.env.local` estão **vazias**:

```
NEXT_PUBLIC_FB_APP_ID=
NEXT_PUBLIC_FB_CONFIG_ID=
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/v1
```

A página `/connect` exibe erro imediatamente quando `FB_APP_ID` ou `FB_CONFIG_ID` estão em branco, travando o fluxo de desenvolvimento.

## Objetivos

1. Configurar variáveis de ambiente com valores de explorar para permitir desenvolvimento
2. Melhorar as páginas de política de privacidade e termos para atender App Review
3. Deixar o frontend online e funcional para coleta dos valores reais

## Tarefas

### 1. Configurar Variáveis de Ambiente

Arquivos a serem atualizados:
- `.env.local` — valores de explorar para desenvolvimento
- `.env.example` — já está correto, servir de referência

Valores de explorar sugeridos:
- `NEXT_PUBLIC_FB_APP_ID=1234567890123456` (placeholder)
- `NEXT_PUBLIC_FB_CONFIG_ID=1234567890123456789` (placeholder)
- `NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/v1`

> **Nota:** O desenvolvedor deve substituir esses valores por reais assim que tiver o App ID e Config ID da Meta.

### 2. Melhorar Política de Privacidade

Arquivo: `app/privacy/page.tsx`

A página atual é muito simples. App Review exige:
- Explicação clara sobre dados coletados
- Como os dados são usados
- Como os dados são compartilhados
- Direitos do usuário
- Contato para privacidade

### 3. Melhorar Termos de Serviço

Arquivo: `app/terms/page.tsx`

A página atual é muito simples. App Review exige:
- Condições de uso
- Responsabilidades do usuário
- Limitações de serviço
- Resolução de conflitos
- Lei aplicável

### 4. Verificar Dependências do Facebook SDK

Arquivo: `lib/facebook.ts` — verificar se existe e está correto

### 5. Testar Build

```bash
cd /home/cicero/Projetos/Whatsapp/app
npm run build
```

## Critérios de Aceitação

- [ ] `.env.local` configurado com valores de explorar
- [ ] `npm run build` passa sem erros
- [ ] Página `/privacy` contém política completa
- [ ] Página `/terms` contém termos completos
- [ ] Páginas `/connect`, `/test-send`, `/templates` renderizam sem erro de configuração
- [ ] `lib/facebook.ts` existe e está correto

## Próximos Passos

Após execução deste plano:
1. Desenvolvedor fornece `NEXT_PUBLIC_FB_APP_ID` e `NEXT_PUBLIC_FB_CONFIG_ID` reais
2. Atualizar `.env.local` com valores reais
3. Reiniciar o server de desenvolvimento
4. Testar fluxo completo de conexão