
# 🧠 Sistema de Gerenciamento de Tarefas com Design Patterns

Este projeto é uma aplicação web que demonstra a aplicação de diversos **Design Patterns (Padrões de Projeto)** utilizando **JavaScript (ES6)**, **HTML5** e **CSS/Bootstrap**.

O sistema permite criar, decorar, notificar e gerenciar tarefas com foco didático em padrões **criacionais**, **estruturais** e **comportamentais**.

---

## 🚀 Funcionalidades

### ✅ Parte 1 — Design Patterns Básicos
| Design Pattern     | Tipo          | Implementação                                               |
|--------------------|---------------|--------------------------------------------------------------|
| **Factory Method** | Criacional    | Criação de tarefas com diferentes tipos (`personal`, `work`) |
| **Decorator**      | Estrutural    | Aplicação dinâmica de recursos como: alta prioridade, etiqueta colorida, data de vencimento |
| **Observer**       | Comportamental| Notificação automática via tela, console e "email simulado"  |

---

### 🧩 Parte 2 — Design Patterns Avançados

| Design Pattern     | Tipo          | Implementação                                               |
|--------------------|---------------|--------------------------------------------------------------|
| **Singleton**      | Criacional    | Logger centralizado com histórico de ações                  |
| **Adapter**        | Estrutural    | Conversão de tarefas simuladas de API externa para o sistema |
| **Command**        | Comportamental| Suporte para desfazer ações como criação de tarefa           |

---

## 📁 Estrutura de Pastas

```

designpatterns/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── models/
│   │   ├── task.js
│   │   └── notification.js
│   ├── patterns/
│   │   ├── factory.js
│   │   ├── decorator.js
│   │   ├── observer.js
│   │   ├── singleton.js
│   │   ├── adapter.js
│   │   └── command.js
│   └── ui/
│       └── ui-controller.js

````

---

## 🖥️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/alexandre-niess/designpatterns.git


2. Abra o arquivo `index.html` em um navegador moderno (Google Chrome recomendado).

> **Não requer backend ou servidor. É 100% client-side.**

---

## 📌 Tecnologias Utilizadas

* **JavaScript (ES6)**
* **HTML5 + CSS3**
* **Bootstrap 5**
* Design Patterns clássicos (GOF)


