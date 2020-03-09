install:
	docker-compose build --force-rm
	docker-compose run --rm demo npm install
	docker-compose down

uninstall:
	docker-compose down --rmi all

clean:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc)