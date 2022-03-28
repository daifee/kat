

SOURCES = packages

NODE := node
BABEL := node_modules/.bin/babel
NPM := npm

babelparams = --relative packages/*/src --extensions ".ts" -d ../lib

bootstrap: clean
	$(NPM) install
	$(NODE) scripts/generators/tsconfig.pkg.js


build: clean-lib-all
	$(MAKE) build-no-bundle

watch:
	$(BABEL) $(babelparams) --watch


# 安装的依赖
# 编译生成的目标文件
clean:
	$(MAKE) clean-lib-all
	$(MAKE) clean-dependencies-all

# 清除生成的文件
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


# 只构建，不打包
build-no-bundle:
	$(BABEL) $(babelparams)


test:
	$(NODE) packages/stack/lib/index.js



define clean-dependencies
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef
