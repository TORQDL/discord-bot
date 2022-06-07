FROM node:lts-alpine3.9

LABEL title="TORQ Discord Bot"
LABEL author="Ty Baldwin <ty@torqdl.com> (https://www.torqdl.com)"
LABEL maintainer="Ty Baldwin <ty@torqdl.com> (https://www.torqdl.com)"
LABEL version="1.0.0"
LABEL description="Command and control bot for the TORQ Digital Labs Discord server."
LABEL contributors="Ty Baldwin <ty@torqdl.com> (https://www.torqdl.com)"



USER root
ENV APP /usr/src/APP
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --loglevel=warn \
    && mkdir -p $APP \
    && mv /tmp/node_modules $APP
COPY src $APP/src
COPY package.json $APP
COPY tsconfig.json $APP
WORKDIR $APP
RUN npm run buildCMD [ "node", "dist/index.js" ]
