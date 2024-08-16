# npm run knexmigrate
node app.js
docker-compose exec sternguard  npx knex migrate:latest
docker-compose exec sternguard  npx knex seed:run