---
layout: post
title: 깃허브 블로그 업데이트가 안 될 때
subtitle: 깃허브 블로그 업데이트 미반영 단계별로 해결하기
categories: git
tags: [git, gitblog, blog, timezone, jekyll]
---

어제 올린 포스팅이 시간이 지나도 깃허브에 업데이트가 안 되었다.
깃허브에 push를 하고 방문해보면 노란색 <span style="color: orange;">•</span>이 보이고, 서버가 업데이트를 마치면 녹색 <span style="color: orange;">•</span>으로 바뀐다. 그래도 포스팅이 안 보인다면 다음 순서대로 확인한다. 다음은 `jekyll`을 기준으로한다.


### 1. _posts 하위 디렉토리에 위치하며 파일명은 yyyy-MM-dd-filename.md 형식인가?
포스트를 작성하는 위치와 파일명의 규칙이다. 가장 첫 번째로 확인해야 한다. 특히, vscode로 작성할 경우 파일을 생성하거나 파일명을 수정할 때 `.md`를 실수로 누락시킬 수 있으니 꼭 확인한다.

### 2. 포스팅 head 규칙을 준사하는가?
```
---
layout: post
title: 깃허브 블로그 업데이트가 안 될 때
subtitle: 깃허브 블로그 업데이트 미반영 단계별로 해결하기
categories: git
tags: [git, gitblog, blog, timezone, jekyll]
---
```
위와 같은 형식이어야한다. 잘못된 형식이 있지 않은지 확인한다.

### 3. 로컬 서버에서는 포스팅이 되는가?
로컬에서 jekyll 서버를 실행해본다. 1, 2에 문제가 없다면 로컬에서는 정상적으로 포스팅이 업데이트되어야 한다.

만약, 로컬에서도 포스팅이 업데이트가 안 된다면 1, 2를 다시 한 번 확인하고, 문제가 없다고 판단될 경우 `5`로 이동한다.

### 4. 블로그 깃의 타겟 branch를 확인하자
![github blog settings](/assets/images/posts/2022-07-02-when-github-blog-is-not-updated/gitbub-blog-branch-settings.png)

보통은 블로그에 여러 branch를 사용하지 않겠지만, 내가 올린 push가 깃허브가 블로그 실행 타겟으로 설정한 브랜치인지 확인하자.


### 5. timezone 차이를 이해하고 해결하자
이제 `jekyll`의 `timezone`을 이해할 때가 되었다.

[![jekyll timezone](/assets/images/posts/2022-07-02-when-github-blog-is-not-updated/jekyll-timezone.png)](https://jekyllrb.com/docs/configuration/options/)

`jekyll`은 기본적으로 _**미래 시간의 글은 서버에 게시하지 않는다**_.  
우리는 `KST`인데 깃허브 서버는 한국에 있지 않다. 즉, 미국 동부에 있다면 EST(or EDT)를 따를 것이고, 서부에 있다면 PST(or PDT)를 따를 것이다. 즉, 내가 2022년 7월 2일에 작성하고 당일 올렸지만, 아직 미국은 2022년 7월 1일일 수 있는 것이다. 그렇다면 깃 서버는 미래의 포스팅이므로 변경 사항을 전부 읽어들여도 아직 게시하지 않는다.

그럼 어떻게 해야할까?

1. 미국 시간이 포스팅 날짜가 된 이후 공백을 하나 넣고 다시 push를 올린다.
내 로컬 서버라면 재기동을 시키면 되는데 깃허브 블로그의 서버는 내가 직접 기동하지 않는다. 따라서, 업데이트를 감지하고, 이를 반여할 수 있도록 공백을 하나 넣고 push를 올려서 미래의 포스팅이 아니니 게시할 수 있도록 한다.

근본적으로 해당 문제를 해결하고싶다면 아래 2번을 설정하도록 한다.

2. `_config.yml`에 설정을 추가한다.

```yaml
future: true

timezone: Asia/Seoul
```
위 설정 둘 중 아무거나 하나를 추가하면 된다. 단 두 옵션은 이름에서 알 수 있듯 다르게 작동한다.

- 한국이든 미국이든 혹은 별나라든🤣🤣 `future: true`를 설정하면 날짜와 무관하게 전부 게시한다.  
- `timezone: Asia/Seoul`을 설정할 경우, 한국 시간에 맞게 포스팅을 작성하고 올리면 문제가 없다. 단, 한국 시간으로도 2일인데 3일자 포스팅을 올리면 한국 시간으로 3일이 된 후 위 1번처럼 재기동을 시켜줘야한다.  

어떤 것을 선호하는지에 따라 설정하면 된다.


<br><br>

---
Reference

1. "Configuration Options", jekyllrb, last modified unknown, accessed July. 2 2022, [https://jekyllrb.com/docs/configuration/options/](https://jekyllrb.com/docs/configuration/options/)