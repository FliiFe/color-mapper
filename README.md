# color-mapper
Map colors from a small picture on a bigger black and white version of it.

A demo is available [here](https://colormapper.firebaseapp.com/).

If you want to run it locally, clone the repo and double click on index.html.

## Why ?

This was created because of [this reddit post](https://www.reddit.com/r/deepdream/comments/4ler8e/automatic_bw_image_colorization_via_neural/).
The colorization process works, but the output image is often small, thus of bad quality. Since the chrominance (color data, as opposite to luminance) is 
seen with lower acuity than the luminance ("brightness"), we can safely map colors onto a bigger picture without worrying about
colors not matching exactly the picture.

## Usage

Open the `index.html` file, choose the original and colorized pictures, and click on the **`Start mapping colors`**. You can save the output picture with the **`Save result`** button.
