---
layout: post
title: Swift Performance Test Using XCTest
subtitle: Swift Unit Test
categories: swift
tags: [swift unit test, swift code execution time, unit test, performance, xctest]
---

### 1. Measure time interval code snippet 👩‍💻

간단한 코드 테스트 시 유용한 방법으로, 코드 실행 전후의 시간차를 출력한다.

```swift
func measureTimeInterval(closure: () -> ()) -> TimeInterval {
    let start = CFAbsoluteTimeGetCurrent()
    closure()
    return CFAbsoluteTimeGetCurrent() - start
}

func testCode(_ closure: () -> ()) {
    print("Execution time: \(measureTimeInterval(closure: closure))")
}
```

<br>

```swift
testCode {
    _ = (1...10000).reduce(0) {
        $0 + $1
    }
}
```

```console
Execution time: 0.057237982749938965
```

---

### 2. Perform Test using XCTest 👩‍💻

#### 1. Example Cases

`Swift Playground` 같은 곳에서 사용하기에는 위 방법이 쉽고 편하다. 하지만 위 방법은 실제로 앱을 개발하면서 사용할 수 있는
방법은 아니다. 아래 주사위의 `isEven`을 `Computed Properties`로 사용할 때와 `Methods`로 사용할 때 어떤 차이가 있는지 
`XCTest`를 이용해 성능 테스트를 해보도록하자.

```swift
struct Dice {
    @OneToSix var currentDice: Int
    var isEven: Bool {
        currentDice.isMultiple(of: 2)
    }
    
    mutating func rollDice() {
        currentDice = Int.random(in: 1...6)
    }
    
    func printDice() {
        print("The current numer of dice is \(currentDice), then is \(isEven ? "even" : "odd") number.")
    }
}

@propertyWrapper
struct OneToSix {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set {
            switch newValue {
            case 1...6: number = newValue
            default: fatalError("Out of range.")
            }
        }
    }
}

```


#### 2. Make Sample Project

`Playground`가 아닌 `Xcode Project`를 생성하도록한다. 이때 프로젝트를 `App`으로 생성할 경우 아래와 같이 `Include Test`를 
선택하면 프로젝트에 `Tests Group`과 `UITests Group`이 기본으로 포함되므로 [3. Add Test Target Groups](#h-3-add-test-target-groups) 로 건너뛴다.

![New Project App](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/new-project-app.png)

<br>

하지만 프로젝트를 `Command Line Tool`로 생성할 경우 `Include Tests`를 선택하는 것이 불가능하다. 또한 `App`으로 만든 프로젝트더라도 
`Tests`를 포함하지 않고 생성한 프로젝트일 경우는 직접 `Tests`를 추가해줘야한다.

![New Project Command Line Tool](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/new-project-command-line-tool.png)

<br>

아래와 같이 `Command Line Tool`로 프로젝트를 선택하고, 이름은 `Computed-Properties`로 샘플 프로젝트를 생성한다.

![Create Sample Project](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/create-sample-project.png)

<br>

그리고 다음 코드를 각 `Swift` 파일에 작성한다.

- main.swift

```swift
import Foundation

struct App {

    func getValueFromComputedProperties() {
        let dice = DiceOne()
        (1...100000).forEach { _ in
            _ = dice.isEven
        }
    }

    func getValueFromClosures() {
        let dice = DiceTwo()
        (1...100000).forEach { _ in
            _ = dice.isEven()
        }
    }

}
```

<br>

- DiceOne.swift

```swift
import Foundation

struct DiceOne {
    @OneToSix var currentDice: Int
    var isEven: Bool {
        currentDice.isMultiple(of: 2)
    }
    
    mutating func rollDice() {
        currentDice = Int.random(in: 1...6)
    }
    
    func printDice() {
        print("The current numer of dice is \(currentDice), then is \(isEven ? "even" : "odd") number.")
    }
}

@propertyWrapper
struct OneToSix {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set {
            switch newValue {
            case 1...6: number = newValue
            case ..<1: number = 1
            case 7...: number = 6
            default: fatalError("Maybe \(newValue) is not an integer value.")
            }
        }
    }
}
```

<br>

- DiceTwo.swift

```swift
import Foundation

struct DiceTwo {
    @OneToSix var currentDice: Int
    func isEven() -> Bool {
        currentDice.isMultiple(of: 2)
    }

    mutating func rollDice() {
        currentDice = Int.random(in: 1...6)
    }

    func printDice() {
        print("The current numer of dice is \(currentDice), then is \(isEven() ? "even" : "odd") number.")
    }
}
```



#### 3. Add Test Target Groups

프로젝트 설정에서 `+`를 이용해 추가를 하거나 `File-New-Target...`를 이용해 추가를 한다.

![Add Target 1](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-target-1.png)

<p class="center">(프로젝트 설정에서 `+`를 이용해 추가)</p>

![Add Target 2](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-target-2.png)

<p class="center">(`File-New-Target...`를 이용해 추가)</p>

<br>
`Unit Testing Bundle`을 선택 후 `Computed-PropertiesTests`라는 이름으로 생성한다.

![Add Unit Testing Bundle 1](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-new-unit-testing-bundle-1.png)

![Add Unit Testing Bundle 2](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-new-unit-testing-bundle-2.png)

> 일반적으로 `Tests Groups` 이름은  
> `Unit Testing Bundle` 은 `Project Name` + `Tests`로 만들고,  
> `UI Testing Bundle`은 `Project Name` + `UITests`로 만든다.

<br>

아래와 같이 `Computed-PropertiesTests`라는 이름의 그룹과 `XCTestCase`를 상속한 샘플 `Class`가 생성된다.

![Unit Testing Bundle Sample](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/unit-testing-bundle-sample.png)

#### 4. Edit Scheme for Tests

`Product-Scheme-Edit Scheme...` 또는 단축키 `⌘ <` 를 이용해 프로젝트의 `Scheme` 수정에 접근한다.

![Edit Project Scheme](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/edit-scheme.png)

<br>

현재 `Build`는 타겟이 잡혀있지만

![Build Targets](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/build-targets.png)

`Test`는 타겟이 잡혀있지 않은 것을 볼 수 있다. 이것을 잡아줘야한다.

![Non Test Targets](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/non-test-targets.png)

<br>

아래 캡쳐를 참고해 방금 생성한 `Computed-PropertiesTests` 그룹을 타겟 그룹으로 추가한다.

![Add Test Targets 1](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-test-targets-1.png)

![Add Test Targets 2](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-test-targets-2.png)

<br>

> 이 설정을 하지 않으면 테스트 실행 자체가 실패된다.

#### 5. Add Target Memberships

테스트에 필요한 모든 `Swift` 파일을 `Computed-PropertiesTests`의 `Target Membership`으로 등록한다.

![Add Target Membership 1](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-target-membership-1.png)

![Add Target Membership 2](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-target-membership-2.png)

테스트에 필요한 모든 `Swift` 파일은 위와 같이 테스트 그룹을 `Target Membership`에 체크해 등록해야한다. 
따라서, `DiceTwo.swift` 파일도 동일한 작업을 해주도록 한다.

<br>

위 경우는 기존의 프로젝트가 진행되는 중간에 테스트 그룹을 추가했기 때문이고, 테스트 그룹을 생성한 이후 새 `Swift` 파일을 생성할 경우, 
아래와 같이 `Target Membership`을 미리 설정할 수 있다.

![Add Target Membership 3](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/add-target-membership-3.png)

<br>

> 이 설정을 하지 않으면 테스트는 실행되지만, `Computed-Properties` 그룹의 `Classes`, `Structures`, `Protocols` 같은 
> 것들을 찾지 못 한다(해당 코드가 포함된 `Swift` 파일을 찾지 못 하기 때문이다).

#### 6. Write Test Cases

> - setUpWithError : 클래스 내 각 테스트 메서드가 실행되기 전에 호출할 코드
> - tearDownWithError : 클래스 내 각 테스트 메서드가 실행된 후 호출할 코드
> - testExample : `Unit Tests`할 코드를 작성한다. 항상 `test`라는 prefix 를 붙여야 정상적인 테스트로 인식한다.
> - testPerformanceExample : 성능 측정을 위한 메서드로, `test`라는 prefix 를 붙이고, `measure` Closures 안에 
>   코드를 작성한다.

<br>

> `Unit Tests`는
> 
> 1. Arrange : 필요에 따라 테스트에 필요한 데이터를 생성 및 나열한다.
> 2. Act : 테스트를 수행한다.
> 3. Assert : 테스트를 검증한다.
> 
> 순서로 작성한다.

<br>

- Test

```swift
func testInitialValue_Is_Number_One() throws {
    // Arrange
    let dice = DiceOne()
    let currentDice:Int = dice.currentDice
    
    // Act
    
    // Assert
    XCTAssertEqual(currentDice, 1, "The initial value of the 'currentDice' is should be 1.")
    
}
func testCurrentDice_Is_Greater_Than_Or_Equal_To_One() throws {
    // Arrange
    var dice = DiceOne()
    
    // Act
    dice.currentDice = 0
    
    // Assert
    XCTAssertEqual(dice.currentDice, 1, "The 'currentDice' is greater than or equal to 1.")
}

func testCurrentDice_Is_Less_Than_Or_Equal_To_Six() throws {
    // Arrange
    var dice = DiceOne()
    
    // Act
    dice.currentDice = 7
    
    // Assert
    XCTAssertEqual(dice.currentDice, 6, "The 'currentDice' is less than or equal to 6.")
}
```

<br>

- Test Performance

```swift
func testPerformance_GetValueFromComputedProperties() throws {
    measure {
        App().getValueFromComputedProperties()
    }
}

func testPerformnace_GetValueFromClosures() throws {
    measure {
        App().getValueFromClosures()
    }
}
```

를 추가한다.

> 테스트 코드는 위와 같이 특정 케이스에 대해 커드를 직접 작성해 테스트 할 수도 있고, 이미 존재하는 함수나 메서드에 
> `arguments`를 케이스 별로 작성해 '성공'/'에러 처리'를 테스트 할 수도 있다.


#### 7. Run Tests

![Run Test](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/run-test.png)

위 버튼을 길게 눌러 `Test`를 실행하거나, 단축키 `⌘ U`를 사용해 테스트를 실행한다.

<br>

![Test Result 1 Pass](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/test-result-1-pass.png)

<p class="center">(1 Pass)</p>

![Test Result 10000 Pass](/assets/images/posts/2022-12-15-swift-performance-test-using-xctest/test-result-100000-pass.png)

<p class="center">(100,000 Pass)</p>

`Show the Report navigator` 탭을 누르고 테스트 결과를 확인한다.  

> 위 예제의 경우 3개의 테스트 코드가 성공적으로 통과했다.
> 1. 주사위 초깃값은 1
> 2. 주사위 최솟값은 1
> 3. 주사위 최댓값은 6
> 
> 또한 2개의 성능 테스트가 성공했다.
> - `Time`을 보면 반복을 하지 않을 경우 `Closures`가 근소하게 빠르지만, 
> - 값 조회를 100,000번 할 경우 `Computed Properties`가 근소하게 빠른 것을 확인할 수 있다.  
> (measure 를 사용할 경우 Duration 은 measure 를 작동하기 위한 별도의 빌드 시간을 포함하는 듯 하다. 메서드를 개별적으로 
> 돌려보거나 가볍게 돌려봐도 항상 5초 가까운 시간이 나오며, 실제로 반복 횟수에 영향을 받는 값은 `Time`이다.)
> 
> 위 테스트의 경우 `Closures` 또는 `Computed Properties`의 계산 자체가 매우 가볍기 때문에 큰 차이가 없지만 무거운 계산이 
> 포함될 경우 수정 보다는 접근 횟수가 많다면 `Closures` 보다는 `Computed Properties`를 사용하는 것이 캐싱으로 인해 성능에 
> 이점을 가질 것이다.

<br>

> 테스트 실행 자체가 실패하는 경우 [4. Edit Scheme for Tests](#h-4-edit-scheme-for-tests) 를 확인하고,  
> 테스트는 실행되지만 `Classes`, `Structures`, `Protocols` 같은 것들을 찾지 못 하는 경우 
> [5. Add Target Memberships](#h-5-add-target-memberships) 를 확인한다.

---

### 3. Summary 👩‍💻 

값의 변경이 없어도 매번 계산하는 `Closures`의 경우 `O(N)+`의 복잡도를 갖지만, `Computed Properties`를 사용하는 경우 
캐싱에 의해 `O(1)`의 복잡도를 갖기 때문에 변경이 적고 조회가 많은 값일 때 유리하다.

단, 다음 케이스는 `Computed Properties` 사용의 나쁜 예로 피하도록 한다.

- Random values
- today's date
- a value from another object or singleton
- formatting a date
- fetching from server


<br><br>

---
Reference

1. "Functions vs Computed property — What to use?", Medium, last modified Nov. 22, 2018, accessed Dec. 15, 2022, [Functions vs Computed property](https://medium.com/swift-india/functions-vs-computed-property-what-to-use-64bbe2df3916)
2. "Uni testing best practices", Microsoft Learn .NET, last modified Nov. 4, 2022, accessed Dec. 15, 2022, [Uni testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
