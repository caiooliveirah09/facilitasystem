# Usa uma imagem base do Node.js
FROM node
# Define o diretório de trabalho dentro do contêiner
WORKDIR /app-frontend

# Copia o arquivo package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package.json .

RUN npm install


# Instala as dependências do projeto
COPY . .

# Copia os arquivos do frontend para o diretório de trabalho
EXPOSE 3000

CMD ["npm", "run", "dev"]
# Compila o código do frontend

# Define o comando de inicialização do contêiner