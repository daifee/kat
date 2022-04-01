

SOURCES = packages

NODE := node
BABEL := node_modules/.bin/babel
YARN := yarn
ESLINT := node_modules/.bin/eslint
JEST := node_modules/.bin/jest

babelparams = --relative packages/*/src --extensions ".ts" -d ../lib

# 
bootstrap: clean
	$(YARN) install
	$(NODE) scripts/generators/tsconfig.pkg.js


# 构建
build: clean-lib-all
	$(MAKE) build-no-bundle


build-no-bundle:
	$(BABEL) $(babelparams)



watch:
	$(BABEL) $(babelparams) --watch


test:
	$(JEST)


# 清除文件
clean:
	$(MAKE) clean-lib-all
	$(MAKE) clean-dependencies-all


clean-lib-all:
	$(foreach source, \
		$(SOURCES), \
		rm -rf $(source)/*/lib \
	)


clean-dependencies-all:
	rm -rf node_modules
	rm -rf package-lock.json
	$(foreach source, \
		$(SOURCES), \
		$(call clean-dependencies, $(source)) \
	)



# lint
lint: lint-js

lint-js:
	$(ESLINT) packages/** scripts/** --ext .js --ext .ts

fix: fix-js

fix-js:
	$(ESLINT) packages/** scripts/** --ext .js --ext .ts --fix

define clean-dependencies
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef
