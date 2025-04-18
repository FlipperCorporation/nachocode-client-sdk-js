declare global {
  /**
   * Nachocode JavaScript Client SDK Type Declaration v1.5.0
   *
   * GitHub
   *   - https://github.com/FlipperCorporation/nachocode-client-sdk-js
   *
   * CDN
   *   - https://cdn.nachocode.io/nachocode/client-sdk/@1.5.0/Nachocode.d.ts
   *
   * Last Updated Date: 2025-04-18
   */
  namespace Nachocode {
    /**
     * An error thrown when attempting to use the SDK before it has been initialized.
     */
    export declare class NotInitializedError extends Error {}

    /**
     * Standard SDK Error format
     */
    export declare interface SDKError {
      /**
       * Error code in the format `ERR-<TYPE>`
       */
      code: `ERR-${string}`;
      /**
       * Error message describing the issue
       */
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
     * @param apiKey - The API key for accessing Nachocode services.
     * @example
     * // checks Nachocode script loaded or not
     * if (window.Nachocode) {
     *   // registers event willing to be fired after SDK initialization
     *   Nachocode.event.on('init', () => {
     *     if (Nachocode.env.isApp()) {
     *       // logic here only works in `App` environment..
     *     }
     *   });
     *
     *   // initializes Nachocode SDK
     *   Nachocode.init('your_api_key_here', { logger: true });
     * } else {
     *   console.error('nachocode SDK not loaded..');
     * }
     * @since 1.0.0
     */
    function init(apiKey: string, options?: InitializeOptions): void;

    /**
     * Asynchronously initializes the Nachocode SDK with the provided API key and options.
     * @param apiKey - The API key for accessing Nachocode services.
     * @example
     * // asynchronously initializes Nachocode SDK
     * await Nachocode.initAsync('your_api_key_here');
     *
     * if (Nachocode.env.isApp()) {
     *  // logic here only works in `App` environment..
     * }
     * @since 1.4.2
     */
    function initAsync(
      apiKey: string,
      options?: InitializeOptions
    ): Promise<void>;

    /**
     * Namespace for application specific functions
     * @since 1.0.0
     * @lastupdated 1.4.0
     */
    namespace app {
      /**
       * Checks whether the application is first launched or not.
       * @param callback - Called with `true` if this is the first launch, `false` otherwise.
       * @since 1.4.0
       */
      function checkFirstLaunch(
        callback: (isFirstLaunch: boolean) => void
      ): void;

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
       * @returns {VersionString} The current version of the application installed.
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
     * Namespace for Apple native features
     *
     *   - _Currently, only iOS supported._
     *   - _Customization needed._
     * @since 1.4.0
     * @lastupdated 1.4.0
     */
    namespace apple {
      /**
       * Apple result from native layer
       * @since 1.4.0
       */
      export declare type AppleResult = {
        status: 'success' | 'error';
        errorCode?: string;
        message?: string;
      };

      /**
       * Reserved Apple permission types
       * @since 1.4.0
       */
      export declare type ApplePermissionTypes = ['email', 'fullName'];

      /**
       * Apple permissions
       * @since 1.4.0
       */
      export declare type ApplePermissions =
        (typeof ApplePermissionTypes)[string][];

      /**
       * Apple user data from native layer
       * @since 1.4.0
       */
      export declare type AppleUserData = {
        identifier: string;
        token: string;
        authorizationCode: string;
        email?: string;
        name?: {
          givenName: string;
          familyName: string;
        };
        [fields: string]: any;
      };

      /**
       * Apple native social login
       * @since 1.4.0
       */
      function login(
        permissions: ApplePermissions,
        callback: (result: AppleResult, userData?: AppleUserData) => void
      ): void;

      /**
       * Check whether logged in with Apple native social login
       * @since 1.4.0
       */
      function isLoggedIn(
        identifier: string,
        callback: (result: AppleResult, isLoggedIn: boolean) => void
      ): void;

      /**
       * @description
       * Function to get Apple user identifier from native layer.
       *
       * Calls callback function with the user identifier.
       * @since 1.4.0
       */
      function getUserIdentifier(
        callback: (result: AppleResult, userIdentifier?: string) => void
      ): void;
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
        callback: (available: boolean, error?: SDKError) => void
      ): void;

      /**
       * Function to use native biometrics authentication.
       * Calls callback function with the authentication result.
       * @since 1.3.0
       */
      function useBiometrics(
        callback: (result: AuthenticationResult) => void
      ): void;
    }

    /**
     * Namespace for native hardware back key pressed handling
     *   - _Android Only_
     * @since 1.2.0
     */
    namespace backkey {
      /**
       * Registers an event listener for native back key handler.
       * If registered, instead of default back key handling, calls registered callback.
       * @param {function} event - Function willing to be called when back key pressed.
       * @returns {string} - Returns registered event id
       * @example
       * // Default event id provided
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
       * // Default removes last event
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
      export declare type OpenURLOption = 'external' | 'internal';

      /**
       * Opens the provided URL with the specified option.
       * @param url - The URL to be opened.
       * @param option - The option for the way to open the URL.
       *   - Default : `'external'`
       * @example
       * // Default option : 'external'
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
     * Namespace for clipboard related functions
     * @since 1.4.0
     */
    namespace clipboard {
      /**
       * Function to get text from the native clipboard through native layer.
       * @since 1.4.0
       */
      function getText(callback: (text: string) => void): void;

      /**
       * Function to set text to the native clipboard through native layer.
       * @since 1.4.0
       */
      function setText(
        text: string,
        callback?: (status: 'success' | 'error', message: string) => void
      ): void;
    }

    /**
     * Namespace for device specific functions
     * @since 1.0.0
     * @lastupdated 1.4.2
     */
    namespace device {
      /**
       * Device types
       * @since 1.4.2
       */
      export declare const DEVICE_TYPES = {
        ANDROID: 'Android',
        IOS: 'iOS',
        UNKNOWN: 'Unknown',
      } as const;

      /**
       * Type for device types
       * @since 1.0.0
       * @lastupdated 1.4.2
       */
      export declare type DeviceType =
        (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];

      /**
       * Network connection types
       * @since 1.4.2
       */
      export declare const NETWORK_CONNECTION_TYPES = {
        WIFI: 'Wi-Fi',
        CELLULAR: 'Cellular',
        ETHERNET: 'Ethernet',
        UNKNOWN: 'No Internet Connection',
      } as const;

      /**
       * Type for network connection types
       * @since 1.3.0
       * @lastupdated 1.4.2
       */
      export declare type NetworkConnectionType =
        (typeof NETWORK_CONNECTION_TYPES)[keyof typeof NETWORK_CONNECTION_TYPES];

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
        callback: (status: {
          batteryLevel: number;
          isCharging: boolean;
        }) => void
      ): void;

      /**
       * Retrieves the current language of the device from native layer.
       * Calls callback function with the value.
       * @example
       * Nachocode.device.getCurrentLanguage(language => {
       *   const message = `현재 디바이스 언어 : ${language}`;
       *   alert(message);
       * });
       * @since 1.4.0
       */
      function getCurrentLanguage(callback: (language: string) => void): void;

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
        }) => void
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
      const RUNNING_ENVIRONMENTS = {
        WEB: 'web',
        APP: 'app',
      } as const;

      /**
       * Type for Nachocode application running environment
       * @since 1.0.0
       * @lastupdated 1.4.2
       */
      export declare type RunningEnvironment =
        (typeof RUNNING_ENVIRONMENTS)[keyof typeof RUNNING_ENVIRONMENTS];

      /**
       * Current environment of the application
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
       * Options for environment of the application
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
       * Check whether the application is running on `Native Application`.
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
       * Check whether the application is running on `Web Application`.
       * @since 1.0.0
       */
      function isWeb(): boolean;
    }

    /**
     * Namespace for event handling
     * @since 1.0.2
     * @lastupdated 1.4.2
     */
    namespace event {
      /**
       * Reserved event types
       * @since 1.0.2
       * @lastupdated 1.4.2
       */
      export declare const EVENT_TYPES = {
        /**
         * Callback event triggered when the SDK is initialized.
         * @since 1.0.2
         */
        INIT: 'init',

        /**
         * Callback event automatically triggered when the app transitions to the background.
         * @since 1.2.0
         */
        BACKGROUND: 'background',

        /**
         * Callback event automatically triggered when the app transitions to the foreground.
         * @since 1.2.0
         */
        FOREGROUND: 'foreground',

        /**
         * Callback event triggered when the network status changes,
         * such as losing internet connection or switching from Wi-Fi to cellular.
         * @since 1.4.0
         */
        NETWORK_CHANGED: 'networkchanged',

        /**
         * Callback event triggered when the native keyboard is shown.
         * @since 1.4.2
         */
        KEYBOARD_SHOWN: 'keyboardshown',

        /**
         * Callback event triggered when the native keyboard is hidden.
         * @since 1.4.2
         */
        KEYBOARD_HIDDEN: 'keyboardhidden',
      } as const;

      /**
       * Type for reserved event types
       * @since 1.0.2
       * @lastupdated 1.4.2
       */
      export declare type EventType =
        (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

      /**
       * Registers an event listener for the specified event name.
       * @param eventName - The event type to register.
       * @param callback - The callback function to execute when the event is triggered.
       * @since 1.0.2
       */
      function on(eventName: EventType, callback: (params?: any) => void): void;

      /**
       * Unbinds registered event listener for the specified event name.
       * @param eventName - The event type to unregister.
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
     * Namespace for Facebook native features
     * @since 1.4.0
     * @lastupdated 1.4.0
     */
    namespace facebook {
      /**
       * Facebook result from native layer
       * @since 1.4.0
       */
      export declare type FacebookResult = {
        status: 'success' | 'error';
        errorCode?: string;
        message?: string;
      };

      /**
       * Reserved facebook permission types
       * @see {@link https://developers.facebook.com/docs/permissions}
       * @since 1.4.0
       */
      export declare type FacebookPermissionTypes = [
        'email',
        'public_profile',
        'user_friends',
        'user_birthday',
        'user_hometown',
        'user_location',
        'user_photos',
        'user_posts',
        'user_gender',
        'user_link',
        'user_likes',
        'user_events',
        'user_videos',
        'user_tagged_places',
        'user_age_range',
        'user_managed_groups',
        'user_work_history',
        'user_education_history',
        'user_relationships',
        'user_relationship_details',
        'user_friends_relationships',
        'user_pages',
      ];

      /**
       * Facebook permissions
       * @since 1.4.0
       */
      export declare type FacebookPermissions =
        (typeof FacebookPermissionTypes)[string][];

      /**
       * Facebook user data from native layer
       * @since 1.4.0
       */
      export declare type FacebookUserData = {
        email?: string;
        name?: string;
        id?: number;
        first_name?: string;
        last_name?: string;
        [fields: string]: any;
      };

      /**
       * Facebook native social login
       * @since 1.4.0
       */
      function login(
        permissions: FacebookPermissions,
        callback: (
          result: FacebookResult,
          accessToken?: string,
          userId?: string,
          userData?: FacebookUserData
        ) => void
      ): void;

      /**
       * Check whether logged in with Facebook native social login
       * @since 1.4.0
       */
      function isLoggedIn(
        callback: (
          result: FacebookResult,
          isLoggedIn: boolean,
          accessToken?: string,
          userId?: string
        ) => void
      ): void;

      /**
       * @description
       * Requests to get Facebook user data from native layer.
       *
       * Calls callback function with the data.
       * @since 1.4.0
       */
      function getUserData(
        permissions: FacebookPermissions,
        callback: (result: FacebookResult, userData?: FacebookUserData) => void
      ): void;

      /**
       * Facebook native social logout
       * @since 1.4.0
       */
      function logout(): void;
    }

    /**
     * Namespace for Google native features
     * @since 1.5.0
     */
    namespace google {
      /**
       * Google result from native layer
       * @since 1.5.0
       */
      export declare type GoogleResult = {
        /**
         * Whether the Google native feature failed or not.
         */
        status: 'success' | 'error';
        /**
         * Google native feature result status code. 200 when successful.
         */
        statusCode: number;
        /**
         * Google native feature result message when failed.
         */
        message?: string;
      };

      /**
       * Google user data from native layer
       * @since 1.5.0
       */
      export declare type GoogleUserData = {
        uid: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
        phoneNumber?: string;
        isEmailVerified: boolean;
        providerId?: string;
      };

      /**
       * @description
       * Function to authenticate with native Google social login.
       *
       * Calls callback function with the user data value.
       * @since 1.5.0
       */
      function login(
        callback: (
          result: GoogleResult,
          idToken?: string,
          userData?: GoogleUserData
        ) => void
      ): void;

      /**
       * @description
       * Function to check whether authenticated with native Google social login.
       *
       * Calls callback function with the value whether the user is logged in or not.
       * @since 1.5.0
       */
      function isLoggedIn(
        callback: (
          result: GoogleResult,
          isLoggedIn: boolean,
          idToken?: string
        ) => void
      ): void;

      /**
       * @description
       * Function to get Google user data from native layer.
       *
       * Calls callback function with the user data.
       * @since 1.5.0
       */
      function getUserData(
        callback: (result: GoogleResult, userData?: GoogleUserData) => void
      ): void;

      /**
       * @description
       * Function to logout with Google native social features.
       * @since 1.5.0
       */
      function logout(callback: (result: GoogleResult) => void): void;
    }

    /**
     * Namespace for in-app purchase functions
     * @since 1.4.0
     */
    namespace iap {
      /**
       * In app purchase result from native layer
       * @since 1.4.0
       */
      export declare type IapPurchaseResult = {
        purchaseEnv: 'sandbox' | 'production';
        userId: string;
        productId?: string;
        nachoProductId: string;
        purchaseId?: number;
        os: 'android' | 'ios' | null;
        status: {
          success: boolean;
          error?: {
            code?: string;
            message: string;
          };
        };
      };

      /**
       * Initiates a purchase transaction for the specified product.
       * @since 1.4.0
       */
      function purchase(
        productKey: string,
        userId: string,
        callback: (result: IapPurchaseResult) => void
      ): Promise<any>;
    }

    /**
     * Namespace for Kakao native features
     * @since 1.5.0
     */
    namespace kakao {
      /**
       * Kakao result from native layer
       * @since 1.5.0
       */
      export declare type KakaoResult = {
        /**
         * Whether the Kakao native feature failed or not.
         */
        status: 'success' | 'error';
        /**
         * Kakao native feature result status code. 200 when successful.
         */
        statusCode: number;
        /**
         * Kakao native feature result message when failed.
         */
        message?: string;
      };

      /**
       * Kakao login data from native layer.
       *
       * Returned when a user logs in or checks logged in.
       * @since 1.5.0
       */
      export declare type KakaoLoginData = {
        accessToken?: string;
        accessTokenExpiresAt?: Date;
        refreshToken?: string;
        refreshTokenExpiresAt?: Date;
        idToken?: string;
      };

      /**
       * Kakao user data from native layer.
       * @since 1.5.0
       */
      export declare type KakaoUserData = {
        id: number;
        connectedAt?: Date;
        /**
         * Whether profile can be provided under user consent
         */
        profileNeedsAgreement?: boolean;
        /**
         * Whether profile can be provided under user consent
         */
        profileNeedsAgreement?: boolean;
        /**
         * Whether profileNickname can be provided under user consent
         */
        profileNicknameNeedsAgreement?: boolean;
        /**
         * Whether profileImage can be provided under user consent
         */
        profileImageNeedsAgreement?: boolean;
        /**
         * Profile information
         */
        profile?: string;
        /**
         * Whether name can be provided under user consent
         */
        nameNeedsAgreement?: boolean;
        /**
         * Name of Kakao Account
         */
        name?: string;
        /**
         * Whether email can be provided under user consent
         */
        emailNeedsAgreement?: boolean;
        /**
         * Whether email address is valid
         */
        isEmailValid?: boolean;
        /**
         * Whether email address is verified
         */
        isEmailVerified?: boolean;
        /**
         * Representative email of Kakao Account
         */
        email?: string;
        /**
         * Whether age can be provided under user consent
         */
        ageRangeNeedsAgreement?: boolean;
        /**
         * Age range
         */
        ageRange?: unknown;
        /**
         * Whether birthyear can be provided under user consent
         */
        birthyearNeedsAgreement?: boolean;
        /**
         * Birth year in `YYYY` format
         */
        birthyear?: string;
        /**
         * Whether birthday can be provided under user consent
         */
        birthdayNeedsAgreement?: boolean;
        /**
         * Birthday in `MMDD` format
         */
        birthday?: string;
        /**
         * Birthday type
         */
        birthdayType?: unknown;
        /**
         * Whether gender can be provided under user consent
         */
        genderNeedsAgreement?: boolean;
        /**
         * Gender
         */
        gender?: string;
        /**
         * Legal name
         */
        legalName?: string;
        /**
         * Whether legalGender can be provided under user consent
         */
        legalGenderNeedsAgreement?: boolean;
        /**
         * Legal gender
         */
        legalGender?: string;
        /**
         * Whether isKorean can be provided under user consent
         */
        legalBirthDateNeedsAgreement?: boolean;
        /**
         * Legal birth date in yyyyMMDD format
         */
        legalBirthDate?: string;
        /**
         * Whether phoneNumber can be provided under user consent
         */
        phoneNumberNeedsAgreement?: boolean;
        /**
         * Phone number of Kakao Account
         */
        phoneNumber?: string;
        /**
         * Whether consent to isKorean can be provided under user consent
         */
        isKoreanNeedsAgreement?: boolean;
        /**
         * Whether the user is Korean
         */
        isKorean?: boolean;
      };

      /**
       * @description
       * Function to authenticate with native Kakao social login.
       *
       * Calls callback function with the login data value.
       * @since 1.5.0
       */
      function login(
        callback: (result: KakaoResult, loginData?: KakaoLoginData) => void
      ): void;

      /**
       * @description
       * Function to check whether authenticated with native Kakao social login.
       *
       * Calls callback function with the value whether the user is logged in or not.
       * @since 1.5.0
       */
      function isLoggedIn(
        callback: (
          result: KakaoResult,
          isLoggedIn: boolean,
          loginData?: KakaoLoginData
        ) => void
      ): void;

      /**
       * @description
       * Function to get user data from native Kakao features.
       *
       * Calls callback function with the user data.
       * @since 1.5.0
       */
      function getUserData(
        callback: (result: KakaoResult, userData?: KakaoUserData) => void
      ): void;

      /**
       * @description
       * Function to logout Kakao. Unavailable to use `isLoggedIn` and `getUserData` any more.
       *
       * When the user attempts to log in, automatically authorized again
       * with past account info from KakaoTalk.
       * @since 1.5.0
       */
      function logout(callback: (result: KakaoResult) => void): void;

      /**
       * @description
       * Function to completely disconnect Kakao between the account and the app.
       *
       * When the user attempts to log in, must be authorized again
       * from scratch on KakaoTalk, after unlinked.
       * @since 1.5.0
       */
      function unlink(callback: (result: KakaoResult) => void): void;

      /**
       * Native Kakao sharing types
       * @since 1.4.2
       */
      export declare const KAKAO_SHARE_TYPES = {
        CUSTOM: 'custom',
        SCRAP: 'scrap',
      } as const;

      /**
       * Type for native Kakao sharing types
       * @since 1.2.0
       * @lastupdated 1.4.2
       */
      export declare type KakaoShareType =
        (typeof KAKAO_SHARE_TYPES)[keyof typeof KAKAO_SHARE_TYPES];

      /**
       * Native Kakao custom data to send
       * @since 1.2.0
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
       * @since 1.2.0
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
       * Native Kakao share result status codes
       * @since 1.5.0
       */
      export const KAKAO_SHARE_STATUS_CODES = {
        ERROR_JSON_FAILED: 102,
        ERROR_JSON_FAILED_TO_MODEL: 103,
        ERROR_JSON_FAILED_TO_KAKAO_MODEL: 104,
        ERROR_JSON_WRONG_SHARE_TYPE: 105,
        ERROR_JSON_EMPTY_REQUEST_URL: 106,
        ERROR_JSON_EMPTY_TEMPLATE_ID: 108,
        ERROR_KAKAO_FAILED: 199,
        SUCCESS_KAKAO: 200,
        SUCCESS_SAFARI: 201,
      } as const;

      /**
       * Kakao share result status code
       * @since 1.2.0
       * @lastupdated 1.4.2
       */
      export declare type KakaoShareStatusCode =
        (typeof KAKAO_SHARE_STATUS_CODES)[keyof typeof KAKAO_SHARE_STATUS_CODES];

      /**
       * Kakao share result
       * @since 1.2.0
       */
      export declare type KakaoShareResult = {
        status: 'success' | 'error';
        statusCode: KakaoShareStatusCode;
        message?: string;
      };

      /**
       * Send Kakao sharing
       * @param type - Kakao sharing type
       * @param data - Data to send kakao
       * @param callback - Callback function called after sharing kakao
       * @since 1.5.0
       */
      function share(
        type: KakaoShareType,
        data: KakaoShareCustom | KakaoShareScrap,
        callback?: (result: KakaoShareResult) => void
      ): void;
    }

    /**
     * Namespace for functions called from native-side of the application.
     * @since 1.0.0
     * @lastupdated 1.0.3
     */
    namespace native {
      export declare type CallbackResponse = {
        method: string;
        data?: object;
        message?: string;
      };

      /**
       * A placeholder callback function that can be called from the native application.
       * This function should be implemented to handle specific callback from native code.
       */
      function handleCallback(response: CallbackResponse): void;

      /**
       * A collection of named callback functions that can be invoked from native code.
       * Each property of this object can be a function that gets executed in response to a native call.
       */
      const handleCallbacks: {
        [callbackName: string]: (response: any) => void;
      };
    }

    /**
     * Namespace for permission handling
     * @since 1.2.0
     * @lastupdated 1.4.2
     */
    namespace permission {
      /**
       * Native device permission types
       * @since 1.4.2
       * @lastupdated 1.5.0
       */
      export declare const PERMISSION_TYPES = {
        /**
         * Camera usage permission
         * @since 1.4.2
         */
        CAMERA: 'camera',
        /**
         * Location access permission
         * @since 1.4.2
         */
        LOCATION: 'location',
        /**
         * Microphone usage permission
         * @since 1.4.2
         */
        MICROPHONE: 'microphone',
        /**
         * Photo usage permission
         * @since 1.5.0
         */
        PHOTO: 'photo',
        /**
         * Push notification permission
         * @since 1.4.2
         */
        PUSH: 'push',
      } as const;

      /**
       * Type for native device permission types
       * @since 1.2.0
       * @lastupdated 1.4.2
       */
      export declare type PermissionType =
        (typeof PERMISSION_TYPES)[keyof typeof PERMISSION_TYPES];

      /**
       * @description
       * Checks whether the app user grants the specified permission or not.
       *
       * Asks if optional parameter `ask` is set `true`.
       * @since 1.2.0
       */
      function checkPermission(
        option: {
          type: PermissionType;
          ask?: boolean;
        },
        callback?: (granted: boolean) => void
      ): void;
    }

    /**
     * Namespace for preference app storage functions
     * @since 1.2.0
     * @lastupdated 1.4.2
     */
    namespace preference {
      /**
       * @description
       * Deletes the data from native layer's preference area
       * with the specified key.
       * @since 1.3.0
       */
      function deleteData(key: string): void;

      /**
       * @description
       * Retrieves the data with the specified key
       * from native layer's preference area.
       *
       * Calls callback function with selected data.
       * @since 1.2.0
       */
      function getData(key: string, callback: (data: string) => void): void;

      /**
       * @description
       * Sets the data with the specified key
       * into native layer's preference area.
       * @since 1.2.0
       */
      function setData(key: string, data: string): void;

      /**
       * Deletes the custom user id data from native layer's preference area.
       * @since 1.4.2
       */
      function deleteCustomUserId(): void;

      /**
       * @description
       * Retrieves the custom user id data from native layer's preference area.
       *
       * Calls callback function with the result data.
       * @param callback
       * - if `customUserId` is not set yet,
       * parameter `customUserId` has `undefined` type.
       * @example
       * Nachocode.preference.getCustomUserId((status, customUserId) => {
       *   if (status == 'error') {
       *     // failed to get data from native app layer..
       *     console.log('Getting custom user id failed..');
       *     return;
       *   }
       *   if (!customUserId) {
       *     // custom user id not set..
       *     const userId = 'your_user_id';
       *     // set custom user id..
       *     Nachocode.preference.setCustomUserId(userId);
       *   } else {
       *     // `customUserId` exists..
       *     console.log(customUserId);
       *   }
       * });
       * @since 1.4.2
       */
      function getCustomUserId(
        callback: (
          status: 'success' | 'error',
          customUserId: string | undefined
        ) => void
      ): void;

      /**
       * Sets the custom user id data into native layer's preference area.
       * @since 1.4.2
       */
      function setCustomUserId(customUserId: string): void;
    }

    /**
     * Namespace for push notification functions
     * @since 1.0.0
     * @lastupdated 1.4.1
     */
    namespace push {
      /**
       * Options for local push notification
       * @since 1.4.1
       */
      export declare type LocalPushPayload = {
        /**
         * Push notification title
         */
        title: string;
        /**
         * Push notification contents
         */
        content?: string;
        /**
         * Opens up the provided url when clicked
         */
        link?: string;
        /**
         * Uses the app icon as a push icon as default.
         * If `false` provided, uses push icon instead.
         */
        usingAppIcon?: boolean;
        /**
         * Reserves time willing to send the local push notification.
         * If not provided, instantly sends the push notification.
         */
        scheduledTime?: Date;
        /**
         * If provided, sets provided `id` to the local push notification
         */
        id?: number;
      };

      /**
       * Local push result from native layer
       * @since 1.4.1
       */
      export declare type LocalPushResult = {
        /**
         * Whether local push notification reservation was successful or not
         */
        status: 'success' | 'error';
        /**
         * If the reservation fails, returns error code.
         */
        statusCode?: string;
        /**
         * If the reservation fails, returns the reason why.
         */
        message?: string;
        /**
         * If the reservation was successful, returns local notification id.
         * `id` is used for cancel.
         */
        id?: number;
      };

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

      /**
       * Function to reserve local push from native layer.
       * @example
       * Nachocode.push.sendLocalPush({
       *  title: '깜짝 쿠폰 발송!',
       *  content: '지금 바로 앱에서 확인하세요!',
       *  link: 'https://nachocode.io/pricing',
       *  usingAppIcon: false,
       *  scheduleTime: new Date('2025-02-15T10:30:00Z'),
       *  id: 1,
       * });
       * @since 1.4.1
       */
      function sendLocalPush(
        payload: LocalPushPayload,
        callback?: (result: LocalPushResult) => void
      ): void;

      /**
       * Function to cancel scheduled local push from native layer.
       * @param {number} id - scheduled local push notification id
       * @example
       * Nachocode.push.cancelLocalPush(id);
       * @since 1.4.1
       */
      function cancelLocalPush(id: number): void;
    }

    /**
     * Namespace for refresh related functions
     * @since 1.3.0
     * @deprecated This namespace would be removed in `SDK version 1.5.0`
     */
    namespace refresh {
      /**
       * Set whether pull to refresh feature is enabled or not.
       * @since 1.3.0
       * @deprecated This method has been moved to `setting` namespace since `SDK version 1.4.0`
       * Use `Nachocode.setting.setPullToRefresh(enable)` instead.
       */
      function setPullToRefresh(enable: boolean): void;
    }

    /**
     * Namespace for scanner related features
     * @since 1.4.0
     */
    namespace scanner {
      /**
       * Opens QR code scanner.
       * @since 1.4.0
       */
      function openQRCodeScanner(
        option: {
          openDirect: boolean;
          openType?: 'internal' | 'external' | 'main';
        },
        callback?: (data: string, error?: SDKError) => void
      ): void;
    }

    /**
     * Namespace for settings related functions
     * @since 1.4.0
     * @lastupdated 1.4.2
     */
    namespace setting {
      /**
       * Function to open up OS application settings.
       * @since 1.4.2
       */
      function openSetting(): void;

      /**
       * Set whether pull to refresh feature is enabled or not.
       * @since 1.3.0
       * @lastupdated 1.4.0
       */
      function setPullToRefresh(enable: boolean): void;

      /**
       * Set whether zoom support feature is enabled or not.
       * @since 1.4.0
       */
      function setSupportZoom(enable: boolean): void;
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
       * @deprecated This has been moved to `kakao` namespace since `SDK version 1.5.0`
       */
      export declare enum KakaoShareType {
        CUSTOM = 'custom',
        SCRAP = 'scrap',
      }

      /**
       * Native Kakao custom data to send
       * @deprecated This has been moved to `kakao` namespace since `SDK version 1.5.0`
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
       * @deprecated This has been moved to `kakao` namespace since `SDK version 1.5.0`
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
       * @deprecated This has been moved to `kakao` namespace since `SDK version 1.5.0`
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
       * @deprecated This has been moved to `kakao` namespace since `SDK version 1.5.0`
       */
      export declare type KakaoShareResult = {
        status: 'success' | 'error';
        statusCode: KakaoShareStatusCode;
        message?: string;
      };

      /**
       * Send Kakao sharing
       * @param type - Kakao sharing type
       * @param data - Data to send kakao
       * @param callback - Callback function called after sharing kakao
       * @since 1.2.0
       * @deprecated This method has been moved to `kakao` namespace since `SDK version 1.5.0`
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
       * Haptics feedback types
       * @since 1.4.2
       */
      export declare const HAPTICS_TYPES = {
        SUCCESS: 0,
        ERROR: 1,
      } as const;

      /**
       * Type for haptics feedback types
       * @since 1.2.0
       * @lastupdated 1.4.2
       */
      export declare type HapticsType =
        (typeof HAPTICS_TYPES)[keyof typeof HAPTICS_TYPES];

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
       * @description
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
