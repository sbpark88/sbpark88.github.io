---
layout: post
title: Vue.js Starter - Part 4
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vue js, vue.js, props, parent component, child component, $emit, $refs, provide, inject, composition, mixins, proxy, cors, vuex]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 13. Nested Component - Props 👩‍💻

#### 1. Parent/Child Component and Props

- Parent Component

> 1 ) `Component Tags` 는 `PascalCase`를 사용한다.
> 
> ```vue
> <template>
>   <MyComponent />
> </template>
> 
> <script>
> import MyComponent from "@/components/MyComponent.vue";
> 
> export default {
>   components: {
>     MyComponent
>   }
> }
> </script>
> ```
>
> 2 ) 자식 컴포넌트에 전달할 `Props`는 HTML attributes 와 convention 을 맞추기 위해
> `kebab-case`를 사용하며, 키의 중복을 막기 위해 이름을 축약 없이 길게 선언한다.
> 
> ```vue
> <template>
>   <MyComponent greeting-message="hello" />
> </template>
> ```
>
> 3 ) `Dynamic Props`를 전달하리 위해 `v-bind` 또는 `:`를 사용한다.
> 
> ```vue
> <template>
>   <MyComponent :greeting-message="post.title" />
> </template>
> ```

- Child Component

> 1 ) 부모 컴포넌트가 전달한 `Props`는 `props` property 에 `Object`를 매핑해 받는다. 이 때
> `props`의 key 는 `JavaScript`의 식별자 규칙에 맞게 `camelCase`를 사용한다.
>
> ```vue
> <script>
> export default {
>   props: {
>     greetingMessage: String
>   }
> }
> </script>
> ```
> 
> 2 ) `props`는 `TypeScript`를 사용하지 않고도 `Data Type`을 이용할 수 있게 도와준다. 자세한
> `Type` 체크 및 `Validation`은 [5. Prop Validation](#h-5-prop-validation) 를 참고한다.

#### 2. Static Props

Child Component `PageTitle`를 만든다.

- /src/components/PageTitle.vue

{% raw %}
```vue
<template>
  <h2>{{ myTitle }}</h2>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    myTitle: { type: String, default: "페이지 제목입니다." },
  },
};
</script>
```
{% endraw %}

<br>

`PageTitle` 컴포넌트를 부모 컴포넌트에 주입시키고, `Static Props`로 데이터를 전달해보자.

- /src/views/AboutView.vue

{% raw %}
```vue
<template>
  <PageTitle my-title="About 페이지입니다." />
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  name: "AboutView",
  components: {
    PageTitle,
  },
};
</script>
```
{% endraw %}

![Static Props](/assets/images/posts/2023-01-01-vue-starter-part4/static-props.png)

#### 3. Dynamic Props

`Value` 자체를 전달하는 것이 아닌 변수/상수를 전달하려면 `v-bind` 또는 축약형인 `:`를 사용한다.

- /src/views/AboutView.vue

{% raw %}
```vue
<template>
  <PageTitle :my-title="someTitle" />
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  name: "AboutView",
  components: {
    PageTitle,
  },
  data() {
    return {
      someTitle: "About 페이지입니다.",
    };
  },
};
</script>
```
{% endraw %}

> 자식 컴포넌트는 부모 컴포넌트에서 전달하는 데이터가 `Static Props`인지, `Dynamic Props`인지 
> 알 수 없다. 단지 전달 받을 타입만 정의하고 그 값(Value Types or Reference Types)을 받을 뿐이다. 

별도의 변수 없이 전달하려면 다음과 같이 `IIFE`를 사용할 수 있다.

```vue
<template>
  <PageTitle :my-title="(() => 'About 페이지입니다.')()" />
</template>
```

> `Static Props`는 `String`만 전달할 수 있다. 따라서 `Number`, `Boolean`, `Array`, 
> `Object`, `Property of Object`와 같은 데이터는 모두 `Dynamic Props`를 사용해 전달해야한다.

#### 4. One-way Data Flow

`Vue` 자체는 `Two-way data binding`를 지원하지만, 부모 자식 컴포넌트 사이는 `One-way down binding`으로 작동한다. 
이는 자식 컴포넌트에 의해 부모 컴포넌트의 `state`가 변경되는 것을 허용하게 되면 앱의 데이터 흐름을 이해하기 
어렵게 만들기 때문이다.

<br>

__1 ) Make Props like Local Variable__

즉, 부모 컴포넌트에서 전달된 자식 컴포넌트는 `down binding` 상태이므로 부모의 상태가 변하면 값이 변하게 된다. 
따라서, 자식 컴포넌트에서 이를 `local variable`처럼 사용하기를 원한다면 다음과 같이 별도의 변수에 값을 저장해 
사용한다.

```vue
<script>
export default {
  props: ['initialCounter'],
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      counter: this.initialCounter
    }
  }
}
</script>
```

<br>

__2 ) Props with Computed Properties__

변수에 값을 저장할 때 `Observer`를 이용해 감시하고, 사용자 정의 로직을 추가해 저장할 수 있다. 
하지만, `Vue`의 `Watch`의 경우  부모 컴포넌트에서 넘어오는 데이터를 자식 컴포넌트 변수에 `willSet`이 없고 
`didSet`만 있다보니([Vue Watch Property][Vue Watch Property]) `Vue` 공식 문서를 보면 이런 경우 
`Compouted Properties`를 사용하도록 하고 있다.

[Vue Watch Property]:/javascript/2022/12/10/vue-starter-part2.html#h-2-watchproperty-observers

```vue
<script>
export default {
  props: ['size'],
  computed: {
    // computed property that auto-updates when the prop changes
    normalizedSize() {
      return this.size.trim().toLowerCase()
    }
  }
}
</script>
```

#### 5. Prop Validation

단순히 값을 전달하는 것 외에 다음과 같이 유효성 검사를 추가할 수 있다.

```javascript
export default {
  props: {
    // Basic type check
    //  (`null` and `undefined` values will allow any type)
    propA: Number,
    // Multiple possible types
    propB: [String, Number],
    // Required string
    propC: {
      type: String,
      required: true
    },
    // Number with a default value
    propD: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propE: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function. The function receives the raw
      // props received by the component as the argument.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // Custom validator function
    propF: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Function with a default value
    propG: {
      type: Function,
      // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
      default() {
        return 'Default function'
      }
    }
  }
}
```

---

### 14.  👩‍💻

#### 1.

{% raw %}
{% endraw %}

---

### 15.  👩‍💻

#### 1.

{% raw %}
{% endraw %}

---

### 16.  👩‍💻

#### 1.

{% raw %}
{% endraw %}

---

### 17.  👩‍💻

#### 1.

{% raw %}
{% endraw %}

---




<br><br>

---
Reference

1. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 8
2. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 9
3. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 10
4. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 11
5. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 12
