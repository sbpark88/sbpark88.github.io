---
layout: post
title: Vue.js Starter - Data Binding
subtitle: Vue.js 프로젝트 투입 일주일 전 - Part 2
categories: javascript
tags: [javascript, vue, vue js, vue.js, router, vue router, component, vue component, v-for, v-if, v-show, v-on, computed, watch]
---

### 3. Vue Router 👩‍💻

#### 1. Installation

`vue create`를 통해 프로젝트 생성할 때 `Router`를 프로젝트에 설정하지 않았다면 다음 명령어를 통해 설치한다.

```shell
vue add router
```

`@vue/cli-plugin-router`가 설치되며, src 아래 `router`, `view` 디렉토리 및 파일이 생성된다.

#### 2. Run App with Vue Router

__1 ) main.js__

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

```

- `node_modules`에서 `vue` 라이브러리로부터 `createApp`을 가져온다.
- `./App.vue`를 `App`으로 가져온다(자동으로 default export 가 적용된다).
- `./router/index.js`를 `router`로 가져온다.  
  (파일명이 index 일 경우는 생략 가능하므로 './router' 로 적을 수 있다.  
  `index.js` 파일을 보면 알 수 있듯이 `export default router` 를 하고 있기 때문에 `import { router }`로 적지 않고 `{ }`로 적는다).

> `index.html` document 를 받은 후 앱이 `Vue`를 통해 시작되는 `Entry Point`다.

<br>

__2 ) App.vue__

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
```

- <router-link to=""></router-link>" : `Vue`에 의해 `<a href=""></a>` HTML 이 자동 생성된다.
- <router-view/> : 라우터에 의해 매칭된 컴포넌트가 이 곳에 렌더링 된다. 


<br>

__3 ) index.js__
 
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```

- `node_modules`에서 `vue-router` 라이브러리로부터 `createRouter`를 가져온다(`createWebHistory`는 optional).
- 라우터를 생성한고, 이 라우터를 `default`로 `export`한다.

<br>

`routes` Object 는 다음과 같이 구성된다.

- path : 라우터의 `endopoint`
- name : 라우터의 이름
- component : `Vue` 컴포넌트  
  (`component: HomeView`처럼 `import HomeView from '../views/HomeView.vue'`를 분리할 수도 있고,  
   `component: () => import('../views/AboutView.vue')`와 같이 클로저를 이용할 수도 있다.)

#### 3. Lazy Load

`Vue CLI 3`부터 `prefetch` 기능이 추가되어 컴포넌트를 미리 로딩할지, `Lazy` 로딩할지를 구분할 수 있다. 기본값은 `true`로 
별도로 지정하지 않으면 `prefetch`로 작동된다.

`prefetch`를 적용하면, 최초 앱 로딩 후 빠른 속도를 기대할 수 있는 반면 초기 로딩이 느려진다. 따라서 `prefetch`를 적용할 곳과 
적용하지 않을 곳을 구별해 초기 로딩 속도를 빠르게 하면서, 일부 무거운 컴포넌트를 적절히 분리하는 것이 필요하다.

다음 두 가지 방법을 사용할 수 있다.

__1 ) prefetch true__

`prefetch`는 별도로 끄지 않으면 `Vue CLI 3`에서는 기본값으로 `true`를 갖는다.  
따라서, `Lazy` 로딩이 필요한 컴포넌트 `import`에 `/* webpackChunkName: "about" */` 코멘트를 추가해 별도의 파일로 빌드할 
수 있다. 이것을 `chunk`를 만든다고 하며, 이 경우 `about.js`라는 파일을 분리 빌드한다.

```vue
const Home = () => import(/* webpackChunkName: "home" */ './Home.vue');
const About = () => import(/* webpackChunkName: "about" */ './About.vue');
const Contact = () => import(/* webpackChunkName: "contact" */ './Contact.vue');
```

<br>

__2 ) prefetch false__

기본적으로 `prefetch`를 꺼 모든 컴포넌트를 기본적으로 `Lazy` 로딩되도록 한 후, `prefetch`가 필요한 곳을 명시할 수 있다. 
위 방법과 정 반대 되는 방법으로 우선 `vue.config.js`에서 `prefetch`를 끄도록 한다.

```javascript
module.exports = {
  chainWebpack: config => {
    config.plugin.delete('prefetch');
  }
}
```

그리고 `prefetch`가 필요한 컴포넌트 `import`에 `/* webpackPrefetch: true */` 코멘트를 추가한다.

```vue
{
  path: '/about',
  name: 'about',
  component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue')
}
```

---

### 4. Vue Component 👩‍💻

__Component Structures__

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: "",         // 컴포넌트 이름(필수값은 아님)
  components: {},   // 외부 컴포넌트를 import
  data() {          // html 과 javascript 에서 사용할 데이터 변수로 `Vue`에 의해 컨트롤
    return {}
  },
  setup() {         // (Lifecycle Hooks) Composition API
  },
  created() {       // (Lifecycle Hooks) 컴포넌트 init 후
  },
  mounted() {       // (Lifecycle Hooks) 컴포넌트 initial render 후
  },
  unmounted() {     // (Lifecycle Hooks) 컴포넌트 언마운트 시
  },
  methods: {},      // 컴포넌트 내에서 사용할 메서드
}
</script>

<style scoped>

</style>
```

![Vue Lifecycle Hookds](/assets/images/posts/2022-12-10-vue-starter-part2/lifecycle.png)

---

### 5. Data Binding 'v-model' 👩‍💻

`Vue`는 `Anlgular`와 마찬가지로 `Two-way data binding`을 지원한다.

#### 1. Text Data Binding
{% raw %}
> <span style="color: red;">{{ someData }}</span> 로 바인딩 한다.
{% endraw %}

{% raw %}
```vue
<template>
  <div>{{ someData }}</div>
</template>

<script>
export default {
  data() {
    return {
      someData: `Some Text`
    }
  },
}
</script>
```
{% endraw %}

#### 2. Raw HTML Data Binding
{% raw %}
{{ someData }} 로 작성할 경우 단순 텍스트로 인식되기 때문에 `v-html` directive 를 이용해
{% endraw %}

> <span style="color: red;"><div v-html="someData"></div></span> 로 바인딩 한다.

```vue
<template>
  <div v-html="someData"></div>
</template>

<script>
export default {
  data() {
    return {
      someData: `<Some HTML></Some HTML>`
    }
  },
}
</script>
```

- `<div v-html="someData"></div>` 또는 `<span v-html="someData"></span>` 와 같이 
  `children`이 없는 빈 `element`를 생성한다.
- `<div v-html="someData"></div>`의 `children`이 export 되는 element 로 `override` 된다.

<br>

__Raw HTML Data Binding Examples__

```vue
<template>
  <div v-html="someHtml"></div>
</template>

<script>
export default {
  data() {
    return {
      someHtml: `<p style="color: red;">This is red.</p>`
    }
  },
}
</script>
```

![Raw HTML Data Binding](/assets/images/posts/2022-12-10-vue-starter-part2/raw-html-data-binding.png)

#### 3. Form `input type="text"`

`v-model` directive 를 이용해

> <span style="color: red;">\<input type="text" v-model="someValue"></span> 로 바인딩 한다.

```vue
<template>
  <input type="text" v-model="someValue">
</template>

<script>
export default {
  data() {
    return {
      someValue: `Some Text`
    }
  },
}
</script>
```

#### 4. Form `input type="number"`

`v-model.number` directive 를 이용해   

> <span style="color: red;">\<input type="tnumber" v-model="someNumber"></span> 로 바인딩 한다.

```vue
<template>
  <input type="number" v-model.number="someNumber">
</template>

<script>
export default {
  data() {
    return {
      someNumber: 0
    }
  },
}
</script>
```

#### 5. Form `textarea`
{% raw %}
`<textarea>{{ someText }}</textarea>`일 것 같지만 `JavaScript`가 `.innerText`가 아닌 `.value`로 접근하기 대문에 
마찬가지로 `v-model` directive 를 이용해
{% endraw %}

> <span style="color: red;">\<textarea v-model="someValue"></textarea></span> 로 바인딩 한다.

```vue
<template>
  <textarea v-model="someValue"></textarea>
</template>

<script>
export default {
  data() {
    return {
      someValue: `Some Text`
    }
  },
}
</script>
```

#### 6. Form `select`

`v-model` directive 를 이용해 

> <span style="color: red;">\<select v-model="someValue"></select></span> 로 바인딩 한다.

```vue
<template>
  <select v-model="someValue">
    <option value="value01">Value 01</option>
    <option value="value02">Value 02</option>
    <option value="value03">Value 03</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      someValue: `value01`
    }
  },
}
</script>
```

<br>

또한 사용자 입력값이 아닌 고정값이 지정되는 `select box` 또는 `radio button`의 경우 `value`를 HTML 에 값을 고정하지 
않고 `v-bind:value` directive 를 이용해 렌더링 할 수 있다.

> <span style="color: red;">\<option v-bind:value="value01"></option></span> 로 바인딩 한다.

```vue
<template>
  <select v-model="someValue">
    <option v-bind:value="value01">Value 01</option>
    <option v-bind:value="value02">Value 02</option>
    <option v-bind:value="value03">Value 03</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      someValue: `value01`,
      value01: `value01`,
      value02: `value02`,
      value03: `value03`,
    }
  },
}
</script>
```

#### 7. Form `input type="checkbox"` 

`JavaScript`가 `.value`가 아닌 `.checked`로 접근하지만 
`value` 접근으로 취급해 `v-model` directive 를 이용해

> <span style="color: red;">\<input type="checkbox" v-model="someBoolean"></span> 로 바인딩 한다.

```vue
<template>
  <input type="checkbox" v-model="someBoolean">
</template>

<script>
export default {
  data() {
    return {
      someBoolean: true
    }
  },
}
</script>
```

#### 8. Form `input type="radio"`

[6. select box](#h-6-form-select) 와 동일하게 `v-model`과 `v-bind:value`를 사용한다.

> 원래 `radio button`은 `name`을 동일하게 해줘야하지만, 별도로 `name`을 설정하지 않아도 `v-model` 바인딩에 의해 하나의 값만 선택된다.

```vue
<template>
  <select v-model="someValue">
    <option value="value01">Value 01</option>
    <option value="value02">Value 02</option>
    <option value="value03">Value 03</option>
  </select>
  <div>
    <label for="radio01"><input type="radio" v-bind:value="value01" id="radio01" v-model="someChecked">서울</label>
    <label for="radio02"><input type="radio" v-bind:value="value02" id="radio02" v-model="someChecked">부산</label>
    <label for="radio03"><input type="radio" v-bind:value="value03" id="radio03" v-model="someChecked">제주</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      someChecked: `value01`
    }
  },
}
</script>
```

<br>

```vue
<template>
  <select v-model="someValue">
    <option v-bind:value="value01">Value 01</option>
    <option v-bind:value="value02">Value 02</option>
    <option v-bind:value="value03">Value 03</option>
  </select>
  <div>
    <label for="radio01"><input type="radio" v-bind:value="value01" id="radio01" v-model="someChecked">서울</label>
    <label for="radio02"><input type="radio" v-bind:value="value02" id="radio02" v-model="someChecked">부산</label>
    <label for="radio03"><input type="radio" v-bind:value="value03" id="radio03" v-model="someChecked">제주</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      someChecked: `value01`,
      value01: `value01`,
      value02: `value02`,
      value03: `value03`,
    }
  },
}
</script>
```

### 6. Data Binding 'v-bind:x' for Attributes 👩‍💻

HTML 의 attributes 를 바인딩 할 때 `value` 를 제외한 attributes 는 `v-bind:x`를 이용해 바인딩 하며, `v-bind`를 
생략해 `:x`로 바인딩 할 수 있다.

#### 1. img > src

`v-bind:scr` directive 를 이용한다.

```vue
<template>
  <img :src="myBlogFavicon">
</template>

<script>
export default {
  data() {
    return {
      myBlogFavicon: `https://sbpark88.github.io/assets/images/favicon/greendreamtree.png`
    }
  },
}
</script>
```
#### 2. button > disabled

`v-bind:diabled` directive 를 이용한다.

```vue
<template>
  <input type="text" v-model="textValue">
  <button type="button" :disabled="!textValue">Click</button>
</template>

<script>
export default {
  data() {
    return {
      textValue: ``
    }
  },
}
</script>
```

#### 3. class

`.classList.add('someClass')` 또는 `.classList.remove('someClass')`를 할 필요 없이,

반드시 사용할 `class`는 `class` attribute 를 사용하고, `Vue`를 이용해 추가하거나 제거할 변동성 있는 `class`는
`v-bind:class` directive 를 이용하며, `Object` 타입 매핑과, `Array` 타입 매핑 두 가지 방법이 있다.

__1 ) v-bind:class by Object Mapping__

```vue
<template>
  <div class="fixed-class" :class="{ 'some-class-1': class1, 'some-class-2': class2 }"></div>
</template>

<script>
export default {
  data() {
    return {
      class1: true,
      class2: false
    }
  },
}
</script>

<style scoped>
.fixed-class { }
.some-class-1 { }
.some-class-2 { }
</style>
```

> `class-name: boolean` 쌍으로 작성해 적용할 클래스를 <span style="color: red;">On/Off 할 수 있다</span>.

<br>

__2 ) v-bind:class by Array Mapping__

```vue
<template>
  <div class="fixed-class" :class="[class1, class2]"></div>
</template>

<script>
export default {
  data() {
    return {
      class1: 'some-class-1',
      class2: 'some-class-2'
    }
  },
}
</script>

<style scoped>
.fixed-class { }
.some-class-1 { }
.some-class-2 { }
</style>
```

> 클래스 이름을 `Array`로 나열할 뿐 적용할 클래스를 <span style="color: red;">On/Off 할 수 없다</span>.  
> 대신 `Array`를 이용하면 위 케이스를 기준으로 `class1` 변수 하나에 `some-class-1 some-class-2`와 같이 작성할 수 있다.  

#### 4. Inline Style

`v-bind:style` directive 를 이용하며, `Object` 타입 매핑과, `Array` 타입 매핑 두 가지 방법이 있다.  
단, `v-bind:class`와 달리 `Object Mapping`이 `template` 쪽이 아닌 `data()` 쪽에서 이뤄진다. 즉, `boolean`이 
아닌 `CSS`의 `Property: Value` 쌍이 매핑된다.

__1 ) v-bind:style by Object Mapping__

```vue
<template>
  <div :style="styleObject"></div>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {
        proeprty1: 'value1',
        proeprty2: 'value2'
      }
    }
  },
}
</script>
```

<br>

__2 ) v-bind:style by Array Mapping__

```vue
<template>
  <div :style="[style1, style2]"></div>
</template>

<script>
export default {
  data() {
    return {
      style1: 'property1: value1; property2: value2;',
      style2: 'proeprty3: value3;'
    }
  },
}
</script>
```

### 7. v-for

`select`의 `option`, `table`의 `tr` 데이터와 같은 리스트를 처리하는 데 주로 사용되며,
`v-for` directive 를 이용하며, `v-for="(item, index) in items"` 의 형태로 사용한다.

{% raw %}
```vue
<template>
  <table>
    <thead>
    <tr>
      <th>제품명</th>
      <th>가격</th>
      <th>카테고리</th>
      <th>배송료</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, index) in productList" :key="index">
      <td>{{ product.product_name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.category }}</td>
      <td>{{ product.delivery_price }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VueFor",
  data() {
    return {
      productList: [
        {"product_name": "사과", "price": 4000, "category": "과일", "delivery_price": 3000},
        {"product_name": "배", "price": 6000, "category": "과일", "delivery_price": 3000},
        {"product_name": "참치", "price": 30000, "category": "생선", "delivery_price": 10000},
        {"product_name": "안심", "price": 40000, "category": "육류", "delivery_price": 6000},
        {"product_name": "와인", "price": 12000, "category": "주류", "delivery_price": 0},
      ]
    }
  }
}
</script>

<style scoped>
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}
</style>
```
{% endraw %}

![v-for examples](/assets/images/posts/2022-12-10-vue-starter-part2/v-for.png)

### 8. v-if, v-show

#### 1. v-if

```vue
<template>
  <div>
    <h1 v-if="type === 'A'">A</h1>
    <h1 v-else-if="type === 'B'">B</h1>
    <h1 v-else>Others</h1>
  </div>
</template>

<script>
export default {
  name: "VueIf",
  data() {
    return {
      type: 'B'
    }
  },
}
</script>
```

![v-if examples](/assets/images/posts/2022-12-10-vue-starter-part2/v-if.png)

#### 2. v-show

```vue
<template>
  <div>
    <h1 v-show="type === 'A'">A</h1>
    <h1 v-show="type === 'B'">B</h1>
    <h1 v-show="!(type === 'A' || type === 'B')">Others</h1>
  </div>
</template>

<script>
export default {
  name: "VueSHow",
  data() {
    return {
      type: 'B'
    }
  }
}
</script>
```

![v-show examples](/assets/images/posts/2022-12-10-vue-starter-part2/v-show.png)

<br>

> `v-if`는 DOM 을 생성/삭제하고, `v-show`는 DOM 을 모두 생성 후 `display=none` 처리만 한다.  
> 따라서 최초 DOM 생성은 `v-show`가 더 많은 비용이 들지만, 이후 화면에서 생성/삭제가 일어날 때는 감추기만 하므로 
> 더 적은 비용으로 동작한다. 따라서 해당 변수에 토글이 자주 일어난다면 `v-show`를 사용하는 것이 좋다.

### 9. v-on

`HTML`의 `onclick`, `onchange`, `onkeyup`과 사용법이 동일하다.  
차이점은 `Vue`에 의해 관리될 수 있도록 `v-on:x` directive 또는 `@x` directive 를 사용해 `Vue`의 `methods`에 
연결해주는 것만 다르다.

`v-on:click="someMethodName"` 또는 `@click="someMethodName"` 의 형태로 사용한다.

#### 1. v-on:click

- Whitout Arguments

{% raw %}
```vue
<template>
  <button type="button" @click="increaseCounter">Add 1</button>
  <p>The counter is : {{ counter }}</p>
</template>

<script>
export default {
  name: "VueOnEvents",
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increaseCounter() {
      this.counter++
    }
  },
}
</script>
```
{% endraw %}

- With Arguments

{% raw %}
```vue
<template>
  <button type="button" @click="resetCounter(0)">Reset</button>
  <p>The counter is : {{ counter }}</p>
</template>

<script>
export default {
  name: "VueOnEvents",
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    resetCounter(value) {
      this.counter = value
    }
  },
}
</script>
```
{% endraw %}

- Pseudo Pipe

{% raw %}
정확히 `reduce`를 이용한 `Pipe` 함수와는 조금 다르지만, `data`에 변수를 생성해 메서드를 연속해 호출하므로써 
유사 `Pipe` 구현도 가능하다.

```vue
<template>
  <button type="button" @click="first(pipeInitialValue = 5), second(pipeInitialValue)">Multi Call</button>
</template>

<script>
export default {
  name: "VueOnEvents",
  data() {
    return {
      pipeInitialValue: 0
    }
  },
  methods: {
    first(value) {
      alert(value)
      this.pipeInitialValue += 10
    },
    second(value) {
      alert(value)
    }
  },
}
</script>
```
{% endraw %}

```Alert
5
15
```

#### 2. v-on:change

{% raw %}
```vue
<template>
  <select v-model="selectedValue" @change="popSelected">
    <option v-for="(city, index) in cities" :key="index" :value="city">{{ city }}</option>
  </select>
</template>

<script>
export default {
  name: "VueOnEvents",
  data() {
    return {
      cities: ["서울", "부산", "제주"],
      selectedValue: "",
    }
  },
  methods: {
    popSelected() {
      alert(this.selectedValue)
    },
  },
}
</script>

<style scoped>

</style>

```
{% endraw %}

#### 3. v-on:keyup

`Vue`는 `keyup` 이벤트에 특정 키 조건문을 직접 정하지 않고도 손쉽게 처리할 수 있다. 운영체제에 따라 `key-code`가 
다른 것에 대해 별도로 처리할 필요가 없다.

- @keyup.enter : enter, return
- @keyup.tab
- @keyup.delete : delete, backspace
- @keyup.esc
- @keyup.space
- @keyup.up
- @keyup.down
- @keyup.left
- @keyup.right

또한, 다음과 같이 키 조합에 대한 이벤트 처리도 가능하다.

- @keyup.alt.enter
- @click.ctrl

```vue
<template>
  <h4>Keyup (Win: alt + enter / Mac: option + return)</h4>
  <input type="text" @keyup.alt.enter="altEnterCalled">

  <div style="display: grid">
    <div class="btn-style" @click.meta="commandClickCalled">Command Click</div>
  </div>
</template>

<script>
export default {
  name: "VueOnEvents",
  data() {
    return { }
  },
  methods: {
    altEnterCalled() {
      alert(`(alt + enter) or (option + return) called!!`)
    },
    commandClickCalled() {
      alert(`(win + click) or (command + click) called!!`)
    },
  },
}
</script>

<style scoped>
.btn-style {
  justify-self: center;
  width: 200px;
  padding: 5px 10px;
  margin: 10px;
  background-color: burlywood;
  border: blanchedalmond solid 3px;
  border-radius: 10px;
}
</style>
```

### 10. Computed, Watch

#### 1. Computed Properties

[Swift Computed Properties] 와 같다.

[Swift Computed Properties]:/swift/2022/11/22/properties.html#h-2-computed-properties-

값을 계산해 변수로 사용하며, 값은 캐싱된다.

- Getter/Setter

{% raw %}
```vue
<template>
  <h4>Perform every times</h4>
  <div>{{ `${firstName} ${lastName}` }}</div>

  <h4>Computed</h4>
  <div>{{ fullName }}</div>

  <hr>

  <h4>firstName</h4>
  <input type="text" v-model="firstName">

  <h4>lastName</h4>
  <input type="text" v-model="lastName">

  <h4>fullName</h4>
  <input type="text" v-model="fullName">
</template>

<script>
export default {
  name: "VueComputedAndWatch",
  data() {
    return {
      firstName: "Harry",
      lastName: "Potter"
    }
  },
  methods: {},
  computed: {
    fullName: {
      get: function () {
        return `${this.firstName} ${this.lastName}`
      },
      set: function (newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  }
}
</script>
```
{% endraw %}

<br>

- Read-Only

{% raw %}
```vue
<template>
  <h4>Perform every times</h4>
  <div>{{ `${firstName} ${lastName}` }}</div>

  <h4>Computed</h4>
  <div>{{ fullName }}</div>

  <hr>

  <h4>firstName</h4>
  <input type="text" v-model="firstName">

  <h4>lastName</h4>
  <input type="text" v-model="lastName">

  <h4>fullName</h4>
  <input type="text" v-model="fullName">
</template>

<script>
export default {
  name: "VueComputedAndWatch",
  data() {
    return {
      firstName: "Harry",
      lastName: "Potter"
    }
  },
  methods: {},
  computed: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`
    },
  }
}
</script>
```
{% endraw %}

> Read-Only 의 경우 다음과 같이 사용할 수도 있다.
> 
> ```vue
> computed: {
>   fullName() {
>     return `${this.firstName} ${this.lastName}`
>   },
> }
> ```

> Computed Properties 의 `Getter/Setter`에 `Arrow Functions`는 사용할 수 없다.

#### 2. Watch(Property Observers)

[Swift Property Observers] 에서 `didSet`만 존재하는 것과 같다.

[Swift Property Observers]:/swift/2022/11/22/properties.html#h-3-property-observers-

{% raw %}
```vue
<template>
  <h4>Perform every times</h4>
  <div>{{ `${firstName} ${lastName}` }}</div>

  <h4>Computed</h4>
  <div>{{ fullName }}</div>

  <hr>

  <h4>firstName</h4>
  <input type="text" v-model="firstName">

  <h4>lastName</h4>
  <input type="text" v-model="lastName">

  <h4>fullName</h4>
  <input type="text" v-model="fullName">
</template>

<script>
export default {
  name: "VueComputed",
  data() {
    return {
      firstName: "Harry",
      lastName: "Potter"
    }
  },
  methods: {},
  computed: {
    fullName: {
      get: function () {
        return `${this.firstName} ${this.lastName}`
      },
      set: function (newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    firstName(newValue, oldValue) {
      console.log(`firstName(old) : ${oldValue}`)
      this.firstName = `${newValue.substring(0, 1).toUpperCase()}${newValue.substring(1)}`
    },
    lastName(newValue, oldValue) {
      console.log(`lastName(old) : ${oldValue}`)
      this.lastName = `${newValue.substring(0, 1).toUpperCase()}${newValue.substring(1)}`
    },
  }
}
</script>
```
{% endraw %}

<br><br>

---
Reference

1. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 4, 2021.
2. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 5, 2021.
