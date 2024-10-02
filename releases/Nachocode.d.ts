declare global {
  namespace Nachocode {
    /**
     * An error thrown when attempting to use the SDK before it has been initialized.
     */
    export declare class NotInitializedError extends Error {}
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
       */
      function getAppName(): string;

      /**
       * Retrieves the stored application key.
       * @returns {string} The key of the application.
       */
      function getAppKey(): string;

      /**
       * Retrieves the stored application version.
       * @returns {string} The current version of the applicaiton installed.
       */
      function getCurrentAppVersion(): string;

      /**
       * Retrieves the stored application package name.
       * @returns {string} The package name of the application.
       */
      function getPackageName(): string;
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
      export declare type OpenURLOption = 'external' | 'internal';

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
       */
      function openLink(url: string, option?: OpenURLOption): void;
    }

    /**
     * Namespace for device specific functions
     * @since 1.0.0
     */
    namespace device {
      /**
       * Enum for device types
       */
      export declare enum DeviceType {
        ANDROID = 'Android',
        IOS = 'iOS',
        UNKNOWN = 'Unknown',
      }

      /**
       * Detect the device type using the User-Agent string.
       * @returns {DeviceType} The detected device type (e.g., "Android", "iOS", "Unknown").
       */
      function detectType(): DeviceType;

      /**
       * Retrieves the type of the device.
       */
      function getType(): DeviceType;

      /**
       * Returns whether current device is Android or not.
       */
      function isAndroid(): boolean;

      /**
       * Returns whether current device is iOS or not.
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
        WEB = 'web',
        APP = 'app',
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
        sdkVersion: string;
        /**
         * Current application source version
         */
        srcVersion: string;
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
       * @returns {string} The source version of the application.
       */
      function getAppSourceVersion(): string;

      /**
       * Retrieves the current environment of the application.
       */
      function getCurrentEnv(): CurrentEnvironment;

      /**
       * Retrieves the running environment whether Web or App.
       */
      function getRunningEnv(): RunningEnvironment;

      /**
       * Retrieves the current SDK version.
       */
      function getSDKVersion(): string;

      /**
       * Check whether the application is running on `Native Applicaiton`.
       */
      function isApp(): boolean;

      /**
       * Checks whether the Nachocode SDK is initialized.
       */
      function isInitialized(): boolean;

      /**
       * Checks whether currently using sandbox server.
       */
      function isUsingSandbox(): boolean;

      /**
       * Check whether the application is running on `Web Applicaiton`.
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
        INIT = 'init',
        BACKGROUND = 'background',
        FOREGROUND = 'foreground',
      }
      /**
       * Registers an event listener for the specified event name.
       */
      function on(eventName: EventType, callback: (params?: any) => any): void;
      /**
       * Unbinds registered event listener for the specified event name.
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
       */
      export declare enum PermissionType {
        CAMERA = 'camera',
        LOCATION = 'location',
        MICROPHONE = 'microphone',
        PUSH = 'push',
      }

      /**
       * Checks whether the app user grants the specified permission or not.
       * Asks if optional parameter `ask` is set `true`.
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
     */
    namespace preference {
      /**
       * Retrieves the data with the specified key
       * from native layer's preference area.
       * Calls callback function with selected data.
       */
      function getData(key: string, callback: (data: string) => any): void;

      /**
       * Sets the data with the specified key
       * into native layer's preference area.
       */
      function setData(key: string, data: string): void;
    }

    /**
     * Namespace for push notification functions
     * @since 1.0.0
     * @lastupdated 1.0.3
     */
    namespace push {
      /**
       * Asks for the permission for push notifications.
       */
      function askPushPermission(): Promise<void>;

      /**
       * Gets the permission status for push notifications.
       */
      function getPushPermission(): Promise<boolean>;

      /**
       * Asynchronously retrieves the push token.
       */
      function getPushToken(): Promise<string>;

      /**
       * Registers the push token to the Nachocode server.
       * @param userID - Client user identifier
       */
      function registerPushToken(userID: string): Promise<any>;

      /**
       * Deletes the push token with the user identifier.
       * @param userID - Client user identifier
       */
      function deletePushToken(userID: string): Promise<any>;
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
        CUSTOM = 'custom',
        SCRAP = 'scrap',
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
        status: 'error' | 'success';
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
       */
      function moveTo(index: number): void;

      /**
       * Shows the tabbar.
       */
      function show(): void;

      /**
       * Hides the tabbar.
       */
      function hide(): void;
    }

    /**
     * Namespace for vibration functions
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
       */
      function setHaptics(enable: boolean): void;
      /**
       * Set whether vibration is used or not.
       */
      function setVibration(enable: boolean): void;
      /**
       * Get whether haptics feedback is used or not from native.
       */
      function getHaptics(callback: (enable: boolean) => void): void;
      /**
       * Get whether vibration is used or not from native.
       */
      function getVibration(callback: (enable: boolean) => void): void;
      /**
       * Get whether haptics feedback is used or not from user local storage.
       * - Default : `true`
       */
      function isUsingHaptics(): boolean;
      /**
       * Get whether vibration is used or not from user local storage.
       * - Default : `true`
       */
      function isUsingVibration(): boolean;
      /**
       * Triggers haptics feedback.
       * - Default : `0`
       */
      function haptics(hapticsType?: HapticsType): void;
      /**
       * Triggers vibration.
       */
      function vibrate(): void;
    }
  }
}

export default Nachocode;
