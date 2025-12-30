import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

export const setupTf = async () => {
  await tf.ready();
  //test if tf works
  console.log("TensorFlow.js is ready", tf.getBackend());
};
