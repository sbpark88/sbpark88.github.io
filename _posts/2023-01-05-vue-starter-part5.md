---
layout: post
title: Vue.js Starter - Part 5
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vue js, vue.js, composition api, options api, mixins, plugins]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 17. Options API & Composition API 👩‍💻

#### 1. Composition API Examples

`Composition API`는 `TypeScript`의 도입과 함께 `Vue 3`의 가장 큰 특징 중 하나다.

기존 `Vue 2`에서는 `Options API`를 이용해 컴포넌트와 `lifecycle`을 관리하고, `mixins`를 통해서 코드를 재사용 할 수 
있었다. 하지만 이는 프로젝트 규모가 커지며 재사용이 어려운 `Options API`는 large tree 컴포넌트에서 `data`, `computed`, 
`watch`, `methods` 등을 관리하고 코드를 추적하는 것이 어려워지는 문제가 발생했고, 코드 재사용을 위해 사용한 `mixins`의 
오버라이딩 문제가 발생해 다중 `minxins` 사용할 경우 코드 관리가 어려워지는 문제점이 발생했다.

이를 해결하기 위해 `Composition API`는 함수 기반의 `API`로 코드를 유연하게 구성하여 `API`를 호출하듯 재사용 가능하게 만들어졌다. 
이것은 `React 16.8`에서 추가된 `Hooks`와 비슷하게 컴포넌트와 비즈니스 로직을 분리해 관리할 수 있게 해준다. 
Vue 공식 문서의 가이드 [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html) 
에 따르면 `Composition API`는 `TypeScript`와 함께 사용하는 것을 권장하는 것을 알 수 있으며, `Vue 3`에서도 기존의 
`Options API`를 `TypeScript`와 함께 사용할 수 있으나 
[TypeScript with Options API](https://vuejs.org/guide/typescript/options-api.html) 에 따르면 `Vue 3`에서 
`TypeScript`와 `Options API`를 사용하기보다는 `Composition API`를 사용할 것을 권장하고 있다.
<br>

- /src/views/CalculatorOptionsAPI.vue

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ result }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorOptionsAPI',
  data () {
    return {
      num1: 0,
      num2: 0,
      result: 0
    }
  },
  methods: {
    plusNumbers () {
      this.result = this.num1 + this.num2
    }
  }
}
</script>
```
{% endraw %}
<br>

- /src/views/CalculatorCompositionAPI.vue

`beforeCreate`, `created` Hooks 대신 `setup`을 사용한다.

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="state.num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="state.num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ state.result }} </span>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'CalculatorCompositionAPI',
  setup () {
    // data()
    const state = reactive({
      num1: 0,
      num2: 0,
      result: 0
    })

    // methods
    const plusNumbers = () => {
      state.result = state.num1 + state.num2
    }

    // return Composition
    return {
      state,
      plusNumbers
    }
  }
}
</script>
```
{% endraw %}

> `Options API`에서 `data()`에 해당하는 `Two-way data binding`을 할 데이터를 `reactive`를 이용해 객체로 생성해 
> 사용한다. 따라서 모든 변수/상수는 이 객체를 통해 접근한다. 위 예제에서는 `state`를 이용해 접근한다.

#### 2. Use External Functions with `toRefs`

위와 같이 `setup()`에 작성된 코드는 해당 컴포넌트에서만 사용 가능하다. 만약 다른 컴포넌트에서 재사용 가능하도록 하려면 이를 별도의 
함수로 분리하고, `setup()`에서 이것을 가져와 사용하도록 해야한다. 즉, 코드를 함수형으로 작성해 분리하는 것이다.

위 `Options API` 예제에 `Computed Properties`까지 포함된 로직을 확인한 후 이를 `Composition API` 방식으로 바꾸고 
함수형으로 작성해 분리해보자. 

- /src/views/CalculatorOptionsAPI.vue

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ sum }} </span>
    </div>
    <div>
      <input type="text" v-model.number="num1" disabled>
      <span> x </span>
      <input type="text" v-model.number="num2" disabled>
      <span> = </span>
      <span> {{ product }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorOptionsAPI',
  data () {
    return {
      num1: 0,
      num2: 0,
      sum: 0
    }
  },
  methods: {
    plusNumbers () {
      this.sum = this.num1 + this.num2
    }
  },
  computed: {
    product () {
      return this.num1 * this.num2
    }
  }
}
</script>
```
{% endraw %}
<br>

- /src/views/CalculatorCompositionAPI.vue

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ sum }} </span>
    </div>
    <div>
      <input type="text" v-model.number="num1" disabled>
      <span> x </span>
      <input type="text" v-model.number="num2" disabled>
      <span> = </span>
      <span> {{ product }} </span>
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'

const sumTwoNumbers = () => { return (a, b) => a + b }

const calculator = () => {
  const state = reactive({
    num1: 0,
    num2: 0,
    sum: 0,
    product: computed(() => state.num1 * state.num2)
  })
  return toRefs(state)
}

export default {
  name: 'CalculatorCompositionAPI',
  setup () {
    const { num1, num2, sum, product } = calculator()

    const plusNumbers = () => {
      sum.value = sumTwoNumbers()(num1.value, num2.value)
    }

    // return Composition
    return { num1, num2, sum, product, plusNumbers }
  }
}
</script>
```
{% endraw %}

> - reactive : Options API 의 `data()` 에 해당한다.
> - computed : Options API 의 `computed` 에 해당한다.
> - toRefs : `reactive`로 작성된 데이터를 정상 동작하도록 하기 위해 `Object`를 이용한 `Reference Types`로 변환한다.  
>   (하나의 `Value`만 `Reference Type`으로 바꿔주는 `ref()`, `Object` 내 하나의 `Field`만 `Reference Types`로 
>    바꿔주는 `toRef()`도 있다. 따라서 실제 값에 접근할 때는 `.value`를 이용한다.)

<br>

<span style="font-weight:bold;color:rgba(166, 42, 254, 1);">
  `calculator` 와 연관된 부분을 `setup` 에서 완전히 분리시키기 위해 `plusNumbers`를 `calculator` 안에 넣어보자.  
</span>

단, 이때 `product`와 같이 `computed`를 이용해 내부에서 로직을 정의하는 것이 아니고, 또 다시 외부에서 모듈을 가져오는 
세부 모듈화 개념을 가정해 `sumTwoNumbers`는 `calculator` 외부에서 가져와 이용하도록 코드를 작성해보자.

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ sum }} </span>
    </div>
    <div>
      <input type="text" v-model.number="num1" disabled>
      <span> x </span>
      <input type="text" v-model.number="num2" disabled>
      <span> = </span>
      <span> {{ product }} </span>
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'

const sumTwoNumbers = () => { return (a, b) => a + b }

const calculator = () => {
  const state = reactive({
    num1: 0,
    num2: 0,
    sum: 0,
    product: computed(() => state.num1 * state.num2),
    plusNumbers: () => { state.sum = sumTwoNumbers()(state.num1, state.num2) }
  })
  return toRefs(state)
}

export default {
  name: 'CalculatorCompositionAPI',
  setup () {
    const { num1, num2, sum, product, plusNumbers } = calculator()

    // return Composition
    return { num1, num2, sum, product, plusNumbers }
  }
}
</script>
```
{% endraw %}

#### 3. Modularize into Separate Files

이제 `calculator`와 연관된 비즈니스 로직이 완전히 분리되었다. 그렇다면 이 코드는 외부 파일로 완전히 분리시켜 다음과 같이 
별도의 파일로 모듈화 시킬 수 있다.

- /src/utils/calculator.js

```javascript
import { reactive, computed, toRefs } from 'vue'

const sumTwoNumbers = () => { return (a, b) => a + b }

const calculator = () => {
  const state = reactive({
    num1: 0,
    num2: 0,
    sum: 0,
    product: computed(() => state.num1 * state.num2),
    plusNumbers: () => { state.sum = sumTwoNumbers()(state.num1, state.num2) }
  })
  return toRefs(state)
}

export {
  sumTwoNumbers,
  calculator
}
```

- /src/views/CalculatorWithExternalFiles.vue

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ sum }} </span>
    </div>
    <div>
      <input type="text" v-model.number="num1" disabled>
      <span> x </span>
      <input type="text" v-model.number="num2" disabled>
      <span> = </span>
      <span> {{ product }} </span>
    </div>
  </div>
</template>

<script>
import { calculator } from '@/utils/calculator'

export default {
  name: 'CalculatorWithExternalFiles',
  setup () {
    const { num1, num2, sum, product, plusNumbers } = calculator()

    // return Composition
    return { num1, num2, sum, product, plusNumbers }
  }
}
</script>
```
{% endraw %}

---

### 18. Lifecycle Hooks 👩‍💻

![Vue Lifecycle Hookds](/assets/images/posts/2022-12-10-vue-starter-part2/lifecycle.png)

`Composition API` 내에서 사용할 수 있는 `Component Lifecycle Hooks`는 다음과 같다.

|   Options API   |  Composition API  |
|:---------------:|:-----------------:|
|                 |       setup       |
|  beforeCreate   |                   |
|     created     |                   |
|   beforeMount   |   onBeforeMount   |
|     mounted     |     onMounted     |
|  beforeUpdate   |  onBeforeUpdate   |
|     updated     |     onUpdated     |
|  beforeUnmount  |  onBeforeUnmount  |
|    unmounted    |    onUnmounted    |
|  errorCaptured  |  onErrorCaptured  |
|  renderTracked  |  onRenderTracked  |
| renderTriggered | onRenderTriggered |

`beforeCreate`, `created` 와 일치하는 `Hooks`는 `Composition API`에는 존재하지 않는다. 대신 `setup`을 사용하며, 나머지 
`Hooks`는 모두 `setup` 안에서 `Composition API`에서 제공하는 메서드를 이용해 정의한다.

[Composition API: Lifecycle Hooks][Composition API: Lifecycle Hooks]

<br>
`Composition API`에서 `onMounted`를 이용해 콘솔에 메시지를 출력하도록 해보자.

{% raw %}
```vue
<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <input type="text" v-model.number="num1" @keyup="plusNumbers">
      <span> + </span>
      <input type="text" v-model.number="num2" @keyup="plusNumbers">
      <span> = </span>
      <span> {{ sum }} </span>
    </div>
    <div>
      <input type="text" v-model.number="num1" disabled>
      <span> x </span>
      <input type="text" v-model.number="num2" disabled>
      <span> = </span>
      <span> {{ product }} </span>
    </div>
  </div>
  <p> {{ initialMessage }} </p>
  <p> {{ state.anotherMessage }} </p>
</template>

<script>
import { calculator } from '@/utils/calculator'
import { onMounted, reactive, ref } from 'vue'

export default {
  name: 'CalculatorWithExternalFiles',
  setup () {
    const { num1, num2, sum, product, plusNumbers } = calculator()

    const initialMessage = ref('')

    const state = reactive({
      anotherMessage: ''
    })

    onMounted(() => {
      initialMessage.value = 'CalculatorWithExternalFiles.vue is mounted'
      state.anotherMessage = 'Hello Vue.js'
    })

    // return Composition
    return { num1, num2, sum, product, plusNumbers, initialMessage, state }
  }
}
</script>
```
{% endraw %}

![Composition API Hooks](/assets/images/posts/2023-01-05-vue-starter-part5/composition-api-hooks.png)

---

### 19. Provide/Inject in Composition API 👩‍💻

`Composition API`에서 `Provide/Inject`를 사용하려면 `Hooks`와 마찬가지로 `vue`에서 import 해야한다.

__1 ) Provide__

- /src/views/RootView.vue

```vue
<template>
  <button type="button" @click="changeValue">Change Root Value</button>
  <hr>
  <FirstChild/>
</template>

<script>
import FirstChild from '@/components/FirstChild.vue'
import { provide, ref } from 'vue'

export default {
  name: 'RootView',
  components: {
    FirstChild
  },
  setup () {
    const rootValue = ref("Hello~ I'm root.")

    const changeValue = (() => {
      let times = 0
      return () => {
        rootValue.value = `Hello~ I'm root. is changed ${++times} times`
      }
    })()

    provide('rootValue', rootValue)

    return { changeValue }
  }
}
</script>
```

- /src/components/FirstChild.vue

```vue
<template>
  <SecondChild/>
</template>

<script>
import SecondChild from '@/components/SecondChild.vue'

export default {
  name: 'FirstChild',
  components: {
    SecondChild
  }
}
</script>
```

- /src/components/SecondChild.vue

```vue
<template>
  <ThirdChild/>
</template>

<script>
import ThirdChild from '@/components/ThirdChild.vue'

export default {
  name: 'SecondChild',
  components: {
    ThirdChild
  }
}
</script>
```

<br>

__2 ) App-level Provide__

- /src/main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .provide('appLevelValue', 'Hello~ This is App')
  .mount('#app')
```

<br>

__3 ) Inject__

- /src/components/ThirdChild.vue

{% raw %}
```vue
<template>
  <p>This message is come from root : {{ rootMessage }}</p>
  <p>This message is come from app : {{ appMessage }}</p>
</template>

<script>

import { inject } from 'vue'

export default {
  name: 'ThirdChild',
  setup () {
    const rootMessage = inject('rootValue')
    const appMessage = inject('appLevelValue')

    return {
      rootMessage,
      appMessage
    }
  }
}
</script>
```
{% endraw %}

![Composition API Provide/Inject 1](/assets/images/posts/2023-01-05-vue-starter-part5/composition-api-provide-inject-1.png)

![Composition API Provide/Inject 2](/assets/images/posts/2023-01-05-vue-starter-part5/composition-api-provide-inject-2.png)

---

### 20. Mixins 👩‍💻

#### 1. Why use mixins?

`mixins`는 `Vue 2`까지 컴포넌트 전역에서 `AOP` 프로그래밍을 가능하도록 돕는 좋은 모듈화 방법이다. 메서드를 정의하거나 `Lifecycle Hooks` 
까지도 사용할 수 있어 [Axios Interceptors](/javascript/2022/12/29/vue-starter-part3.html#h-9-interceptors) 와 
적절히 사용하면 많은 코드를 공통화 할 수 있다.

- Axios Interceptors : `HTTP` 요청을 보내기 전 토큰 주입과 같은 `HTTP` 요청 자채와 관련된 관련된 것들을 공통화 할 수 있다.
- Vue.js mixins : 컴포넌트별 공통화를 처리할 수 있다. 단순 메서드 재사용 뿐 아니라 `Lifecycle Hooks`의 `beforeCreate` 또는
  `setup` 과 함께 사용하면 사용자별 컴포넌트의 접근 권한 같은 것들을 공통화 할 수 있다.

#### 2. Prefer Composition API

[mixins in Composition API][mixins in Composition API] 를 보면 `Vue 3`에서 여전히 `mixins`를 지원하지만 컴포넌트간
코드 재사용을 위해서는 `Composition API`를 선호하라고 되어있다.

이는 `mixins`가 `Options API`의 `Lifecycle Hooks`를 공통화 할 수 있어 각 컴포넌트마다 동일한 `Hooks`를 작성하지 않아도 
된다는 장점은 있지만 프로젝트 규모가 커지며 `Nested Components` 구조에서 `Overriding`되는 문제가 발생하기 때문이다. 
따라서 `mixins`는 `Vue 2`까지만 사용하고 `Vue 3`에서는 기존 `Vue 2` 프로젝트에서 마이그레이션 된 `mixins`를 사용한 모듈은 
`Composition API`를 이용하도록 변경되어야 할 것이다.  
(`Lifecycle Hooks`의 공통 로직의 강제 주입은 `TypeScript`로 넘어가 `Interfaces`를 사용하면 해결될 것으로 보인다)

#### 3. Axios Examples with Composition API 

지난번 [Axios Examples](/javascript/2022/12/29/vue-starter-part3.html#h-12-axios-examples-) 를
`Composition API`와 `mounted`를 이용해 다시 구현해보자.

- /src/utils/api.js

```shell
npm i axios -S
```

```javascript
import axios from 'axios'

const $api = axios.create({
  baseURL: 'https://0000.mock.pstmn.io'
})

const $get = async (url, data) => {
  return await $api.get(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $post = async (url, data) => {
  return await $api.post(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $put = async (url, data) => {
  return await $api.put(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $patch = async (url, data) => {
  return await $api.patch(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $delete = async (url, data) => {
  return await $api.delete(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}

export { $api, $get, $post, $put, $patch, $delete }
```

> 메서드 이름 앞에 `$`를 붙이는 이유는 특정한 기능이 있는 것은 아니고 다음과 같다.
> - 컴포넌트에서 혹시라도 동일한 이름의 함수가 존재할 경우 `Overriding` 되는 것을 방지.
> - 컴포넌트가 아닌 공통화 모듈에서 온 메서드라는 것을 시각적으로 표현해 코드 분석을 용이하게 함.

- /src/dto/Product.js

```javascript
export default class Product {
  productName
  price
  category

  constructor (productName, price, category) {
    this.productName = productName
    this.price = price
    this.category = category
  }
}
```

- /src/views/AxiosWithCompositionAPI.vue

{% raw %}
```vue
<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>제품명</th>
        <th>가격</th>
        <th>카테고리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, i) in state.productList" :key="i">
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Product from '@/dto/Product'
import { onMounted, reactive } from 'vue'
import { $get } from '@/utils/api'

export default {
  name: 'AxiosWithCompositionAPI',
  setup () {
    const state = reactive({
      productList: Array[Product]
    })

    const getList = async () => {
      state.productList = await $get('/test')
    }

    onMounted(() => {
      getList()
    })

    return { state }
  }
}
</script>

<style scoped>
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}
</style>
```
{% endraw %}

위와 같이 `reactive`를 사용하거나 아래와 같이 `ref`를 사용해 binding 한다.

{% raw %}
```vue
<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>제품명</th>
        <th>가격</th>
        <th>카테고리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, i) in productList" :key="i">
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Product from '@/dto/Product'
import { onMounted, ref } from 'vue'
import { $get } from '@/utils/api'

export default {
  name: 'AxiosWithCompositionAPI',
  setup () {
    const productList = ref(Array[Product])

    const getList = async () => {
      productList.value = await $get('/test')
    }

    onMounted(() => {
      getList()
    })

    return { productList }
  }
}
</script>

<style scoped>
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}
</style>
```
{% endraw %}

![Axios with Composition API](/assets/images/posts/2023-01-05-vue-starter-part5/composition-api-axios.png)

> 단, `ref`, `toRef`, `toRefs`를 사용하면 `reactive`와 달리 `DTO`를 사용한 타입 추적이 되지 않아 코드 자동완성과 같은 것이 
> 작동하지 않는다. 따라서 가급적이면 `DTO`와 같이 타입을 기억할 필요가 있는 곳은 `reactive`를 사용하는 것이 좋을 것으로 보인다.

---

### 21. Custom Directives 👩‍💻

`Vue`는 `v-model`, `v-show`와 같은 미리 정의된 `Built-in Directives` 외에 `Custom Directives`를 사용할 수 있다.

예를 들어 여러 페이지로 나뉜 회원가입 페이지에서 각 페이지마다 첫 `input`에 자동으로 `focus` 시키는 경우를 가정해보자. 
`Vanilla JS`에서는 `window` 또는 `document`에 `onload()` 또는 `addEventListener('load', () => {})`와 같은 
코드에 특정 `HTML`의 `attribute`를 찾아 `focus()`를 실행시키도록 하는 코드를 별도의 `JavaScript` 파일로 만들어 모듈화 하고, 
각 `HTML` 페이지에는 해당 `attribute`를 추가해줌으로써 공통화 처리할 수 있다.  
그리고 `Vue`는 이 과정을 `Vue`과 좀 더 세분화해 관리한다. `Vue` Instance 를 생성할 때 `Custom Directives`를 만들어 지정하고 
각 컴포넌트에서는 해당 `Directives`를 추가하기만 하면 `focus`되도록 할 수 있다.

#### 1. Directive Hooks

`Directive Hooks`에서 사용할 수 있는 `Hooks`의 종류는 다음과 같다.

```javascript
const myDirective = {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode, prevVnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode, prevVnode) {},
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode, prevVnode) {}
}
```

#### 2. Hook Arguments

`Directive Hooks`이 갖는 `arguments`는 다음과 같다.

> `el`: the element the directive is bound to. This can be used to directly manipulate the DOM.
>
> `binding`: an object containing the following properties.
>
> > `value`: The value passed to the directive. For example in `v-my-directive="1 + 1"`, the value would be `2`.  
> > `oldValue`: The previous value, only available in `beforeUpdate` and `updated`. It is available whether or not the value has changed.  
> > `arg`: The argument passed to the directive, if any. For example in `v-my-directive:foo`, the arg would be `"foo"`.  
> > `modifiers`: An object containing modifiers, if any. For example in `v-my-directive.foo.bar`, the modifiers object would be `{ foo: true, bar: true }`.  
> > `instance`: The instance of the component where the directive is used.  
> > `dir`: the directive definition object.
>
> `vnode`: the underlying VNode representing the bound element.
>
> `prevNode`: the VNode representing the bound element from the previous render. Only available in the `beforeUpdate` and `updated` hooks.

예를 들어 다음과 같은 `Custom Directive`가 있다고 가정해보자.

```vue
<template>
  <div v-example:foo.bar="baz"></div>
</template>
```

이때 `binding` argument 의 `Object`는 다음과 같을 것이다.

```javascript
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* value of `baz` */,
  oldValue: /* value of `baz` from previous update */
}
```

또한 `Custom Directives` 역시 `Built-in Diriectives`와 마찬가지로 `attribute`와 `value`를 이용한 `Dynamic` 처리가 
가능하다.

```vue
<template>
  <div v-example:[arg]="value"></div>
</template>
```

> `el`을 제외한 `arguments` 수정되어서는 안 된다. 반드시 `Read-only`로 다루어져야한다. 만약 서로 다른 `Hooks` 간 데이터를 공유할 
> 필요가 있다면 [dataset][HTML Element dataset] 를 사용하도록 한다.


#### 3. Create Global Custom Directives

`main.js`에서 `Vue` Instance 를 생성하는 시점에 `v-focus` directive 를 추가해 모든 컴포넌트에서 사용할 수 있도록 등록하자.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .directive('focus', {
    mounted (el) {
      el.focus()
    }
  })
  .provide('appLevelValue', 'Hello~ This is App')
  .mount('#app')
```

> - `v-focus` directive 의 앞 `v-`는 `HTML`의 `attributes`에 이것은 `Vue`에 의해 관리되는 `Directives`라는 것을 인식하도록 
>    붙여주는 `prefix`로 `Custom Directives`를 만들때 `v-`는 제외하고 만들어야한다.

#### 4. Function Shorthand

대부분의 `Directives`는 기본적으로 `mounted`와 `updated` 일 때 동일하게 작동한다. 만약, `mounted`와 `updated` `Hooks`의 
동작이 동일하며, 다른 `Hooks`이 필요 없을 경우 다른 설정값과 마찬가지로 `APP`의 `mount()` 메서드를 분리시킨 후 `Custom Directives`를 
다음과 같이 함수형으로 작성할 수 있다.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const myApp = createApp(App)
  .use(store)
  .use(router)
  .provide('appLevelValue', 'Hello~ This is App')

myApp.directive('focus', (el, binding) => {
  el.focus()
})

myApp.mount('#app')
```

는 아래와 같다.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .directive('focus', {
    mounted (el) {
      el.focus()
    },
    updated (el) {
      el.focus()
    }
  })
  .provide('appLevelValue', 'Hello~ This is App')
  .mount('#app')
```


#### 5. Create Local Custom Directives

`Custom Directives`를 모두 `Global`로 등록할 경우 불필요하게 너무 많은 `Directives`가 생겨나게된다 따라서, 각 컴포넌트에서만 사용할 
`Custom Directives`가 필요할 경우 컴포넌트 내에서 등록해 사용할 수 있다. 위 `v-focus` directive 를 `Local`로 추가 등록해보자.

```vue
<template>
  <p>Global Custom Directive 'focus' : <input type="text" v-focus></p>
  <img v-pin="{ position: 'fixed', top: 20, left: 20 }" :src="blogIcon" alt="blog-icon" :style="iconSize">
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomDirectives',
  setup () {
    const blogIcon = ref('/greendreamtree.png')
    const iconSize = { height: '70px', weight: '70px;' }
    return { blogIcon, iconSize }
  },
  directives: {
    pin: {
      mounted (el, binding) {
        el.style.position = binding.value.position
        el.style.top = `${binding.value.top}px`
        el.style.left = `${binding.value.left}px`
      }
    }
  }
}
</script>
```

#### 6. Object Literals

`Directives`에 여러 개의 값이 필요할 때 `Object Literals`를 사용할 수 있다. 위 예제에서

```vue
<template>
  <img v-pin="{ position: 'fixed', top: 20, left: 20 }">
</template>

<script>
export default {
  name: 'CustomDirectives',
  directives: {
    pin: {
      mounted (el, binding) {
        el.style.position = binding.value.position
        el.style.top = `${binding.value.top}px`
        el.style.left = `${binding.value.left}px`
      }
    }
  }
}
</script>
```

이 부분에 해당한다.

#### 6. Use Custom Directives

```vue
<template>
  <p>Global Custom Directive 'focus' : <input type="text" v-focus></p>
  <img v-pin="{ position: 'fixed', top: 20, left: 20 }" :src="blogIcon" alt="blog-icon" :style="iconSize">
</template>
```

![Custom Directives Focus On](/assets/images/posts/2023-01-05-vue-starter-part5/custom-directives.png)

`Custom Directives`로 `focus`와 `pin`을 만들었다. 사용할 때는 `Vue`가 `Directives`로 인식할 수 있도록 `prefix`로 
`v-`를 붙여 `v-focus`, `v-pin`으로 사용한다.

---

### 22. Plugins 👩‍💻

#### 1. Introduction

`NPM` 패지지 매니저를 사용해 공개된 라이브러리를 사용하는 것 외에 사용자가 직접 만들어 사용하는 것 역시 가능하다.

`Plugins`이란건 위에서 모듈화를 위해 만든 `api.js`나 `calculator.js`와 같은 `Utilities`와 달리 `App-level`에서 
작동하는 기능이다.

`Plugins`는 `install(app, options)` 메서드를 노출시키는 방법으로 정의된다. `install(app, options)` 메서드는 
기본적으로 `App Instance`를 전달받으며, `app.use('plugins', 'options')`를 통해 `options`를 전달받는다. 

- Plugins 를 정의

```javascript
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```

- Plugins 를 사용

```javascript
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})
```

<br>

> `Plugins`를 만드는 것에 엄격히 정의된 것이 존재하지는 않는다. 하지만 일반적으로 유용한 플러그인의 시나리오는 다음과 같다.
> 
> 1. 하나 이상의 `Global Components` 또는 `Custom Directives`를 `app.component()` 또는 `app.directive()` 
>    를 사용해 등록한다.
> 2. `app.provide()`를 호출해 앱 전역에서 리소스를 `injectable` 하도록 만든다.
> 3. 일부 `Global Instance Properties` 또는 `Methods`를 `app.config.globalProperties`에 추가한다.
> 
> 이러한 조건을 만족하는 좋은 라이브러리의 예 중 하나가 [vue-router][Vue Router Library] 다.

#### 2. Writing a Plugin

`i18n`을 처리해주는 플러그인을 만들고, 이를 적용해보도록 한다.

> `Internationalization`의 알파벳은 20글자인데 이걸 다 쓰면 기니까 맨 앞 `i`와 18자리 `nternationalizatio`, 
> 그리고 마지막 `n`으로 분리해 `i18n`이라 부른다.

- /src/plugins/i18n.js

```javascript
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        return o ? o[i] : null
      }, options)
    }
  }
}
```

- /src/main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/plugins/i18n'

const myApp = createApp(App)
  .use(store)
  .use(router)
  .use(i18n, {
    greetings: {
      en: 'Hello!',
      ko: '안녕하세요!',
      fr: 'Bonjour!',
      de: 'Hallo!'
    }
  })
  .provide('appLevelValue', 'Hello~ This is App')

myApp.directive('focus', (el, binding) => {
  el.focus()
})

myApp.mount('#app')
```

- /src/views/CustomPlugins.vue

{% raw %}
```vue
<template>
  <h3>English</h3>
  <p>{{ $translate('greetings.en') }}</p>
  <h3>Korean</h3>
  <p>{{ $translate('greetings.ko') }}</p>
  <h3>French</h3>
  <p>{{ $translate('greetings.fr') }}</p>
  <h3>German</h3>
  <p>{{ $translate('greetings.de') }}</p>
</template>

<script>
export default {
  name: 'CustomPlugins'
}
</script>
```
{% endraw %}

![Custom Plugins i18n][Custom Plugins i18n]

#### 3. Provide/Inject with Plugins

`Plugins`는 `App-level`에서 작동하는 것을 위해 만든다고 했다. 따라서 위에서 `app.use()`를 이용해 앱 전역에 
사용할 수 있도록 `Custom Plugins`를 `Global`로 등록했기 때문에 어떤 컴포넌트에서든 `globalProperties`에 등록된 
`$translate`라는 함수를 별도의 `import` 없이 사용할 수 있다(e.g. `$translate('greetings.en')`).

그리고 `globalProperties`를 사용하는 것 외 다른 방법을 통해서도 컴포넌트 전역에 사용할 수 있는 방법이 있다. 바로 
[Provide/Inject](/javascript/2023/01/01/vue-starter-part4.html#h-16-nested-component---provideinject-)
를 사용하는 것이다.

- /src/plugins/i18n.js

```javascript
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        return o ? o[i] : null
      }, options)
    }

    app.provide('i18n', options)
  }
}
```

이제 `Custom Plugins`는 `app.use()`설정에과 함께 `Vue` Instance 가 생성될 때 자기 자신을 `Provide` 하게 된다. 
따라서 각 컴포넌트에서는 `Inject`를 통해 주입 후 사용이 가능하다.

- /src/views/CustomPlugins.vue

{% raw %}
```vue
<template>
  <h3>English</h3>
  <p>{{ $translate('greetings.en') }}</p>
  <h3>Korean</h3>
  <p>{{ $translate('greetings.ko') }}</p>
  <h3>French</h3>
  <p>{{ this.i18n.greetings.fr }}</p>
  <h3>German</h3>
  <p>{{ this.i18n.greetings.de }}</p>
</template>

<script>
export default {
  name: 'CustomPlugins',
  inject: ['i18n']
}
</script>
```
{% endraw %}

![Custom Plugins i18n][Custom Plugins i18n]


> 실제 개발에서 이런 것들은 직접 개발하는 것 보다는 다수가 참여하는 오픈소스를 사용하는 것이 더 좋다.  
> [Vue I18n for Vue 2][Vue I18n for Vue 2] 또는 [Vue I18n for Vue 3][Vue I18n for Vue 3] 와 같은 
> 것들이 있으니 참고하도록 한다.


<br><br>

---
Reference

1. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 9, 2021.
2. "Reactivity API: Core", Vue.js. accessed Jan. 05, 2022, [Reactivity: Core](https://vuejs.org/api/reactivity-core.html)
3. "Composition API: Lifecycle Hooks", Vue.js. accessed Jan. 05, 2023, [Composition API: Lifecycle Hooks][Composition API: Lifecycle Hooks]
4. "Options: Composition #mixins", Vue.js. accessed Jan. 07, 2023, [mixins in Composition API][mixins in Composition API]
5. "Custom Directives", Vue.js. accessed Jan. 08, 2023, [Reusability: Custom Directives](https://vuejs.org/guide/reusability/custom-directives.html)
6. "HTMLElement.dataset", MDN, Oct. 26, 2022, [HTML Element dataset][HTML Element dataset]
7. "Plugins", Vue.js. accessed Jan. 08, 2023, [Reusability: Plugins](https://vuejs.org/guide/reusability/plugins.html)
8. "vue-router", Github, Jan. 05, 2023, [Vue Router][Vue Router Library]
9. "Vue I18n", Github, May. 03, 2022, [Vue I18n for Vue 2][Vue I18n for Vue 2]
10. "Vue I18n", Vue-I18n, Aug. 01, 2022, [Vue I18n for Vue 3][Vue I18n for Vue 3]  

[Composition API: Lifecycle Hooks]:https://vuejs.org/api/composition-api-lifecycle.html
[mixins in Composition API]:https://vuejs.org/api/options-composition.html#mixins
[HTML Element dataset]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
[Vue Router Library]:https://github.com/vuejs/router
[Vue I18n for Vue 2]:https://kazupon.github.io/vue-i18n/
[Vue I18n for Vue 3]:https://vue-i18n.intlify.dev
[Custom Plugins i18n]:/assets/images/posts/2023-01-05-vue-starter-part5/custom-plugins.png
