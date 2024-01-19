# Stage 1
FROM node:latest as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ENV ENV_FILE=.env.prod
COPY $ENV_FILE /app/.env
RUN npm run build


# Stage 2
FROM nginx:alpine
#Copy ci-dashboard-dist
COPY --from=node /app/dist/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf