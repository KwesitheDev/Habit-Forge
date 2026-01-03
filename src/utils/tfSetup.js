import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

let initialized = false;
export const setupTf = async () => {
  if (initialized) return;
  await tf.ready();
  initialized = true;
  console.log("TensorFlow.js backend:", tf.getBackend());
};
