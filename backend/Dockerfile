# Usa uma imagem base do Node.js
FROM node

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app-backend

# Copia o arquivo package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package.json .

RUN npm install

COPY . .

# Instala as dependências do projeto

EXPOSE 8000

CMD [ "npm", "run", "dev"]

# Define a porta em que o servidor irá escutar

# Define o comando de inicialização do contêiner
