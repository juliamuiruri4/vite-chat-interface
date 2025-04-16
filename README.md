# Vite + Lit AI Chat Interface Template

This template provides a simple, modern chat UI built with [Vite](https://vitejs.dev/) and [Lit](https://lit.dev/). It's designed as a starting point for integrating AI chat models (such as Azure OpenAI, OpenAI, or your own backend) into a web application.

![Chat UI Screenshot](./ai-chat-interface.png)

## Features

- ⚡️ **Vite** for fast development and builds
- ✨ **Lit** for lightweight, reactive web components
- 💬 **Chat UI** with persistent local history
- 🗂️ **Easy integration** with your AI backend (just replace a single function)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Azure Developer CLI(azd)](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd?tabs=winget-windows%2Cbrew-mac%2Cscript-linux&pivots=os-windows) installed

### Get the Code

If you already have the Azure Developer CLI installed on your machine, using this template is as simple as running this command in a new directory.

```sh
azd init -t vite-chat-interface
```

### Run the App

To start the development server, run:

```sh
cd webapp
npm install
npm run dev
```

### To deploy the app on Azure

To deploy the app on Azure (Azure Static Web Apps), run:

```sh
azd up
```
This command will create the necessary Azure resources and deploy your app.