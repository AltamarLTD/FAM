FROM node:10-alpine as build-step
RUN mkdir -p /fam
WORKDIR /fam
COPY package.json /fam
RUN npm install
COPY . /fam
RUN npm run build --prod
FROM nginx:1.17.1-alpine
COPY --from=build-step /fam/dist/FAM /usr/share/nginx/html
