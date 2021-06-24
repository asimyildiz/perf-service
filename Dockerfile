FROM node:12.19.0

RUN mkdir -p /usr/src/perf-service
WORKDIR /usr/src/perf-service
COPY package.json /usr/src/perf-service/
RUN npm install

COPY . /usr/src/perf-service
ENV NODE_ENV PRODUCTION

EXPOSE 8080
ENTRYPOINT ["/bin/bash", "/usr/src/perf-service/run.sh"]