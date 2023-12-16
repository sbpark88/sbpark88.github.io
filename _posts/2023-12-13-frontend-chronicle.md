---
layout: post
title: The History of Frontend Development and React Troubleshooting
subtitle: How did React come into existence, and how is it evolving?
categories: javascript
tags: [vanilla js, jquery, backbone, react, angular, vue, svelte, class component, functional component, react hooks, render optimization, middleware]
---

### 1. History 👩‍💻

1. 인터넷 웹서핑의 초창기의 브라우저는 웹 표준이 제대로 정의되지 않아 크로스 브라우징 이슈가 개발의 가장 큰 부분 중 하나였다.
2. jQuery 의 등장으로 크로스 브라우징 이슈를 해결함은 물론, 반복적인 UI 처리 작업을 라이브러리를 통해 처리할 수 있게 되었다.
3. 웹의 특성상 수시로 서버의 데이터를 받아 재렌더링을 해줘야한다. 이를 자동으로 처리하기 위해 Angular.JS 와 Backbone.JS 는 
   `데이터 바인딩`을 도입하고, 재사용을 위해 `컴포넌트 단위 개발`을 도입했다.
4. 양방향 데이터 바인딩으로 인한 브라우저의 자원 소모 및 프레임워크보다 `가벼운 라이브러리`를 목표로 `단방향 데이터 바인`딩이 가능한 
   React 가 생겨났다. 렌더링의 성능 저하가 크니 `Virtual DOM`을 사용해 비교하고 한 번에 렌더링하도록 해 컴포넌트 단위 개발에 
   브라우징 성능을 높였다. 리액트의 영향으로 Angular.JS 는 버전2로 넘어오며 Angular 라는 이름으로 재탄생했고, Angular 의
   프레임워크의 장점과 React 의 장점을 모두 갖는 라이브러리의 개발을 목표로 Vue.JS 가 생겨났다.
5. Svelte 와 같은 라이브러리는 다시 컴퓨팅 성능 상향 평준화로 인해 Virtual DOM 을 쓰는게 오히려 느릴 수 있으며, 길고 복잡한 
   문법들을 최대한 간소화 하고자 하는 목적으로 생겨났다.

<br>

![Npm Trends](/assets/images/posts/2023-12-13-frontend-chronicle/npm-trends-of-frontend-library.png)

하지만 최근 트렌드를 보면 여전히 React 는 압도적인 점유율을 보여줌과 동시에 유일하게 꾸준한 상승을 하고 있음을 알 수 있다. 지금까지, 
그리고 앞으로도 가까운 미래에는 여전히 React 가 승자라는 것을 알 수 있다.

---

### 2. Limitation of Class Components 👩‍💻

클래스 컴포넌트의 주요 문제점을 정리하면 다음과 같다.

- Boilerplate Code : 다른 언어와 같은 Class 가 실제로는 JavaScript 에 존재하지 않기 때문에 이를 통해 구현한 클래스 
                     컴포넌트 역시 많은 Boilerplate Code 를 필요로 한다.
- `this` 바인딩 : JavaScript 의 특이한 `this` 동작 방식에 대한 이해를 필요로 함에 따라 잘못된 코딩을 하는 경우가 많다.
- 비동기 콜백시 값 변조 : instance 재활용으로 인한 비동기 함수 내 props, state 의 값이 변조될 수 있다.

#### 1. this binding of Event call

```javascript
class MatchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: createMockCard(),
      matches: [],
    };
  }

  next() {
    this.setState({
      ...this.state,
      currentCard: createMockCard(),
    });
  }

  like() {
    this.next();

    checkIsMatched().then(({ data: { isMatched } }) => {
      if (isMatched) {
        this.setState({
          ...this.state,
          matches: [this.state.currentCard, ...this.state.matches],
        });
      }
    });
  }

  render() {
    const { state: { currentCard, matches }, next, like } = this;
    const matchControllerProps = { next, like };

    return (
        <main style={commonStyles.flexCenter}>
          <section style={pageStyles.pageWrap}>
            <img src='/logo.png' alt='logo' style={pageStyles.logo} />
            <MatchCard style={commonStyles.flex1} card={currentCard} />
            <MatchController {...matchControllerProps} />
            <MatchList matches={matches}/>
          </section>
        </main>
    );
  }
}
```

[JavaScript 'this'] 에서 살펴보았듯이 이벤트에 의해 호출되는 경우 `this`가 이벤트 elements 가 호출하는 객체가 되기 
때문에 `this binding`이 필요하다. 따라서 생성자 함수가 Closures 를 생성해 자기 자신의 properties 가 항상 자기 자신을 
가리킬 수 있도록 `bind`를 사용해 영구적으로 바인딩 되도록 `constructor`에 정의해준다.

```javascript
class MatchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: createMockCard(),
      matches: [],
    };

    this.next = this.next.bind(this)
    this.like = this.like.bind(this)
  }
  //...
}
```

다른 방법으로는 `Lexical Scope`를 갖는 `Arrow Functions`를 사용하는 것이다.

```javascript
class MatchPage extends Component {
  //...
  next = () => {
    this.setState({
      ...this.state,
      currentCard: createMockCard(),
    });
  }

  like = () => {
    this.next();

    checkIsMatched().then(({ data: { isMatched } }) => {
      if (isMatched) {
        this.setState({
          ...this.state,
          matches: [this.state.currentCard, ...this.state.matches],
        });
      }
    });
  }
  //...
}
```

> 이 문제는 [JavaScript 'this'] 에서 살펴본 것처럼 `Object Literal` 내부에서 **Arrow Functions** 를 사용하는 
> 것에 문제가 있는 것이지 `Prototype`을 사용하거나 `ES6 Class`문법을 사용할 경우 일일해 `bind()`를 하는 것 보다 
> `Arrow Functions`를 사용하는 것이 좋다.

#### 2. Value Mutation in Asynchronous Callback 

클래스 컴포넌트에서는 비동기 콜백이 포함된 경우 현재 state 값을 필요로 하는데 비동기 콜백의 값으로 state 가 변조되는 문제가 있다. 
즉, `Like` 버튼을 누르면 현재 이미지에 좋아요를 처리한 다음 다음 사진을 가져와야하는데 다음 사진을 가져오는 비동기 콜백이 state 를 
변경하기 때문에 좋아요가 변경된 state 값을 이용해 좋아요를 처리해버리는 문제다. 이 문제를 해결하기 위해 메서드 정의를 `render()` 
메서드 내부로 이동시킨다. 참고로 render 내부에서 다시 ***bind*** 를 하지 않기 위해 함수는 *Arrow Functions* 로 선언한다.

```javascript
class MatchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: createMockCard(),
      matches: [],
    };
  }

  render() {
    const { state: { currentCard, matches } } = this;

    const next = () => {
      this.setState({
        ...this.state,
        currentCard: createMockCard(),
      });
    }

    const like = () => {
      next();

      checkIsMatched().then(({ data: { isMatched } }) => {
        if (isMatched) {
          this.setState({
            ...this.state,
            matches: [currentCard, ...this.state.matches],
          });
        }
      });
    }

    const matchControllerProps = { next, like };

    return (
        <main style={commonStyles.flexCenter}>
          <section style={pageStyles.pageWrap}>
            <img src='/logo.png' alt='logo' style={pageStyles.logo} />
            <MatchCard style={commonStyles.flex1} card={currentCard} />
            <MatchController {...matchControllerProps} />
            <MatchList matches={matches}/>
          </section>
        </main>
    );
  }
}
```

> 참고로 클래스 컴포넌트는 함수 자체가 `render`다. 

> 클래스 컴포넌트는 리팩토링을 통해 `render()` 함수 내 `JSX` 코드를 Stateless 하도록 함수형 컴포넌트로 분리시키는 것이 좋다.
>
> ```javascript
> class MatchPageComponent extends Component {
>   //...
> 
>   render() {
>     //...
>     const props = { currentCard, matches, next, like };
> 
>     return <MatchPage {...props} />
>   }
> }
> 
> const MatchPage = ({currentCard, matches, next, like}) => (
>     <main style={commonStyles.flexCenter}>
>       <section style={pageStyles.pageWrap}>
>         <img src='/logo.png' alt='logo' style={pageStyles.logo}/>
>         <MatchCard style={commonStyles.flex1} card={currentCard}/>
>         <MatchController next={next} like={like}/>
>         <MatchList matches={matches}/>
>       </section>
>     </main>
> )
> ```

#### 3. React Hooks Make It Easy to Create Stateless Components 

React Hooks 를 사용하면 위와 같이 *state* 에 종속되는 *MatchPageComponent* 와 *MatchPage* 를 나누지 
않아도 된다.

```javascript
const MatchPage = () => {
  const [currentCard, setCurrentCard] = useState(createMockCard())
  const [matches, setMatches] = useState([])

  const next = () => setCurrentCard(createMockCard())

  const like = () => {
    next();

    checkIsMatched().then(({data: {isMatched}}) => {
      if (isMatched) {
        setMatches(prevState => [currentCard, ...prevState])
      }
    });
  }

  return (
      <main style={commonStyles.flexCenter}>
        <section style={pageStyles.pageWrap}>
          <img src='/logo.png' alt='logo' style={pageStyles.logo}/>
          <MatchCard style={commonStyles.flex1} card={currentCard}/>
          <MatchController next={next} like={like}/>
          <MatchList matches={matches}/>
        </section>
      </main>
  )
}
```

---

### 3. React Hooks Action 👩‍💻

클래스 컴포넌트의 한계를 극복하는 과정에서 함수형 컴포넌트에 [React Hooks 가 도입되면서 해결한 문제점](#h-3-react-hooks-make-it-easy-to-create-stateless-components)
에서 하나의 컴포넌트 코드를 작성하면서 상태관리를 분리시키고, 추상화 시킨 `useState` 훅은 살펴보았다. 이 과정에서 생겨난 
React Hooks 가 어떤 방식으로 동작하는지 알아야 리액트 최적화를 이해하고 이에 방해되지 않도록 코드를 작성할 수 있다.

```javascript
const ReactDOM = (function () {
  let _container;
  let _elementOrComponent;

  function _render() {
    const elementTree = React.render();

    const run = (reactElement, parent) => {
      parent = parent ?? document.createElement('div');
      Object.entries(reactElement).forEach(([key, value]) => {
        // JSX 태그
        if (
            key.includes('div') ||
            key.includes('button') ||
            key.includes('input')
        ) {
          const _el = document.createElement(key.replace(/[0-9].?/, ''));
          parent.appendChild(_el);
          if (typeof value === 'object') {
            run(value, _el);
          }
        } else if (key === 'text') {
          parent.innerHTML = parent.innerHTML += value;
        } else if (key === 'value') {
          parent.value = value;
        } else if (key === 'onClick') {
          parent.addEventListener('click', value);
        } else if (key === 'onChange') {
          parent.addEventListener('change', value);
        } else {
          if (typeof value === 'function') {
            // 함수형 컴포넌트일 경우
            run(value(), parent);
          }
        }
      });
      return parent;
    };

    _container.innerHTML = '';
    _container.appendChild(run(elementTree, null));
  }

  return {
    render(elementOrComponent, container) {
      if (!container instanceof Element)
        throw new Error('ReactDOM should be rendered on DOM Element');

      _container = container;
      _elementOrComponent = elementOrComponent;
      React._setRenderer(ReactDOM);
      React._setElementOrComponent(elementOrComponent);

      _render();
    },
    _render,
  };
})();

const React = (function () {
  let _currentIndex = 0;
  let _hooks = []; // 특정 컴포넌트를 컨테이너로 states 들을 저장하는 배열을 closures 로 갖는다.

  let _renderer = null;
  let _elementOrComponent = null;

  return {
    _setRenderer(renderer) {
      _renderer = renderer;
    },
    _setElementOrComponent(elementOrComponent) {
      _elementOrComponent = elementOrComponent;
    },
    render() {
      let result = null;
      // 컴포넌트 인스턴스 또는 함수형 컴포넌트 실행 ...
      if (typeof _elementOrComponent !== 'function') {
        return _elementOrComponent;
      }
      const component = _elementOrComponent();

      if (component.render !== undefined) {
        result = component.render(); // 클래스 컴포넌트는 render 메서드를 실행
      } else {
        result = component; // 함수형 컴포넌트는 컴포넌트 자체가 render
      }

      // 컴포넌트를 새로 그릴 때마다 useState 를 다시 수행한다.
      // 각 states 가 순서대로 자신의 _hooks 의 배열 index 를 갖도록 렌더링이 끝나면 인덱스를 초기화 해야한다.
      _currentIndex = 0;

      return result;
    },
    useState(initialValue) {
      const currentIndex = _currentIndex;
      _hooks[currentIndex] = _hooks[currentIndex] ?? initialValue; // 초기값 없을 경우 할당

      const setState = (cbOrValue) => {
        if (typeof cbOrValue === 'function') {
          _hooks[currentIndex] = cbOrValue(_hooks[currentIndex]);
        } else {
          _hooks[currentIndex] = cbOrValue;
        }
        // state 가 변경되면 항상 render 를 호출하도록 한다.
        // Observable 의 notify 역할을 하며 항상 render 에게 알리도록 내부적으로 정의를 하는 것이다.
        _renderer._render();
      };
      _currentIndex++;

      return [_hooks[currentIndex], setState];
    },
    useEffect(cb, dependencies) {
      const prevDependencies = _hooks[_currentIndex];
      const isChanged =
          prevDependencies &&
          !dependencies.every((el, i) => el === prevDependencies[i]);
      // 최초 렌더링 || states 가 변한 경우
      if (isChanged || !prevDependencies) {
        cb();
        // states 를 모두 _hooks 에 저장한 후 마지막 인덱스에 states 를 담은 dependency 배열을 저장한다.
        _hooks[_currentIndex] = dependencies;
      }
      _currentIndex++; // useState 와 마찬가지로 useEffect 도 여러 개 선언할 수 있으니 index 를 증가시킨다.
    },
  };
})();

const Greeting = () => ({
  div: {
    text: 'Hello World!!!!!!!!!!',
  },
});

const App = () => {
  const [foo, setFoo] = React.useState(0);
  const [bar, setBar] = React.useState(0);
  const [baz, setBaz] = React.useState('');

  React.useEffect(() => {
    console.log('something changed!!?!?', foo, bar, baz);
  }, [foo, baz]);
  /*
  useEffect 가 states foo, baz 를 배열로 갖는 [foo, baz] 를 
  dependencies 로 추가하기 전 _hooks 는 다음과 같다.
  _hooks = [foo, bar, baz];

  useEffect 가 dependency [foo, baz] 를 추가하면 이제 _hooks 는 다음과 같다.
  _hooks = [foo, bar, baz, [foo, baz]];      
  */

  /*
  <div>
    <div>
      foo : {foo} + {"  "}
      <button onclick={ () => setFoo((val) => val + 1) }>foo + 1</button>
    </div>
    <>
      bar : {bar} + {"  "}
      <button onclick={ () => setBar((val) => val + 1) }>bar + 1</button>
    </div>
    <div>
      baz : {baz} + {"  "}
      <input value={baz} onChange={ (event) => setBaz(event.target.value) } />
    </div>
    <Greeting />
  </div>
  */
  const reactElement = {
    div: {
      div1: {
        text: `foo : ${foo}  `,
        button: {
          onClick: () => setFoo((val) => val + 1),
          text: 'foo + 1',
        },
      },
      div2: {
        text: `bar : ${bar}  `,
        button: {
          onClick: () => setBar(bar + 1),
          text: 'bar + 1',
        },
      },
      div3: {
        text: 'onChange  ',
        input: {
          value: baz,
          onChange: (event) => setBaz(event.target.value),
        },
      },
      Greeting,
    },
  };

  return reactElement;
};

ReactDOM.render(App, document.getElementById('root'));
```

여기서 중요한 것은 컴포넌트라는 함수 컨테이너 안에 *Closures* 를 사용해 *States* 를 관리한다는 것이다.

하지만 위 예제 코드는 대략적인 개념일 뿐 실제 리액트는 위와 같이 단순하게 작동하지 않는다. 위 예제 코드는 항상 모든 리액트 트리를 
다시 렌더링 할 뿐 아니라 값이 실제로 변하는지 상관 없이 이벤트가 발생할 경우 다시 렌더링을 하는 현상을 확인할 수 있다. 
이전 값과의 비교는 오직 useEffect 에서만 처리되고 있는데, 이 마저도 root 컴포넌트 자체를 모두 새로 그려낸다.

하지만 실제 리액트는 Fiber 와 같은 Reconciliation 엔진도 존재하고, 더 쉽게, 더 안전하게 코드 작성을 할 수 있도록 많은 기술들이 
포함되어있다. 비슷하게 동작하지만 위 예제 코드에서 갖는 문제점은 웹이 커질수록 성능 저하가 심각하게 발생할 것임을 알 수 있다. 
`리액트에 렌더링 최적화가 필요한 이유`다.

---

### 4. Render Optimization 👩‍💻

#### 1. SCU and Virtual DOMs Equivalent

![shouldComponentUpdate In Action](/assets/images/posts/2023-12-13-frontend-chronicle/should-component-update-in-action.png)

위 그림에서 글씨나 그림의 녹색은 *true* 를 나타내며, 빨간색은 *false* 를 나타낸다. `SCU`와 `vDOMEq`라는 2개의 지표가 있다. 
`SCU`는 *shouldComponentUpdate* 로 컴포넌트가 업데이트 되어야 하는지를 나타낸다. 따라서 
<span style="color: green;">녹색</span>이면 컴포넌트를 업데이트 해야함을 나타낸다. 반면 `vDOMEq`는 *Virtual DOM* 이 
이전과 같은지를 반환하므로 <span style="color:red">빨간색</span>이면 컴포넌트를 업데이트를 해야함을 나타낸다.

- C1 : SCU 가 true 를, vDOMEs 가 false 를 반환했으므로 컴포넌트 업데이트를 해야한다.
- C2 : SCU 가 false 를 반환했기 때문에 컴포넌트를 업데이트 하지 않는다.
- C4, C5 : C2 의 SUC 가 false 이므로 더이상 탐색을 하지 않는다.
- C3 : SCU 가 true 를, vDOMEs 가 false 를 반환했으므로 컴포넌트 업데이트를 해야한다.
- C6 : SCU 가 true 를, vDOMEs 가 false 를 반환했으므로 컴포넌트 업데이트를 해야한다.
- C7 : SCU 가 false 를 반환했기 때문에 컴포넌트를 업데이트 하지 않는다.
- C8 : ***SCU 가 true 를 반환했지만 vDOMEs 가 true 를 반환했으므로 컴포넌트 업데이트 하지 않는다***.

리액트의 렌더링 최적화에서 바로 이 C8 이 흥미로운 부분이다. 이로써 리액트는 C1, C3, C6 만 *re-render* 를 수행한다. 
즉, `SCU && !vDOMEs`가 *true* 일 경우에만 최종적으로 컴포넌트의 *re-render* 를 수행한다는 것을 알 수 있다.

#### 2. Prevent Unnecessary Reconciliation

리액트나 뷰는 기본적으로 앵귤러보다도 빠르기 때문에 대부분의 최적화를 크게 고려하지 않아도 300ms 이하의 반응 속도로 잘 작동한다.

하지만 최근 브라우저가 할 수 있는 일이 많아지며 `three.js`와 같은 데이터 시각화, Google Analytics 와 같은 대량의 데이터를 
처리해야하고 기능이 많이 필요한 백오피스, 로그 데이터 시각화에서 Fiber 가 해당 라이브러리에 대한 최적화를 지원하지 못 할 경우 
*reconciliation* 에 많은 시간이 소요될 수 있어 직접 최적화를 해야하는 경우가 발생할 수 있다.

서비스 규모가 커지기 전에는 최적화에 문제가 있는 코드라 하더라도 빠르게 작동할 수 있다. 하지만 서비스가 커지고 문제가 생긴 후 이를 
고칠 때 너무 많은 시간이 소요될 수 있다. 그렇기 때문에 가급적 리액트 렌더링 최적화를 이해하고 좋은 코드를 작성하도록 습관을 들이는 
것이 중요하다.

<br>

__1 ) 하위 컴포넌트로 전달시 Reference 유지하기__

`useMemo`, `useCallback`을 적용한다. 미적용시 하위 컴포넌트가 매번 새 *Reference* 를 받아 불필요한 렌더링이 발생할 
수 있다. 특히 *Custom Input* 에 *onChange* 를 전달할 때, memoization 을 처리하지 않으면 re-rendering 될 필요가 
없는 자식 컴포넌트 모두가 다시 렌더링된다.

<br>

__2 ) Object 상태 비교__

비교해야할 대상의 타입이 *Reference Types* 일 경우 *Shallow Equality* 를 비교할건지, *Deep Equality* 를 
비교할건지 잘 판단해야한다.

__Bad Case__

```javascript
const { markers, mapConfig: { markerScale, markerTextScale: textScale }} = useSelector((state) => state);
```
<br>

__Good Case 1__

```javascript
const markers = useSelector(state => state.markers);
const markerScale = useSelector(state => state.mapConfig.markerScale);
const textScale = useSelector(state => state.mapConfig.markerTextScale);
```

__Good Case 2__

```javascript
const { markers, markerScale, textScale } = useSelector((state) => ({
  markers: state.markers,
  markerScale: state.mapConfig.markerScale,
  textScale: state.mapConfig.markerTextScale,
}), shallowEqual);
```

`useSelector`에 Object 와 같은 Reference Types 를 사용할 때는 *Good Case 1* 처럼 `각 원시값별로 분리해 
사용`하거나, *Good Case 2* 와 같이 `shallowEqual`를 적용해야한다. 그렇지 않으면 리스트와 같은 것을 렌더링 할 때 
무조건 렌더링을 실행해 심각한 성능 저하를 야기할 수 있다.

<br>

__3 ) Redux 를 대체하는 다른 상태 라이브러리 도입을 고려__

과도하게 늘어난 Redux 상태 트리는 불필요한 UI Elements 를 관ㄹ하고 있을 수 있으며, Popup, Toast, Toggle Button 
과 같은 전역 UI 의 상태는 `Context`, `Atomic State` 등으로 분리한다.

또한 Redux 를 다른 상태관리 라이브러리로 교체하는 것이 가능하다면, Recoil, Jotai, Zustand 와 같은 라이브러리를 도입해 
전파 받는 상태를 줄이는 것이 좋다. 단, 상태 관리 라이브러리를 교체하는 것은 결코 쉬운 작업이 아니므로 신중해야한다.

<br>

__4 ) PureComponent, React.memo__

- PureComponent 는 더이상 권장되지 않는다. 따라서 함수형 컴포넌트로 변경하는 것이 좋다.
- React.memo 는 자주 업데이트 되는 컴포넌트에 적용시 오히려 성능이 저하된다. 따라서 반드시 필요한지를 검토해야한다.






---
Reference

[JavaScript 'this']:/javascript/2023/05/24/javascript-this.html
