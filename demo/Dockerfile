FROM node:10.15.0-alpine

WORKDIR /usr/src/app
RUN apk add ncurses

# build-dependencies serves as a name for the group [ make g++ python ]
RUN apk update && \
	apk --no-cache --virtual build-dependencies add \
	python \
	make \
	g++

EXPOSE 80

CMD ["npm", "run", "dev"]
