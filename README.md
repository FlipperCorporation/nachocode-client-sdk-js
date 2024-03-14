# Nachocode SDK 통합 가이드

- Nachocode SDK를 웹 애플리케이션에 통합하는 과정을 안내합니다. 이 가이드를 통해 Nachocode SDK의 기능을 웹 사이트에 손쉽게 추가할 수 있습니다.

## SDK 설정 방법

- Nachocode SDK를 웹 페이지에 통합하는 과정은 매우 간단합니다. 아래 단계를 따라 진행하세요.

### 1. SDK 스크립트 추가

- 웹 페이지의 `<head>` 태그 안이나, `<body>` 태그가 끝나기 직전에 다음과 같은 스크립트 태그를 추가합니다. 이 스크립트는 Nachocode SDK를 웹 페이지에 로드합니다.

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.0.1/client-sdk.min.js"></script>
```

### 2. SDK 초기화

- 웹 페이지 로딩이 완료되면, SDK를 초기화해야 합니다. 다음 예제 코드는 SDK를 초기화하는 방법을 보여줍니다. 이 코드는 보통 `<script>` 태그 안에 넣거나, 별도의 JavaScript 파일에 작성할 수 있습니다.

```html
<script>
  // SDK가 로드되었는지 확인한 후 초기화를 시도합니다.
  if (window.Nachocode) {
    Nachocode.init("your_api_key_here", { sandbox: true, logger: true });
  } else {
    console.error("Nachocode SDK is not loaded.");
  }
</script>
```

- `your_api_key_here`: 여러분의 Nachocode 서비스 API 키로 교체해주세요.
- `sandbox`: 샌드박스 환경을 사용할지 여부를 결정합니다. 개발 단계에서는 `true`로 설정하는 것이 좋습니다.
- `logger`: SDK의 로깅 기능을 활성화할지 결정합니다. 개발 중에 문제를 진단하는 데 유용할 수 있으므로 `true`로 설정할 수 있습니다.

### 3. SDK 기능 사용

- SDK가 초기화되면, `Nachocode` 네임스페이스 아래에 정의된 다양한 기능을 사용할 수 있습니다. 예를 들어, 애플리케이션 이름을 검색하려면 다음과 같이 할 수 있습니다.

```javascript
const appName = Nachocode.app.getAppName();
console.log(appName);
```

## 추가 정보

- Nachocode SDK를 사용하여 더 많은 기능을 구현하고 싶다면, [공식 문서](https://nachocode.io/docs)를 참조하거나, [GitHub 리포지토리](https://github.com/FlipperCorporation)에서 더 많은 예제와 가이드를 찾아볼 수 있습니다.

- Nachocode 팀은 여러분의 성공적인 프로젝트 구현을 위해 항상 도움을 준비하고 있습니다. 기술적인 질문이나 피드백이 있다면 언제든지 연락주세요.

## Nachocode JavaScript 클라이언트 라이브러리 API 문서

### 개요

- Nachocode JavaScript 클라이언트 라이브러리는 웹 및 네이티브 앱 개발에 필요한 다양한 기능을 제공합니다. 이 문서는 라이브러리의 주요 기능과 사용법을 소개합니다.

#### 최신화 일자

- 2024-03-14

#### 최신 버젼

- [ver.1.0.1](https://cdn.nachocode.io/nachocode/client-sdk/@1.0.1/client-sdk.min.js)

## 초기화

### `init(apiKey: string, options?: InitializeOptions): void`

Nachocode SDK를 초기화합니다. 애플리케이션이 시작할 때 호출해야 합니다.

- **Parameters:**
  - `apiKey`: Nachocode 서비스 접근을 위한 API 키입니다.
  - `options`: 초기화 옵션 객체입니다. 샌드박스 모드 및 로거 활성화 여부를 포함할 수 있습니다.

### InitializeOptions

- `sandbox?: boolean`: 샌드박스 서버 사용 여부를 지정합니다.
- `logger?: boolean`: 로거 사용 여부를 지정합니다.

## 애플리케이션 (Namespace: `app`)

### Methods

#### `getAppName(): string`

저장된 애플리케이션 이름을 반환합니다.

#### `getAppKey(): string`

저장된 애플리케이션 키를 반환합니다.

#### `getCurrentAppVersion(): string`

현재 설치된 애플리케이션의 버전을 반환합니다.

#### `getPackageName(): string`

저장된 애플리케이션 패키지 이름을 반환합니다.

## 장치 (Namespace: `device`)

### DeviceType

장치 유형을 나타내는 열거형입니다.

- `ANDROID`: 안드로이드 장치를 나타냅니다.
- `IOS`: iOS 장치를 나타냅니다.
- `UNKNOWN`: 알 수 없는 장치 유형입니다.

### Methods

#### `detectType(): DeviceType`

사용자 에이전트를 활용하여 장치 유형을 탐지합니다.

#### `getType(): DeviceType`

장치의 유형을 반환합니다.

#### `isAndroid(): boolean`

현재 장치가 Android인지 여부를 반환합니다.

#### `isIOS(): boolean`

현재 장치가 iOS인지 여부를 반환합니다.

## 환경 및 설정 (Namespace: `env`)

### RunningEnvironment

애플리케이션 실행 환경을 나타내는 열거형입니다.

- `WEB`: 웹 애플리케이션에서 실행 중임을 나타냅니다.
- `APP`: 네이티브 애플리케이션에서 실행 중임을 나타냅니다.

### CurrentEnvironment

현재 애플리케이션 환경을 나타내는 타입입니다.

- `deviceType`: 현재 장치 유형입니다.
- `logger`: 로거 사용 여부입니다.
- `runningEnv`: 현재 실행 환경입니다.
- `sandbox`: 샌드박스 서버 사용 여부입니다.

### EnvironmentOptions

애플리케이션 환경 옵션을 나타내는 타입입니다.

- `sandbox?: boolean`: 샌드박스 서버 사용 여부입니다.
- `logger?: boolean`: 로거 사용 여부입니다.

### Methods

#### `getCurrentEnv(): CurrentEnvironment`

현재 애플리케이션 환경을 반환합니다.

#### `getRunningEnv(): RunningEnvironment`

현재 실행 중인 환경 (웹 또는 앱)을 반환합니다.

#### `getSDKVersion(): string`

현재 SDK 버전을 반환합니다.

#### `isApp(): boolean`

애플리케이션이 네이티브 앱에서 실행 중인지 여부를 반환합니다.

#### `isInitialized(): boolean`

Nachocode SDK가 초기화되었는지 여부를 반환합니다.

#### `isUsingSandbox(): boolean`

현재 샌드박스 서버를 사용 중인지 여부를 반환합니다.

#### `isWeb(): boolean`

애플리케이션이 웹 애플리케이션에서 실행 중인지 여부를 반환합니다.

#### `setEnv(options: EnvironmentOptions): void`

애플리케이션 환경을 설정합니다.

#### `setSandbox(usingSandbox: boolean): void`

샌드박스 서버 사용 여부를 설정합니다.

## 푸시 알림 (Namespace: `push`)

### Methods

#### `getPushToken(): Promise<string>`

비동기적으로 푸시 토큰을 검색합니다.

#### `registerPushToken(userID: string): Promise<any>`

푸시 토큰을 Nachocode 서버에 등록합니다.

#### `updatePushToken(userID: string): Promise<any>`

사용자 식별자로 푸시 토큰을 업데이트합니다.

#### `deletePushToken(userID: string): Promise<any>`

사용자 식별자로 푸시 토큰을 삭제합니다.
