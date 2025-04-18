# Nachocode SDK 통합 가이드

> 🔔 **최신화 일자:** 2025-04-18

**Nachocode JavaScript 클라이언트 SDK**는 **웹 개발자들이 네이티브 앱의 고유 기능을 손쉽게 활용할 수 있도록 돕는 SDK**입니다.

**Nachocode SDK**를 활용하면 다양한 네이티브 기능에 접근할 수 있으며, 웹 애플리케이션에서도 손쉽게 모바일 디바이스의 고유 정보를 활용할 수 있습니다.

이 문서는 **SDK의 설치, 초기화, 주요 기능 및 사용 방법** 등을 안내합니다.

---

## SDK 설정 방법

- **Nachocode SDK**를 웹 페이지에 통합하는 과정은 매우 간단합니다. 아래 단계를 따라 진행하세요.

- **Nachocode SDK**는 **CDN을 통해 간편하게 설치**할 수 있습니다.

- 웹 페이지의 `<body>` 태그 안에 다음과 같은 스크립트 태그를 추가합니다. 이 스크립트는 **Nachocode SDK**를 웹 페이지에 로드합니다.

  ### 최신 버전 불러오기

  - 현재 최신 버전 v1.5.0

  - 최신 버전의 SDK를 항상 유지하려면 아래 코드를 사용하세요

  ```html
  <script src="https://cdn.nachocode.io/nachocode/client-sdk/@latest/client-sdk.min.js"></script>
  ```

  ### 특정 버전 사용

  - 특정 버전으로 고정하려면 다음과 같이 사용합니다

  ```html
  <script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.5.0/client-sdk.min.js"></script>
  ```

> 📢 **최신 버전을 사용하는 것이 권장되며, 특정 버전 고정은 호환성 유지가 필요한 경우에 사용하세요.**

---

### 2. SDK 초기화

#### 개요

- 웹 페이지 로딩이 완료되면, **Nachocode SDK를 초기화**해야 합니다.
- 초기화는 **API 키**를 사용하며, 필요에 따라 디버깅 로깅 기능을 활성화할 수 있습니다.

#### `init` 메서드 정의

##### `init(apiKey: string, options?: InitializeOptions): void`

- **Nachocode SDK**를 초기화합니다. 애플리케이션이 시작할 때 호출해야 합니다.

##### 매개변수

| **옵션**  | **타입**            | **설명**                                                                                                          |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `apiKey`  | `string`            | Nachocode SDK 서비스 접근을 위한 **API 키**. [Nachocode 대시보드](https://nachocode.io)에서 발급받을 수 있습니다. |
| `options` | `InitializeOptions` | (_optional_) 선택적 초기화 옵션입니다 (`sandbox`, `logger` 등).                                                   |

##### `InitializeOptions` 설명

| **옵션**  | **타입**  | **설명**                                                                      |
| --------- | --------- | ----------------------------------------------------------------------------- |
| `sandbox` | `boolean` | **테스트 환경**을 위한 샌드박스 모드를 활성화합니다 (`true` = 샌드박스 모드). |
| `logger`  | `boolean` | 개발 시 **디버깅 로깅**을 활성화합니다 (`true` = 로그 활성화).                |

#### 사용 예제

- 다음 예제 코드는 SDK를 초기화하는 방법을 보여줍니다.
- 이 코드는 보통 `<script>` 태그 안에 넣거나, 별도의 JavaScript 파일에 작성할 수 있습니다.

```html
<script>
  // SDK가 로드되었는지 확인한 후 초기화를 시도합니다.
  if (window.Nachocode) {
    // InitializeOptions 없이도 초기화를 할 수 있습니다.
    // sandbox 와 logger는 false 값을 가지게 됩니다.
    Nachocode.init('your_api_key_here');
  }
</script>
```

- 앱 환경에서만 실행시킬 로직을 추가 할 수도 있습니다.

```html
<script>
  if (window.Nachocode) {
    // SDK 초기화 후 동작할 이벤트를 등록 합니다.
    Nachocode.event.on('init', () => {
      if (Nachocode.env.isApp()) {
        // 앱 환경에서만 동작 할 로직을 작성합니다.
      }
    });

    // Nachocode SDK를 초기화 합니다.
    Nachocode.init('your_api_key_here', { logger: true });
  } else {
    console.error('Nachocode SDK가 로드되지 않았습니다.');
  }
</script>
```

---

### 3. SDK 기능 사용

- Nachocode SDK가 초기화가 완료되면, `Nachocode` 네임스페이스 아래에 정의된 다양한 네이티브 기능을 사용할 수 있습니다.

- 아래 예시는 SDK의 일부 기능을 사용하는 방법을 보여줍니다.

  - **앱 정보 가져오기**

  ```javascript
  const appName = Nachocode.app.getAppName();
  console.log(`앱 이름: ${appName}`); // ex. "Nachocode Developer"
  ```

  - **디바이스 정보 확인**

  ```javascript
  Nachocode.device.getDeviceModel(model => {
    console.log(`디바이스 모델: ${model}`);
  });
  ```

- 대부분의 기능은 웹 실행환경에선 무시되고, 앱 실행환경에서 정상 작동합니다.

## 네임스페이스 소개

Nachocode SDK는 각 기능별로 **네임스페이스(namespace)** 로 구분되어 있습니다.  
아래는 주요 네임스페이스의 목록과 설명입니다. 각 네임스페이스에 대한 상세한 문서는 **문서 링크**에서 확인하세요.

| **네임스페이스** | **설명**                                                                         | **문서 링크**                                                                             |
| ---------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `app`            | 앱 이름, 버전, 패키지 이름 등의 정보를 제공합니다.                               | [앱 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/app)                 |
| `apple`          | Apple 계정을 통한 소셜 로그인 기능 등을 제공합니다.                              | [Apple 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/apple)            |
| `authentication` | 생체 인증(Fingerprint/Face ID) 등의 기능을 제공합니다.                           | [인증 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/authentication)    |
| `backkey`        | Android 디바이스의 네이티브 백 키 이벤트를 제어할 수 있습니다.                   | [백 키 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/backkey)          |
| `browser`        | 외부 또는 내부 브라우저로 URL을 열 수 있습니다.                                  | [브라우저 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/browser)       |
| `clipboard`      | 텍스트를 클립보드에 복사하거나 읽을 수 있습니다.                                 | [클립보드 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/clipboard)     |
| `device`         | 디바이스 모델, OS 버전, 배터리 및 네트워크 상태 등을 확인합니다.                 | [디바이스 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/device)        |
| `env`            | SDK 초기화 상태, 실행 환경(웹/앱) 등을 확인할 수 있습니다.                       | [환경 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/env)               |
| `event`          | 초기화, 포그라운드/백그라운드 전환, 네트워크 상태 변경 등의 이벤트를 처리합니다. | [이벤트 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/event)           |
| `facebook`       | Facebook 소셜 로그인 기능을 제공합니다.                                          | [Facebook 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/facebook)      |
| `google`         | Google 소셜 로그인 기능을 제공합니다.                                            | [Google 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/google)          |
| `iap`            | Google Play 및 Apple App Store 인앱 결제 기능을 제공합니다.                      | [인앱 결제 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/iap)          |
| `kakao`          | Kakao 소셜 로그인 기능을 제공합니다.                                             | [Kakao 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/kakao)            |
| `permission`     | 카메라, 위치, 푸시 알림 등 디바이스 권한을 요청하고 상태를 확인할 수 있습니다.   | [권한 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/permission)        |
| `preference`     | 애플리케이션 내부 저장소를 통해 데이터를 저장 및 관리합니다.                     | [내부 저장소 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/preference) |
| `push`           | 푸시 알림 토큰을 관리하고 Nachocode 서버에 등록할 수 있습니다.                   | [푸시 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/push)              |
| `scanner`        | QR 코드 스캔 및 기타 스캔 기능을 제공합니다.                                     | [스캐너 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/scanner)         |
| `setting`        | Pull to Refresh와 같은 설정 기능을 제공합니다.                                   | [설정 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/setting)           |
| `share`          | 네이티브 공유 UI를 통해 URL을 공유할 수 있습니다.                                | [공유 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/share)             |
| `tabbar`         | 앱 내부 탭바의 표시 여부 및 이동을 제어할 수 있습니다.                           | [탭 바 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/tabbar)           |
| `vibration`      | 디바이스 진동 및 햅틱 피드백을 제어합니다.                                       | [진동 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/vibration)         |

더 많은 네임스페이스와 사용법은 [공식 문서](https://developer.nachocode.io/docs/sdk/intro)를 확인하세요.

---

## 추가 정보 및 지원

- **Nachocode SDK**를 사용하여 더 많은 기능을 구현하고 싶다면, [공식 개발자 문서](https://developer.nachocode.io/docs/sdk/intro)를 참조하세요.

- Nachocode 팀은 여러분의 성공적인 프로젝트 구현을 위해 항상 도움을 준비하고 있습니다. **기술적인 질문이나 피드백**이 있다면 언제든지 [support@nachocode.io](mailto:support@nachocode.io)로 문의를 보내주세요.

---
