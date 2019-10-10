FROM node:7
RUN mkdir /rest-api-dockerize
ADD . /rest-api-dockerize
WORKDIR /rest-api-dockerize
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
