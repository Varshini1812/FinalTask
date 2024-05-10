FROM node:16.15.0 
ARG env=prod
WORKDIR /home/node/app 
ENV NODE_ENV="production"
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone
COPY . .
RUN npm install --include=dev 
RUN npm run build
EXPOSE 3000 
CMD [ "node", "dist/src/server.js" ]
