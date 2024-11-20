declare global {
  /**
   * Nachocode JavaScript Client SDK Type Declaration v1.3.0
   *
   * GitHub
   *   - https://github.com/FlipperCorporation/nachocode-client-sdk-js
   *
   * CDN
   *   - https://cdn.nachocode.io/nachocode/client-sdk/@1.3.0/Nachocode.d.ts
   *
   * Last Updated Date: 2024-11-11
   */
  namespace Nachocode {
    /**
     * An error thrown when attempting to use the SDK before it has been initialized.
     */
    export declare class NotInitializedError extends Error {}

    export declare interface SDKError {
      code: `ERR-${string}`;
      message: string;
    }

    /**
     * Options for Nachocode SDK environment
     */
    export declare type InitializeOptions = {
      /**
       * Option to use sandbox server or not
       */
      sandbox?: boolean;
      /**
       * Option to use logger or not
       */
      logger?: boolean;
    };

    /**
     * Version string
     */
    export declare type VersionString = `${number}.${number}.${number}`;

    /**
     * Initializes the Nachocode SDK with the provided API key and environment setting.
     * @since 1.0.0
     */
    function init(apiKey: string, options?: InitializeOptions): void;

    /**
     * Namespace for application specific functions
     * @since 1.0.0
     */
    namespace app {
      /**
       * Retrieves the stored application name.
       * @returns {string} The name of the application.
       * @since 1.0.0
       */
      function getAppName(): string;

      /**
       * Retrieves the stored application key.
       * @returns {string} The key of the application.
       * @since 1.0.0
       */
      function getAppKey(): string;

      /**
       * Retrieves the stored application version.
       * @returns {VersionString} The current version of the applicaiton installed.
       * @since 1.0.0
       */
      function getCurrentAppVersion(): VersionString;

      /**
       * Retrieves the stored application package name.
       * @returns {string} The package name of the application.
       * @since 1.0.0
       */
      function getPackageName(): string;
    }

    /**
     * Namespace for authentication handling
     * @since 1.3.0
     */
    namespace authentication {
      /**
       * Authentication result
       */
      export declare type AuthenticationResult = {
        authenticated: boolean;
        error?: SDKError;
      };

      /**
       * Function to check availability of biometrics authentication.
       * Calls callback function with the value whether it is available or not.
       * @since 1.3.0
       */
      function canUseBiometrics(
        callback: (available: boolean, error?: SDKError) => any
      ): void;

      /**
       * Function to use native biometrics authentication.
       * Calls callback function with the authentication result.
       * @since 1.3.0
       */
      function useBiometrics(
        callback: (result: AuthenticationResult) => any
      ): void;
    }

    /**
     * Namespace for native hardware back key pressed handling
     *   - Android Only
     * @since 1.2.0
     */
    namespace backkey {
      /**
       * Registers an event listener for native back key handler.
       * If registered, instead of default back key handling, calls registerd callback.
       * @param {function} event - Function willing to be called when back key pressed.
       * @returns {string} - Returns registered event id
       * @example
       * // Deafult event id provided
       * Nachocode.backkey.addEvent((eventId) => {
       *  console.log('Back key pressed.');
       *  console.log(eventId); // 1
       * });
       * @example
       * // Set specific event id
       * Nachocode.backkey.addEvent((eventId) => {
       *  console.log('Back key pressed.');
       *  console.log(eventId); // sample
       * }, 'sample');
       * @since 1.2.0
       */
      function addEvent(
        event: (eventId: string) => void,
        eventId?: string
      ): string;

      /**
       * Removes all of registered event listeners.
       * @example
       * // Clears registered back key handling event listeners.
       * Nachocode.backkey.clearEvents();
       * @since 1.2.0
       */
      function clearEvents(): void;

      /**
       * Gets last event id
       * @returns {string} - Returns last registered event id
       * @example
       * // Register first event for backkey handling
       * Nachocode.backkey.addEvent((eventId) => {
       *  console.log('Back key pressed.');
       *  console.log(eventId); // sample1
       * }, 'sample1');
       *
       * // Register second event for backkey handling
       * Nachocode.backkey.addEvent((eventId) => {
       *  console.log('Back key pressed.');
       *  console.log(eventId); // sample2
       * }, 'sample2');
       *
       * // Get event id of last registered event.
       * const eventId = Nachocode.backkey.getLastEvent(); // sample2
       * @since 1.2.0
       */
      function getLastEvent(): string;

      /**
       * Removes registered event listener for native back key handler.
       * @param {string} [eventId] - Registered event id
       * @returns {string} - Returns removed event id
       * @example
       * // Deafult removes last event
       * Nachocode.backkey.removeEvent();
       * @example
       * // Remove specific event with event id
       * Nachocode.backkey.removeEvent('sample');
       * @since 1.2.0
       */
      function removeEvent(eventId?: string): string;
    }

    /**
     * Namespace for browser-related functions
     * @since 1.0.3
     * @lastupdated 1.1.0
     */
    namespace browser {
      /**
       * Option for opening a URL.
       *   - Default : 'external'
       */
      export declare type OpenURLOption = "external" | "internal";

      /**
       * Opens the provided URL with the specified option.
       * @param url - The URL to be opened.
       * @param option - The option for the way to open the URL.
       *   - Default : `'external'`
       * @example
       * // Deafult option : 'external'
       * Nachocode.browser.openLink('https://nachocode.io');
       * @example
       * // Open external browser
       * Nachocode.browser.openLink('https://nachocode.io', 'external');
       * @example
       * // Open internal browser
       * Nachocode.browser.openLink('https://nachocode.io', 'internal');
       * @since 1.0.3
       */
      function openLink(url: string, option?: OpenURLOption): void;
    }

    /**
     * Namespace for device specific functions
     * @since 1.0.0
     * @lastupdated 1.3.0
     */
    namespace device {
      /**
       * Enum for device types
       */
      export declare enum DeviceType {
        ANDROID = "Android",
        IOS = "iOS",
        UNKNOWN = "Unknown",
      }

      /**
       * Enum for network connection types
       */
      export declare enum NetworkConnectionType {
        WIFI = "Wi-Fi",
        CELLULAR = "Cellular",
        ETHERNET = "Ethernet",
        UNKNOWN = "No Internet Connection",
      }

      /**
       * Detect the device type using the User-Agent string.
       * @returns {DeviceType} The detected device type (e.g., "Android", "iOS", "Unknown").
       * @since 1.0.0
       */
      function detectType(): DeviceType;

      /**
       * Retrieves the battery level of the device from native layer.
       * Calls callback function with the value.
       * @example
       * Nachocode.device.getBatteryLevel(status => {
       *   const message =
       *     `충전 여부 : ${status.isCharging ? '충전 중' : '충전 중 아님'}\n` +
       *     `현재 배터리 : ${status.batteryLevel || '알 수 없음'}`;
       *   alert(message);
       * });
       * @since 1.3.0
       */
      function getBatteryLevel(
        callback: (status: { batteryLevel: number; isCharging: boolean }) => any
      ): void;

      /**
       * Retrieves the device model from the native layer.
       * @see {@link https://storage.googleapis.com/play_public/supported_devices.html} for full supported android devices info
       * @since 1.3.0
       */
      function getDeviceModel(): string;

      /**
       * Retrieves the device os from the native layer.
       * @since 1.3.0
       */
      function getDeviceOS(): { os: DeviceType; version: string };

      /**
       * Retrieves the network status from the native layer.
       * Calls callback function with the value.
       * @since 1.3.0
       */
      function getNetworkStatus(
        callback: (status: {
          isConnected: boolean;
          connectionType: NetworkConnectionType;
        }) => any
      ): void;

      /**
       * Retrieves the type of the device.
       * @since 1.0.0
       */
      function getType(): DeviceType;

      /**
       * Returns whether current device is Android or not.
       * @since 1.0.0
       */
      function isAndroid(): boolean;

      /**
       * Returns whether current device is iOS or not.
       * @since 1.0.0
       */
      function isIOS(): boolean;
    }

    /**
     * Namespace for environment and configuration
     * @since 1.0.0
     * @lastupdated 1.2.0
     */
    namespace env {
      /**
       * Enum for Nachocode applicaiton running environment
       */
      export declare enum RunningEnvironment {
        WEB = "web",
        APP = "app",
      }

      /**
       * Current environment of the applicaiton
       */
      export declare type CurrentEnvironment = {
        /**
         * Current device type
         */
        deviceType: device.DeviceType;
        /**
         * Using logger or not
         */
        logger: boolean;
        /**
         * Current running environment
         */
        runningEnv: RunningEnvironment;
        /**
         * Using sandbox server or not
         */
        sandbox: boolean;
        /**
         * Current SDK version
         */
        sdkVersion: VersionString;
        /**
         * Current application source version
         */
        srcVersion: VersionString;
      };

      /**
       * Options for environment of the applicaiton
       */
      export declare type EnvironmentOptions = {
        /**
         * Using sandbox server or not
         */
        sandbox?: boolean;
        /**
         * Using logger or not
         */
        logger?: boolean;
      };

      /**
       * Retrieves the stored application source version.
       * @returns {VersionString} The source version of the application.
       * @since 1.2.0
       */
      function getAppSourceVersion(): VersionString;

      /**
       * Retrieves the current environment of the application.
       * @since 1.0.0
       */
      function getCurrentEnv(): CurrentEnvironment;

      /**
       * Retrieves the running environment whether Web or App.
       * @since 1.0.0
       */
      function getRunningEnv(): RunningEnvironment;

      /**
       * Retrieves the current SDK version.
       * @since 1.0.0
       */
      function getSDKVersion(): VersionString;

      /**
       * Check whether the application is running on `Native Applicaiton`.
       * @since 1.0.0
       */
      function isApp(): boolean;

      /**
       * Checks whether the Nachocode SDK is initialized.
       * @since 1.0.0
       */
      function isInitialized(): boolean;

      /**
       * Checks whether currently using sandbox server.
       * @since 1.0.0
       */
      function isUsingSandbox(): boolean;

      /**
       * Check whether the application is running on `Web Applicaiton`.
       * @since 1.0.0
       */
      function isWeb(): boolean;
    }

    /**
     * Namespace for event handling
     * @since 1.0.2
     * @lastupdated 1.2.0
     */
    namespace event {
      /**
       * Reserved event types
       */
      export declare enum EventType {
        INIT = "init",
        BACKGROUND = "background",
        FOREGROUND = "foreground",
      }
      /**
       * Registers an event listener for the specified event name.
       * @since 1.0.2
       */
      function on(eventName: EventType, callback: (params?: any) => any): void;
      /**
       * Unbinds registered event listener for the specified event name.
       * @since 1.0.3
       */
      function off(eventName: EventType): void;
      /**
       * Registered events
       */
      const callbacks: {
        [eventName: EventType]: (response: any) => void;
      };
    }

    /**
     * Namespace for permission handling
     * @since 1.2.0
     */
    namespace permission {
      /**
       * Native device permission types
       * @since 1.2.0
       */
      export declare enum PermissionType {
        CAMERA = "camera",
        LOCATION = "location",
        MICROPHONE = "microphone",
        PUSH = "push",
      }

      /**
       * Checks whether the app user grants the specified permission or not.
       * Asks if optional parameter `ask` is set `true`.
       * @since 1.2.0
       */
      function checkPermission(
        option: {
          type: PermissionType;
          ask?: boolean;
        },
        callback?: (granted: boolean) => any
      ): void;
    }

    /**
     * Namespace for preference app storage functions
     * @since 1.2.0
     * @lastupdated 1.3.0
     */
    namespace preference {
      /**
       * Deletes the data from native layer's preference area
       * with the specified key.
       * @since 1.3.0
       */
      function deleteData(key: string): void;

      /**
       * Retrieves the data with the specified key
       * from native layer's preference area.
       * Calls callback function with selected data.
       * @since 1.2.0
       */
      function getData(key: string, callback: (data: string) => any): void;

      /**
       * Sets the data with the specified key
       * into native layer's preference area.
       * @since 1.2.0
       */
      function setData(key: string, data: string): void;
    }

    /**
     * Namespace for push notification functions
     * @since 1.0.0
     * @lastupdated 1.2.0
     */
    namespace push {
      /**
       * Asks for the permission for push notifications.
       * @since 1.2.0
       */
      function askPushPermission(): void;

      /**
       * Asynchronously retrieves the push token.
       * @since 1.0.0
       */
      function getPushToken(): Promise<string>;

      /**
       * Registers the push token to the Nachocode server.
       * @param userID - Client user identifier
       * @since 1.0.0
       */
      function registerPushToken(userID: string): Promise<any>;

      /**
       * Deletes the push token with the user identifier.
       * @param userID - Client user identifier
       * @since 1.0.0
       */
      function deletePushToken(userID: string): Promise<any>;
    }

    /**
     * Namespace for refresh related functions
     * @since 1.3.0
     */
    namespace refresh {
      /**
       * Set whether pull to refresh feature is enabled or not.
       * @since 1.3.0
       */
      function setPullToRefresh(enable: boolean): void;
    }

    /**
     * Namespace for share functions
     * @since 1.1.0
     * @lastupdated 1.2.0
     */
    namespace share {
      /**
       * Opens the native sharing UI with the provided URL.
       * @since 1.1.0
       */
      function openSharing(url: string): void;

      /**
       * Native Kakao sharing type
       */
      export declare enum KakaoShareType {
        CUSTOM = "custom",
        SCRAP = "scrap",
      }

      /**
       * Native Kakao custom data to send
       */
      export declare type KakaoShareCustom = {
        templateId: number;
        templateArgs?: {
          [key: string]: string;
        };
        serverCallbackArgs?: {
          [key: string]: string;
        };
      };

      /**
       * Native Kakao scrap data to send
       */
      export declare type KakaoShareScrap = {
        requestUrl: string;
        templateId?: number;
        templateArgs?: {
          [key: string]: string;
        };
        serverCallbackArgs?: {
          [key: string]: string;
        };
      };

      /**
       * Kakao share result status code
       */
      export declare enum KakaoShareResultStatusCode {
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

      /**
       * Kakao share result
       */
      export declare type KakaoShareResult = {
        status: "error" | "success";
        statusCode: KakaoShareStatusCode;
        message?: string;
      };

      /**
       * Send Kakao sharing
       * @param type - Kakao sharing type
       * @param data - Data to send kakao
       * @param callback - Callback function called after sharing kakao
       * @since 1.2.0
       */
      function sendKakao(
        type: KakaoShareType,
        data: KakaoShareCustom | KakaoShareScrap,
        callback?: (result: KakaoShareResult) => void
      ): void;
    }

    /**
     * Namespace for tabbar functions
     * @since 1.0.3
     */
    namespace tabbar {
      /**
       * Move to specific index of the tab.
       * @param {number} index - specified index of the tab willing to move
       * @since 1.0.3
       */
      function moveTo(index: number): void;

      /**
       * Shows the tabbar.
       * @since 1.0.3
       */
      function show(): void;

      /**
       * Hides the tabbar.
       * @since 1.0.3
       */
      function hide(): void;
    }

    /**
     * Namespace for vibration features
     * @since 1.2.0
     */
    namespace vibration {
      /**
       * Enum for haptics feedback type
       */
      export declare enum HapticsType {
        SUCCESS = 0,
        ERROR = 1,
      }
      /**
       * Set whether haptics feedback is used or not.
       * @since 1.2.0
       */
      function setHaptics(enable: boolean): void;
      /**
       * Set whether vibration is used or not.
       * @since 1.2.0
       */
      function setVibration(enable: boolean): void;
      /**
       * Get whether haptics feedback is used or not from native.
       * @since 1.2.0
       */
      function getHaptics(callback: (enable: boolean) => void): void;
      /**
       * Get whether vibration is used or not from native.
       * @since 1.2.0
       */
      function getVibration(callback: (enable: boolean) => void): void;
      /**
       * Triggers haptics feedback.
       * - Default : `0`
       * @since 1.2.0
       */
      function haptics(hapticsType?: HapticsType): void;
      /**
       * Triggers vibration.
       * @since 1.2.0
       */
      function vibrate(): void;
    }
  }
}

export default Nachocode;
