PHONY: default

clean:
	@rm -f make.html

node_modules:
	@npm install

make.html:
	@wget http://www.gnu.org/software/make/manual/make.html -O make.html

update: clean default

default: node_modules make.html