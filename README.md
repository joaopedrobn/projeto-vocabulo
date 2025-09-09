# 🔤 Vocábulo – Clone de Termo/Wordle

**Adivinhe a palavra de 5 letras em até 6 tentativas.**  
Um clone moderno do Termo/Wordle feito com **React + Vite**, com animações, teclado interativo e **palavra do dia**.

**🎮 Jogar agora:** **[Vocábulo](https://projeto-vocabulo.vercel.app)**  

---

## 📌 Descrição

O **Vocábulo** recria a experiência clássica de adivinhação de palavras: digite palpites, receba feedback de cores e tente descobrir a **palavra secreta do dia**.  
Foi pensado para ser **responsivo**, **rápido** e agradável de jogar tanto no desktop quanto no celular.

---

## 🖼️ Screenshots

**Tela inicial** 

<img width="1896" height="916" alt="Tela Inicial" src="https://github.com/user-attachments/assets/90f5d87b-69ad-42ef-970a-e84f4636459f" />

**Em jogo**

<img width="1894" height="914" alt="Tela de Jogo" src="https://github.com/user-attachments/assets/7eda604e-c3a2-448e-9c5c-2df68623207c" />

---

## 🌟 Funcionalidades

- 🔐 **Palavra do dia** (mesma para todos os jogadores dentro da data).
- ✅ **Validação de palpite** contra dicionário PT-BR.
- 🎨 **Feedback visual** com cores e animações (*flip* e *shake*).
- ⌨️ **Teclado interativo** com estado das letras (correta, presente, ausente).
- 💾 **Persistência** no navegador (progresso do dia e estado do teclado).
- 📱 **Design responsivo** (desktop e mobile).
- 🔁 **Reinício automático** quando vira o dia.

---

## 💻 Tecnologias Utilizadas

- **React** – UI declarativa e componentizada  
- **Vite** – *Dev server* e build rápidos  
- **CSS moderno** – Flexbox, Grid e variáveis CSS  
- **JavaScript (ES6+)** – Regras do jogo e storage

---

## 🕹️ Como Jogar

1. Digite um **palpite** de 5 letras e pressione **Enter** (ou use o teclado na tela).  
2. Interprete as **cores**:
   - 🟩 **Correta**: letra certa no lugar certo  
   - 🟨 **Presente**: letra existe, mas em outra posição  
   - ⬛ **Ausente**: letra não existe na palavra  
3. Você tem **6 tentativas** para acertar.  
4. A palavra troca **à meia-noite de Brasília (UTC-3)**.

---

## 🔧 Detalhes Técnicos

- **Palavra do dia**: índice determinístico por diferença de dias desde um *epoch* fixo aplicado sobre a lista de respostas.  
- **Validação**: palpite checado contra um **dicionário PT-BR** antes de ser aceito.  
- **Persistência**: `localStorage` guarda progresso do dia (linhas, letras e estado do teclado).  
- **UI/Animações**:
  - *Flip* em sequência nas tiles ao enviar o palpite  
  - *Shake* para palpites inválidos  
  - Teclado em 3 linhas com **offset** na segunda (ENTER e ⌫ como especiais)

> Se você mudar o fuso de referência, ajuste a função que calcula a troca diária.

---

## ⚙️ Rodando Localmente

> Requisitos: **Node 18+** e **npm** (ou pnpm/yarn)

```bash
# 1) Clonar o repositório
git clone https://github.com/joaopedrobn/projeto-vocabulo.git
cd projeto-vocabulo

# 2) Instalar dependências
npm install

# 3) Rodar em desenvolvimento
npm run dev
# Abra o endereço exibido no terminal (ex.: http://localhost:5173)

# 4) Build de produção
npm run build

# 5) (Opcional) Pré-visualizar o build
npm run preview
