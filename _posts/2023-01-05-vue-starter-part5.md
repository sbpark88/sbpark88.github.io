---
layout: post
title: Vue.js Starter - Part 5
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vue js, vue.js, composition api, options api, mixins, proxy, cors, vuex]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 17. Reusability & Composition 👩‍💻

#### 1. Options API & Composition API

`COmposition API`는 `TypeScript`의 도입과 함께 `Vue.js 3`의 가장 큰 특징 중 하나다.

기존 `Vue.js 2`에서는 `Options API`를 이용해 컴포넌트와 `lifecycle`을 관리하고, `mixins`를 통해서 코드를 재사용 할 수 
있었다. 하지만 이는 프로젝트 규모가 커지며 재사용이 어려운 `Options API`는 large tree 컴포넌트에서 `data`, `computed`, 
`watch`, `methods` 등을 관리하고 코드를 추적하는 것이 어려워지는 문제가 발생했고, 코드 재사용을 위해 사용한 `mixins`의 
오버라이딩 문제가 발생해 다중 `minxins` 사용할 경우 코드 관리가 어려워지는 문제점이 발생했다.

이를 해결하기 위해 `Composition API`는 함수 기반의 `API`로 코드를 유연하게 구성하여 `API`를 호출하듯 재사용 가능하게 만들어졌다. 
이것은 `React 16.8`에서 추가된 `Hooks`와 비슷하게 컴포넌트와 비즈니스 로직을 분리해 관리할 수 있게 해준다. 
Vue 공식 문서의 가이드 [TypeScript with Composition API](https://vuejs.org/guide/typescript/composition-api.html) 
에 따르면 `Composition API`는 `TypeScript`와 함께 사용하는 것을 권장하는 것을 알 수 있으며, `Vue.js 3`에서도 기존의 
`Options API`를 `TypeScript`와 함께 사용할 수 있으나 
[TypeScript with Options API](https://vuejs.org/guide/typescript/options-api.html) 에 따르면 `Vue.js 3`에서 
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

<br>

위와 같이 `setup()`에 작성된 코드는 해당 컴포넌트에서만 사용 가능하다. 만약 다른 컴포넌트에서 재사용 가능하도록 하려면 이를 별도의 
함수로 분리하고, `setup()`에서 이것을 가져와 사용하도록 해야한다. 즉, 코드를 함수형으로 작성해 분리하는 것이다.

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

<p style="font-weight:bold;color:rgba(166, 42, 254, 1);">
  calculator 와 연관된 부분을 `setup` 에서 완전히 분리시키기 위해 `plusNumbers`를 `calculator` 안에 넣어보자. <br>  
  단, 이때 `product`와 같이 `computed`를 이용해 내부에서 로직을 정의하는 것이 아니고, 또 다시 외부에서 모듈을 가져오는 
  세부 모듈화 개념으로 `sumTwoNumbers`를 `calculator` 외부에서 가져와 이용하도록 코드를 작성해보자.
</p>

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

<br>

<p style="font-weight:bold;color:rgba(166, 42, 254, 1);">
  이제 `calculator`와 연관된 비즈니스 로직이 완전히 분리되었다. 그렇다면 이 코드는 외부 파일로 완전히 분리시켜 다음과 같이 모듈화 시킬 수 있다.
</p>

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

#### 2. Lifecycle Hooks

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

#### 3. Provide/Inject in Composition API

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

#### 4. Mixins

#### 5. Custom Directives

#### 6. Plugins

---

### 18. Proxy

---

### 19. Vuex


<br><br>

---
Reference

1. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 9
2. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 10
3. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 11
4. "Reactivity API: Core", Vue.js, last modified latest(Unknown), accessed Jan. 05, 2022, [Reactivity: Core](https://vuejs.org/api/reactivity-core.html)
5. "Composition API: Lifecycle Hooks", Vue.js, last modified latest(Unknown), accessed Jan. 05. 2022, [Composition API: Lifecycle Hooks][Composition API: Lifecycle Hooks]

[Composition API: Lifecycle Hooks]:https://vuejs.org/api/composition-api-lifecycle.html