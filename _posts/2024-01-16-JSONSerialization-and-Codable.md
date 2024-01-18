---
layout: post
title: Swift HTTP JSON Communication
subtitle: HTTP JSON Data Communication and Serialization in Swift
categories: swift
tags: [swift http, json serialization, codable, codingkeys, computed properties]
---

### 1. JSONSerialization 👩‍💻

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






<br><br>

---
Reference

1. "Codable." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Swift/Swift Standard Library/Codable][Codable]
2. "JSONSerialization." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Foundation/Archives and Serialization/JSONSerialization][JSONSerialization]

[Codable]:https://developer.apple.com/documentation/swift/codable
[JSONSerialization]:https://developer.apple.com/documentation/foundation/jsonserialization
