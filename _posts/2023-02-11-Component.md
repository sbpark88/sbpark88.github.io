---
layout: post
title: About the '@Component' annotation
subtitle: Component, Controller, RestController, Service, Repository
categories: [spring]
tags: [java, spring, component, controller, restcontroller, service, repository]
---

### 1. @Component annotation is the Stereotype 👩‍💻

Spring 에서 IoC 컨테이너에 의해 제어되는 `Bean` 이라는 것을 명시하는 방법으로는, `@Bean` annotation 을 붙이는 것과 
`@Component` annotation 을 붙이는 것 두 가지 방법이 있다.

우선 **@Component** 는 Class level 에 등록하며, **@Bean** 은 Method level 에 등록한다는 차이점이 있다. 즉,
**@Component** 는 Java Class 와 `1:1` 관계를 갖지만 **@Bean** 은 `1:n` 관계를 가질 수 있다.

그리고 이 **@Component** 의 하위 관계에는 `@Controller`, `@RestController`, `@Service`, `@Repository` 
annotation 이 추가로 존재한다.

![Component Tree](/assets/images/posts/2023-02-11-Component/component.jpg){: width="800"}

**@Component** 는 이들의 `General-purpose Stereotype` annotation 인 셈이다. 따라서 **@Component** 가 할 수 
있는 것은 하위 annotation 에서도 가능하다는 의미가 된다.

#### 1. Controller

`Presentation Layer`를 위해 특화된 *Component* 다. 즉, `API` 를 컨트롤하기 위해 특별한 기능이 추가된 *Component* 
인 셈이다. `Dispatcher servlet`으로부터 요청을 수신하고, `@RequestMapping` annotation 을 이용해 라우팅 하는 것은 
*Component* 중 *Controller* annotation 으로 등록된 Bean 에서만 가능한 특화된 기능이다.

그리고 `RESTful API` 가 주된 통신 방식으로 자리 잡으면서 Spring Boot 에서 많이 사용하는 것이 Controller 에 RESTful API 
를 위한 통신에서 많이 사용되는 `@ResponseBody` annotation 등을 자동으로 추가하도록  정의해놓은 것이 `@RestController`다.

#### 2. Service

`Service Layer`를 위해 특화된 *Component* 다. 즉, 앱의 비즈니스 로직을 다루고 있음을 의미한다. 이 annotation 도 
Database 호출을 할 수 있다고 한다. 그리고 비즈니스 로직을 다루고 있음을 명시하는 것 외에 상위 레벨인 `@Component` annotation 
과 큰 차이는 없는 것으로 확인된다.

Exception Handling 을 하는 일부 기능도 있다고는 하지만 이것은 `AOP`나 단순 코드상으로 충분히 대체가 가능한 부분이다. 오히려 
이쪽이 코드를 관리하기가 더 수월하다. 그럼에도 많은 개발자가 `@Service` annotation 으로 명시하는 것 중 가장 큰 이유는 
*Service* 라는 annotation 이름만 보고도 이 *Class* 가 앱 내에서 어떤 기능을 하는 *Layer* 에 해당하는지를 즉각 알아챌 수 
있기 때문으로 보인다.

#### 3. Repository

`Presentation Layer`를 위해 특화된 *Component* 다. 이것이 선언되었다는 것은 이 *Class* 는 
**DAO/Persistent/Data access layer** 임을 의미한다. 그리고 이 annotation 만이 갖는 특징은 
`Automatic exception translation` 을 지원하는 것이다.

쉽게 말해 `low-level exceptions`를 `high-level Spring exceptions`로 바꿔 Database 와 통신하며 발생할 수 있는 
다양한 에러를 *Spring* 이이해하고 관리할 수 있게 해준다.

<br><br>

---
Reference

1. Prasad Thilakarathne. "What is the difference between @Component, @Repository, @Service, and @Controller annotations in Spring?." Medium. Jul. 04, 2020, [About Component Annotation](https://prasadct.medium.com/what-is-the-difference-between-component-repository-service-and-controller-annotations-in-11851c97bc7d).
