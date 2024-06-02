function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#dalle').src = '';
  document.querySelector('#stable-deffusion').src = '';
  document.querySelector('#midjourney').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageDalle(prompt, size);
  generateImageStableDeffusion(prompt, size);
  generateImageMidjourney(prompt, size);
}

async function generateImageDalle(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/generateimage/dall-e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      removeSpinner();
      console.log(data)
      throw new Error('That image could not be generated');
    }
    const imageUrl = data.data;

    document.querySelector('#dalle').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('#dalle-msg').textContent = error;
  }
}


async function generateImageStableDeffusion(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/generateimage/stable-deffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      removeSpinner();
      console.log(data)
      throw new Error('That image could not be generated');
    }
    const imageUrl = data.data;

    document.querySelector('#stable-deffusion').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('#stable-deffusion-msg').textContent = error;
  }
}

async function generateImageMidjourney(prompt, size) {
  try {
    showSpinner();

    const response = await fetch('/generateimage/midjourney', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      removeSpinner();
      console.log(data)
      throw new Error('That image could not be generated');
    }
    const imageUrl = data.data;

    document.querySelector('#midjourney').src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector('#midjourney-msg').textContent = error;
  }
}


function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
