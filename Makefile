build:
	npm run build
frontend-install:
	make -C frontend install
root-install:
	npm install
install:
	make frontend-install & make root-install
start:
	npm start