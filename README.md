# Nachocode SDK 통합 가이드

- **Nachocode SDK**를 웹 애플리케이션에서 활용하는 과정을 안내합니다. 이 가이드를 통해 **Nachocode SDK**의 기능을 웹 사이트에 손쉽게 추가할 수 있습니다.
- 최신화 일자 : 2024-11-26

## SDK 설정 방법

- **Nachocode SDK**를 웹 페이지에 통합하는 과정은 매우 간단합니다. 아래 단계를 따라 진행하세요.

### 1. SDK 스크립트 추가

- 웹 페이지의 `<body>` 태그 안에 다음과 같은 스크립트 태그를 추가합니다. 이 스크립트는 **Nachocode SDK**를 웹 페이지에 로드합니다.

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.3.0/client-sdk.min.js"></script>
```

### 2. SDK 초기화

- 웹 페이지 로딩이 완료되면, SDK를 초기화해야 합니다. 다음 예제 코드는 SDK를 초기화하는 방법을 보여줍니다. 이 코드는 보통 `<script>` 태그 안에 넣거나, 별도의 JavaScript 파일에 작성할 수 있습니다.

```html
<script>
  // SDK가 로드되었는지 확인한 후 초기화를 시도합니다.
  if (window.Nachocode) {
    Nachocode.init('your_api_key_here', { logger: true });
  } else {
    console.error('Nachocode SDK is not loaded.');
  }
</script>
```

- `your_api_key_here`: 여러분의 Nachocode 서비스 API 키로 교체해주세요.
- `logger`: SDK의 로깅 기능을 활성화할지 결정합니다. 개발 중에 문제를 진단하는 데 유용할 수 있으므로 `true`로 설정하는 것이 좋습니다.

### 3. SDK 기능 사용

- SDK가 초기화되면, `Nachocode` 네임스페이스 아래에 정의된 다양한 기능을 사용할 수 있습니다. 예를 들어, 애플리케이션 이름을 검색하려면 다음과 같이 할 수 있습니다.
- 대부분의 기능은 웹 실행환경에선 무시되고, 앱 실행환경에서 정상 작동합니다.

```javascript
const appName = Nachocode.app.getAppName();
console.log(appName);
```

## 추가 정보

- **Nachocode SDK**를 사용하여 더 많은 기능을 구현하고 싶다면, [공식 개발자 문서](https://nachocode.notion.site/bfb96ce8d7014e84a87d3356ad17f99e)를 참조하거나, [GitHub 리포지토리](https://github.com/FlipperCorporation)에서 더 많은 예제와 가이드를 찾아볼 수 있습니다.

- Nachocode 팀은 여러분의 성공적인 프로젝트 구현을 위해 항상 도움을 준비하고 있습니다. 기술적인 질문이나 피드백이 있다면 언제든지 [이메일](mailto:support@nachocode.io)을 보내주세요.

## Nachocode JavaScript 클라이언트 라이브러리 API 문서

### 개요

- Nachocode JavaScript 클라이언트 라이브러리는 웹 및 네이티브 앱 개발에 필요한 다양한 기능을 제공합니다. 이 문서는 라이브러리의 주요 기능과 사용법을 소개합니다.

#### 최신 버전

- 항상 가장 최신 버전 불러오기

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@latest/client-sdk.min.js"></script>
```

- 현재 최신 버전 v1.3.0

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.3.0/client-sdk.min.js"></script>
```

## 초기화

### `init(apiKey: string, options?: InitializeOptions): void`

**Nachocode SDK**를 초기화합니다. 애플리케이션이 시작할 때 호출해야 합니다.

- **Parameters:**
  - `apiKey`: Nachocode 서비스 접근을 위한 API 키입니다.
  - `options`: 초기화 옵션 객체입니다. 샌드박스 모드 및 로거 활성화 여부를 포함할 수 있습니다.

### InitializeOptions

- `sandbox?: boolean`: 샌드박스 서버 사용 여부를 지정합니다.
- `logger?: boolean`: 로거 사용 여부를 지정합니다.

### Example

```javascript
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
  console.error('Nachocode SDK is not loaded.');
}
```

```javascript
// InitializeOptions 없이도 초기화를 할 수 있습니다.
// sandbox 와 logger는 false 값을 가지게 됩니다.
Nachocode.init('your_api_key_here');
```

## 애플리케이션 (Namespace: `app`)

> 애플리케이션 정보를 관리하는 네임스페이스 입니다.
> 앱 이름, 버전, 패키지 이름 등의 애플리케이션 데이터를 불러올 수 잇습니다.

### Methods (Application)

#### `getAppName(): string`

애플리케이션 이름을 반환합니다.

```javascript
const appName = Nachocode.app.getAppName(); // 앱 이름
```

#### `getAppKey(): string`

애플리케이션 키를 반환합니다.

```javascript
const appKey = Nachocode.app.getAppKey(); // ex. 'APP-XXXXXXX'
```

#### `getCurrentAppVersion(): string`

사용자의 현재 설치된 애플리케이션 버전을 반환합니다.

```javascript
const appVersion = Nachocode.app.getCurrentAppVersion(); // ex. '1.0.0'
```

#### `getPackageName(): string`

애플리케이션 패키지 이름을 반환합니다.

```javascript
const appPackageName = Nachocode.app.getPackageName(); // ex. 'com.nachocode.xxx'
```

## 인증 (Namespace: `authentication`)

> 사용자 인증과 관련한 기능을 담당하는 네임스페이스입니다.

### AuthenticationResult

인증 결과를 나타내는 타입입니다.

- `authenticated: boolean`: 인증 성공 여부입니다.
- `error?: { code: string, message: string }`: (_optional_) 실패 시 실패 코드와 사유를 저장하여 전달되는 객체입니다.

### Methods (Authentication)

#### `canUseBiometrics(callback: (available: boolean, error?: { code: string, message: string }) => any): void`

현재 디바이스에서 생체 인증 기능을 사용할 수 있는지 여부를 반환합니다.

- 특정 디바이스에서는 생체인증이 불가능할 수 있습니다.
- 앱 사용자의 선택에 따라 생체인증을 사용하지 않을 수 있습니다.

```javascript
// ex. 디바이스의 생체 인증 사용 가능 여부를 확인합니다.
Nachocode.authentication.canUseBiometrics((available, error) => {
  const message =
    // 디바이스의 생체 인증 사용 가능 여부가 매개 변수 available에 전달 됩니다.
    `사용 가능 여부 : ${available ? '가능' : '불가능'}` +
    // 사용이 불가할 경우, 사유가 error.message에 담겨 전달됩니다.
    `${error ? `\n코드 : ${error.code}\n사유 : ${error.message}` : ''}`;

  alert(message);
});
```

#### `useBiometrics(callback: (result: AuthenticationResult) => any): void`

네이티브 생체 인증 기능을 호출 합니다.

사용자가 인증에 실패하거나, 인증을 중단하면 `AuthenticationResult`에서 `authenticated`가 `false`로 반환되며, `error` 객체에 실패 원인이 전달됩니다.

```javascript
// 네이티브 생체 인증 기능을 호출 합니다.
Nachocode.authentication.useBiometrics(result => {
  const message =
    `인증 여부 : ${result?.authenticated ? '인증됨' : '인증안됨'}\n` +
    `상태 코드 : ${result?.error?.code ?? '없음'}\n` +
    `에러 메시지 : ${result?.error?.message ?? '없음'}`;

  alert(message);
});
```

<!-- markdownlint-disable MD033 -->

## 백 키 (Namespace: `backkey`) <img alt="Android-Only" src="https://img.shields.io/badge/Android-Only?logo=android">

<!-- markdownlint-enable MD033 -->

> Android 네이티브 백 키를 제어하는 네임스페이습니다.
> 기본 백 키 동작을 오버라이드하고 사용자 지정 이벤트를 등록할 수 있습니다.

### Methods (BackKey)

#### `addEvent(event: (eventId: string) => void, eventId?: string): string`

- Android OS의 네이티브 백 키가 눌렸을 때 호출될 이벤트 리스너를 등록합니다.
- 기본 이벤트가 실행되기 전, 먼저 체크되며 등록이 되어 있을 경우 우선 실행됩니다.
- FILO (First In Last Out) 방식으로 나중에 등록된 이벤트가 먼저 실행 됩니다.

```javascript
// 이벤트 ID를 따로 제공하지 않을 경우 1부터 순서대로 아이디를 부여합니다.
Nachocode.backkey.addEvent(eventId => {
  console.log('Back key pressed.');
  console.log(eventId); // 1
});
```

```javascript
// 원하는 특정 이벤트 ID를 부여할 수도 있습니다.
Nachocode.backkey.addEvent(eventId => {
  console.log('Back key pressed.');
  console.log(eventId); // sample
}, 'sample');
```

#### `clearEvent(): void`

등록된 모든 백키 이벤트 리스너를 제거합니다.

```javascript
// 백키를 제어하기 위해 등록한 이벤트 리스너를 전부 제거합니다.
Nachocode.backkey.clearEvent();
```

#### `getLastEvent(): string`

제일 마지막으로 등록된 이벤트 리스너의 이벤트 ID를 반환합니다.

```javascript
// 첫 번째 백키 이벤트 리스너를 등록합니다.
Nachocode.backkey.addEvent(eventId => {
  console.log('Back key pressed.');
  console.log(eventId); // sample1
}, 'sample1');
// 두 번째 백키 이벤트 리스너를 등록합니다.
Nachocode.backkey.addEvent(eventId => {
  console.log('Back key pressed.');
  console.log(eventId); // sample2
}, 'sample2');
// 마지막 백키 이벤트 리스너의 이벤트 ID를 가져옵니다.
const eventId = Nachocode.backkey.getLastEvent(); // sample2
```

#### `removeEvent(eventId?: string): string`

등록된 백키 이벤트 리스너를 제거합니다. `eventId`가 명시되지 않을 경우 기본적으로 마지막으로 등록된 이벤트를 제거합니다.

- 활용 예시 : modal을 백키로 끌 수 있도록 close함수를 이벤트 리스너 등록을 해두었는데 사용자가 백 키가 아닌 x 버튼을 눌러 끌 수 있으므로, x 버튼 클릭 시 등록된 백키 이벤트 리스너를 제거해야합니다.

```javascript
// 마지막으로 등록된 이벤트를 제거합니다.
Nachocode.backkey.removeEvent();
```

```javascript
// 이벤트 ID로 등록된 특정 이벤트 리스너를 제거합니다.
Nachocode.backkey.removeEvent('sample');
```

## 브라우저 (Namespace: `browser`)

> 앱에서 링크를 열기 위한 브라우저 관련 기능을 제공하는 네임스페이스입니다.
> 외부 브라우저 또는 앱 내부 브라우저를 사용할 수 있습니다.

### OpenURLOption

브라우저 옵션을 나타내는 타입입니다.

- `external`: 외부 브라우저를 의미합니다. (safari, chrome, naver 등)
- `internal`: 앱 내부 브라우저를 의미합니다.

### Methods (Browser)

#### `openLink(url: string, option?: OpenURLOption): void`

제공된 URL을 브라우저 창에서 오픈 합니다.

```javascript
// 기본 옵션 : 'external'
Nachocode.browser.openLink('https://nachocode.io');
```

```javascript
// 외부 브라우저로 URL 오픈
Nachocode.browser.openLink('https://nachocode.io', 'external');
```

```javascript
// 내부 브라우저로 URL 오픈
Nachocode.browser.openLink('https://nachocode.io', 'internal');
```

## 디바이스 (Namespace: `device`)

> 디바이스 정보와 상태 확인을 위한 네임스페이스입니다.
> 디바이스 유형, 네트워크 상태, 배터리 정보 등을 불러올 수 있습니다.

### DeviceType

디바이스 유형을 나타내는 열거형입니다.

- `Android`: 안드로이드 디바이스를 나타냅니다.
- `iOS`: iOS 디바이스를 나타냅니다.
- `Unknown`: 알 수 없는 디바이스 유형입니다.

### NetworkConnectionType

네트워크 연결 유형을 나타내는 열거형입니다.

- `Wi-Fi`: Wi-Fi 네트워크를 나타냅니다.
- `Cellular`: 셀룰러 네트워크를 나타냅니다.
- `Ethernet`: 이더넷 네트워크를 나타냅니다.
- `No Internet Connection`: 알 수 없는 네트워크이거나 연결이 끊겼음을 나타냅니다.

### Methods (Device)

#### `getBatteryLevel(callback: (status: { batteryLevel: number, isCharging: boolean }) => any): void`

디바이스의 배터리 상태를 반환합니다. 배터리 레벨과 충전 상태를 콜백 함수의 매개변수로 전달합니다.

- `batterLevel: number` : 배터리의 현재 충전 비율 (`0` ~ `100`)
- `isCharging: boolean` : 디바이스가 충전 중인지 여부 (`true`/`false`)

```javascript
// 디바이스의 배터리 상태를 불러옵니다.
Nachocode.device.getBatteryLevel(status => {
  const message =
    `충전 여부: ${status.isCharging ? '충전 중' : '충전 중 아님'}\n` +
    `현재 배터리: ${status.batteryLevel ?? '알 수 없음'}`;

  alert(message);
});
```

#### `getDeviceModel(): string`

디바이스의 모델명을 반환합니다.

- [구글 공식 문서](https://storage.googleapis.com/play_public/supported_devices.html)에서 Android 지원되는 모델 목록을 확인할 수 있습니다.
- Nachocode에서는 자주 쓰이는 디바이스 모델명을 정리하여 json 형태로 제공하고 있습니다.
  - iOS : [https://cdn.nachocode.io/nachocode/client-sdk/assets/device-ios-model.json](https://cdn.nachocode.io/nachocode/client-sdk/assets/device-ios-model.json)
  - Android : [https://cdn.nachocode.io/nachocode/client-sdk/assets/device-android-samsung-model.json](https://cdn.nachocode.io/nachocode/client-sdk/assets/device-android-samsung-model.json)

```javascript
// 디바이스의 모델명을 불러옵니다.
const deviceModel = Nachocode.device.getDeviceModel();
console.log(deviceModel); // ex. SM-S928N
```

#### `getDeviceOS(): { os: DeviceType, version: string }`

디바이스의 OS (Android/iOS) 유형과 버전 정보를 포함한 객체를 반환합니다.

```javascript
// 디바이스의 OS 정보를 불러옵니다.
const deviceOS = Nachocode.device.getDeviceOS();
console.log(deviceOS); // ex. { os: 'Android', version: '34(14)' }
```

#### `getNetworkStatus(callback: (status: { isConnected: boolean, connectionType: NetworkConnectionType }) => any ): void`

디바이스의 네트워크 연결 상태를 반환합니다. 연결 여부와 연결 유형을 콜백으로 전달합니다.

- `isConnected`: 네트워크 연결 여부 (`true`/`false`).
- `connectionType`: 연결 유형 (Wi-Fi, Cellular, Ethernet 등).

```javascript
Nachocode.device.getNetworkStatus(status => {
  const connectionInfo = `네트워크 상태: ${
    status.isConnected ? '연결됨' : '연결되지 않음'
  }\n연결 유형: ${status.connectionType}`;
  alert(connectionInfo);
});
```

#### `getType(): DeviceType`

사용자 에이전트를 활용하여 디바이스의 유형을 탐지 및 반환합니다.

```javascript
const deviceType = Nachocode.device.getType(); // 'Android' | 'iOS' | 'Unknown'

// 유저 디바이스 별로 로직을 다르게 처리하는 예시입니다.
switch (deviceType) {
  case 'Android': // Android 디바이스를 의미합니다.
    // Android 디바이스에서만 동작할 로직을 작성합니다.
    break;
  case 'iOS': // iPad, iPhone 등 iOS 디바이스를 의미합니다.
    // iOS 디바이스에서만 동작할 로직을 작성합니다.
    break;
  case 'Unknown': // PC 및 기타 장치를 의미합니다.
  default:
    // 모바일이 아닌 PC 및 기타 환경에서 동작할 로직을 작성합니다.
    break;
}
```

#### `isAndroid(): boolean`

현재 디바이스가 Android인지 여부를 반환합니다.

```javascript
if (Nachocode.device.isAndroid()) {
  // Android 디바이스에서만 동작할 로직을 작성합니다.
}
```

#### `isIOS(): boolean`

현재 디바이스가 iOS인지 여부를 반환합니다.

```javascript
if (Nachocode.device.isIOS()) {
  // iOS 디바이스에서만 동작할 로직을 작성합니다.
}
```

## 환경 및 설정 (Namespace: `env`)

> SDK의 현재 환경 및 설정을 관리하는 네임스페이스입니다.
> SDK 버전, 실행 환경 (Web/APP), 샌드박스 모드 여부 등을 확인할 수 있습니다.

### RunningEnvironment

애플리케이션 실행 환경을 나타내는 열거형입니다.

- `web`: 웹 애플리케이션에서 실행 중임을 나타냅니다.
- `app`: 네이티브 애플리케이션에서 실행 중임을 나타냅니다.

### CurrentEnvironment

현재 애플리케이션 환경을 나타내는 타입입니다.

- `deviceType: Nachocode.device.DeviceType`: 현재 디바이스 유형입니다.
- `logger: boolean`: 로거 사용 여부입니다.
- `runningEnv: RunningEnvironment`: 현재 실행 환경입니다.
- `sandbox: boolean`: 샌드박스 서버 사용 여부입니다.

### EnvironmentOptions

애플리케이션 환경 옵션을 나타내는 타입입니다.

- `sandbox: boolean`: 샌드박스 서버 사용 여부입니다.
- `logger: boolean`: 로거 사용 여부입니다.

### Methods (environment)

#### `getAppSourceVersion(): string`

현재 앱 소스 버전을 반환합니다.

- 앱 소스 버전이란 Nachocode에서 제공하는 기본 앱 소스코드의 버전을 의미합니다.
- SDK 버젼보다 앱 소스 버젼이 낮을 경우 SDK 일부 기능 사용이 제한됩니다.

```javascript
const currentVersion = Nachocode.env.getAppSourceVersion();

console.log(currentVersion); // ex. 1.3.0
```

#### `getCurrentEnv(): CurrentEnvironment`

현재 애플리케이션 환경을 반환합니다.

```javascript
const currentEnv = Nachocode.env.getCurrentEnv();

console.log(currentEnv); // ex. { deviceType: 'iOS', logger: false, runningEnv: 'app', sandbox: false }
```

#### `getRunningEnv(): RunningEnvironment`

현재 실행 중인 환경 (웹 또는 앱)을 반환합니다.

```javascript
const runningEnv = Nachocode.env.getRunningEnv(); // 'web' | 'app'
```

#### `getSDKVersion(): string`

현재 SDK 버전을 반환합니다.

```javascript
const sdkVersion = Nachocode.env.getSDKVersion(); // ex. '1.3.0'
```

#### `isApp(): boolean`

애플리케이션이 네이티브 앱에서 실행 중인지 여부를 반환합니다.

```javascript
if (Nachocode.env.isApp()) {
  // 앱 환경에서만 동작할 로직을 작성합니다.
}
```

#### `isInitialized(): boolean`

**Nachocode SDK**가 초기화되었는지 여부를 반환합니다.

```javascript
if (Nachocode.env.isInitialized()) {
  // Nachocode SDK가 초기화 되었을 때만 실행 할 로직을 작성합니다.
}
```

```javascript
// SDK가 초기화 되지 않았다면 초기화를 시도합니다.
if (!Nachocode.env.isInitialized()) {
  Nachocode.init('your_api_key_here');
}
```

#### `isUsingSandbox(): boolean`

현재 샌드박스 서버를 사용 중인지 여부를 반환합니다.

```javascript
console.log(Nachocode.env.isUsingSandbox()); // true | false
```

```javascript
if (Nachocode.env.isUsingSandbox()) {
  // Sandbox 서버를 사용 중일 때만 실행할 로직을 작성합니다.
}
```

#### `isWeb(): boolean`

애플리케이션이 웹 애플리케이션에서 실행 중인지 여부를 반환합니다.

```javascript
if (Nachocode.env.isWeb()) {
  // 웹 환경에서만 동작할 로직을 작성합니다.
}
```

## 이벤트 (Namespace: `event`)

> SDK에서 제공하는 기본 이벤트 관리 네임스페이스입니다.
> 초기화, 백그라운드 및 포그라운드 전환 시점에 발생하는 이벤트에 대한 리스너를 등록하거나 해제할 수 있습니다.

### EventType

Nachocode에서 제공되는 기본 event 입니다.

- `init`: SDK 초기화 시점에 호출되는 이벤트입니다.
- `background`: 앱이 백그라운드로 넘어 갔을 때 호출되는 이벤트입니다.
- `foreground`: 앱이 백그라운드에서 다시 포그라운드로 전환 될 때 호출되는 이벤트입니다.

### Methods (event)

#### `on(eventName: EventType, callback: function): void`

Nachocode에서 제공되는 기본 이벤트에 콜백 함수를 바인드합니다.

```javascript
// SDK 초기화 후 동작할 이벤트를 등록 합니다.
Nachocode.event.on('init', () => {
  if (Nachocode.env.isApp() && Nachocode.device.isIOS()) {
    // iOS 디바이스에서만 동작할 로직을 작성합니다.
  }
});

// Nachocode SDK를 초기화 합니다.
Nachocode.init('your_api_key_here');
```

```javascript
// 앱이 백그라운드로 전환될 때 동작할 이벤트를 등록합니다.
Nachocode.event.on('background', () => {
  // 앱이 백그라운드로 전환될 때 동작할 로직을 작성합니다.
});
```

```javascript
// 앱이 백그라운드에서 다시 포그라운드로 전환될 때 동작할 이벤트를 등록합니다.
Nachocode.event.on('foreground', () => {
  // 앱이 포그라운드로 전환될 때 동작할 로직을 작성합니다.
  // ex. 페이지 새로고침, 데이터 불러오기 등
});
```

#### `off(eventName: string): void`

특정 이벤트명으로 바인드 된 콜백 함수를 제거합니다.

```javascript
// 'init' 이벤트명으로 바인드 된 event를 제거합니다.
Nachocode.event.off('init');
```

## 권한 (Namespace: `permission`)

> 카메라, 위치, 마이크 등의 디바이스 권한을 확인하고 요청할 수 있는 네임스페이스입니다.

### PermissionType

디바이스의 앱 권한 타입

- `camera`: 카메라 권한
- `location`: 위치 권한
- `microphone`: 마이크 권한
- `push`: 푸시 권한

### Methods (permission)

#### `checkPermission(option: {type: PermissionType, ask?: boolean}, callback?: (granted: boolean) => any): void`

앱 유저가 앱의 해당 권한을 허용하였는지 확인합니다. `ask` 옵션이 `true`일 경우, 허용이 되어있지 않으면 권한을 요청합니다. 콜백 함수의 매개 변수로 허용 여부를 전달합니다.

```javascript
// ex. 푸시 알림 권한 허용 여부를 확인합니다.
// 권한을 허용하지 않았을 경우 OS 팝업을 통해 권한을 요청합니다.
Nachocode.permission.checkPermission({ type: 'push', ask: true }, granted => {
  // 앱 유저가 권한을 허용여부가 매개 변수 granted에 전달 됩니다.
  if (granted) {
    alert('푸시 권한 허용됨.');
  } else {
    alert('푸시 권한 거부됨.');
  }
});
```

## 내부 저장소 (Namespace: `preference`)

> 네이티브 환경의 내부 저장소를 활용하여 앱 내 데이터를 저장하고 관리하는 기능을 제공합니다.

### Methods (preference)

#### `deleteData(key: string)`

앱 내부 저장소에 저장된 데이터를 삭제합니다.

```javascript
// ex. 'sample'을 키로 앱 내부 저장소의 데이터를 삭제합니다.
Nachocode.preference.deleteData('sample');
```

#### `getData(key: string, callback: (data: string) => any): void`

앱 내부 저장소에 저장된 데이터를 불러옵니다. 콜백함수의 매개 변수로 값이 전달 됩니다.

```javascript
// ex. 'sample'을 키로 앱 내부 저장소의 데이터를 조회합니다.
Nachocode.preference.getData('sample', data => {
  if (data) {
    alert('Received Data : ' + data);
  } else {
    alert('No received data!');
  }
});
```

#### `setData(key: string, data: string): void`

앱 내부 저장소에 특정키로 데이터를 저장합니다.

```javascript
// ex. 'sample'을 키로 앱 내부 저장소에 데이터를 저장합니다.
Nachocode.preference.setData('sample', 'sample data');

// ex. 'sample'을 키로 앱 내부 저장소의 데이터를 조회합니다.
Nachocode.preference.getData('sample', data => {
  if (data) {
    alert(data); // sample data
  } else {
    alert('No received data!');
  }
});
```

## 푸시 알림 (Namespace: `push`)

> 푸시 알림 관련 기능을 관리하는 네임스페이스입니다.
> 푸시 토큰을 Nachocode 서버에 등록 및 삭제하는 등의 기능을 제공합니다.

### Methods (push)

#### `registerPushToken(userID: string): Promise<any>`

푸시 토큰을 Nachocode 서버에 지정한 사용자 식별자로 등록합니다.

```javascript
// ex. 유저의 로그인 성공 시 호출되는 콜백함수
function onLoginSuccess(userID) {
  // ex. userID : "Nacho123"
  // "Nacho123" 사용자 식별자로 Nachocode 서버에 등록합니다.
  Nachocode.push.registerPushToken(userID);
}
```

#### `deletePushToken(userID: string): Promise<any>`

사용자 식별자로 푸시 토큰을 삭제합니다.

```javascript
// ex. 유저의 로그아웃 시 호출되는 콜백함수
function onLogout(userID) {
  // ex. userID : "Nacho123"
  // "Nacho123" 사용자 식별자에 해당하는 토큰을
  // Nachocode 서버에서 삭제합니다.
  Nachocode.push.deletePushToken(userID);
}
```

## 새로고침 (Namespace: `refresh`)

> 새로고침 관련 기능을 제어하는 네임스페이스입니다.
> 사용자가 화면을 아래로 당겨 페이지를 새로고침할 수 있도록 설정을 제어할 수 있는 기능 등을 제공합니다.

### Methods (refresh)

#### `setPullToRefresh(enable: boolean): void`

사용자가 화면을 아래로 당겨 새로고침할 수 있도록 하는 `Pull to Refresh` 기능을 활성화하거나 비활성화합니다.

```javascript
// `Pull to Refresh` 기능을 활성화합니다.
Nachocode.refresh.setPullToRefresh(true);
```

```javascript
// `Pull to Refresh` 기능을 비활성화합니다.
Nachocode.refresh.setPullToRefresh(false);
```

## 공유 (Namespace: `share`)

> 네이티브 공유 UI를 통해 공유 기능을 제공하는 네임스페이스입니다.

### Methods (share)

#### `openSharing(url: string): void`

제공된 URL로 앱 Native 공유하기 UI를 엽니다.

```javascript
// 공유 할 URL. ex) 'https://nachocode.io'
const sharedURL = 'https://nachocode.io';
// 해당 URL을 Native UI로 공유합니다.
Nachocode.share.openSharing(sharedURL);
```

#### `KakaoShareType`

```typescript
declare enum KakaoShareType {
  CUSTOM = 'custom',
  SCRAP = 'scrap',
}
```

- `'custom'`: 미리 만들어둔 커스텀 템플릿으로 카카오톡 공유하기 메시지를 전송합니다.
- `'scrap'`: URL을 활용하여 카카오톡 스크랩 공유하기 메시지를 전송합니다. 선택적으로 미리 만들어둔 템플릿을 활용할 수 있습니다.

#### `KakaoShareCustom`

```typescript
declare type KakaoShareCustom = {
  templateId: number;
  templateArgs?: {
    [key: string]: string;
  };
  serverCallbackArgs?: {
    [key: string]: string;
  };
};
```

- `templateId`: kakao developers 웹 사이트에 등록된 메시지 템플릿 아이디
- `templateArgs`: (_optional_) 메시지 템플릿에 미리 등록된 arguments 키와 가변적으로 넣어줄 값
- `serverCallbackArgs`: (_optional_) 카카오톡 공유하기 결과를 서버에서 처리하고 싶을 때 arguments로 넘겨줄 키와 값

#### `KakaoShareScrap`

```typescript
declare type KakaoShareScrap = {
  requestUrl: string;
  templateId?: number;
  templateArgs?: {
    [key: string]: string;
  };
  serverCallbackArgs?: {
    [key: string]: string;
  };
};
```

- `requestUrl`: 스크랩 공유할 URL
- `templateId`: (_optional_) kakao developers 사이트에 미리 만들어둔 메시지 템플릿의 ID
- `templateArgs`: (_optional_) 메시지 템플릿에 미리 등록된 arguments 키와 가변적으로 넣어줄 값
- `serverCallbackArgs`: (_optional_) 카카오톡 공유하기 결과를 서버에서 처리하고 싶을 때 arguments로 넘겨줄 키와 값

#### `KakaoShareResultStatusCode`

```typescript
declare enum KakaoShareResultStatusCode {
  ERROR_JSON_FAILED = 102,
  ERROR_JSON_FAILED_TO_MODEL = 103,
  ERROR_JSON_FAILED_TO_KAKAO_MODEL = 104,
  ERROR_JSON_WRONG_SHARE_TYPE = 105,
  ERROR_JSON_EMPTY_REQUEST_URL = 106,
  ERROR_JSON_EMPTY_TEMPLATE_ID = 108,
  ERROR_KAKAO_FAILED = 199,
  SUCCESS_KAKAO = 200,
  SUCCESS_SAFARI = 201,
}
```

#### `KakaoShareResult`

```typescript
declare type KakaoShareResult = {
  status: 'error' | 'success';
  statusCode: KakaoShareStatusCode;
  message?: string;
};
```

#### `sendKakao` (카카오톡 공유하기)

```typescript
sendKakao(
  type: KakaoShareType,
  data: KakaoShareCustom | KakaoShareScrap,
  callback?: (result: KakaoShareResult) => void
): void
```

## 탭바 (Namespace: `tabbar`)

> 앱 내 탭바 관련 기능을 제공하는 네임스페이스입니다.
> 탭바의 표시 여부와 특정 탭으로의 전환 등을 제어합니다.

### Methods (tabbar)

#### `moveTo(index: number): void`

특정 index의 탭으로 전환합니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 제일 첫번째 탭으로 탭을 전환합니다.
Nachocode.tabbar.moveTo(0);
// 두번째 탭으로 탭을 전환합니다.
Nachocode.tabbar.moveTo(1);
```

#### `show(): void`

탭바를 화면에서 다시 보이게 합니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 숨겨진 탭바를 다시 보이게 합니다.
Nachocode.tabbar.show();
```

#### `hide(): void`

탭바를 화면에서 숨깁니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 탭바를 화면에서 숨깁니다.
Nachocode.tabbar.hide();
```

## 진동 (Namespace: `vibration`)

> 진동 및 햅틱 피드백을 제어하는 네임스페이스입니다.
> 디바이스에서 진동 기능을 활성화하거나 호출하여 진동을 트리거할 수 있습니다.

### HapticsType

햅틱 피드백 유형을 나타내는 열거형입니다.

- `SUCCESS = 0`: 성공 시의 햅틱 피드백을 나타냅니다.
- `ERROR = 1`: 실패 시의 햅틱 피드백을 나타냅니다.

### Methods (vibration)

#### `setHaptics(enable: boolean): void`

앱 사용자의 햅틱 피드백 사용유무를 저장합니다.
스토어 정책 상 진동 기능을 사용 할 경우 앱 사용자에게 끌 수 있도록 옵션을 제공해야 합니다.

```javascript
// 앱이 햅틱 피드백을 사용하도록 설정합니다.
Nachocode.vibration.setHaptics(true);
```

```javascript
// 사용자의 선택에 따라 햅틱 피드백 사용을 중지합니다.
Nachocode.vibration.setHaptics(false);
```

```javascript
// ex. 햅틱 피드백 토글 UI 변경 시 호출 될 함수
function onHapticsToggleChange(enable) {
  Nachocode.vibration.setHaptics(enable);
}
```

#### `setVibration(enable: boolean): void`

앱 사용자의 진동 사용유무를 저장합니다.
스토어 정책 상 진동 기능을 사용 할 경우 앱 사용자에게 끌 수 있도록 옵션을 제공해야 합니다.

```javascript
// 앱이 진동을 사용하도록 설정합니다.
Nachocode.vibration.setVibration(true);
```

```javascript
// 사용자의 선택에 따라 진동 사용을 중지합니다.
Nachocode.vibration.setVibration(false);
```

```javascript
// ex. 진동 토글 UI 변경 시 호출 될 함수
function onVibrationToggleChange(enable) {
  Nachocode.vibration.setVibration(enable);
}
```

#### `getHaptics(callback: (enable: boolean) => void): void`

앱에서 앱 사용자의 햅틱 피드백 사용유무를 받아옵니다. 콜백함수에 사용 유무를 전달하여 호출합니다.

```javascript
// ex. Native에서 햅틱 피드백 사용유무를 받아와 input의 checked 값을 변경합니다.
Nachocode.vibration.getHaptics(enable => {
  document.querySelector(
    `input[name="useHaptics"][value="${enable}"]`
  ).checked = true;
});
```

#### `getVibration(callback: (enable: boolean) => void): void`

앱에서 앱 사용자의 진동 사용유무를 받아옵니다. 콜백함수에 사용 유무를 전달하여 호출합니다.

```javascript
// ex. Native에서 진동 사용유무를 받아와 input의 checked 값을 변경합니다.
Nachocode.vibration.getVibration(enable => {
  document.querySelector(
    `input[name="useVibration"][value="${enable}"]`
  ).checked = true;
});
```

#### `isUsingHaptics(): boolean`

앱 Preference 스토리지에서 사용자의 햅틱 피드백 사용유무를 받아옵니다.

```javascript
// 저장 된 사용자 햅틱 피드백 사용유무 확인
const usesHaptics = Nachocode.vibration.isUsingHaptics(); // true | false
```

#### `isUsingVibration(): boolean`

앱 Preference 스토리지에서 사용자의 진동 사용유무를 받아옵니다.

```javascript
// 저장 된 사용자 진동 사용유무 확인
const usesVibration = Nachocode.vibration.isUsingVibration(); // true | false
```

#### `haptics(hapticsType?: HapticsType): void`

햅틱 피드백을 트리거합니다.
`SUCCESS = 0 | ERROR = 1`을 옵션으로 선택할 수 있습니다.
기본적으로 `SUCCESS = 0` 을 옵션으로 가집니다.

```javascript
// DOM 요소의 touchstart 이벤트에 햅틱 피드백 트리거를 바인드 합니다.
document
  .getElementById('hapticsButton')
  .addEventListener('touchstart', function () {
    // 기본적으로 HapticsType.SUCCESS(=0)를 옵션으로 가집니다.
    Nachocode.vibration.haptics();
  });
```

```javascript
// DOM 요소의 touchstart 이벤트에 햅틱 피드백 트리거를 바인드 합니다.
document
  .getElementById('hapticsButton')
  .addEventListener('touchstart', function () {
    // 0은 HapticsType.SUCCESS를 의미합니다.
    Nachocode.vibration.haptics(0);
  });
```

```javascript
// DOM 요소의 touchstart 이벤트에 햅틱 피드백 트리거를 바인드 합니다.
document
  .getElementById('hapticsButton')
  .addEventListener('touchstart', function () {
    // 1은 HapticsType.ERROR를 의미합니다.
    Nachocode.vibration.haptics(1);
  });
```

#### `vibrate(): void`

짧은 패턴의 진동을 트리거합니다.

```javascript
// DOM 요소의 click 이벤트에 진동 트리거를 바인드 합니다.
document.getElementById('vibrateButton').addEventListener('click', function () {
  // 진동 호출
  Nachocode.vibration.vibrate();
});
```
