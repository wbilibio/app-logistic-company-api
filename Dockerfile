###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn install

ENV NODE_ENV production

RUN yarn build

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production


COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "dump-init", "yarn", "start" ]