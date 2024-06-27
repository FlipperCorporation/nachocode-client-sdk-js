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
     */
    function init(apiKey: string, options?: InitializeOptions): void;

    /**
     * Namespace for application specific functions
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
     * Namespace for device specific functions
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
     * Namespace for registered functions called to handle specified events.
     */
    namespace event {
      /**
       * Registers an event listener for the specified event name.
       */
      function on(eventName: string, callback: function): void;
      /**
       * Unbinds registered event listener for the specified event name.
       */
      function off(eventName: string): void;
      /**
       * Registered events
       */
      const callbacks: {
        [eventName: string]: (response: any) => void;
      };
    }

    /**
     * Namespace for push notification functions
     */
    namespace push {
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
     * Namespace for tabbar functions
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
  }
}

export default Nachocode;
