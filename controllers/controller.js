const { Configuration, OpenAIApi } = require('openai');
const Replicate = require('replicate');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImageDallE = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

const generateImageMidjourney = async (req, res) => {

  const { prompt, size } = req.body;
  const width = size === 'small' ? 256 : size === 'medium' ? 512 : 1024;
  const height = size === 'small' ? 256 : size === 'medium' ? 512 : 1024;

    
  const input = {
    width: width,
    height: height,
    prompt: prompt,
    scheduler: "KLMS",
    num_outputs: 1,
    guidance_scale: 7.5,
    prompt_strength: 0.8,
    num_inference_steps: 50
  };

  try {
    const output = await replicate.run(
      "tstramer/midjourney-diffusion:436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
      {
        input
      }
    );

    console.log(output);  

    res.status(200).json({
      success: true,
      data: output[0],
    });

  } catch (error) {
    console.log(error);
  }
}

const generateImageStableDeffusion = async (req, res) => {

  const { prompt, size } = req.body;
  const width = size === 'small' ? 256 : size === 'medium' ? 512 : 1024;
  const height = size === 'small' ? 256 : size === 'medium' ? 512 : 1024;

  const input = {
    width: width,
    height: height,
    prompt: prompt,
    scheduler: "K_EULER",
    num_outputs: 1,
    guidance_scale: 7.5,
    num_inference_steps: 50
  };

  try {
    const response = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", { input });
    const imageUrl = response[0];

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = { generateImageMidjourney, generateImageDallE, generateImageStableDeffusion };
