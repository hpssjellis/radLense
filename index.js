// import leftPad from './leftpad';

// const serNos = [6934, 23111, 23114, 1001, 211161];
// const strSNos = serNos.map(sn => leftPad(sn, 8, '0'));
// console.log(strSNos);


import * as tf from '@tensorflow/tfjs';
import {
  Webcam
} from './tensorcam';
import {
  loadFrozenModel
} from '@tensorflow/tfjs-converter';




//to instantiate a new webcam tensorcam
const webcam = new Webcam(document.getElementById('#videoElement'));

console.log('hello world');

// loading the model

async function runMod() {
  console.log('before load');

  const MODEL_URL = "/model/tensorflowjs_model.pb";
  const WEIGHTS_URL = "/model/weights_manifest.json";


  console.log(MODEL_URL);

  console.log(WEIGHTS_URL);



  console.log('before loadFrozenModel');

  const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);


  console.log(model);

  // const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL)};
  // {const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL)}catch(error){console.log(err)};


  console.log('before predict');

  let isPredictingm = true;

  //THE LOOP FOR LOGGIN PREDICTIONS
  while (isPredicting) {
    const predictedClass = tf.tidy(() => {
      const img = webcam.capture();
      //   const activation = mobilenet.predict(img);
      //   const predictions = model.predict(activation);
      const predictions = model.predict(img);
      return predictions.as1D().argMax();

    });

    // console.log(predictedClass);

    const classId = (await predictedClass.data())[0];

    console.log(classId);
    // ui.predictClass(classId);
    await tf.nextFrame();

    // console.log('while predicting after load');

  }


  // const cat = document.getElementById('cat');
  // model.execute({input: tf.fromPixels(cat)});


}

runMod();
