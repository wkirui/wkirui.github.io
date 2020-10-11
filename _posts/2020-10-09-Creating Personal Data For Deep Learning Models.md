---
layout : default
title : 'Creating Personal Data For Deep Learning Models'
date : '2020-10-09 20:00:00 +0300'
categories: posts
excerpt: 'Deep Learning is an exciting field in machine learning. Through deep learning, data scientists have access to a variety of tools to play around with datasets and to test different hypotheses. For instance if we wanted to quickly create  deep learning model to classify car types, we will first search online for any publicly available datasets such as [Standford's cars dataset](https://ai.stanford.edu/~jkrause/cars/car_dataset.html#:~:text=Overview,or%202012%20BMW%20M3%20coupe.). However if you are working on an edge case problem you won't have readily available dataset for easy download. In this article, I look at one of the ways to generate data for your deep learning projects'
---
# <center>Creating Personal Data for Deep Learning</center>

### Introduction
I am taking the FastAi course [Practical Deep Learning for Coders Course](https://course19.fast.ai/) and I learned about this method of using google images for deep learning. I like to create personal projects to explore different ideas. I always enjoy using different datasets to answer specific questions and learn about a given topic. My career experience so far has been working in some way with small scale farmers in rural parts of Kenya and I was particularly interested in how deep learning can be applied to solve some of the challenges experienced during data collection from the field.

#### 1. Problem Definition
Most of the startups in Kenya in one way or another collect data from the field in order to track the progres of their projects. Most of the small scale farmers would either plant trees or subsistence crops such as maize and beans. To track crop growth progress, the field team would visit the shamba (farm) and take measurements such as crop height, shamba size and shamba GPS points. They could also take pictures of crops on the farm as well as any pests and dieseases. For instance, an outbreak of [Maize Lethal Necrosis Disease (MLN)](https://www.tandfonline.com/doi/full/10.1080/23311932.2019.1705746) in major maize (corn) producing regions in Kenya such as Rift Valley & Western could threaten production. A company working with farmers in any of these regions will have to deploy quick and surgical intervention methods that will help farmers mitigate the losses from such an outbreak.
Photos can also be used to estimate crop growth rates across different regions in order to calculate production estimates.

#### 2. Data Generation
In this analysis, we will create a deep learning model to determin the type of crop that a farmer planted on the farm. Suppose we're working in a region that has potential to grow maize and beans well and we are a startup company that supplies maize inputs such as seeds and fertilizer to farmers in this region. Each planting season we drive around with a truck delivering inputs to farmers and a few weeks after deliveries our field team visits them to make sure that they have followed planting guidelines and to take photos of their shambas.
As data scientists on the team we propose that we can use deep learning to confirm whether the farmers actually planted the maize that we delivered. 
Since we do not yet have any photos in our database, we are going to use google images to create a prototype model that we can share with the management. 
We search for **maize farming in Kenya** as shown here
![](/assets/img/maize_search_ke.png "maize search image")

Then we scroll down the browser window until we have a good number of images to play around with. In order to download the images, right click on the browser and select inspect or command+option+I in Mac if using chrome. Then copy and paste the following code in the console and press enter. This will create a csv file with urls for the loaded images in a pop up window. Please note you might have to disable adblock for the download to work. Then repeat the same process for beans farming.

```javascript
urls=Array.from(document.querySelectorAll('.rg_i')).map(el=> el.hasAttribute('data-src')?el.getAttribute('data-src'):el.getAttribute('data-iurl'));
window.open('data:text/csv;charset=utf-8,' + escape(urls.join('\n')));
```
Next, we upload the csv files to the same working directory as our python code in google colab and use the code below to create folders to store our images. The files **maize.csv** and **beans.csv** contain urls from our google image search.
<script src="https://gist.github.com/wkirui/ccd63ce48d9b7982c41967aecb7bc589.js"></script>

We can now train our deep learning model using fastai's learner library which provides a nice and easy to use wrapper for [Pytorch](https://pytorch.org/) library for machine learning.
The following code shows how we train our convolutional neural network (cnn) using fastai. 
<script src="https://gist.github.com/wkirui/35827917bbdd24f86b59bd8ede002d7d.js"></script>
Running the code above, we get a model accuacy of 72% as shown below
![](/assets/img/crop_model_results_v1.png "crop model v1")

Our model accuracy of 72% is probably not strong enough to convince management that we have a good handle on detecting fraud cases on the farms. 
The management knows that there are some edge cases where a farmer received the correct inputs but failed to plant because of one reason or another. Examples: 
- The farmer has a strong believe that the planting season is not right and will have to wait a bit longer. They believe that by planting a short term crop now they will be ready to plant maize at harvest.
- The farmer already had another crop on the shamba such as beans that they will have to harvest first before planting

Lucky for us, fastai has a nice [image cleaner](https://fastai1.fast.ai/widgets.image_cleaner.html) that we can use to delete those images that our model wasn't sure about.
<script src="https://gist.github.com/wkirui/f04387342963bffe0d5603d8032ba433.js"></script>

Once we remove any images we do not want, our model accuracry increased to 78%.