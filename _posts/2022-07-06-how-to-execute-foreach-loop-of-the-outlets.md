---
layout: post
title: IBOutlet은 어떻게 forEach를 돌릴 수 있을까?
subtitle: IBOutlet과 collection, 그리고 instace member와 property initializer
categories: swift
tags: [foreach, iboutlet, instance member, property initializer]
---

### <span style="color: orange">1. IBOutlet을 forEach를 이용해 반복문을 돌려보자 🥸</span>

`High order functions`을 주로 JavaScript, TypeScript를 통해 다뤄봤던 내가 처음 생각했던 방법은 다음과 같았다.

![first try](/assets/images/posts/2022-07-06-how-to-execute-foreach-loop-of-the-outlets/foreach-of-iboutlets.png)


```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var storyLabel: UILabel!
    @IBOutlet weak var choice1Button: UIButton!
    @IBOutlet weak var choice2Button: UIButton!
    
    var buttons: [UIButton] = [choice1Button, choice2Button]

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func pressChoiceButton(_ sender: Any) {
        buttons.forEach { button in
            button.setTitle("Click", for: .normal)
            button.backgroundColor = .none ?? nil ?? UIColor.clear
        }
    }
}
```

`View`에서 `Controller`로 할당한 각각의 변수를 배열 변수에 담고, 그걸 `forEach`로 돌리면 되겠구나! 😎

하지만 내 첫 번째 시도는 내게 다음과 같은 에러메시지를 보여주었다. 😕

* Cannot use instance member 'choice1Button' within property initializer; property initializers run before 'self' is available
* Cannot use instance member 'choice2Button' within property initializer; property initializers run before 'self' is available

위 코드에서
```swift
@IBOutlet weak var storyLabel: UILabel!
@IBOutlet weak var choice1Button: UIButton!
@IBOutlet weak var choice2Button: UIButton!
```
이 부분은 `instance member`에 해당한다.

그리고
```swift
var buttons: [UIButton] = []
```
이 부분은 `property`에 해당하고, 
```swift
var buttons: [UIButton] = [choice1Button, choice2Button]
```
뒤에 ` = [choice1Button, choice2Button]` 이 부분이 바로 `property initializer`에 해당하는 것이다.

즉, `instance member`는 해당 `class`가 인스턴스화 되며 메모리에 실제 객체가 생성될 때 생성자를 통해 주입(`initializing instance member`)이 된다. 그렇다면 당연히 생성자가 실행된 후에 참조가 가능한데, `property initializer`가 실행되는 시점이 `initializing instance member`보다 빠르기 때문에 `self`를 통해 `instance member`를 참조할 수 없게 되는 것이다.

따라서 정상적으로 코드를 작동시키기 위해서는 `instance member`가 생성된 직후 할당을 해야하므로 
```javascript
window.onload = () => {

}
```
와 같은 역할을 하는

```swift
override func viewDidLoad() {
    super.viewDidLoad()
}
```
를 이용한 주입이 필요했다.

따라서 다음과 같이 코드를 변경했다.

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var storyLabel: UILabel!
    @IBOutlet weak var choice1Button: UIButton!
    @IBOutlet weak var choice2Button: UIButton!
    
    var buttons: [UIButton] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        
        buttons = [choice1Button, choice2Button]
    }

    @IBAction func pressChoiceButton(_ sender: Any) {
        buttons.forEach { button in
            button.setTitle("Click", for: .normal)
            button.backgroundColor = .none ?? nil ?? UIColor.clear
        }
    }
}

```

만세~~ 🥰🥰🥰

### <span style="color: orange">2. 하지만 위 경우는 IBOutlet이 2개인데, 저런 식의 변수가 10개, 20개가 된다면!?</span>

```javascript
const buttons = [...document.getElementsByClassName('btn-choice')]
```
와 같이 세련되게 코드를 만들고 싶었다!

![outlet collection](/assets/images/posts/2022-07-06-how-to-execute-foreach-loop-of-the-outlets/outlet-collection.png)

그 방법은 바로 `IBOutlet` 변수를 생성할 때, `Type`을 기본으로 설정된 `Outlet`이 아닌 `Outlet Collection`로 바꿔주는 것이다. 그러면 `IBAction`에서 했던 것 처럼 하나의 `IBOutlet`에 여러 개의 `View Objects`를 연결할 수 있다.

![outlet collection instance member](/assets/images/posts/2022-07-06-how-to-execute-foreach-loop-of-the-outlets/outlet-collection-instance-member.png)

이로써 코드는 다음과 같이 더욱 간결해졌다.

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var storyLabel: UILabel!
    @IBOutlet var choiceButtons: [UIButton]!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func pressChoiceButton(_ sender: Any) {
        choiceButtons.forEach { button in
            button.setTitle("Click", for: .normal)
            button.backgroundColor = .none ?? nil ?? UIColor.clear
        }
    }
}
```

### <span style="color: orange">3. Index와 Elements를 모두 사용할 수는 없을까? 🧐</span>
개인적으로 `forEach`를 사용할 때, `elements` 뿐 아니라 가끔 `index`가 필요할 때 유용하게 사용하곤 했다. 물론, 반드시 index가 필요할 경우 `for i`를 이용한 반복문을 돌려도 되지만, forEach를 사용하는 것이 코드가 더 깔끔하고, `method chaining`을 사용할 수 있는 등 장점이 많았기 때문이다.

`Swift`에서도 가능하다!!
```swift
collectionVariable.enumerated().forEach { (offset: Int, element: Base.Element) in  }
```
`collection` 변수에 `.forEach`를 붙이기 전에 `.enumerated()`를 해주고, `forEach` 뒤에 오는 `closure` 에서는 `parameters`에 `type 명시를 반드시` 해줘야한다.

```swift
import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var storyLabel: UILabel!
    @IBOutlet var choiceButtons: [UIButton]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func pressChoiceButton(_ sender: Any) {
        choiceButtons.enumerated().forEach { (index: Int, button: UIButton) in
            if index == 0 {
                button.setTitle("Click", for: .normal)
                button.backgroundColor = .none ?? nil ?? UIColor.clear
            }
        }
    }
}

```
이렇게 하면 `Swift`에서도 `forEach`에서 `index`를 함께 사용할 수 있다.


<br><br>

---
Reference

1. "How to loop through view outlets in a UIViewController with Swift?", stackoverflow, last modified Mar. 20 2015, accessed July. 6 2022, [https://stackoverflow.com/questions/29167294/how-to-loop-through-view-outlets-in-a-uiviewcontroller-with-swift](https://stackoverflow.com/questions/29167294/how-to-loop-through-view-outlets-in-a-uiviewcontroller-with-swift)
2. "forEach", Developer Apple, last modified latest(Unknown), accessed July. 6 2022, [https://developer.apple.com/documentation/swift/array/foreach(_:)](https://developer.apple.com/documentation/swift/array/foreach(_:))