---
layout: post
title: Swift HTTP JSON Communication
subtitle: HTTP JSON Data Communication and Serialization in Swift
categories: swift
tags: [swift http, json serialization, codable, codingkeys, computed properties]
---

### 1. JSONSerialization  👩‍💻

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





<br><br>

---
Reference

1. "Codable." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Swift/Swift Standard Library/Codable][Codable]
2. "JSONSerialization." Apple Developer Documentation. accessed Jan. 16, 2024, [Apple Developer Documentation - Foundation/Archives and Serialization/JSONSerialization][JSONSerialization]

[Codable]:https://developer.apple.com/documentation/swift/codable
[JSONSerialization]:https://developer.apple.com/documentation/foundation/jsonserialization
