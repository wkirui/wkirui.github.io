---
layout : default
title : 'Creating Personal Data For Deep Learning Models'
date : '2020-10-09 20:00:00 +0300'
categories: posts
excerpt: 'Deep Learning is an exciting field in machine learning. There are a variety of models that you can use to train your model and to make predictions on your data. As an experimental scientist, you always want to play around with different ideas and test the performance of your model. Suppose for instance we want to quickly check if a model can classify well some types of car models. Suppose you want to create a model to quickly detect different car models. In some instances, the data is not readily available and you have to extract data online. In this article I look at a way to create personal data for machine learning'
---
# <center>Creating Personal Data for Deep Learning</center>

### Introduction
I am taking the FastAi course [Practical Deep Learning for Coders Course](https://course19.fast.ai/) and I learned about this method of how to generate google images for deep learning models. I like to create personal projects to explore different ideas. I always enjoy using different datasets to answer specific questions and learn about a given topic. My career background so far has been working in some way with small scale farmers in rural parts of Kenya and I was thinking of how deep learning can be applied to solve some of the challenges experienced in the field.

#### 1. Problem Definition
Most of the startups in Kenya in one way or another collect data to track the progres of their projects. For instance working with small scale farmers who deal in Forestry or agricultural farming like planting subsistence crops such as maize and beans. Some of the events to track usually in one way or another involves a team working in the field to visit the different farmers in the field and they collect different types of measurements that involve the farmers. For instance, you could collect data for how fast the crops are growing in a different region or they kind of pests affecting the crops. When the data is submitted, the team in the office will review the data and makes the necessary flags. Either to accept the said photos or request for clearer photos. On other instances, you could take pictures to estimate the performance of other trees in different regions and to classify them accordingly. For instance a company working with maize farming could deploy a deep learning model to assess crop performance in different regions that they work in.
Suppose you want to automate the process? This way you can offer realtime advice to farmers for performance intervention

#### 2. Data Generation
Using google images, the process is quite straight forward. You search for the categories you want to perform deep learning on. Then scroll down the browser window until you have a good number of images to play around with. In order to download the images, right click on the browser and select inspect or command+option+I in Mac. This opens up the inspect tool of your browser and you can enter the code below to download the images. 

```python
urls=Array.from(document.querySelectorAll('.rg_i')).map(el=> el.hasAttribute('data-src')?el.getAttribute('data-src'):el.getAttribute('data-iurl'));
window.open('data:text/csv;charset=utf-8,' + escape(urls.join('\n')));
```