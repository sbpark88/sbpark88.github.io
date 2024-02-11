---
layout: post
title: Let's learn about git
subtitle: Learn about the git concept, control, and flow
excerpt_image: NO_EXCERPT_IMAGE
categories: [git]
tags: [git, merge, rebase, revert, reset, cherry pick, interactive rebase]
---

### 1. Git Concept 👩‍💻

Git 은 변경 내역을 추적 기록하는 증분 백업(Snapshots)으로 동작하며 이전 버전과 다음 버전의 변경 내역을 `delta`라고 한다. 따라서 Git
Repository 를 Clone 한다는 것은 이 모든 `delta`를 풀어낸다는 것을 의미한다.

C0 라는 최초의 Base-commit 이 존재하고 여기에 2번의 커밋 을 했다고 해보자.

![Git Concept](/assets/images/posts/2023-04-21-git-learning/git-concept.png){: width="450"}

C0(Base) ⬅️ C1 ⬅️ C2((main*, HEAD))

C2 는 자신의 부모로 C1 을 가리키고, C1 은 다시 자신의 부모로 C0 를 가리킨다. 이렇게 최초의 Base-commit 으로부터 연결되는 Snapshot Chain
으로 이루어지며, 현재 Branch 의 마지막 커밋을 `Head`라 부른다.

---

### 2. Basic Git Commands 👩‍💻

#### 1. Create New Branch and Checkout

Git 에서 Branch 는 단지 특정 커밋에 대한 Reference 에 불과하다. 즉, 새 브랜치를 만드는 것이 복제본을 생성하는 것이 아니므로 속도나 용량에
아무런 영향을 미치지 않고 매우 가볍게 동작할 수 있다는 것을 의미한다. 따라서 작업을 커다란 브랜치로 만드는 것 보다 작은 단위로 잘라 브랜치를
자주 만들어 작은 단위로 다루는 것이 좋다.

__Syntax__

```shell
# Create New Branch
git branch "branch_name"
# Move to the Branch
git checkout "branch_name"
```

<br>

__Example__

bugFix 라는 브랜치를 만들어보자.

```shell
git branch bugFix
```

C0(Base) ⬅️ C1 ⬅️ C2((main*, HEAD), bugFix)

C2 커밋에 또 다른 Reference 가 추가되었다. 아직 Current Branch 는 main 을 유지하고 있다. 이제 bugFix 브랜치로 이동해보자.
<br>

```shell
git checkout bugFix
```

C0(Base) ⬅️ C1 ⬅️ C2(main, (bugFix*, HEAD))

깃 트리는 위와 같이 변경된다. Current Branch 가 bugFix 로 변경되었으며, HEAD 가 bugFix 의 C2 커밋을 가리킨다.

#### 2. Git Merge

__Syntax__

```shell
git merge "branch_name"
```

다음은 C2 커밋을 기준으로 main 브랜치와 bugFix 브랜치가 각각 하나씩 커밋을 한 상태를 나타낸다.

![Git Merge 1](/assets/images/posts/2023-04-21-git-learning/git-merge-1.png){: width="800"}

Current Branch 는 main 브랜치에 위치해 있다. 이제 bugFix 브랜치를 main 브랜치에 `merge`해보자.

```shell
git checkout main
git merge bugFix
```

![Git Merge 2](/assets/images/posts/2023-04-21-git-learning/git-merge-2.png){: width="800"}

#### 3. Git Rebase

`Rebase`는 `Merge`와 달리 하나의 브랜치에서 개발한 것처럼 짓뭉개버린다. 위 2번의 트리 구조로 돌아가 Merge 대신 Rebase 를 해보자.
단, 이번에는 위와 트리 구조는 동일하지만 Current Branch 가 main 이 아니라 bugFix 라는 것에 주목하자.

__Syntax__

```shell
# "branch_from_name" 을 생략하면 암시적으로 "current_branch" 가 "branch_from_name" 가 된다.
# 따라서 "current_branch" 를 "branch_to_name" 뒤에 연결한다.
git rebase "branch_to_name"
# "branch_to_name" 뒤에 "branch_from_name" 를 연결한다.
git rebase "branch_to_name" "branch_from_name"
```

<br>

__Example__

![Git Rebase 1](/assets/images/posts/2023-04-21-git-learning/git-rebase-1.png){: width="800"}

```shell
git checkout bugFix
git reabse main
```

![Git Rebase 2](/assets/images/posts/2023-04-21-git-learning/git-rebase-2.png){: width="800"}

<br>

물론, main 쪽으로 Rebase 를 하는 것도 가능하다.

```shell
git checkout main
git rebase bugFix
```

를 하면 다음과 같은 트리 구조로 Rebase 된다.

C0(Base) ⬅️ C1 ⬅️ C2 ⬅️ C3 ⬅️ C4((main*, HEAD), bugFix)

---

### 3. Intermediate Git Commands 👩‍💻

#### 1. HEAD

`HEAD`는 현재 Checkout 된 브랜치, 즉, 작업중인 깃 트리의 최신 커밋을 가리킨다. 깃 트리에 변화를 주는 Git 명령어들은 대부분 HEAD 를
변경하는 것으로 시작한다.

HEAD 를 분리한다는 것은 HEAD 를 브랜치 대신 커밋에 붙이는 것을 의미한다.

__Syntax__

```shell
git checkout "commit_hash"
```

<br>

__Example__

![Git HEAD 1](/assets/images/posts/2023-04-21-git-learning/git-head-1.png){: width="800"}

```shell
git checkout C3
```

![Git HEAD 2](/assets/images/posts/2023-04-21-git-learning/git-head-2.png){: width="800"}

#### 2. Relative Reference

위 4번이 특정 커밋의 해시를 직접 Checkout 해서 HEAD 를 움직였다면, 깃 트리 구조에서 Chain 을 따라 이동하도록 할 수 있다.

__Syntax__

```shell
# ^ 한 커밋 위로 이동
git checkout "branch_name"^
# ~n n 커밋 위로 이동
git checkout "branch_name"~n
```

> - 만약 부모가 2개 이상일 경우 `git checkout "branch_name"^1`, `git checkout "branch_name"^2`와 같이 각각 접근 할 수 있다.
> - `git checkout HEAD~^2~2`와 같이 연속해서 사용할 수 있다.

<br>

__Example 1__

![Git Relative Reference 1](/assets/images/posts/2023-04-21-git-learning/git-relative-reference-1.png){: width="800"}

```shell
git checkout main^
```

![Git Relative Reference 2](/assets/images/posts/2023-04-21-git-learning/git-relative-reference-2.png){: width="800"}

<br>

__Example 2__

![Git Relative Reference 3](/assets/images/posts/2023-04-21-git-learning/git-relative-reference-3.png){: width="800"}

```shell
git checkout main~3
```

![Git Relative Reference 4](/assets/images/posts/2023-04-21-git-learning/git-relative-reference-4.png){: width="800"}

> branch 와 HEAD 를 강제로 이동할 때 `-f`를 이용해 다음과 같이 활용할 수 있다.
>
> ```shell
> git branch -f main HEAD~3
> git branch -f main C5
> ```

#### 3. Reset and Revert

깃에서 작업을 되돌리는 방법으로는 `Reset` 과 `Revert` 두 가지가 있다.

__1 ) Reset__

Reset 은 애초에 커밋을 하지 않은 것처럼 예전 커밋으로 브랜치를 옮긴다. 따라서 협업하는 Repository 인 경우 이미 Remote 에 올라간 커밋은
Reset 을 하면 안 된다. 아직 Remote 에 올라가기 전 Local 에 존재하는 커밋 또는 개인 Repository 에서만 사용해야한다.

__Syntax__

```shell
# 되돌아가려는 커밋 지점을 받는다
git reset "commit_hash"
git reset "branch_name"^
git reset "branch_name"~n
```

<br>

__Example__

![Git Reset 1](/assets/images/posts/2023-04-21-git-learning/git-reset-1.png){: width="800"}

```shell
git reset C3
```

![Git Reset 2](/assets/images/posts/2023-04-21-git-learning/git-reset-2.png){: width="800"}

<br>

__2 ) Revert__

Revert 는 깃의 `delta`를 역으로 되돌리는 커밋을 생성한다. 변경분을 되돌리는 새 커밋을 생성하는 것이기 때문에 협업시에도 사용이 가능하다.

__Syntax__

```shell
# 되돌리려는 커밋을 받는다
git revert "commit_hash"
```

<br>

__Example__

![Git Revert 1](/assets/images/posts/2023-04-21-git-learning/git-revert-1.png){: width="800"}

```shell
git revert C5
```

![Git Revert 2](/assets/images/posts/2023-04-21-git-learning/git-revert-2.png){: width="800"}

#### 4. Cherry Pick

Rebase 가 원래 하나의 브랜치에서 개발한 것처럼 짓뭉개버린다고 했다. 그러면 특정 커밋만 뽑아서 Rebase 를 하고 싶다면 어떻게 해야할까?
이때 체리피커처럼 특정 커밋만 뽑아와서 자신의 트리 구조에 넣는 명령어가 `cherry-pick`이다.

__Syntax__

```shell
git cherry-pick "commit_hash1" "commit_hash2"
```

<br>

__Example__

![Cherry Pick 1](/assets/images/posts/2023-04-21-git-learning/cherry-pick-1.png){: width="800"}

```shell
git checkout main
git cherry-pick C4 C5 C78
```

![Cherry Pick 2](/assets/images/posts/2023-04-21-git-learning/cherry-pick-2.png){: width="800"}

#### 5. Interactive Rebase

Cherry Pick 은 원하는 커밋의 해시값을 알 때 유용하다. 하지만 원하는 커밋을 명확히 모를 때는 Interactive Rebase 를 사용해 Rebase 할
커밋을 검토하는 과정을 추가할 수 있다.

__Syntax__

```shell
git rebase -i "branch_name"
```

> `-i` 옵션을 추가하면 Rebase 처리 전 vim 과 같은 텍스트 편집기를 열어 각 커밋을 구분할 수 있는 해시와 메시지를 보여준다.  
> 이때 처리 가능한 명령은 다음과 같다.
>
> 1. 커밋들의 순서 변경.
> 2. 원하는 커밋만 선택 `pick`을 이용.
> 3. 커밋들을 `squash` 처리.

<br>

__Example 1__

C0(Base) ⬅️ C1 ⬅️ C2 ⬅️ C3 ⬅️ C4 ⬅️ C5(main*)

```shell
git rebase -i HEAD~4
```

이때 커밋을 C2, C4, C5 만 pick 하고 순서를 C4 ⬅️ C5 ⬅️ C2 로 변경한다면 결과는 다음과 같다.

![Interactive Rebase 1](/assets/images/posts/2023-04-21-git-learning/interactive-rebase-1.png){: width="800"}

<br>

__Example 2__

이번에는 버리는 커밋 없이 모두 pick 하고 대신 C3~C5 를 squash 처리한다면 결과는 다음과 같다.

![Interactive Rebase 2](/assets/images/posts/2023-04-21-git-learning/interactive-rebase-2.png){: width="800"}

---

### 4. Use Cases 👩‍💻

#### 1. Change Old Commit - Interactive Rebase

- 주어진 조건

'newImage' 와 'caption' 브랜치에 각각의 변경 내역이 있고, 서로 약간의 관련이 있어 저장소체 차례로 쌓여 있는 상황

C0(Base) ⬅️ C1(main) ⬅️ C2(newImage) ⬅️ C3(caption*)


- 변경할 대상

깃 트리의 앞쪽에 있는 커밋 내용의 일부를 살짝 바꿔 달라는 요청이 들어왔다(i.e. newImage 의 크기를 변경해주세요).
<br>

- 해결 방법

> 1. `git rebase -i` 명령으로 바꾸려는 커밋을 가장 최근 순서로 변경한다.
> 2. `git commit --amend` 명령으로 커밋 내용을 정정한다.
> 3. `git rebase -i` 명령으로 원래 순서로 되돌린다.
> 4. main 을 위에서 수정을 완료한 트리로 이동한다.
     <br>

__1 ) 순서 변경__

```shell
git rebase -i C1
```

이 때 C2 와 C3 의 순서를 변경한다.

![Use Cases 1](/assets/images/posts/2023-04-21-git-learning/use-cases-1.png){: width="800"}

<br>

__2 ) 커밋 정정__

```shell
git commit --amend
```

![Use Cases 2](/assets/images/posts/2023-04-21-git-learning/use-cases-2.png){: width="800"}

<br>

__3 ) 순서 원래대로 재변경__

```shell
git rebase -i C1
```

![Use Cases 3](/assets/images/posts/2023-04-21-git-learning/use-cases-3.png){: width="800"}

<br>

__4 ) 깃 트리 main 을 수정한 브랜치로 이동__

```shell
git branch -f main caption
```

![Use Cases 4](/assets/images/posts/2023-04-21-git-learning/use-cases-4.png){: width="800"}

#### 2. Change Old Commit - Cherry Pick

이번에는 위와 동일한 문제를 Cherry Pick 을 이용해 해결해보자.?

- 해결 방법

> 1. `git checkout` 명령으로 변경하려는 커밋보다 이전 커밋으로 이동한다.  
     >    (Cherry Pick 하려는 커밋이 현재 브랜치에 존재해서는 안 된다)
> 2. `git cherry-pick` 명령으로 변경하려는 커밋만 Cherry Pick 한다.
> 3. `git commit --amend` 명령으로 커밋 내용을 정정한다.
> 4. `git cherry-pick` 명령으로 나머지 커밋을 Cherry Pick 한다.
     >    (현재 HEAD 가 main 이므로 이대로 완료된다)

<br>

__1 ) 변경하려는 커밋 이전 커밋으로 이동__

```shell
git checkout main;
```

C0(Base) ⬅️ C1(main*) ⬅️ C2(newImage) ⬅️ C3(caption)

<br>

__2 ) 변경하려는 커밋 Cherry Pick__

```shell
git cherry-pick C2
```

![Use Cases 5](/assets/images/posts/2023-04-21-git-learning/use-cases-5.png){: width="800"}

<br>

__3 ) 커밋 정정__

```shell
git commit --amend
```

![Use Cases 6](/assets/images/posts/2023-04-21-git-learning/use-cases-6.png){: width="800"}

<br>

__4 ) 나머지 커밋 Cherry Pick__

```shell
git cherry-pick C3
```

![Use Cases 7](/assets/images/posts/2023-04-21-git-learning/use-cases-7.png){: width="800"}

#### 3. Tag

깃의 `Tag`는 특정 커밋들을 브랜치로 참조하듯이 영구적인 `Milestone`으로 표시하기 위해 존재한다.

__Syntax__

```shell
# Commit Hashcode 를 생략하면 HEAD 에 Tag 를 붙인다.
git tag "tag_name"
# 특정 Commit Hashcode 에 Tag 를 붙인다.
git tag "tag_name" "commit_hash"
```

<br>

__Example__

다음과 같은 깃 트리가 있다고 가정해보자.

![Use Cases 8](/assets/images/posts/2023-04-21-git-learning/use-cases-8.png){: width="800"}

```shell
git tag v0 C1
```

![Use Cases 9](/assets/images/posts/2023-04-21-git-learning/use-cases-9.png){: width="800"}

<br>
이번에는 HEAD 를 이동시키고 특정 Commit Hashcode 대신 HEAD 에 바로 Tag 를 붙여보자.

```shell
git checkout C2
git tag v1
```

![Use Cases 10](/assets/images/posts/2023-04-21-git-learning/use-cases-10.png){: width="800"}

#### 4. Describe

깃에는 현재 깃 트리를 자동으로 요약해 설명하도록 명령할 수 있는 `Describe`라는 명령어가 있다. 이때 이정표 역할을 해주는 것 중 하나가 `Tag`다.

__Syntax__

```shell
git describe <ref>
```

> `<ref>`에는 커밋을 의미하는 어떤 것이든 사용할 수 있다. 만약 특정지어주지 않을 경우 현재 HEAD 를 사용한다.
>
> 출력되는 결과물은 다음과 같다 [Milestone]_[Commit 개수]_[Describe 대상]
>
> - Milestone: Base or Tag
> - Commit 개수: Milestone 과 Describe 대상 사이의 커밋 개수
> - Describe 대상: HEAD or 특정 커밋

<br>

__Example__

다음과 같은 깃 트리가 있다고 가정해보자.

![Use Cases 11](/assets/images/posts/2023-04-21-git-learning/use-cases-11.png){: width="800"}

```shell
git describe main   # v0_2_gC2
git describe C2     # v0_2_gC2
```

```shell
git describe C3     # v1
git describe v1     # v1
```

> `Tag`가 새 이정표를 만들어 `Tag` 부터 시작된다.

```shell
git describe C5     # v1_1_gC5
git describe C6     # v1_2_gC6
git describe bugFix # v1_2_gC6
git describe        # v1_2_gC6
```

---

### 5. Git Remote 👩‍💻

__Syntax__

```shell
"remote_name"/"branch_name"
```

일반적으로 `origin/main`으로 짓는다.

---

### 6. Git Origin 👩‍💻

#### 1. Fetch and Pull

`Pull` 명령은 `Fetch` 명령과 `Merge` 명령을 합친 것과 같다.

```shell
git fetch; git merge o/main
git pull
```
<br>

`Pull` 명령에 `Fetch` 명령과 `Rebase` 명령을 합친 효과를 내려면 option 으로 `--rebase`를 설정한다.

```shell
git fetch; git rebase o/main
git pull --rebase
```

#### 2. Control Tracking Branch - Checkout

__Syntax__

```shell
git checkout -b "branch_name" "tracking_branch_name"
```

- `branch_name`으로 브랜치를 생성한다.
- 이 브랜치가 `tracking_branch_name`를 추적하도록 설정한다.

<br>

__Example__

![Control Tracking Branch 1](/assets/images/posts/2023-04-21-git-learning/control-tracking-branch-1.png){: width="450"}

```shell
git checkout -b foo origin/main
git pull
```

C0(Base) ⬅️ C1(main) ⬅️ C2(foo*, origin/main)

main 이 아닌 `foo`가 `origin/main`을 추적한다.

```shell
git commit -m "commit_message"
git push
```

![Control Tracking Branch 2](/assets/images/posts/2023-04-21-git-learning/control-tracking-branch-2.png){: width="450"}

C0(Base) ⬅️ C1(main) ⬅️ C2 ⬅️ C3(foo*, origin/main)

마찬가지로 Push 역시 `foo`가 `origin/main`과 연결된다.

#### 3. Control Tracking Branch - Branch

위에서 Checkout 을 이용해 Branch 의 Remote 트래킹을 연결했다면 이번에는 Branch 명령을 이용해 추적하도록 해보자.

__Syntax__

```shell
# "local_branch_name" 을 생략하면 암시적으로 "current_branch" 가 "local_branch_name" 이 된다.
git branch -u "origin_branch_name"
git branch -u "origin_branch_name" "local_branch_name"
```

<br>

__Example__

```shell
git branch -u origin/main foo
```

위에서 설명했듯이 현재 작업중인 브랜치가 foo 일 경우 생략할 수 있다.

```shell
git branch -u origin/main
```

![Control Tracking Branch 2](/assets/images/posts/2023-04-21-git-learning/control-tracking-branch-2.png){: width="450"}

### 5. Push

__Syntax__

```shell
# Remote 연결이 되어 있다면 단지 git push 만 입력해도 된다.
git push
git push "remote_name" "branch_name"
```

<br>

__Example__

다음과 같은 깃 트리가 있다고 가정해보자.

![Push 1](/assets/images/posts/2023-04-21-git-learning/push-1.png){: width="800"}

C0(HEAD) ⬅️ C1(origin/main, origin/foo) ⬅️ C2(main)
&nbsp;                                   ↖️ C3(foo)

```shell
git push origin main
```

C1 에 (origin/main) 을 보고 이 녀석을 Push 하는 것으로 혼동하지 말자. 현재 Remote 가 다음 상태임을 나타내는 것이다.  

- Remote 의 깃 상태

C0 ⬅️ C1(main, foo)

<br>

`git push origin main` 명령은 현재 `C2(main)`을 Remote 이름이 `origin`인 곳에 Push 를 하겠다는 것이다.  
따라서 로컬의 `main`과 `foo`를 모두 `origin`에 Push 를 하면 다음과 같다.

![Push 2](/assets/images/posts/2023-04-21-git-learning/push-2.png){: width="800"}

### 6. Push - Destination

__Syntax__

```shell
git push "remote_name" "local_source":"remote_destination"
```

특정 커밋으로 Checkout 하지 않고도 Push 를 할 수 있다. Source 는 특정 커밋이 될 수도 있고, 브랜치가 될 수도 있다.  
로컬의 A 를 Remote 의 B 로 Push 한다고 생각하면 쉽다.

<br>

__Example__

다음과 같은 깃 트리가 있다고 가정해보자.

![Push Destination 1](/assets/images/posts/2023-04-21-git-learning/push-destination-1.png){: width="450"}

다음과 같이 명령어를 입력해보자.

```shell
git push origin foo^:main
```

그러면 `foo`를 기준으로 부모 커밋(C2) 가 origin/main 에 Push 될 것이다.

![Push Destination 2](/assets/images/posts/2023-04-21-git-learning/push-destination-2.png){: width="450"}

<br>

> 만약 Remote 에 Destination 이 존재하지 않는다면 새 브랜치를 생성한다.
> 
> ```shell
> git push origin main:bar
> ```

<br>

> 만약 Local Source 를 비워두면 Remote Destination 을 제거한다
> 
> ```shell
> git push origin :bar
> ```
> 
> 생각해보면 쉽다. 아무 것도 없는 것을 목적지에 Push 하겠다는 것이니까.
> 따라서, <span style="color: red;">실수로 삭제하지 않도록 주의</span>해야한다.

### 7. Fetch - Destination

__Syntax__

```shell
git fetch "remote_name" "remote_source":"local_destination"
```

링크
[Push - Destination](#h-6-push---destination) 와 개념은 동일하다. 단지 순서가 **Remote 에서 로컬 방향**으로 반대가 될 뿐이다.  
즉, Remote 의 A 를 로컬의 B 로 Fetch 한다고 생각하면 쉽다.

<br>

__Example__

다음과 같은 깃 트리가 있다고 가정해보자.

![Fetch Destination 1](/assets/images/posts/2023-04-21-git-learning/fetch-destination-1.png){: width="450"}

다음과 같이 명령어를 입력해보자.

```shell
git fetch origin foo~1:bar
```

그러면 Remote 의 `foo`를 기준으로 부모 커밋 C2 가 bar 로 Fetch 될 것이다.

![Fetch Destination 2](/assets/images/posts/2023-04-21-git-learning/fetch-destination-2.png){: width="450"}

<br>

__만약 Local Destination 을 비워두면 현재 위치한 HEAD 에 새 브랜치를 생성한다__

일반적인 동작은 아니다. 브랜치를 다루는 명령이 별도로 존재하니까... 단지 깃의 Fetch 가 어떤식으로 동작하는지 알아만 두고
사용할 일은 없다.


<br><br>

---
Reference

1. "Learn Git Branching." Learn Git Branching. accessed Apr. 21, 2023, [Learn Git Branching](https://learngitbranching.js.org/?locale=ko).








