

SOURCES = packages
NODE := yarn node
YARN := yarn
ESLINT := node_modules/.bin/eslint


# 启动
bootstrap: clean
	$(YARN) install
	$(NODE) scripts/generators/tsconfig.pkg.js



#####################
# 构建
#####################
build: clean-lib-all
	./scripts/build.sh



#####################
# 测试
#####################
test: lint test-only

test-only:
	./scripts/test.sh


#####################
# 检查代码
#####################
# lint
lint: lint-js

lint-js:
	$(ESLINT) --ext .js --ext .ts packages/ scripts/

#####################
# 修复代码
#####################
fix: fix-js

fix-js:
	$(ESLINT) packages/** scripts/** --ext .js --ext .ts --fix


#####################
# 清除文件
#####################
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




#####################
# 部署
#####################
update-package-version:
	$(YARN) install
	$(NODE) ./scripts/release/update-package-version.js --release-tag $(RELEASE_TAG)


pre-publish:
	$(MAKE) bootstrap
	$(MAKE) build
	$(MAKE) test

npm-publish: pre-publish
	$(NODE) ./scripts/release/publish.js --release-tag $(RELEASE_TAG)


define clean-dependencies
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json
endef
