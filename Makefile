build:
	npm run build
frontend-install:
	npm ci --prefix frontend
root-install:
	npm ci
install:
	make frontend-install && make root-install
start:
	npm start