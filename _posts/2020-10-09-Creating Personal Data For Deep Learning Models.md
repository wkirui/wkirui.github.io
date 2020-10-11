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

Using google images, the process is quite straight forward. You search for the categories you want to perform deep learning on. Then scroll down the browser window until you have a good number of images to play around with. In order to download the images, right click on the browser and select inspect or command+option+I in Mac. This opens up the inspect tool of your browser and you can enter the code below to download the images. 

```python
urls=Array.from(document.querySelectorAll('.rg_i')).map(el=> el.hasAttribute('data-src')?el.getAttribute('data-src'):el.getAttribute('data-iurl'));
window.open('data:text/csv;charset=utf-8,' + escape(urls.join('\n')));
```

For this analysis, we created the categories for maize and beans farming. Suppose we want to know which of the farmers planted which type of crops. Working in rural setting it's not unheard of farmer a farmer to receive inputs for one crop and plant another crop. This could be either due to fraud or they are not quite confident with the conditions of the planting season. Some farmers have a gut feeling on when they should plant. So if a farmer had received inputs for maize to plant in say September and they feel that the crop will do well if they planting in January, a farmer can plant a short-term crop in order to remain in compliance. This ofcourse means they are compliant and will be submitting photos of the crop that they just planted. Then plant maize later in January. Technically such a farmer is not committing fraud but the risk of adverse weather effects might ruin their potential harvest. This could lead to further default down the road.
In other instance, suppose a farmer wants to use their crops to secure a loan. In order to try this, you have to create some confidence level on how much to trust the performance of the crop. This can open another line of credit for the farmer that they can use while they are expecting the crops to mature. This is actually an interesting idea. In this instance, you can estimate crop health and sort of rate the perfomance in a scale say 9/10 and above means the crop will do well. This will make it possible for a farmer to engage in farming as a business.
