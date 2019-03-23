FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
EXPOSE 35729

CMD [ "npm", "start" ]

#docker run -it -p 80:3000/tcp 393cb7bf41dc
#"https://assafushy.visualstudio.com"