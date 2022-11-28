---
layout: post
title: Swift troubleshooting
subtitle: Note my troubleshooting
categories: swift
tags: [swift, error]
---

### View

#### No Assistant Results
- 스토리보드를 열었을 때 `Assistant` 연동이 안 되어 `Controller`의 코드를 볼 수가 없는 현상.
- 가끔 늦게 뜨는 경우 있으니 잠시 기다려보기.
- 기다려도 안 뜨면 캐시 삭제.
```shell
rm -rf ~/Library/Developer/Xcode/DerivedData
```

#### 화면 상하단 여백 생김
- `No Assistant Results`를 해결하는 과정에서 발생.
- `ImageView` 사이즈를 화면 크기에 맞추고, Scale To Fill 을 해줘도 상하단에 채울 수 없는 얇은 여백 라인이 생성.
- 시뮬레이터, 실제 아이폰 모두에서 발생.
![go to storyboard](/assets/images/posts/2022-06-05-swift-troubleshooting/view-margine1.png)
![check out safe area](/assets/images/posts/2022-06-05-swift-troubleshooting/view-margine2.png)
- 원인은 스토리보드 바로 하단 `View`에서 `Show the Size inspector`(⌘⌥6)을 누르고 들어가 `Layout Margins`에서 `Safe Area Relative Margins`를 체크 해제한다.