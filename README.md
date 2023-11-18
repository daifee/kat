# kat
工具箱
feature-test2.1

[TOC]

---

**目标:**

- [x] LinkedList
- [x] Queue
- [x] Stack
- [ ] LRU



## 开发

### 环境依赖

- Node: 版本 `>= 16.14.2`
- Yarn: 版本 `>= 1.19.0`
- Make: 如果是Windows 10，请使用[WSL](https://docs.microsoft.com/en-us/windows/wsl/install)


### 初始化

克隆仓库：

```sh
$ git clone https://github.com/daifee/kat.git
$ cd kat
```

创建开发分支：

```sh
$ git checkout -b <branch-name>
```

初始化：

```sh
$ make bootstrap
```

### 构建

```sh
$ make build

# 只构建一个 package，例如：linked-list
$ PACKAGE=linked-list make test
```

### 测试

```sh
$ make test

# 测试某个 package，例如：linked-list
$ PACKAGE=linked-list make test
```

### 检查

```sh
$ make lint
```

### 修复

```sh
$ make fix
```

### 发布

```js
// 文档
```
