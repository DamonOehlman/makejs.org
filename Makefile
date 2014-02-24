PORT ?= 8000
BIN=./node_modules/.bin/

PHONY: default

clean:
	@rm -f make.html

node_modules:
	@npm install

make.html:
	@echo "retrieving the raw make manual"
	@wget http://www.gnu.org/software/make/manual/make.html -O make.html

update: clean default

default: node_modules make.html
	@echo "enwondering the make manual"
	@node enwonder.js

serve: default
	@$(BIN)/st -nc -p $(PORT)
