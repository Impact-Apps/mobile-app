/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {axiosInstall} from "./axios";
axiosInstall()
AppRegistry.registerComponent(appName, () => App);
