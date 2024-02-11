---
layout: post
title: Xcode 인증서 충돌로 인한 만료 해결
subtitle: Xcode certificate errors
excerpt_image: NO_EXCERPT_IMAGE
categories: [swift]
tags: [xcode, certificate]
---

### 일반 계정의 인증서가 학습 중 만료되었다며 앱 빌드가 안 되는 일이 발생했다!! 😭😭😭

앱을 모두 지우고, 아이폰에서 인증서를 삭제 후 빌드를 해도 해결이 되지 않았다.
그러다 Xcode 의 설정에 보니 기존의 내 맥북에서 받은 인증서가 만료되고, 다른 노트북에서 인증서가 발급되었다.
아마 노트북 들고 다니기 힘들어 굴러다니던 그램에 맥을 설치하고 다른 장소에서 xcode 로 빌드를 했는데 그게 문제였다.

원인을 추정 했고, 구글을 검색해 얻은 정보들은 주로 다음과 같았다.
- `Keychain`에서 삭제 후 다른 사람의 맥에서 인증서를 받아서 등록하기.  
-> 둘 다 내 맥이고 동일 계정이다. 그리고 시도해보고 싶어도 다른 맥은 현재 다른 장소에 있다. 😭
- `Apple developer console`에 가서 해결하기  
-> 난 유료 개발자 계정이 아니다.

<br>
**주말을 빌드 한 번 못 해보고 날려야 한다니!! 그럴 순 없었다.**

<span style="color: purple">내가 해결한 방법은 다음과 같다.</span>

1. `Manage Certificates...` 버튼을 누른다.

![xcode certificate error1](/assets/images/posts/2022-06-25-xcode-certificate-expired/certificate_error_1.png)

2. 좌측 하단의 `+` 버튼을 누른다.

![xcode certificate error2](/assets/images/posts/2022-06-25-xcode-certificate-expired/certificate_error_2.png)

해당 버튼을 누르면 애플 서버와 동기화를 하는 것으로 추정된다.
현재는 문제가 해결되었기 때문에 하나의 계정만 보인다. 하지만 이전에는 2개가 보였으며, 현재 내 맥북의 인증서는 빨간색으로 `expired`라고 표기되어 있었다.

3. 우측 버튼을 클릭해 만료된 인증서를 삭제해준다.

![xcode certificate error3](/assets/images/posts/2022-06-25-xcode-certificate-expired/certificate_error_3.png)

현재는 유효한 인증서가 저거 하나라 삭제가 활성화 되지 않는 것 같다. 기존에는 `expired` 상태의 인증서도 삭제가 되지 않았으나 위 2번 과정을 거친 후에는 정상적으로 삭제가 되었으니 참고하길 바란다.

<br>
인증서로 문제가 생기는 경우는 매우 다양할 것이고, 실제 회사에서 발생하는 경우는 회사 개발자 계정의 인증서일 것이다. iOS 앱 개발을 위해 공부하던 중 아이맥과 맥북을 사용하는 등 2대의 맥을 사용하는 사람은 분명히 있을 것이고, 혹시라도 내 해결 방법이 도움되는 사람이 있길 바란다. 🙂🙂
