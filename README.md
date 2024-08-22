# Nachocode SDK 통합 가이드

- Nachocode SDK를 웹 애플리케이션에서 활용하는 과정을 안내합니다. 이 가이드를 통해 Nachocode SDK의 기능을 웹 사이트에 손쉽게 추가할 수 있습니다.
- 최신화 일자 : 2024-08-20

## SDK 설정 방법

- Nachocode SDK를 웹 페이지에 통합하는 과정은 매우 간단합니다. 아래 단계를 따라 진행하세요.

### 1. SDK 스크립트 추가

- 웹 페이지의 `<body>` 태그 안에 다음과 같은 스크립트 태그를 추가합니다. 이 스크립트는 Nachocode SDK를 웹 페이지에 로드합니다.

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.1.0/client-sdk.min.js"></script>
```

### 2. SDK 초기화

- 웹 페이지 로딩이 완료되면, SDK를 초기화해야 합니다. 다음 예제 코드는 SDK를 초기화하는 방법을 보여줍니다. 이 코드는 보통 `<script>` 태그 안에 넣거나, 별도의 JavaScript 파일에 작성할 수 있습니다.

```html
<script>
  // SDK가 로드되었는지 확인한 후 초기화를 시도합니다.
  if (window.Nachocode) {
    Nachocode.init("your_api_key_here", { logger: true });
  } else {
    console.error("Nachocode SDK is not loaded.");
  }
</script>
```

- `your_api_key_here`: 여러분의 Nachocode 서비스 API 키로 교체해주세요.
- `logger`: SDK의 로깅 기능을 활성화할지 결정합니다. 개발 중에 문제를 진단하는 데 유용할 수 있으므로 `true`로 설정하는 것이 좋습니다.

### 3. SDK 기능 사용

- SDK가 초기화되면, `Nachocode` 네임스페이스 아래에 정의된 다양한 기능을 사용할 수 있습니다. 예를 들어, 애플리케이션 이름을 검색하려면 다음과 같이 할 수 있습니다.

```javascript
const appName = Nachocode.app.getAppName();
console.log(appName);
```

## 추가 정보

- Nachocode SDK를 사용하여 더 많은 기능을 구현하고 싶다면, [공식 개발자 문서](https://nachocode.notion.site/bfb96ce8d7014e84a87d3356ad17f99e)를 참조하거나, [GitHub 리포지토리](https://github.com/FlipperCorporation)에서 더 많은 예제와 가이드를 찾아볼 수 있습니다.

- Nachocode 팀은 여러분의 성공적인 프로젝트 구현을 위해 항상 도움을 준비하고 있습니다. 기술적인 질문이나 피드백이 있다면 언제든지 [이메일](mailto:support@nachocode.io)을 보내주세요.

## Nachocode JavaScript 클라이언트 라이브러리 API 문서

### 개요

- Nachocode JavaScript 클라이언트 라이브러리는 웹 및 네이티브 앱 개발에 필요한 다양한 기능을 제공합니다. 이 문서는 라이브러리의 주요 기능과 사용법을 소개합니다.

#### 최신 버젼

- 항상 가장 최신 버젼 불러오기

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@latest/client-sdk.min.js"></script>
```

- 현재 최신 버젼 v1.1.0

```html
<script src="https://cdn.nachocode.io/nachocode/client-sdk/@1.1.0/client-sdk.min.js"></script>
```

## 초기화

### `init(apiKey: string, options?: InitializeOptions): void`

Nachocode SDK를 초기화합니다. 애플리케이션이 시작할 때 호출해야 합니다.

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
  Nachocode.event.on("init", () => {
    if (Nachocode.env.isApp()) {
      // 앱 환경에서만 동작 할 로직을 작성합니다.
    }
  });

  // Nachocode SDK를 초기화 합니다.
  Nachocode.init("your_api_key_here", { sandbox: true, logger: true });
} else {
  console.error("Nachocode SDK is not loaded.");
}
```

```javascript
// InitializeOptions 없이도 초기화를 할 수 있습니다.
// sandbox 와 logger는 false 값을 가지게 됩니다.
Nachocode.init("your_api_key_here");
```

## 애플리케이션 (Namespace: `app`)

### Methods (Application)

#### `getAppName(): string`

저장된 애플리케이션 이름을 반환합니다.

```javascript
const appName = Nachocode.app.getAppName(); // 앱 이름
```

#### `getAppKey(): string`

저장된 애플리케이션 키를 반환합니다.

```javascript
const appKey = Nachocode.app.getAppKey(); // ex. 'APP-XXXXXXX'
```

#### `getCurrentAppVersion(): string`

현재 설치된 애플리케이션의 버전을 반환합니다.

```javascript
const appVersion = Nachocode.app.getCurrentAppVersion(); // ex. '0.0.2'
```

#### `getPackageName(): string`

저장된 애플리케이션 패키지 이름을 반환합니다.

```javascript
const appPackageName = Nachocode.app.getPackageName(); // ex. 'com.nachocode.xxx'
```

## 브라우저 (Namespace: `browser`)

### OpenURLOption

브라우저 옵션을 나타내는 타입입니다.

- `external`: 외부 브라우저 의미합니다. (safari, chrome, naver 등)
- `internal`: 앱 내부 브라우저를 의미합니다.

### Methods (Browser)

#### `openLink(url: string, option?: OpenURLOption): void`

제공된 URL을 브라우저 창에서 오픈 합니다.

```javascript
// 기본 옵션 : 'external'
Nachocode.browser.openLink("https://nachocode.io");
```

```javascript
// 외부 브라우저로 URL 오픈
Nachocode.browser.openLink("https://nachocode.io", "external");
```

```javascript
// 내부 브라우저로 URL 오픈
Nachocode.browser.openLink("https://nachocode.io", "internal");
```

## 디바이스 (Namespace: `device`)

### DeviceType

디바이스 유형을 나타내는 열거형입니다.

- `Android`: 안드로이드 디바이스를 나타냅니다.
- `iOS`: iOS 디바이스를 나타냅니다.
- `Unknown`: 알 수 없는 디바이스 유형입니다.

### Methods (Device)

#### `getType(): DeviceType`

사용자 에이전트를 활용하여 디바이스의 유형을 탐지 및 반환합니다.

```javascript
const deviceType = Nachocode.device.getType(); // 'Android' | 'iOS' | 'Unknown'

// 유저 디바이스 별로 로직을 다르게 처리하는 예시입니다.
switch (deviceType) {
  case "Android": // Android 기기를 의미합니다.
    // Android 디바이스에서만 동작할 로직을 작성합니다.
    break;
  case "iOS": // iPad, iPhone 등 iOS 기기를 의미합니다.
    // iOS 디바이스에서만 동작할 로직을 작성합니다.
    break;
  case "Unknown": // PC 및 기타 장치를 의미합니다.
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
const sdkVersion = Nachocode.env.getSDKVersion(); // ex. '1.1.0'
```

#### `isApp(): boolean`

애플리케이션이 네이티브 앱에서 실행 중인지 여부를 반환합니다.

```javascript
if (Nachocode.env.isApp()) {
  // 앱 환경에서만 동작할 로직을 작성합니다.
}
```

#### `isInitialized(): boolean`

Nachocode SDK가 초기화되었는지 여부를 반환합니다.

```javascript
if (Nachocode.env.isInitialized()) {
  // Nachocode SDK가 초기화 되었을 때만 실행 할 로직을 작성합니다.
}
```

```javascript
// SDK가 초기화 되지 않았다면 초기화를 시도합니다.
if (!Nachocode.env.isInitialized()) {
  Nachocode.init("your_api_key_here");
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

### Methods (event)

#### `on(eventName: string, callback: function): void`

특정 이벤트명으로 콜백 함수를 바인드합니다.

```javascript
// SDK 초기화 후 동작할 이벤트를 등록 합니다.
Nachocode.event.on("init", () => {
  if (Nachocode.env.isApp() && Nachocode.device.isIOS()) {
    // iOS 디바이스에서만 동작할 로직을 작성합니다.
  }
});

// Nachocode SDK를 초기화 합니다.
Nachocode.init("your_api_key_here");
```

#### `off(eventName: string): void`

특정 이벤트명으로 바인드 된 콜백 함수를 제거합니다.

```javascript
// 'init' 이벤트명으로 바인드 된 event를 제거합니다.
Nachocode.event.off("init");
```

## 푸시 알림 (Namespace: `push`)

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

## 공유 (Namespace: `share`)

### Methods (share)

#### `openSharing(url: string): void`

제공된 URL로 앱 Native 공유하기 UI를 엽니다.

```javascript
// 공유 할 URL. ex) 'https://nachocode.io'
const sharedURL = "https://nachocode.io";
// 해당 URL을 Native UI로 공유합니다.
Nachocode.share.openSharing(sharedURL);
```

## 탭바 (Namespace: `tabbar`)

### Methods (tabbar)

#### `moveTo(index: number): Promise<void>`

특정 index의 탭으로 전환합니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 제일 첫번째 탭으로 탭을 전환합니다.
Nachocode.tabbar.moveTo(0);
// 두번째 탭으로 탭을 전환합니다.
Nachocode.tabbar.moveTo(1);
```

#### `show(): Promise<void>`

탭바를 화면에서 다시 보이게 합니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 숨겨진 탭바를 다시 보이게 합니다.
Nachocode.tabbar.show();
```

#### `hide(): Promise<void>`

탭바를 화면에서 숨깁니다. Nachocode 대시보드에서 탭바를 먼저 등록 후 빌드해야합니다.

```javascript
// 탭바를 화면에서 숨깁니다.
Nachocode.tabbar.hide();
```

## 진동 (Namespace: `vibration`)

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

로컬 스토리지에서 사용자의 햅틱 피드백 사용유무를 받아옵니다.

```javascript
// 저장 된 사용자 햅틱 피드백 사용유무 확인
const usesHaptics = Nachocode.vibration.isUsingHaptics(); // true | false
```

#### `isUsingVibration(): boolean`

로컬 스토리지에서 사용자의 진동 사용유무를 받아옵니다.

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
  .getElementById("hapticsButton")
  .addEventListener("touchstart", function () {
    // 기본적으로 HapticsType.SUCCESS(=0)를 옵션으로 가집니다.
    Nachocode.vibration.haptics();
  });
```

```javascript
// DOM 요소의 touchstart 이벤트에 햅틱 피드백 트리거를 바인드 합니다.
document
  .getElementById("hapticsButton")
  .addEventListener("touchstart", function () {
    // 0은 HapticsType.SUCCESS를 의미합니다.
    Nachocode.vibration.haptics(0);
  });
```

```javascript
// DOM 요소의 touchstart 이벤트에 햅틱 피드백 트리거를 바인드 합니다.
document
  .getElementById("hapticsButton")
  .addEventListener("touchstart", function () {
    // 1은 HapticsType.ERROR를 의미합니다.
    Nachocode.vibration.haptics(1);
  });
```

#### `vibrate(): void`

짧은 패턴의 진동을 트리거합니다.

```javascript
// DOM 요소의 click 이벤트에 진동 트리거를 바인드 합니다.
document.getElementById("vibrateButton").addEventListener("click", function () {
  // 진동 호출
  Nachocode.vibration.vibrate();
});
```
