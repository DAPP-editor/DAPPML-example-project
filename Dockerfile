FROM node:16
WORKDIR /app
COPY ./updater .
RUN cd template-project; npm install
RUN  npm install
EXPOSE 3000
EXPOSE 443

CMD ["npm", "start"]