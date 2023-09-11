FROM node
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm i
CMD ["yarn", "preview"]