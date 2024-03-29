---
layout: post
title: Deployment Web App using GitHub Actions & Netlify
subtitle: Deployment VanillaJS Project with Webpack using GitHub Actions on GitHub Pages
excerpt_image: NO_EXCERPT_IMAGE
categories: [cloud]
tags: [github actions, gh-pages, webpack, vanilla.js]
---

### 1. What is the Action? 👩‍

`GitHub Actions`는 깃허브에서 제공하는 CI/CD 를 도와주는 서비스다. 유사한 서비스로는 CircleCI, Travis CI, 
Jenkins, Fastlane 와 같은 것들이 존재한다. Actions 의 장점은 깃허브에서 제공하는 것으로 설정이나 연동이 쉽다는 것이다. 
깃허브 액션에서 반드시 알아야 할 개념은 `Events`, `Jobs`, `Actions`, `Runners`, `Secrets`, `Workflows`의 
6가지 개념이다.

#### 1. Events

깃허브 액션을 실행할 이벤트 트리거 조건을 지정한다.

이벤트 중 주로 사용되는 트리거 유형은 다음과 같다.

1. **push**: 코드를 푸시할 때.
2. **pull_request**: Pull Request 를 생성하거나 업데이트할 때.
3. **issues**: 이슈가 생성되거나 업데이트될 때.
4. **issue_comment**: 이슈에 새로운 댓글이 작성될 때.
5. **pull_request_review**: Pull Request 를 리뷰할 때.
6. **pull_request_review_comment**: Pull Request 리뷰에 새로운 댓글이 작성될 때.
7. **repository_dispatch**: 사용자 정의 이벤트를 수신할 때.
8. **schedule**: 일정에 따라 주기적으로.
9. **workflow_dispatch**: 수동으로 워크플로우를 실행할 때.

#### 2. Jobs

*Workflows* 에서 실행되는 개별 작업 단위로 실제로 무엇을 할까에 대한 정의를 포함한다. 따라서 Workflows YAML 파일의 대부분을 
차지하며, 도커 컴포즈가 여러 컨테이너에 대한 작업을 설정하듯이 Workflows 는 여러 Jobs 를 설정하게 된다.

따라서 필요에 따라 하나의 Workflows 안에는 하나 또는 그 이상의 Jobs 를 포함하게 된다.

#### 3. Actions

Jobs 는 내가 사용할 작업에 대해 Workflows 에 정의를 하는 것이라면, Actions 는 재사용 가능한 단위로, 도커와 비교하면 
*Docker Hub* 의 공개된 컨테이너 또는 직접 만든 비공개 컨테이너라 볼 수 있다.

Actions 를 직접 만들기도 하지만, `Marketplace`를 통해 커뮤니티로 운영되는 액션을 가져와 Jobs 에 사용할 수 있다.

Jobs 가 실제로 Workflows 에서 수행될 작업에 대해 정의한다면, Actions 는 재사용 가능한 단위로 패키징 된 chunk 에 해당한다.

#### 4. Runners

깃허브에서 제공하는 호스팅 환경을 사용하는 것은 물론, Vercel, 셀프 호스팅 등의 실행 환경을 사용할 수 있다.

#### 5. Secrets

`.env`와 같은 파일은 올려서는 안 되고, 실수로 인한 유출을 막기 위해 올릴 수 없도록 막혀있다. 하지만 서비스 호스팅을 위해서는 
`API`키 또는 `DB Connection` 정보 등 다양한 비밀 정보가 필요하다. 따라서 깃허브는 이런 정보를 *repositories* 에 올리는 대신 
`Secrets`를 제공하고, 여기 작성한 정보는 암호화 되었다 *Workflows 가 수행될 때 복호화*되어 깃허브 액션 상 환경 변수로 사용할 수 
있는 설정을 제공한다.

#### 6. Workflows

깃허브 액션에서 CI/CD 를 위한 핵심 단위로 어떤 작업을 언제 어떻게 할까에 대해 정의한 문서로 도커와 비교하면 
**Docker-Compose** 에 해당한다. 깃허브 *Workflows* 역시 `yaml`파일로 작성한다.

```yaml
name: CI

on:
  push:
    branches:
      - main  # main 브랜치로 푸시할 때만 실행

jobs:
  build:
    runs-on: ubuntu-latest  # 실행 환경을 우분투 최신 버전으로 지정

    steps:
    - name: Checkout code  # 코드 체크아웃 단계
      uses: actions/checkout@v3  # GitHub Actions에서 제공하는 checkout 액션 사용

    - name: Set up Node.js  # Node.js 설정 단계
      uses: actions/setup-node@v3  # Node.js 환경을 설정하는 액션 사용
      with:
        node-version: '20'  # Node.js 버전 지정

    - name: Install dependencies  # 의존성 설치 단계
      run: npm install  # npm을 사용하여 프로젝트의 의존성 설치

    - name: Run tests  # 테스트 실행 단계
      run: npm test  # npm을 사용하여 프로젝트의 테스트 실행
```

---

### 2. Make Actions 👩‍

#### 1. Failure Case

처음 깃허브 액션을 접하고 시도했으나 실패했던 방법이다. 아마도 액션을 가장 먼저 접할 때 새 액션 생성시 나오는 
`Suggested for this repository`에 보이는 제안 사항이지 않을까 생각된다. 본인 역시 그러했고, 깃허브 액션에서 제공하는 
*Webpack* 을 위한 액션이 보여 바로 이것을 사용했다.

![Repository Actions](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/repository-actions.png)

기본 yaml 파일은 다음과 같다.

```yaml
name: NodeJS with Webpack

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Build
      run: |
        npm install
        npx webpack
```

다양한 노드 버전을 테스트 할 필요는 없어서 `strategy.matrix.node-version` 부분은 삭제하고 돌려보았다. 당연히 깃허브 액션에서 
제공하는 것이니 workflow 는 성공적으로 잘 돌아갔다.

하지만 문제는 <span style="color: red;">build</span>를 위한 Action 이라는 것이다. 위 설정에 단순히 packages.json 에 있는 
명령어를 사용하도록 `run` 명령을 추가해 보았으나 원하는대로 되진 않았다. 물론 위 Workflow 템플릿을 잘 수정해 사용하면 테스트 자동화 
및 Webpack build 후 deploy 자동화까지 할 수 있겠지만 그러기엔 러닝커브가 상당할 것으로 예상되었다.

따라서 GitHub Pages 에 호스팅을 해주는 actions 이 이미 존재할 것이라 생각했고, Chat-GPT 에 물어보니 
`peaceiris/actions-gh-pages`를 사용하라고 했다.

#### 2. Try peaceiris/actions-gh-pages

[peaceiris/actions-gh-pages] 를 방문해보니 다양한 환경에서 GitHub Pages 호스팅을 가능하도록 Workflow 샘플들을 제공했다. 
React 없이 Node 환경에서 띄우는 게 목적이었기 때문에 [Static Site Generators with Node.js] 템플릿을 사용했고, 
기본 yaml 파일은 다음과 같다([React and Next] 또는 [Vue and Nuxt] 을 사용한 환경 템플릿도 존재한다).

{% raw %}
```yaml
# peaceiris/actions-gh-pages 에서 제공하는 템플릿이다. 실제 적용할 yaml 파일은 아래 작성된 yaml 을 확인할 것.
name: GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-22.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci
      - run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
{% endraw %}

`Cache dependencies` 부분을 보면 지속적인 CI/CD 를 빠르게 하기 위해 실행 운영체제 와 `package-lock.json`이 
변경되었는지 여부에 따라 캐시를 사용하도록 되어있다. 

`npm ci`는 `npm install`과 비슷하지만 `package-lock.json`을 사용해 좀 더 엄격하게 명시된 종속성을 따르도록 하며, 
`node_modules`를 모두 제거한 후 clean 한 상태에서 새롭게 설치하는 <span style="color: red;">CI 환경을 위한
설치 명령어</span>다. 이것은 Yarn 을 사용하는 환경에서 `yarn install --frozen-lockfile` 명령으로 `yarn.lock`파일의 
의존성을 엄격하게 명시된 종속성을 따르도록 설치하도록 하는 것과 비슷하다.

그 다음 `npm run build`는 package.json 에 있는 명령어를 따르기 때문에 명령어가 다르다면 yaml 파일을 원하는 명령을 
수행하도록 수정해야한다.

마지막으로 깃 커밋에서 어떤 것을 `ref`로 할지 설정하도록 되어 있는데 **main** 을 사용한다면 건드릴 필요는 없고, 
Actions 를 사용하려는 repository 에 secret 에 들어가 깃허브 토큰을 저장해주면 된다. 참고로 `GITHUB_TOKEN`는 
토큰명으로 사용할 수 없기 때문에 바꿔서 사용해야한다.

<br>

우선 이것을 사용하기 위해서 자신의 `package.json`과 `webpack.config.js`를 정확히 이해하고 있어야 한다. Webpack 과 
전처리기 관련된 것들만 설치되었다는 가정 하에 `package.json`은 다음과 같을 것이다.

```json
{
  "name": "Project Name",
  "version": "1.0.0",
  "description": "Project Description",
  "main": "index.js",
  "scripts": {
    "serve": "webpack serve --mode=development --node-env=development --open",
    "watch": "webpack --watch --mode=development --node-env=development",
    "build": "webpack --mode=production --node-env=production"
  },
  "keywords": [],
  "author": "Project Author",
  "license": "Project License",
  "devDependencies": {
    "css-loader": "^6.10.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "file-loader": "^6.2.0",
    "gh-pages": "^6.1.1",
    "html-loader": "^5.0.0",
    "html-webpack-plugin": "^5.6.0",
    "prettier": "^3.2.5",
    "sass": "^1.70.0",
    "sass-loader": "^14.1.0",
    "style-loader": "^3.3.4",
    "webpack": "^5.90.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "dependencies": {
    "reset-css": "^5.0.2"
  }
}
```

- SCSS 전처리기를 위한 라이브러리: `sass`, `sass-loader`, `style-loader`, `css-loader`
- HTML 전처리기를 위한 라이브러리: `html-loader`, `html-webpack-plugin`
- Assets 전처리기를 위한 라이브러리: `file-loader` (`url-loader`를 사용해도 작동한다. [Module-script](#type-module) 
  를 사용할 경우, <span style="color: red;">webpack 5 에서 deprecated</span> 되었으므로 설치하지 않는다.)
- GitHub Pages 를 위한 라이브러리: `gh-pages`

```shell
npm i -D webpack webpack-cli webpack-dev-server \
sass sass-loader style-loader css-loader \
html-loader html-webpack-plugin \
file-loader url-loader
gh-pages
```

> <span style="color: red;">다른 방법으로는 `npx webpack init` 명령을 사용해 webpack 프로젝트를 생성</span>한다.
> 
> ```shell
> npm i -D webpack webpack-cli @webpack-cli/generators
> ```
> ```shell
> npx webpack init
> ```

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/html/main/index.js",
    signIn: "./src/html/sign-in/index.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === "development" ? "/" : "/project-base-url/",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // file loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: {
          loader: "file-loader",
        },
        generator: {
          filename: "[path][hash][ext][query]", // 이미지가 번들될 위치를 변경
        },
      },
      {
        // html loader
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/main/index.html",
      filename: "index.html",
      chunks: ["index"], // entry 의 JavaScript 이름과 동일하게 지정. 해당 JavaScript 를 불러온다.
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/sign-in/index.html",
      filename: "sign-in/index.html", // directory 가 routing 기능을 하도록 "라우팅 경로/index.html" 로 설정한다.
      chunks: ["signIn"],
    }),
  ],
};
```

> 이미지와 같은 리소스를 정상적으로 로드하기 위해서는 webpack 이 관리할 수 있도록 해야한다. 즉, 이미지의 `src` 경로를 
> javascript 에서 단순 문자열로 사용하면 안 되고, webpack 이 일고 번들링 할 수 있도록 html 문서를 통해 src 를 작성하거나, 
> javascript 로 경로를 입력할 때는 import 를 사용해 파일을 불러와 사용해야한다.

<br>
<span id="type-module"></span>

`package.json type="module"`을 사용할 경우 다음과 같이 일부 수정이 필요하다
([Asset Modules] 에 의하면 <span style="color: red;">webpack 5 에서 deprecated</span> 된 
`raw-loader`, `url-loader`, `file-loader`의 사용을 권장하지 않는다. module script 사용할 경우 이 부분도 함께
바꿔주며, 더이상 위 loader 라이브러리는 설치할 필요가 없다).

```javascript
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();

export default {
  entry: {
    index: "./src/html/main/index.js",
    signIn: "./src/html/sign-in/index.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === "development" ? "/" : "/project-base-url/",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // file loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        // html loader
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
    parser: {
      javascript: {
        commonjsMagicComments: true,
        dynamicImportMode: "lazy",
        dynamicImportPreload: true,
        dynamicImportPrefetch: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/main/index.html",
      filename: "index.html",
      chunks: ["index"], // entry 의 JavaScript 이름과 동일하게 지정. 해당 JavaScript 를 불러온다.
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/sign-in/index.html",
      filename: "sign-in/index.html", // directory 가 routing 기능을 하도록 "라우팅 경로/index.html" 로 설정한다.
      chunks: ["signIn"],
    }),
  ],
};
```

{% raw %}
```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-22.04
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci
      - run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/gh-pages'
        with:
          github_token: ${{ secrets.GH_ACTION_TOKEN }}
          publish_dir: ./dist
```
{% endraw %}

수정한 부분을 보자.

- node-version: 기본 템플릿에는 node 14로 되어있는데 해당 버전을 사용하면 최신으로 설치된 라이브러리 일부를 찾지 
  못하는 문제가 발생한다. 따라서 버전을 개발 환경과 동일한 버전으로 올려줘야한다.
- publish_dir: 위에서도 설명했듯이, `webpack.config.js` 파일의 `output.path`와 일치하도록 수정해줘야한다.
  따라서 `./dist`로 수정되었다.

#### 3. Configure GitHub Repository Setting

우선 가장 중요한 것이 <span style="color: red;">secrets</span>에 깃허브 토큰을 등록하는 것이다. 템플릿의 
토믄 이름은 사용할 수 없으므로 `GH_ACTION_TOKEN`로 수정 후 토큰을 등록해주었다.

모든 것이 잘 되었고, 해당 Workflow 는 정상적으로 수행되었다. 하지만 페이지를 방문하면 뜨긴 뜨는데 HTML 만 뜨고, 심지어 
제대로 빌드되지도 않은 채 떴다. 문제의 원인은 레포지토리 설정 중 `GitHub Pages` 부분이었다(계정의 Pages 가 아닌 해당 
레포지토리 설정에서 Pages 를 들어가야한다).

![Repository Settings Pages](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/repository-settings-pages.png)

위 Workflow 를 수행하면 자동으로 `gh-pages` 브랜치에 빌드된 결과물을 커밋을 한다. 
<span style="color: red;">따라서 deployment 대상 브랜치를 `main`에서 `gh-pages`로 변경해줘야한다</span>.

Jekyll 에서 `main`을 deploy 하도록 되어 있어서 신경 쓰지 않았는데 이 부분을 놓쳐 몇 시간을 고민했었다. 꼭 대상 브랜치를 
확인해야한다!!

<p class="center">정상적으로 깃허브 페이지 호스팅이 되었다!!</p>

---

### 3. Netlify 👩‍

Netlify 에 직접 호스팅 하는 것이 아닌, GitHub 에 push 를 하면 특정 브랜치로부터 자동으로 배포되도록 연동하는 것에 
대해 설명한다. Netlify 로 배포할 경우 위 GitHub Actions 는 설정하지 않아도 된다.

GitHub Pages 로 배포할 경우 기본 경로 설정을 하지 않으면 **root** 가 repository 이름을 제외한 경로로 설정되서 
`publicPath`를 설정해주었다. Netlify 를 사용할 경우 각각 배포가 가능하므로 `webpack.config.json`에서
`output.publicPath: process.env.NODE_ENV === "development" ? "/" : "/project-base-url/"`를 삭제한다.

![GitHub with Netlify 1](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/netilify-configurations-1.png)

- Base directory: 해당 레포지토리에서 배포하려는 앱의 기본 경로다. 하나의 레포지토리에 디렉토리별로 여러 개의 앱을 배포할 경우, 
                  해당하는 경로를 입력하면 되고, 레포지토리 하나에 하나의 앱일 경우 **root** 경로이므로 비워둔다
                  (경로가 입력될 경우, 'Package directory', 'Publish directory', 'Functions directory' 앞에 
                  `base dir/`은 자동으로 입력된다).
- Build command: `npm ci`는 Netlify 가 알아서 진행하니 `npm run build`만 작성하면 된다.
- Publish directory: **webpack** 의 `output.path`를 입력하면 된다.

![GitHub with Netlify 2](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/netilify-configurations-2.png)

![GitHub with Netlify 3](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/netilify-configurations-3.png)

![GitHub with Netlify 4](/assets/images/posts/2024-02-09-deploy-web-app-using-github-actions/netilify-configurations-4.png)

<br>

만약, 양쪽에 모두 배포를 원할 경우 다음과 같이 설정을 나눌 수 있다.

__1 ) script 명령에 변수를 사용해 분리하는 방법__

```json
{
  "scripts": {
    "serve": "webpack serve --mode=development --node-env=development --open",
    "watch": "webpack --watch --mode=development --node-env=development",
    "build-github": "webpack --mode=production --node-env=production --base-url=project-base-url",
    "build-netlify": "webpack --mode=production --node-env=production"
  }
}
```

```javascript
export default {
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.BASE_URL === undefined ? "/" : process.env.BASE_URL,
    assetModuleFilename: "images/[hash][ext][query]",
  },
};
```

> project-base-url 은 `/github-name/repository-name/` 형태로 작성한다.

__2 ) webpack configuration 파일로 분리하는 방법__

```json
{
  "scripts": {
    "serve": "webpack serve --mode=development --config webpack.development.config.js --node-env=development --open",
    "watch": "webpack --watch --mode=development --config webpack.development.config.js --node-env=development",
    "build-github": "webpack --mode=production --config webpack.prod-github.config.js --node-env=production",
    "build-netlify": "webpack --mode=production --config webpack.prod-netlify.config.js --node-env=production"
  }
}
```

```javascript
// webpack.development.config.js
export default {
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
};

// webpack.prod-github.config.js
export default {
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "project-base-url",
    assetModuleFilename: "images/[hash][ext][query]",
  },
};

// webpack.prod-netlify.config.js
export default {
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
};
```

> project-base-url 은 `/github-name/repository-name/` 형태로 작성한다.

__3 ) 호스팅 서버의 환경변수로 분리하는 방법__

`BASE_URL`을 GitHub Pages 나 Netlify 에 환경변수를 설정하고, 이를 가져다 사용하도록 할 수 있다.

```json
{
  "scripts": {
    "serve": "webpack serve --mode=development --node-env=development --open",
    "watch": "webpack --watch --mode=development --node-env=development",
    "build": "webpack --mode=production --node-env=production"
  }
}
```

```javascript
export default {
  output: {
    publicPath: process.env.NODE_ENV === "development" ? "/" : "/project-base-url/",
  },
};
```

> GitHub Pages 의 project-base-url 은 `/github-name/repository-name/` 형태로 작성하고, 
> Netlify 는 `/`로 작성한다.

> 위 세 가지 중 어떤 방법을 사용하든, `output.publicPath`는 HTML, JavaScript, Images 와 같은 Network 요청을 
> 보낼 때 기본 URL 을 추가해준다. 하지만 `<a href="/sign-in">`과 같은 경로는 수정되지 않는다. 즉, 코드를 작성할 때 
> <span style="color: red;">BASE_URL 을 환경변수로부터 가져오도록</span> 코딩을 해야한다. 따라서 2페이지 이상일 
> 경우, Github Pages 로 배포하는 것은 그냥 Webpack 없이 HTML, JavaScript 를 직접 배포하거나, React 로 
> 배포해야한다. Vanilla JS 프로젝트가 2페이지 이상일 경우 배포는 Netlify 로 하는 것이 더 좋다.


<br><br>

---
Reference

1. peaceiris, "actions-gh-pages." GitHub. Mar. 31, 2023, [https://github.com/realm/SwiftLint].
2. "제발 깃허브 액션🔥 모르는 개발자 없게해 주세요 🙏." Youtube. Jun. 28, 2022, [제발 깃허브 액션🔥 모르는 개발자 없게해 주세요 🙏](https://youtu.be/iLqGzEkusIw?si=PuIUQq8JV5qVsmm2).
3. "Asset Modules." Webpack Docs. Feb. 27, 2024, [https://webpack.js.org/guides/asset-modules/][Asset Modules]


[peaceiris/actions-gh-pages]:https://github.com/peaceiris/actions-gh-pages
[Static Site Generators with Node.js]:https://github.com/peaceiris/actions-gh-pages?tab=readme-ov-file#%EF%B8%8F-static-site-generators-with-nodejs
[React and Next]:https://github.com/peaceiris/actions-gh-pages?tab=readme-ov-file#%EF%B8%8F-react-and-next
[Vue and Nuxt]:https://github.com/peaceiris/actions-gh-pages?tab=readme-ov-file#%EF%B8%8F-vue-and-nuxt
[Asset Modules]:https://webpack.js.org/guides/asset-modules/
