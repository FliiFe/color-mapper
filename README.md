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

You will need to pictures, the original (black and white) picture, and the colorized (smaller) picture.
Put them inside the `images/` directory, under whatever name you want, then, inside index.html, replace those lines :

```html
<img src="images/original.jpg" id="originalSize" crossOrigin="Anonymous"></img>
<img src="images/colorized.jpg" crossOrigin="Anonymous" id="colorized"></img>
```

and replace the paths to match your pictures, e.g :
```html
<img src="images/cool_picture_without_colors.jpg" id="originalSize" crossOrigin="Anonymous"></img>
<img src="images/cool_picture_with_colors.jpg" crossOrigin="Anonymous" id="colorized"></img>
```

Once done, just open the `index.html` file, click on the **`Start mapping colors`**. You can save the output picture with the **`Save result`** button.
