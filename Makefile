APP_NAME=generic-services-api
# Figure out a way to put all of this in package.json

run:
	docker-compose up

test:
	npm run test

install:
	docker-compose -f docker-compose.builder.yml run --rm install-packages

push:
	git add --all
	git commit
	git push -u origin master
	
pull:
	git pull -v origin master

update:
	make pull
	make restart

pm2-start:
	pm2 start --name $(APP_NAME) bin/www

stop:
	pm2 stop $(APP_NAME)

restart:
	pm2 restart $(APP_NAME)

logs:
	pm2 logs $(APP_NAME)

# Database.
db:
	docker exec -it csa-backend npm run db

db-connect:
	docker exec -it db psql -U postgres -d csa_app

# Builds
docker-build:
	npm run build:docker

# Deployments
deploy:
	npm run deploy

deploy-appengine:
	npm run deploy:appengine

