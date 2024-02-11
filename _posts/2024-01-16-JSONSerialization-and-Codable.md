---
layout: post
title: Swift HTTP JSON Communication
subtitle: HTTP JSON Data Communication and Serialization in Swift
excerpt_image: NO_EXCERPT_IMAGE
categories: [swift]
tags: [swift http, json serialization, codable, codingkeys, computed properties]
---

### 1. JSON Serialization 👩‍💻

`Codable`이 나오기 이전 방식으로 직접 *Serialization* 을 해야한다.

```swift
struct CoinData: Decodable {
    
    let time: String
    let coin: String
    let currency: String
    let rate: Double
    
}

protocol CoinManagerDelegate {
    func didUpdateCoin(_ manager: CoinManager, coinData: CoinData)
    func didFailWithError(_ manager: CoinManager, error: Error)
}

struct CoinManager {
    
    var delegate: CoinManagerDelegate?
    
    func fetchData(with urlString: String) {
        // 1. Create a URL
        guard let url = URL(string: urlString) else { return }
        
        // 2. Create a URLSession
        var session = URLSession(configuration: .default)
        /* Optional, 'value-key' pair. */
        // session.setValue("apiKey", forHTTPHeaderField: "X-CoinAPI-Key")
        // session.addValue("apiKey", forHTTPHeaderField: "X-CoinAPI-Key")  // Same to 'setValue' method.
        
        // 3. Give the session a task
        let task: URLSessionDataTask = session.dataTask(with: url) { (data, response, error) in
            if let error {
                print("ERROR: \(error.localizedDescription)")
                return
            }
            
            guard let data else { return }
            guard let coinData = parseJson(data) else { return }
            delegate?.didUpdateCoin(self, coinData: coinData)
        }
        
        // 4. Start the task
        task.resume()
    }
    
    private func parseJson(_ data: Data) -> CoinData? {
        do {
            let coinDictionary = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any]
            let time: String = coinDictionary?["time"] as! String
            let coin: String = coinDictionary?["asset_id_base"] as! String
            let currency: String = coinDictionary?["asset_id_quote"] as! String
            let rate: Double = coinDictionary?["rate"] as! Double
            let coinData = CoinData(time: time, coin: coin, currency: currency, rate: rate)
            return coinData
        } catch {
            delegate?.didFailWithError(self, error: error)
            return nil
        }
    }
    
}
```
---

### 2. Codable 👩‍💻

- `DTO`에 `Codable` 프로토콜을 채택시킴으로써 인코딩과 디코딩을 손쉽게 할 수 있다.
- Codable 은 Encodable 과 Decodable 을 모두 채택하는 alias 이다.

`URLSession`을 사용해 데이터 통신을 직접 코딩하거나, `Codable` 객체를 지원하는 라이브러리에서 사용 가능하다.

```swift
struct CoinData: Decodable {
    
    let time: String
    let coin: String
    let currency: String
    let rate: Double
    
    enum CodingKeys: String, CodingKey {
        case time
        case coin = "asset_id_base"
        case currency = "asset_id_quote"
        case rate
    }
    
}

protocol CoinManagerDelegate {
    func didUpdateCoin(_ manager: CoinManager, coinData: CoinData)
    func didFailWithError(_ manager: CoinManager, error: Error)
}

struct CoinManager {
    
    var delegate: CoinManagerDelegate?
    
    func fetchData(with urlString: String) {
        // 1. Create a URL
        guard let url = URL(string: urlString) else { return }
        
        // 2. Create a URLSession & task & start
        /*
         커스터마이징을 필요로 하지 않는다면 아래와 같이
         `URLSession.shared.dataTask(with:completionHandler:)`를 사용할 수 있다.
         */
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error {
                print("ERROR: \(error.localizedDescription)")
                return
            }
            
            guard let data else { return }
            guard let coinData = parseJson(data) else { return }
            delegate?.didUpdateCoin(self, coinData: coinData)
        }.resume()
    }
    
    private func parseJson(_ data: Data) -> CoinData? {
        let decoder = JSONDecoder()
        do {
            let coinData = try decoder.decode(CoinData.self, from: data)
            return coinData
        } catch {
            delegate?.didFailWithError(self, error: error)
            return nil
        }
    }
    
}
```

> 참고로 위 코드는 **Decodable** 프로토콜을 채택한 `CoinData DTO`를 그대로 `Entity`로 사용하고 있다. 
> 만약, `DTO`와 `Entity`를 나누어 사용할 경우, **Codable** 은 `DTO`만 채택하면 된다.

---

### 3. Libraries that does not support Codable 👩‍💻

*Firebase* 의 `Realtime Database`, `Firestore`와 같은 라이브러리는 *Codable* 을 지원하지 않기 때문에 
직접 *Serialization* 을 해줘야한다. 하지만 위 [JSONSerialization](#h-1-jsonserialization) 에서와 같이 
*Swift Data* 객체로 바꾸기 위해 일일히 코딩을 하는 것은 불필요한 *boilerplate code* 를 생성한다.

따라서, `JSONSerialization`을 `JSONEncoder`, `JSONDecoder`과 함께 사용하면 *Codable* 을 지원하지 않는 
라이브러리에도 적용할 수 있다.

#### 1. JSON Serialization Methods

- `jsonObject(with:options:)`: Returns a Foundation object from given JSON data.
- `data(withJSONObject:options:)`: Returns JSON data from a Foundation object.

여기서 `Foundation object`는 *NSArray*, *NSDictionary*, *NSNumber*, *NSDate*, *NSString*, *NSNull* 을 
의미한다. 그리고 데이터 통신을 할 때 가장 바깥 컨테이너는 항상 *Key-Value* 형태를 하고 있으므로, 가장 바깥 형태는 
`[NSString: id]` 타입의 **NSDictionay** 라 볼 수 있다. 그리고 *Objective-C Foundation* 의 **NSDictionay** 는 
*Swift* 의 **Dictionay**와 브릿지되므로, `[String: Any]` 타입의 
<span style="color: red;">***Dictionary*** 와 ***JSON*** 사이의 형변환</span>이라 볼 수 있다.

따라서 다시 정리하면 다음과 같다.

- `jsonObject(with:options:)`: `JSON` -> `Dictionay`
- `data(withJSONObject:options:)`: `Dictionary` -> `JSON`

#### 2. JSON Encoder and Decoder Methods

__JSONEncoder__

`Encodable` 프로토콜을 준수하는 `Structure`를 `JSON`으로 변환한다.

__JSONDecoder__

`JSON`을 `Decodable` 프로토콜을 준수하는 `Structure`로 변환한다. 

> 이를 정리하면 다음과 같다.
> 
> - `JSONSerialization.jsonObject(with:options:)`: `JSON` -> `Dictionary`
> - `JSONSerialization.data(withJSONObject:options:)`: `Dictionary` -> `JSON`
> - `JSONEncoder().encode(_:)`: `Structure: Encodable` -> `JSON`
> - `JSONDecoder().decode(_:from:)`: `JSON` -> `Structure: Decodable`

#### 3. Casting between Dictionaries, JSON, and Structures

*Codable* 을 지원하지 않는 *Firebase* 의 *Realtime Database*, *Firestore* 라이브러리의 경우 직접 
`JSONSerialization`를 해야한다. 이들은 `[String: Any]` 타입의 `Dictionay`를 사용해 통신하는데, 쿼리 결과 
*Response* 의 데이터는 `Any` 또는 `[String: Any]` 타입을 갖는다. 따라서 직접적으로 *Codable* 을 사용할 수 없기 
때문에 다음과 같은 변환 과정을 생각해볼 수 있다.

__Encoding__

`Structure` -> `JSON` -> `NSDictionary`

__Decoding__

`Dictionay` -> `JSON` -> `Structure` (or `Any` -> `NSDictionay` -> `JSON` -> `Structure`)

<br>

위 변환 과정에 필요한 메서드는 다음과 같다.

__Encoding__

`Structure` -> `JSON`: `JSONEncoder().encode(_:)`  
`JSON` -> `NSDictionary`: `JSONSerialization.jsonObject(with:options:)`

__Decoding__

`Dictionay` -> `JSON`: `JSONSerialization.data(withJSONObject:options:)`  
`JSON` -> `Structure`: `JSONDecoder().decode(_:from:)`

#### 4. Custom Encoding Methods for Firebase

앱을 개발하는데 있어 매번 인코딩/디코딩 코드를 작성하는 것은 매우 비효율적이다. 해당 앱에 잘 맞도록 별도의 유틸을 만들어 사용하는 
것이 좋다.

```swift
func encode<T>(_ value: T) throws -> Data where T : Encodable
```

```swift
class func jsonObject(
    with data: Data,
    options opt: JSONSerialization.ReadingOptions = []
) throws -> Any
```

메서드를 사용하므로 `T: Encodable`을 받아 `Any`를 반환하면 된다. 이때 함수는 다양한 방식으로 만들 수 있다.

실제 코드를 사용할 때 별도의 에러 처리를 직접 하기를 원하지 않는다면 아래와 같이 에러를 `throws` 하지 않고 적절한 로그를 남기거나 
특정 알림창을 띄우는 등의 공통된 로직을 추가하고 `Optional`을 반환하도록 작성할 수 있다.

```swift
func toJSON<T: Encodable>(_ data: T?) -> Data? {
    guard let data else { return nil }

    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted

    do {
        return try encoder.encode(data)
    } catch let error as EncodingError {
        // Common error handling here...
        return nil
    } catch {
        // Common error handling here...
        return nil
    }
}
```

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

let jsonData = try? toJSON(pear)
if let jsonData, let jsonData = String(data: jsonData, encoding: .utf8) {
    print(jsonData)
}
```

<br>

또는 다음과 같이 사용하는 곳에서 `do-catch`에 `try`를 사용해 에러에 대해 직접 처리하거나, `try?`를 사용해 에러를 무시하고 
중단할지를 직접 선택하도록 함수를 작성할 수도 있다([Converting Errors to Optional Values] 를 참고).

```swift
enum CastingError: Error {
    case inputIsNil
}

func toJSON<T: Encodable>(_ data: T?) throws -> Data {
    guard let data else { CastingError.inputIsNil }
    
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    
    do {
        return try encoder.encode(data)
    } catch {
        throw error
    }
}
```

```swift
struct GroceryProduct: Codable {
    var name: String
    var points: Int
    var description: String?
}

let pear = GroceryProduct(name: "Pear", points: 250, description: "A ripe pear.")

// 에러를 직접 처리
do {
    let jsonData = try toJSON(pear)
    print(String(data: jsonData, encoding: .utf8)!)
} catch {
    print(error)
}

// try? 로 에러를 Optional 처리
let jsonData = try? toJSON(pear)
if let jsonData, let jsonData = String(data: jsonData, encoding: .utf8) {
    print(jsonData)
}
```

<br>

여기서는 두 번째 방법과 같이 *Input Parameters* 는 `Optional`이고, `throws`를 던질 수 있으며, *Return Types* 는 
`Non-Optional`이 되도록 유틸 함수를 작성할 것이다.

```swift
enum CastingError: Error {
    case inputIsNil
}

func toJSON<T: Encodable>(_ data: T?) throws -> Data {
    guard let data else { throw CastingError.inputIsNil }

    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted

    return try encoder.encode(data)
}

func toDictionary<T: Encodable>(_ data: T?) throws -> Any {
    guard let data else { throw CastingError.inputIsNil }

    let jsonData = try toJSON(data)
    return try JSONSerialization.jsonObject(with: jsonData, options: .fragmentsAllowed)
}
```

#### 5. Custom Decoding Methods for Firebase

```swift
class func data(
    withJSONObject obj: Any,
    options opt: JSONSerialization.WritingOptions = []
) throws -> Data
```

```swift
func decode<T>(
    _ type: T.Type,
    from data: Data
) throws -> T where T : Decodable
```

메서드를 사용하므로 `Any`를 받아 `T: Decodable`을 반환하면 된다.

```swift
enum CastingError: Error {
    case inputIsNil
}

func fromJSON<T: Decodable>(_ type: T.Type, from data: Data?) throws -> T {
    guard let data else { throw CastingError.inputIsNil }

    let decoder = JSONDecoder()
    decoder.dateDecodingStrategy = .iso8601

    return try decoder.decode(type, from: data)
}

func fromDictionary<T: Decodable>(_ type: T.Type, withJSONObject obj: Any?) throws -> T {
    guard let obj else { throw CastingError.inputIsNil }

    let data = try JSONSerialization.data(withJSONObject: obj, options: .fragmentsAllowed)
    return try fromJSON(type, from: data)
}
```

#### 6. Examples

```swift
struct DataUtil {

    enum CastingError: Error {
        case inputIsNil
    }

    func toJSON<T: Encodable>(_ data: T?) throws -> Data {
        guard let data else { throw CastingError.inputIsNil }

        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted

        return try encoder.encode(data)
    }

    func toDictionary<T: Encodable>(_ data: T?) throws -> Any {
        guard let data else { throw CastingError.inputIsNil }

        let jsonData = try toJSON(data)
        return try JSONSerialization.jsonObject(with: jsonData, options: .fragmentsAllowed)
    }

    func fromJSON<T: Decodable>(_ type: T.Type, from data: Data?) throws -> T {
        guard let data else { throw CastingError.inputIsNil }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601

        return try decoder.decode(type, from: data)
    }

    func fromDictionary<T: Decodable>(_ type: T.Type, withJSONObject obj: Any?) throws -> T {
        guard let obj else { throw CastingError.inputIsNil }

        let data = try JSONSerialization.data(withJSONObject: obj, options: .fragmentsAllowed)
        return try fromJSON(type, from: data)
    }

    func toUserDefaults<T: Encodable>(_ value: T, forkey: String) throws {
        let encodedValue = try PropertyListEncoder().encode(value)
        UserDefaults.standard.setValue(encodedValue, forKey: forkey)
    }

    func fromUserDefaults<T: Decodable>(_ type: T.Type, forkey: String) throws -> T? {
        guard let data = UserDefaults.standard.object(forKey: forkey) as? Data else { return nil }
        return try PropertyListDecoder().decode(type, from: data)
    }

}
```

```swift
class CardListTableViewController: UITableViewController {

    // Firestore
    var db: Firestore!

    var creditCards: [CreditCard] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        // Database
        db = Firestore.firestore()
        // MARK: Firebase Firestore GET
        db.collection("creditCardList").addSnapshotListener { querySnapshot, error in
            guard let documents = querySnapshot?.documents else {
                print("ERROR: Fetching documents \(error!.localizedDescription)")
                return
            }
            self.creditCards = documents.compactMap {
                        let document: [String: Any] = $0.data()
                        guard let cardData = try? DataUtil().fromDictionary(CreditCard.self, withJSONObject: document) else { return nil }
                        return cardData
                    }.sorted { $0.rank < $1.rank }

            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }

    private func uploadCard(cardData: CreditCard) {
        guard let cardData = try? DataUtil().toDictionary(cardData) else { return }
        let encoder = JSONEncoder()
        guard let data = try? encoder.encode(data) else { return }
        guard let data = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }
        db.collection("creditCardList").document("Item1").setData(data)
    }
}
```

이런식으로 반복되는 *Decoding* 은 물론, *Encoding* 처리 작업을 분리시킬 수 있다.

---

### 4. CodingKeys vs. Computed 👩‍💻

API 통신을 할 때 앱에서 사용하는 객체와 API가 사용하는 객체가 동일하다는 보장이 없다. 그렇다고 API 통신을 받거나 보낼 때 매번 
객체를 *Converting* 하는 것은 매우 소모적인 일이다. 이러한 문제를 Swift 에서는 두 가지 방법으로 해결할 수 있다. 

#### 1. CodingKeys

```swift
struct CoinData: Codable {
    
    let time: String
    let coin: String
    let currency: String
    let rate: Double
    
    enum CodingKeys: String, CodingKey {
        case time
        case coin = "asset_id_base"
        case currency = "asset_id_quote"
        case rate
    }
    
}
```

가장 보편적인 방법으로 Swift 가 제공하는 `CodingKeys` Enumerations 를 사용하는 것이다. 위와 같이 작성하면 
인코딩, 디코딩 시 자동으로 **Key** 가 매칭된다.

#### 2. Computed

```swift
struct CoinData: Codable {
    
    let time: String
    private var asset_id_base: String
    var coin: String {
        get { asset_id_base }
        set { asset_id_base = newValue }
    }
    private var asset_id_quote: String
    var currency: String {
        get { asset_id_quote }
        set { asset_id_quote = newValue }
    }
    let rate: Double
    
    init(time: String, coin: String, currency: String, rate: Double) {
        self.time = time
        self.asset_id_base = coin
        self.asset_id_quote = currency
        self.rate = rate
    }

}
```

또 다른 방법으로는 `Computed Properties`를 사용하는 것이다. 단, 이 경우 *Computed Properties* 를 사용했기 
때문에 [Memberwise Initializers][Memberwise Initializers for Structure Types] 가 생성되지 않기 때문에 
직접 *Initializers* 를 만들어야한다.

위 *CodingKeys* 와 *Computed Properties* 는 다음 코드를 통해 테스트 가능하다. 

```swift
// Create a CoinData structure
let coinData = CoinData(time: "2024-01-23T12:34:56Z",
                        coin: "BTC",
                        currency: "USD",
                        rate: 40000.50)

// 1. toJSON(_:) test
do {
    let jsonData = try DataUtil().toJSON(coinData)
    let jsonString = String(data: jsonData, encoding: .utf8)
    print("CoinData as JSON:\n\(jsonString ?? "Unable to convert to JSON")")
} catch {
    print("Error converting CoinData to JSON: \(error)")
}

// 2. toDictionary(_:) test
do {
    let dataUtil = DataUtil()
    let jsonDictionary = try dataUtil.toDictionary(coinData)
    print("CoinData as Dictionary:\n\(jsonDictionary)")
} catch {
    print("Error converting CoinData to Dictionary: \(error)")
}

// Create a JSON String
let jsonData = """
{
    "time": "2024-01-23T12:34:56Z",
    "asset_id_base": "BTC",
    "asset_id_quote": "USD",
    "rate": 40000.50
}
""".data(using: .utf8)

// 3. fromJSON(_:from:) test
do {
    let coinDataFromJSON = try DataUtil().fromJSON(CoinData.self, from: jsonData)
    print("CoinData from JSON:\n\(coinDataFromJSON)")
} catch {
    print("Error converting JSON to CoinData: \(error)")
}

// Create a dictionary
let jsonDictionary: [String: Any] = [
    "time": "2024-01-23T12:34:56Z",
    "asset_id_base": "BTC",
    "asset_id_quote": "USD",
    "rate": 40000.50
]

// 4. fromDictionary(_:withJSONObject:) test
do {
    let coinDataFromDict = try DataUtil().fromDictionary(CoinData.self, withJSONObject: jsonDictionary)
    print("CoinData from Dictionary:\n\(coinDataFromDict)")
} catch {
    print("Error converting Dictionary to CoinData: \(error)")
}

```


<br><br>

---
Reference

1. "Codable." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Swift/Swift Standard Library/Codable][Codable]
2. "JSONSerialization." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Foundation/Archives and Serialization/JSONSerialization][JSONSerialization]

[Codable]:https://developer.apple.com/documentation/swift/codable
[JSONSerialization]:https://developer.apple.com/documentation/foundation/jsonserialization
[Converting Errors to Optional Values]:/swift/2022/12/22/error-handling.html#h-3-converting-errors-to-optional-values
[Memberwise Initializers for Structure Types]:/swift/2022/12/01/initialization.html#h-2-memberwise-initializers-for-structure-types
