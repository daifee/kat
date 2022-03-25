

TSC := ./node_modules/.bin/tsc
NODE := node

# 清除文件
clean-lib:
	rm -rf ./lib

# 只构建，不打包
build-no-bundle: clean-lib
	$(TSC)


test:
	$(NODE) ./packages/stack/lib/index.js