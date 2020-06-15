---
layout : post
title : 'Rent Rates Analysis'
date : '2020-06-11 00:37:00 +0300'
categories: projects

---

### RENT RATES ANALYSIS
##### **An analysis of rent prices across different towns in Kenya**
In this project I look how rent rates compare across different towns in Kenya.
I will look at:
1. **Data Collection :**
The data is collected through online webscraping. I will be using Selenium in python
2. **Data Cleaning :**
I use pandas and numpy libraries in python to clean the data
3. **Data storage :**
Where will is this data stored? I believe local csv files will do the job. However I will explore how this will look like in PostgreSQL database. This will be a good opportunity to try explore how to write data into the database as well as how to get data from the database in order to generate summaries or load them back to python for visualization
4. **Data Visualization :**
The fun part - I look at trends across major towns. How do prices  for instance in Mombasa compare to those in Nairobi. I will use different visualization tools such as matplotlib, seaborn and dash plotly. Dash plotly is a cool tool that we can use to connect to Flask in order to generate interractive plots. This way we can deploy the visualization app through Heroku.