# Nachocode SDK 통합 가이드

> 🔔 **최신화 일자:** 2025-02-12

**Nachocode JavaScript 클라이언트 SDK**는 웹 클라이언트 개발자가 네이티브 앱 개발을 할 수 있도록 돕는 다양한 기능을 제공합니다.

**Nachocode SDK**를 활용하면 다양한 네이티브 기능에 접근할 수 있으며, 웹 애플리케이션에서도 손쉽게 모바일 디바이스의 고유 정보를 활용할 수 있습니다.

이 문서는 **SDK의 설치, 초기화, 주요 기능 및 사용 방법** 등을 안내합니다.

---

## SDK 설정 방법

- **Nachocode SDK**를 웹 페이지에 통합하는 과정은 매우 간단합니다. 아래 단계를 따라 진행하세요.

- Nachocode SDK는 **CDN을 통해 간편하게 설치**할 수 있습니다.

- 웹 페이지의 `<body>` 태그 안에 다음과 같은 스크립트 태그를 추가합니다. 이 스크립트는 **Nachocode SDK**를 웹 페이지에 로드합니다.

  ### 최신 버전 불러오기

  - 현재 최신 버전 v1.4.0

  - 최신 버전의 SDK를 항상 유지하려면 아래 코드를 사용하세요

  ```html
  <script src="https://cdn.nachocode.io/nachocode/client-sdk/@latest/client-sdk.min.js"></script>
  ```

  ### 특정 버전 사용

  - 특정 버전으로 고정하려면 다음과 같이 사용합니다

  ```html
  <script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.4.0/client-sdk.min.js"></script>
  ```

> 📢 **최신 버전을 사용하는 것이 권장되며, 특정 버전 고정은 호환성 유지가 필요한 경우에 사용하세요.**

---

### 2. SDK 초기화

#### 개요

- 웹 페이지 로딩이 완료되면, **Nachocode SDK를 반드시 초기화**해야 합니다.
- 초기화는 **API 키**를 사용하며, 필요에 따라 디버깅 로깅 기능을 활성화할 수 있습니다.

#### `init` 함수 정의

##### `InitializeOptions`

- `sandbox?: boolean`: 샌드박스 서버 사용 여부를 지정합니다.
- `logger?: boolean`: 로거 사용 여부를 지정합니다.

##### `init(apiKey: string, options?: InitializeOptions): void`

- **Nachocode SDK**를 초기화합니다. 애플리케이션이 시작할 때 호출해야 합니다.

##### **초기화 옵션 설명**

| 옵션     | 타입      | 설명                                                                                                          |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `apiKey` | `string`  | Nachocode SDK 서비스 접근을 위한 API 키. [Nachocode 대시보드](https://nachocode.io)에서 발급받을 수 있습니다. |
| `logger` | `boolean` | `true`로 설정하면 개발 중 디버깅을 위한 **로그 출력**이 활성화됩니다.                                         |

#### 예제

- 다음 예제 코드는 SDK를 초기화하는 방법을 보여줍니다.
- 이 코드는 보통 `<script>` 태그 안에 넣거나, 별도의 JavaScript 파일에 작성할 수 있습니다.

```html
<script>
  // SDK가 로드되었는지 확인한 후 초기화를 시도합니다.
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

```html
<script>
  if (window.Nachocode) {
    // InitializeOptions 없이도 초기화를 할 수 있습니다.
    // sandbox 와 logger는 false 값을 가지게 됩니다.
    Nachocode.init('your_api_key_here');
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

Nachocode SDK의 각 네임스페이스에 대한 상세한 문서는 아레 링크에서 확인하세요.

### 1. **앱 정보 관리 (`app`)**

애플리케이션 이름, 버전, 패키지 이름 등의 정보를 제공합니다.  
➡️ [앱 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/app)

### 2. **애플 소셜 기능 (`apple`)**

Apple 계정을 통한 소셜 로그인 기능을 네이티브로 제공합니다.  
➡️ [Apple 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/apple)

### 3. **사용자 인증 (`authentication`)**

생체 인증(Fingerprint/Face ID) 등 다양한 인증 수단을 제공합니다.  
➡️ [인증 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/authentication)

- **사용자 인증**: 생체 인증 및 권한 확인 기능을 제공합니다.

### 4. **네이티브 백 키 제어 (`backkey`)**

Android 디바이스의 네이티브 백 키 이벤트를 제어할 수 있습니다.  
➡️ [백 키 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/backkey)

### 5. **브라우저 기능 (`browser`)**

외부 브라우저 또는 내부 브라우저로 URL을 열 수 있는 기능을 제공합니다.  
➡️ [브라우저 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/browser)

### 6. **클립보드 관리 (`clipboard`)**

텍스트를 클립보드에 복사하거나 읽을 수 있습니다.  
➡️ [클립보드 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/clipboard)

### 7. **디바이스 정보 및 상태 확인 (`device`)**

디바이스 모델, OS 버전, 배터리 상태, 네트워크 상태, 언어 코드 등을 확인할 수 있습니다.  
➡️ [디바이스 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/device)

### 8. **환경 설정 및 실행 상태 관리 (`env`)**

SDK 초기화 상태, 실행 환경(웹/앱) 등을 확인할 수 있습니다.  
➡️ [환경 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/env)

### 9. **이벤트 관리 (`event`)**

초기화, 포그라운드/백그라운드 전환, 네트워크 상태 변경 등의 이벤트를 처리합니다.  
➡️ [이벤트 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/event)

### 10. **페이스북 소셜 기능 (`facebook`)**

Facebook 계정을 통한 소셜 로그인 기능을 제공합니다.  
➡️ [Facebook 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/facebook)

### 11. **디바이스 권한 제어 (`permission`)**

카메라, 위치, 푸시 알림 등 디바이스 권한을 요청하고 상태를 확인할 수 있습니다.  
➡️ [권한 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/permission)

### 12. **내부 저장소 데이터 관리 (`preference`)**

애플리케이션 내부 저장소를 통해 데이터를 저장 및 관리합니다.  
➡️ [내부 저장소 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/preference)

### 13. **푸시 알림 관리 (`push`)**

푸시 알림 토큰을 관리하고 Nachocode 서버에 등록할 수 있습니다.  
➡️ [푸시 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/push)

### 14. **스캔 기능 (`scanner`)**

QR 코드 스캔 및 기타 스캔 기능을 제어할 수 있습니다.  
➡️ [스캐너 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/scanner)

### 15. **설정 (`setting`)**

'Pull to Refresh'와 같은 새로고침 동작과 화면 확대 기능 등을 설정할 수 있습니다.  
➡️ [설정 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/setting)

### 16. **네이티브 공유 기능 (`share`)**

네이티브 공유 UI를 통해 URL을 공유할 수 있습니다.  
➡️ [공유 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/share)

### 17. **탭바 제어 (`tabbar`)**

앱 내부 탭바의 표시 여부 및 이동을 제어할 수 있습니다.  
➡️ [탭바 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/tabbar)

### 18. **진동 및 햅틱 피드백 (`vibration`)**

디바이스의 진동 및 햅틱 피드백을 트리거할 수 있습니다.  
➡️ [진동 네임스페이스](https://developer.nachocode.io/docs/sdk/namespaces/vibration)

---

## 추가 정보

- **Nachocode SDK**를 사용하여 더 많은 기능을 구현하고 싶다면, [공식 개발자 문서](https://developer.nachocode.io/docs/sdk/intro)를 참조하거나, [GitHub 리포지토리](https://github.com/FlipperCorporation)에서 더 많은 예제와 가이드를 찾아볼 수 있습니다.

- Nachocode 팀은 여러분의 성공적인 프로젝트 구현을 위해 항상 도움을 준비하고 있습니다. 기술적인 질문이나 피드백이 있다면 언제든지 [이메일](mailto:support@nachocode.io)을 보내주세요.

---
