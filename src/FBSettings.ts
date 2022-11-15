/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import {isDefined, isString} from './util/validate';
import {Platform, NativeModules} from 'react-native';

const Settings = NativeModules.FBSettings;

export default {
  /**
   * For iOS only, get AdvertiserTrackingEnabled status.
   * @platform ios
   */
  getAdvertiserTrackingEnabled(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return Settings.getAdvertiserTrackingEnabled();
    } else {
      return Promise.resolve(true);
    }
  },
  /**
   * For iOS only, set AdvertiserTrackingEnabled status, only works in iOS 14 and above.
   * @platform ios
   */
  setAdvertiserTrackingEnabled(ATE: boolean): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return Settings.setAdvertiserTrackingEnabled(ATE);
    } else {
      return Promise.resolve(false);
    }
  },
  /**
   * Set data processing options
   */
  setDataProcessingOptions(options: Array<string>, ...args: Array<number>) {
    let country = 0;
    if (typeof args[0] === 'number') {
      country = args[0];
    }
    let state = 0;
    if (typeof args[1] === 'number') {
      state = args[1];
    }
    Settings.setDataProcessingOptions(options, country, state);
  },
  /**
   * Initialize the sdk
   */
  initializeSDK() {
    Settings.initializeSDK();
  },
  /**
   * Set the Facebook App ID to be used by the SDK.
   */
  setAppID(appID: string) {
    if (!isDefined(appID) || !isString(appID) || appID.length === 0) {
      throw new Error("setAppID expected 'appID' to be a non empty string");
    }
    Settings.setAppID(appID);
  },
  /**
   * For iOS only, set the app url scheme suffix used by the SDK.
   * @platform ios
   */
   setAppURLSchemeSuffix(appURLSchemeSuffix: string) {
    if (Platform.OS !== 'ios') {
      return;
    }

    if (!isDefined(appURLSchemeSuffix) || !isString(appURLSchemeSuffix) || appURLSchemeSuffix.length === 0) {
      throw new Error("setAppURLSchemeSuffix expected 'appURLSchemeSuffix' to be a non empty string");
    }
    Settings.setAppURLSchemeSuffix(appURLSchemeSuffix);
  },
  /**
   * Sets the Client Token for the Facebook App.
   */
   setClientToken(clientToken: string) {
    if (!isDefined(clientToken) || !isString(clientToken) || clientToken.length === 0) {
      throw new Error("setClientToken expected 'clientToken' to be a non empty string");
    }
    Settings.setClientToken(clientToken);
  },
  /**
   * Set the default Facebook Display Name to be used by the SDK.
   */
   setDisplayName(displayName: string) {
    if (!isDefined(displayName) || !isString(displayName) || displayName.length === 0) {
      throw new Error("setDisplayName expected 'displayName' to be a non empty string");
    }
    Settings.setDisplayName(displayName);
  },
};
