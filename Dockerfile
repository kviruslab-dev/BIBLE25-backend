FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 5000
CMD ["node", "dist/main.js"]