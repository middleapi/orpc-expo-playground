// Custom entry: globals must be patched before expo-router pulls in any app module.
import './utils/polyfills';

import 'expo-router/entry';
