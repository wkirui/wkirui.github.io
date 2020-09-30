---
layout : default
title : 'Deploying A Machine Learning Model Using Streamlit & Heroku'
date : '2020-09-30 22:30:00 +0300'
categories: posts
excerpt: We have trained a machine learning model and created an app where everyone can play around with the data and make a few predictions with it. How do we make this app available on the web? In this article I look at how a streamlit app can be deployed on Heroku.
---
# <center>Deploying a Streamlit App</center>

### Introduction
In the last article, we created a RandomForest Regression model that can be used to predict Airbnb apartment prices. The next natural step after creating a machine learning model is to share the results as well as the model with the users. Here is the [link](https://rf-price-prediction.herokuapp.com/) to my app on Heroku.

Let's look at some of the quick steps on how to deploy a model on Heroku.

#### 1. Overview
[Streamlit](https://www.streamlit.io/) is an open source tool for building and deploying data application. It makes sharing of prototypes and analysis results very easy. To get started, follow the documentation [here](https://docs.streamlit.io/en/stable/).

#### 2. Initialize Git
The first step is to create a git repository in your working directory. The working directory could have the following files:
- app.py - python code with the analysis & predictions
- requirements.txt - a text file containing all the installed packages/modules
- env - a virtual environment for your project
- .gitignore - a git file with files to ignore
- trained_models/ (optional) - a folder to store your trained models/prediction results

#### 3. Create Procfile & Setup.sh
Create a ***Procfile*** in your working directory add the following code

```
web: sh setup.sh && streamlit run <app.py>
```

Create a set.sh file and add the following code
<script src="https://gist.github.com/wkirui/f89a96b027e71b992dcb5e59e61eb98f.js"></script>

To track all the files, add them to git using **git add .** and then use **git commit -m 'commit message'** to commit the changes.

#### 4. Login to Heroku
If you don't have an account yet, go to [Heroku](https://dashboard.heroku.com/) and create one. It's free for limited number of apps as well as storage.
Follow the [documentation guide](https://devcenter.heroku.com/articles/heroku-cli) to setup a Command Line Interface(CLI) that makes it easy to manage apps from the terminal.

Once setup, login into heroku using

```
heroku login
```
This will open a browser window to login into your account.

#### 5. Create an App
Use the following code to create an ap. This will assign a random name by default which you can change later.
```
heroku create
```
To commit changes, use
```
git push heroku master
```
This will prepare all the files for deployment and compresses any large files in your working directory. If all goes well, you should see **deployed successfully** in your terminal.

Your app is up and running. Run the following code  to ensure that you app has enough bandwith.

```
heroku ps:scale web=1
```
To view you app, type **heroku open**

To rename the app, use **heroku apps:rename new_app_name**. If you are using the repository for more than one app, use **heroku apps:rename --app old_name new_name**

Note:
- If you're getting version errors during deployment, change the version of the package to the latest one provided in the terminal
- There is a usage limit of 500MB. The app should have enough RAM in order to run, so make sure that the total file size is way below the limit.

That's it! Happy Learning.