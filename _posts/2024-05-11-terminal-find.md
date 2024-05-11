---
layout: post
title: Terminal commands 'find' and 'grep'
subtitle: Short book about 'find' and 'grep'
excerpt_image: /assets/images/posts/2024-05-11-terminal-find/excerpt_image.webp
categories: [shell]
tags: [terminal, find, grep]
---

### 1. Find 👩‍💻

<details class="prerequisite">
  <summary>설명을 위해 파일을 생성하는 명령어(Mac OS)</summary>
</details>

```shell
mkdir beverage sandwich side-dish 
```

```shell
# Beverage 디렉토리 안에 파일 생성
touch beverage/apple_juice.png
touch beverage/apple_cider.jpg
touch beverage/apple_smoothie.txt
touch beverage/chicken_soup.png
touch beverage/chicken_broth.jpg
touch beverage/chicken_soup_recipe.txt
touch beverage/beef_broth.png
touch beverage/beef_stew.jpg
touch beverage/beef_stew_recipe.txt
touch beverage/pork_sauce.png
touch beverage/pork_gravy.jpg
touch beverage/pork_sauce_recipe.rtf

# Sandwich 디렉토리 안에 파일 생성
touch sandwich/apple_sandwich.jpg
touch sandwich/apple_salami_sandwich.png
touch sandwich/apple_cheese_sandwich.txt
touch sandwich/chicken_sandwich.jpg
touch sandwich/chicken_salad_sandwich.png
touch sandwich/chicken_avocado_sandwich.txt
touch sandwich/beef_sandwich.jpg
touch sandwich/beef_cheese_sandwich.png
touch sandwich/beef_onion_sandwich.txt
touch sandwich/pork_sandwich.jpg
touch sandwich/pork_bbq_sandwich.png
touch sandwich/pork_slaw_sandwich.txt

# Side-dish 디렉토리 안에 파일 생성
touch side-dish/apple_salad.png
touch side-dish/apple_coleslaw.jpg
touch side-dish/apple_salad_recipe.txt
touch side-dish/chicken_salad.png
touch side-dish/chicken_potato_salad.jpg
touch side-dish/chicken_salad_recipe.rtf
touch side-dish/beef_stir_fry.png
touch side-dish/beef_mushroom_stir_fry.jpg
touch side-dish/beef_stir_fry_recipe.txt
touch side-dish/pork_roast.png
touch side-dish/pork_mashed_potatoes.jpg
touch side-dish/pork_roast_recipe.rtf
```

```shell
# Beverage 디렉토리 내의 일부 파일의 생성 시간을 1시간 전으로 조작
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" beverage/apple_juice.png
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" beverage/chicken_soup.png
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" beverage/beef_broth.png

# Beverage 디렉토리 내의 일부 파일의 생성 시간을 2일 전으로 조작
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" beverage/apple_cider.jpg
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" beverage/chicken_broth.jpg
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" beverage/beef_stew.jpg

# Sandwich 디렉토리 내의 일부 파일의 생성 시간을 1시간 전으로 조작
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" sandwich/apple_sandwich.jpg
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" sandwich/chicken_sandwich.jpg
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" sandwich/beef_sandwich.jpg

# Sandwich 디렉토리 내의 일부 파일의 생성 시간을 2일 전으로 조작
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" sandwich/apple_salami_sandwich.png
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" sandwich/chicken_salad_sandwich.png
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" sandwich/beef_cheese_sandwich.png

# Side-dish 디렉토리 내의 일부 파일의 생성 시간을 1시간 전으로 조작
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" side-dish/apple_salad.png
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" side-dish/chicken_salad.png
SetFile -d "$(date -v -1H '+%m/%d/%Y %H:%M:%S')" side-dish/beef_stir_fry.png

# Side-dish 디렉토리 내의 일부 파일의 생성 시간을 2일 전으로 조작
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" side-dish/apple_coleslaw.jpg
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" side-dish/chicken_potato_salad.jpg
SetFile -d "$(date -v -2d '+%m/%d/%Y %H:%M:%S')" side-dish/beef_mushroom_stir_fry.jpg
````

```shell
#!/bin/bash

# Beverage 디렉토리 내의 일부 파일의 수정 시간을 생성 시간과 현재 시간을 기준으로 조절
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" beverage/apple_juice.png
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" beverage/chicken_soup.png
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" beverage/beef_broth.png

touch -mt "$(date '+%Y%m%d%H%M.%S')" beverage/apple_cider.jpg
touch -mt "$(date '+%Y%m%d%H%M.%S')" beverage/chicken_broth.jpg
touch -mt "$(date '+%Y%m%d%H%M.%S')" beverage/beef_stew.jpg

# Sandwich 디렉토리 내의 일부 파일의 수정 시간을 생성 시간과 현재 시간을 기준으로 조절
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" sandwich/apple_sandwich.jpg
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" sandwich/chicken_sandwich.jpg
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" sandwich/beef_sandwich.jpg

touch -mt "$(date '+%Y%m%d%H%M.%S')" sandwich/apple_salami_sandwich.png
touch -mt "$(date '+%Y%m%d%H%M.%S')" sandwich/chicken_salad_sandwich.png
touch -mt "$(date '+%Y%m%d%H%M.%S')" sandwich/beef_cheese_sandwich.png

# Side-dish 디렉토리 내의 일부 파일의 수정 시간을 생성 시간과 현재 시간을 기준으로 조절
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" side-dish/apple_salad.png
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" side-dish/chicken_salad.png
touch -mt "$(date -v -1H '+%Y%m%d%H%M.%S')" side-dish/beef_stir_fry.png

touch -mt "$(date '+%Y%m%d%H%M.%S')" side-dish/apple_coleslaw.jpg
touch -mt "$(date '+%Y%m%d%H%M.%S')" side-dish/chicken_potato_salad.jpg
touch -mt "$(date '+%Y%m%d%H%M.%S')" side-dish/beef_mushroom_stir_fry.jpg
```

```shell
# 일부 파일 용량을 1kb로 수정
truncate -s 1K beverage/apple_smoothie.txt
truncate -s 1K sandwich/apple_cheese_sandwich.txt
truncate -s 1K side-dish/apple_salad_recipe.txt

# 일부파일 용량을 2kb로 수정
truncate -s 2K beverage/apple_cider.jpg
truncate -s 2K sandwich/apple_salami_sandwich.png
truncate -s 2K side-dish/apple_coleslaw.jpg

# 일부 파일 용량을 3kb로 수정
truncate -s 3K beverage/apple_juice.png
truncate -s 3K sandwich/apple_sandwich.jpg
truncate -s 3K side-dish/apple_salad.png
```

<script>
const container = document.querySelector('.prerequisite');
const prerequisite = [...document.querySelectorAll('.language-shell.highlighter-rouge')].slice(0,5);
container.append(...prerequisite)
</script>

위 명령어로 생성한 결과는 다음과 같다.

<pre style="color: #b0b0b0; background-color: #0e0e0e;">
.
├── beverage
│   ├── apple_cider.jpg
│   ├── apple_juice.png
│   ├── apple_smoothie.txt
│   ├── beef_broth.png
│   ├── beef_stew.jpg
│   ├── beef_stew_recipe.txt
│   ├── chicken_broth.jpg
│   ├── chicken_soup.png
│   ├── chicken_soup_recipe.txt
│   ├── pork_gravy.jpg
│   ├── pork_sauce.png
│   └── pork_sauce_recipe.rtf
├── sandwich
│   ├── apple_cheese_sandwich.txt
│   ├── apple_salami_sandwich.png
│   ├── apple_sandwich.jpg
│   ├── beef_cheese_sandwich.png
│   ├── beef_onion_sandwich.txt
│   ├── beef_sandwich.jpg
│   ├── chicken_avocado_sandwich.txt
│   ├── chicken_salad_sandwich.png
│   ├── chicken_sandwich.jpg
│   ├── pork_bbq_sandwich.png
│   ├── pork_sandwich.jpg
│   └── pork_slaw_sandwich.txt
└── side-dish
    ├── apple_coleslaw.jpg
    ├── apple_salad.png
    ├── apple_salad_recipe.txt
    ├── beef_mushroom_stir_fry.jpg
    ├── beef_stir_fry.png
    ├── beef_stir_fry_recipe.txt
    ├── chicken_potato_salad.jpg
    ├── chicken_salad.png
    ├── chicken_salad_recipe.rtf
    ├── pork_mashed_potatoes.jpg
    ├── pork_roast.png
    └── pork_roast_recipe.rtf
</pre>

#### 1. Find -name

> - `find` 명령어는 `find` + `시작 위치` + `옵션`으로 구성된다.
> - `find` 명령어는 파일을 검색할 때 <span style="color: red;">**이름과 확장자를 구분하지 않는다**</span>.

```shell
find . -name 'salad'
```

는 아무것도 검색되지 않는다. 심지어 `find . -name 'apple_salad'`로 검색해도 마찬가지다.  
정확히 `find . -name 'apple_salad.png'`라고 검색해야지만 파일이 검색된다.

<br>

따라서 검색할 때 `파일의 이름`과 `확장자`를 한 글자도 틀리지 않고 정확히 일치하는 것을 찾아야 하는 것이 아니라면 `*`를 사용해 
검색해야한다.

- apple 로 시작하는 디렉토리와 파일 찾기

```shell
find . -name 'apple*'
```

- recipe 로 끝나는 디렉토리와 파일 찾기

```shell
find . -name '*recipe.*'
```

완벽한 방법은 아니다. 확장자가 있을 것을 예상하고 뒤에 `.*`을 붙여서 어떤 확장자든 찾는 방법을 사용한건데 파일 이름 중간에 `.`이 
있는 경우 제대로 찾지 못할 수 있다.

이것은 특정 확장자를 갖는 파일을 찾을 때 유용하다.

```shell
find . -name '*.png'
```

- stir 가 중간에 들어간 디렉토리와 파일 찾기

```shell
find . -name '*stir*'
```

#### 2. Find -type

`-type d`는 디렉토리만, `-type f`는 파일만 검색한다.

```shell
find . -name '*sandwich*' -type d
find . -name '*sandwich*' -type f
```

#### 3. Find -maxdepth -mindepth

검색을 사용할 깊이를 지정할 수 있다.

```shell
find . -name '*apple*' -maxdepth 1
find . -name '*apple*' -maxdepth 2
```

복잡한 트리 구조에서 깊이를 제한해 검색하고자 할 때 유용하다.

```shell
tree -L 2
```

`tree` 명령어에 `-L` 옵션을 사용해 깊이를 제한하듯이 `find` 역시 `-mindepth`, `-maxdepth`를 사용해 깊이를 조절할 수 있다.

#### 4. Find -atime -mtime -ctime

- -3일 이내 접근한 파일 찾기(= 3일 이내 접근한 파일 찾기)

```shell
find . -type f -atime -3
```

- -60일 이내 생성된 파일 찾기(= 60일 이내 생성된 파일 찾기)

```shell
find . -type f -ctime -60
```

- -30일 이내 수정된 파일 찾기(= 30일 이내 수정된 파일 찾기)

```shell
find . -type f -mtime -30
```

- -180분 이내 생성된 파일 찾기(= 3시간 이내 생성된 파일 찾기)

```shell
find . -type f -cmin -180
```

- -60분 이내 수정된 파일 찾기(= 1시간 이내 수정된 파일 찾기)

```shell
find . -type f -mmin -60
```

`access`는 과부하를 일으킬 수 있으며, 단순 접근까지 검색될 수 있다. 그리고 `-ctime`, `-cmin`은 원래 `create`의 의미로 
생성 시간을 의미했으나 파일의 permission 이나 소유자가 변경되거나 링크가 생성/삭제되는 행동에 의해 변경될 수 있기 때문에 
주의해야한다.

#### 5. Find -size

- `byte`는 `c`를 붙이고, 
- `kB`는 `k`를, 
- `MB`는 `M`을, 
- `GB`는 `G`를 뒤에 붙여 검색한다.


- 이내일 경우 `-`를 앞에 붙이며 
- 초과일 경우 `+`를 붙인다.
- `-` 또는 `+`를 반드시 작성해야 검색이 되므로 누락하지 않도록 주의한다.

- 2kB 이하인 파일 찾기

```shell
find . -type f -size -2k
```

- 3kB 이상인 파일 찾기

```shell
find . -type f -size +3k
```

- 5MB 이상인 파일 찾기

```shell
find . -type f -size +5M
```

- 1GB 이하인 파일 찾기

```shell
find . -type f -size -1G
```

---

### 2. Word Count 👩‍💻

단독으로 사용되지는 않고 `wc` 명령에 `-l`을 옵션으로 붙여주면 파일의 개수를 출력할 수 있어 `find`로 찾아낸 파일의 
개수를 확인할 때 사용한다.

- apple 이 중간에 들어간 파일의 개수를 출력

```shell
find . -name '*apple*' -type f | wc -l
```

---

### 3. Grep 👩‍💻

`find`와 연결해 함께 사용되는 명령어 중 가장 많이 사용되는 것이 바로 `grep`이다.  
`grep`을 사용하면 단순히 `find`만 사용했을 때와 달리 터미널 검색 결과에 하이라이팅을 해줘 가독성읖 높여준다.

`find`는 이름 앞뒤로 `'`를 사용해야하며 `*`를 사용해 좀 더 유연하게 검색할 수 있는 반면, `grep`은 `'`를 사용할 필요가 
없고 기본적으로 어느 위치에 있든 다 필터시킨다. 즉, `grep apple`은 `-name '*apple*'`와 같다.

```shell
find . -name '*sandwich*'
find . | grep sandwich
```

둘의 검색 결과는 같다. 일반적으로 이전의 검색 결과를 확인 후 검색을 이어나갈 때 사용한다.

<br>

chicken 이 들어간 음식 파일을 검색한 다음

```shell
find . -name '*chicken*' -type f
```

위 결과를 확인 후 이 중에서 salad 만 확인하고 싶을 때 다음과 이어서 검색할 수 있다.

```shell
find . -name '*chicken*' -type f | grep salad
```
