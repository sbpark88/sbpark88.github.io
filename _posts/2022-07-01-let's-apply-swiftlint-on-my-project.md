---
layout: post
title: Xcode, AppCode 에 SwiftLint 를 적용하자
subtitle: 코드 작성을 도와주는 친구와 같은 정적분석 도구
categories: swift
tags: [xcode, appcode, swiftlint, sonarlint]
---

### SonarLint 는 Swift 를 지원하지 않지만 우리에겐 SwiftLint 가 있다!! 👩‍💻

[SwiftLint GitHub](https://github.com/realm/SwiftLint)를 방문해보면 `XCode`뿐 아니라 `AppCode`, `Atom` 그리고 `Visual Studio Code`를 지원함은 물론이고, 배포 자동화를 돕는 [fastlane](https://fastlane.tools)([fastlane docs](https://docs.fastlane.tools))에서도 사용이 가능하다.

### 1. 설치하기 👩‍💻
설치 방법은 깃허브에서 직접 `pkg`를 내려 받아 설치하는 것과, CLI Package manager 를 사용하는 방법이 있다.
지원하는 Package manager 는 다음과 같다.

* [Homebrew](https://brew.sh/index_ko)
* [CocoaPods](https://cocoapods.org)
* [Mint](https://github.com/yonaskolb/mint)

이 글에서는 `Homebrew`를 사용해 설치를 진행한다. 그 외 설치 방법은 [SwiftLint](https://github.com/realm/SwiftLint)를 참고한다.

#### 1. Homebrew 로 SwiftLint 설치하기

```shell
brew install swiftlint
```

**That's all!!**
정말로 이게 끝이다. 🤣🤣

---

### 2. IDE 적용하기 👩‍💻

#### 1. XCode

애플이 만든 공식 IDE 인 `XCode`부터 알아보자.

![SwiftLint-XCode](/assets/images/posts/2022-07-01-let's-apply-swiftlint-on-my-project/SwiftLint-XCode.png)

`⌘ + 1`을 눌러 이동한 다음 위 스크린샷의 빨간 블럭을 참고해 이동한다.
1 ) `프로젝트 > TARGETS > Build Phases`
2 ) ✚ 버튼을 누르고 `New Run Script Phase`를 선택한다.
3 ) 그 다음 [SwiftLint](https://github.com/realm/SwiftLint)의 Usage > Xcode 에 있는 스크립트를 추가한다.

```shell
export PATH="$PATH:/opt/homebrew/bin"
if which swiftlint > /dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
```

> 만약 Apple Silicon 을 사용하고 있다면 Homebrew 의 경로가 바뀌었기 때문에 **Path 를 변경**해주거나 **Symbolic Link**를 걸어줘야한다.  
>
> Path 를 변경해주는 방법은 다른 IDE 는 물론 대부분의 상황에서 기존의 Homebrew 경로를 기본으로 하기 때문에 매번 변경해줘야하고, 설정 초기화를 할 경우 다시 등록해줘야하는 문제가 있기 때문에 Link 를 걸어주는 방법으로 진행하는 것이 좋다.

```shell
ln -s /opt/homebrew/bin/swiftlint /usr/local/bin/swiftlint
```

4 ) Compile 전에 검사를 먼저 하고 싶다면 추가한 스크립트를 위로 올려준다. 위 스크린샷에서는 Dependencies 다음에 위치하도록 순서를 2번째로 변경했다.

#### 2. AppCode

1. `Plugins`에서 `SwintLint` 플러그인을 설치 후 `AppCode`를 재시작한다.
2. 설정에서 `swiftlint`를 검색해 `Tools-SwiftLint`에 가서 경로를 확인한다.
Apple Silicon 일 경우 `/opt/homebrew/bin/swiftlint`로 경로를 바꿔주거나 `Symbolic Link`를 설정해야한다. `Symbolic Link`는 Xcode 설정을 참고한다.
그리고 `Auto-Fix`에 `SwiftLint suggestion`을 통합하려면 `Show "Run swiftlint autocorrect" option on linkt error popup`을 체크한다.
![SwiftLint-AppCode-1](/assets/images/posts/2022-07-01-let's-apply-swiftlint-on-my-project/SwiftLint-AppCode-1.png)

3. Editor 에서도 이를 지원하도록 체크한다.
경로는 위 2번 설정에서 이어서 진행하면 된다. `Editor-Inspections`에 가서 아래 표시된 부분을 체크해 활성시켜준다.
![SwiftLint-AppCode-2](/assets/images/posts/2022-07-01-let's-apply-swiftlint-on-my-project/SwiftLint-AppCode-2.png)


#### 3. SwiftLint 제안 무시하기

가끔 무시하고 싶은 SwiftLint 규칙이 있을 것이다.
하지만 `SwiftLint` 규칙을 아예 변경하는 것이 아니라 특정 라인에서만 무시하고 싶다면 아래와 같이 `SwiftLint가` 제안한 라인 위에 해당 제안을 무시하라고 코멘트를 달아준다.
아래 샘플은 라인의 길이가 너무 기니 줄이라는 제안이고, 해당 라인에서 그 규칙을 무시하겠다는 코멘트다.

```swift
// swiftlint:disable: line_length
Question(question: "The total surface area of two human lungs is approximately 70 square metres.", answer: "True"),
```

SwiftLint 의 기본 규칙 외에 더 많은 규칙을 등록/수정하고 싶다면 [SwiftLint Rules](https://realm.github.io/SwiftLint/rule-directory.html)를 방문하도록한다. 


<br><br>

---
Reference

1. "realm/SwiftLint." GitHub. Jun. 30, 2022, [https://github.com/realm/SwiftLint](https://github.com/realm/SwiftLint)
2. "baelex/SwiftLintAppCode." GitHub. Jun. 6, 2022, [https://github.com/bealex/SwiftLintAppCode](https://github.com/bealex/SwiftLintAppCode)
3. "Rule Directory", SwiftLintFramework Reference, accessed Jul. 1, 2022, [https://realm.github.io/SwiftLint/rule-directory.html](https://realm.github.io/SwiftLint/rule-directory.html)
