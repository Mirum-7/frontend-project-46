test:
	npx jest

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

fix:
	npx eslint --fix .
