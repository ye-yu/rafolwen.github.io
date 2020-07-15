Minecraft Skin Analysis
---
The complete notebook can be found in my kaggle notebook [for image clustering][1] and [for image deduplication][2].

I found an interesting dataset of which contains 7800+ files of Minecraft skin. Minecraft skin file is a file for rendering the skin of a player, which is customisable in Minecraft account configuration. These images are probably pulled from an online skin drawing application, which users can use to design and visualise their skin before setting it as their skin in Minecraft setting.

To briefly introduce, Minecraft skin feature has changed since version 1.8. Unlike version 1.8 and later, skins before version 1.8 has mirrored limbs; that is, the left arm texture is the same the right arm, and likewise for the leg. These can be easily converted to version 1.8 by expanding the skin file and just copying the limb sprites.

---

![Skin after 1.8 in 64x64](thumbnail.jpg) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![Skin before 1.8 in 64x32](1.png)

_Skin after vs before 1.8 in 64x64 and 64x32 respectively_

---

I created `ImageCapture` class to crop out part of the image based on the given x & y coords with width and height in pixels. `Translator` class is an extension of `ImageCapture` for copying from a part of a source image into another destination image. This is useful for converting 64x32 skin into 64x64 skin file by copying the limbs as separate components. `MinecraftSkin` class implements this by utilising `ImageCapture` and  `Translator` class that I made. (related [code snippet][3])

# Feature Engineering

For clustering the files, I used the RGB and HSV histogram feature as a similarity measure. However, during the duration of converting the whole dataset to histogram features, I found out that there are only around 5000 valid images that can be derived into their histogram feature. In addition, I omitted the skin that does not have an alpha channel because the majority of the skins have an alpha channel.

# Clustering

I started with 5 clusters using K-Means clustering and found out that there are two performing cluster while the other is inconclusive. In one of the clusters, black feature is dominant in each member. In another cluster, each member has plain and gradient feature in their skin texture. Although the rest is inconclusive, they can be regrouped as one cluster to represent high-contrast skin.

---

![Group 1 that has plain feature](group1.png)

_Group 1: plain feature_

![Group 1 that has plain feature](group2.png)

_Group 1: dark feature_

![Group 1 that has plain feature](group3.png)

_The rest of the group: High contrast feature_

---


The output of the clustering gave me a hint of the feature extraction quality. Since there are three performing clusters, I can conclude that the feature that I selected is can be used for similarity metric.

# De-duplicating skins

Deduplication can be done by grouping images that is below the threshold of difference. To speed up the comparison process, we can use kNN algorithm to find the nearest neighbours and iterate from the first neighbour until we reach the neighbour that exceeds the threshold of difference. After grouping similar images, I found out that there are only about 3000 unique skins.

---

![Similar skins](similarskins.png)

_The first 16 skins (below) that is similar to the given image (above)_

---


# Skin suggestion design

Now that duplicated skins are removed, a skin suggestion application from a given skin can be built by using kNN from the histogram feature. Although the suggested skins are similar, the skins are limited to those in the available dataset only.



[1]: https://www.kaggle.com/yedata/minecraft-skin-analysis
[2]: https://www.kaggle.com/yedata/minecraft-skin-analysis-knn
[3]: https://gist.github.com/ye-yu/1f8e5eaa4a6d162d3ee11354c83fe910
