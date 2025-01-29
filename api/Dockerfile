FROM ruby:alpine3.20 AS base

RUN apk --no-cache add build-base tzdata bash
RUN apk --no-cache add postgresql-dev
RUN apk --no-cache add git vim

ARG UID=1000
ARG UNAME=gustavo
ARG UPASSWORD=gustavo

RUN adduser -S -G wheel \
    --uid "${UID}" \
    "${UNAME}"

RUN echo "${UNAME}:${UPASSWORD}" | chpasswd;

RUN apk --no-cache add bash
RUN apk --no-cache add --update nodejs npm
RUN npm i -g @nestjs/cli

RUN apk --no-cache add sudo busybox-suid
RUN echo '%wheel ALL=(ALL) ALL' > /etc/sudoers.d/wheel

COPY --chown=${UNAME}:wheel sales-agenda-api /home/${UNAME}/sales-agenda-api

USER ${UNAME}
WORKDIR "/home/${UNAME}/sales-agenda-api"

RUN npm i
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]

# ENTRYPOINT ["/bin/bash"]
