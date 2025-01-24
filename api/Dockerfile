FROM ruby:alpine3.20 AS base

RUN apk --no-cache add build-base tzdata bash
RUN apk --no-cache add postgresql-dev
RUN apk --no-cache add git vim

ARG UNAME=gustavo
ARG UPASSWORD=gustavo

RUN adduser -S -G wheel "${UNAME}"

RUN echo "${UNAME}:${UPASSWORD}" | chpasswd;

RUN apk --no-cache add bash
RUN apk --no-cache add --update nodejs npm
RUN npm i -g @nestjs/cli
RUN npm i -g typeorm

RUN apk --no-cache add sudo busybox-suid
RUN echo '%wheel ALL=(ALL) ALL' > /etc/sudoers.d/wheel

USER ${UNAME}
WORKDIR "/home/${UNAME}"

ENTRYPOINT ["/bin/bash"]
