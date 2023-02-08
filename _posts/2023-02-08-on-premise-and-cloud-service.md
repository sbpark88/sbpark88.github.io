---
layout: post
title: On-Premise and Cloud Services 
subtitle:  On-Premise, IaaS, PaaS, Serverless, SaaS - What is The Difference?
categories: cloud
tags: [on-premise, data-center, iaas, paas, saas, serverless, faas, baas, cloud, aws, gcp, azure]
---

### 1. Why Use Cloud Services? 👩‍💻

기존에는 서비스를 위해서 기업이 직접 서버를 보유하고, 관리하는 것이 너무나도 당연한 일이었다. 하지만 클라우드 시장이 커지면서 기업들은 
직접 서버를 보유하고 운영하기보다는 클라우드를 택하는 경우가 많이 늘고 있다.

클라우드의 어떤 상품을 이용하냐에 따라 가질 수 있는 이점이 다르지만 일반적으로 다음과 같은 이유로 클라우드를 사용한다.

- 서버의 초기 구입 비용이 없어 서비스 초기에 비용 절감이 가능하고, 확장이 유연함.
- 글로벌 서비스를 위해 다른 지역에 서비스를 확장할 때 필요한 모든 것을 제공한다.

직접 서버를 운영하는 것과 비교해 어떤 차이가 있고, 어떤 서비스들이 존재하는지 알아본다.

---

### 2. On-Premise 👩‍💻

#### 1. On-Premise

![On-premise](/assets/images/posts/2023-02-08-on-premise-and-cloud-service/on-premise-and-cloud-service.png)

클라우드 시장이 생겨나기 이전 방식으로, 전통적인 방식이라고도 한다. 서버를 구입하는 것은 물론이고 네트워크부터 저장소, 운영체제, 가상화 등 
서비스를 위한 모든 관리를 직접 하는 방식이다. 모든 것을 직접 관리하고 구축해야하기 때문에 지속적으로 관리할 전산실을 운영하고, UPS 등도 
직접 운영해야한다.

#### 2. IDC (Internet Data Center)

대부분의 기업은 전산실을 직접 운영하는 것이 부담될 수 밖에 없다. 100대도 안 되는 서버를 위해 전산실을 직접 운영하는 것은 상당한 부담이 
된다. 따라서 서버를 물리적으로 안정적으로 운영하고, 네트워크 연결 등을 제공해주는 서비스에 맡기게 된다. 이런 서비스를 제공하는 곳을 
`Internet Data Center`라 한다. 서버를 가동할 수 있는 공간을 제공해 온도, 습도, 전력 공급, 네트워크와 같은 부분을 제공한다. 
그렇기 때문에 `Server Hotel`이라고 불리기도 한다.

국내에 운영중인 IDC 는 다음과 같다.

- 해외 기업 : AWS, MS, Google, Alibaba, Oracle, Equinix, Digital Realty
- 국내 기업 : LG CNS, Samsung SDS, Naver, Kakao, SK, KT, LG Uplus

IDC 관련 정보는 [IDC](https://www.idc.com) 에서 얻을 수 있다.

---

### 3. Cloud - IaaS 👩‍💻

![On-premise](/assets/images/posts/2023-02-08-on-premise-and-cloud-service/on-premise-and-cloud-service.png)

`IaaS`는 `Infrastructure as a Service`의 약자로 클라우드 회사에서 가상화 서버를 운영하고, 그 위에 OS 를 제공한다. AWS 의 
EC2 가 이 방식이다. 사용자는 VM 의 OS 와 사양을 선택하면 이미 생성된 더미 VM OS 를 복제해 빠르게 제공한다. 이 OS 는 정말로 순수하게 
OS 만 제공하는 깡통 OS 이므로, [On-Premise](#h-2-on-premise-) 와 마찬가지로 운영체제의 관리를 포함한 모든 것은 직접 해야한다. 
[IDC](#h-2-idc-internet-data-center) 를 이용하는 것과 유사하다.

하지만 IDC 에 비해 빠른 서비스 제공이 가능하며, 다른 지역에 서비스를 운영하거나, 서버의 컴퓨팅 성능을 확장하는 등의 선택이 좀 더 유연하다.

> 주요 서비스는 다음과 같다.
> 
> DigitalOcean, Linode, Rackspace, Amazon Web Services (AWS), Cisco Metapod, Microsoft Azure, 
> Google Compute Engine (GCE)

---

### 4. Cloud - PaaS and Serverless 👩‍💻


---

### 5. Cloud - SaaS 👩‍💻

![On-premise](/assets/images/posts/2023-02-08-on-premise-and-cloud-service/on-premise-and-cloud-service.png)

`SaaS`는 `Software as a Service`의 약자로 서비스 자체를 제공한다.

> 주요 서비스는 다음과 같다.
> 
> Google Workspace, Dropbox, Salesforce, Cisco WebEx, Concur, GoToMeeting

<br><br>

---
Reference

1. “On-Premise vs. Cloud Servers: What Are the Differences?.” WME. Jan. 26, 2021, [On-Premise vs. Cloud Services](https://windowsmanagementexperts.com/on-premise-vs-cloud-servers-what-are-the-differences/on-premise-vs-cloud-servers-what-are-the-differences.htm).
2. Shanika Wickramasinghe. "Serverless vs Platform as a Service: Is Serverless the New PaaS?." BMC. Aug. 18, 2021, [Serverless vs Platform as a Service](https://www.bmc.com/blogs/serverless-paas/).
3. Stephen Watts, Muhammad Raza. "SaaS vs PaaS vs IaaS: What’s The Difference & How To Choose." BMC. Jun. 15, 2019, [SaaS vs PaaS vs IaaS](https://www.bmc.com/blogs/saas-vs-paas-vs-iaas-whats-the-difference-and-how-to-choose/).
4. "데이터센터 시장의 급속한 성장, 주요 동인과 전망." koscom. Dec. 07, 2021, [데이터센터 시장의 급속한 성장, 주요 동인과 전망](https://newsroom.koscom.co.kr/29107).
