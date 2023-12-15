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
Reference


[JavaScript 'this']:/javascript/2023/05/24/javascript-this.html
