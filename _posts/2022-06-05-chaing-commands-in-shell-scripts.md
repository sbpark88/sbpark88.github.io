---
layout: post
title: 유닉스계 쉘 스크립트 명령 연결하기
subtitle: 아직도 명령여 여러 번 실행하나요?
categories: shell
tags: [shell]
---

## 1. 서로 다른 명령 조합하기

| Operators | Function | i.e. | Result |
| --------- | -------- | ---- | ------ |
| ; | 모든 명령을 수행한다 | 1 ; 2 ; 3  | 1, 2, 3을 모두 수행 |
| && | 선행 명령이 성공한 경우 후행 명령을 수행한다 | 1 && 2 && 3 | 1이 성공하면 2를 수행, 2가 성공하면 3을 수행 |
| ⎮⎮ | 선행 명령이 실패한 경우 후행 명령을 수행한다 | 1 ⎮⎮ 2 ⎮⎮ 3 | 1이 실패하면 2를 수행, 2가 실패하면 3을 수행 |

## 2. 선행 명령에 추가적인 명령 수행하기

| Operators | Function | i.e. | Result |
| --------- | -------- | ---- | ------ |
| ⎮ | 선행 명령에 추가 명령을 수행한다 | 1 ⎮ 2 | 1의 수행 결과에 2의 명령을 수행 |

```sehll
brew list | grep env       
```
이렇게 주로 검색과 관련되어 많이 사용한다.

## 3. 긴 명령 개행 무시하기

명령이 길어질 경우 개행을 통해 가독성은 높이고, 개생은 하지 않은 것처럼 하나의 명령으로 연결하고 싶다면 `\`을 이용한다.
```shell
brew install tree neofetch git jenv rbenv mariadb node typescript --force && \
brew install --cask sourcetree adoptopenjdk8 adoptopenjdk11 adoptopenjdk15 \
dbeaver-community db-browser-for-sqlite jetbrains-toolbox atom visual-studio-code \
postman parallels gemini bettertouchtool fluor vlc movist-pro mediainfo handbrake \
cleanmymac istat-menus daisydisk bartender telegram google-chrome microsoft-edge \
keka google-drive dropbox forklift ridibooks notion adguard tunnelblick displaycal \
qbittorrent pdfpenpro busycal busycontacts imazing onyx knockknock --force
```

## 4. 명령 결과 부정하기

간단히 `!` 을 붙여주면 된다.

## 5. 명령 그룹으로 묶기

| Operators | Function | i.e. | Result |
| --------- | -------- | ---- | ------ |
| ( ) | 명령을 그룹으로 묶는다 | ( 1 && 2 ) ⎮⎮ 3 | 1 또는 2가 거짓이면 3을 수행 |

```shell
1 && 2 ⎮⎮ 3
```
즉, 괄호를 이용해 위 쉘 명령과 다른 명령 로직을 수행할 수 있다.

## 6. 백그라운드로 명령 수행하기

| Operators | Function | i.e. | Result |
| --------- | -------- | ---- | ------ |
| & | 명령을 백그라운드로 수행한다 | java -jar ./myWeb.jar & | 톰캣 서버를 백그라운드로 띄운다 |

이는 핑 테스트나 웹 서버를 띄울 때 터미널이 해당 명령에 묶여 있지 않고 백그라운드에서 수행하므로써 터미널 사용을 자유롭게 해준다.

`&`은 백그라운드, `&&`은 논리 연산자 `AND`다. 헷갈리지 말 것❗️

<br>
| 이 외에도 아래 reference 페이지를 방문하면 redirect나 combination 명령을 추가로 확인할 수 있다. 
<br><br>

---
Reference

1. "Chaining Commands in Linux", GeeksforGeeks, last modified Oct. 14. 2020, accessed June. 5 2022, [https://www.geeksforgeeks.org/chaining-commands-in-linux/](https://www.geeksforgeeks.org/chaining-commands-in-linux/)