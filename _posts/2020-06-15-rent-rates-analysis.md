---
layout : default
title : 'Rent Rates Analysis'
date : '2020-06-15 23:40:00 +0300'
categories: projects
---
### RENT RATES ANALYSIS
In this project I compare rent rates across different towns in Kenya.
The project is split into four parts:
1. **Data Collection :**
One of the first steps in data analysis is to make sure that you have the right data to answer your analysis question. In this analysis we need a table that has rent prices from all major towns for comparison. We are also interested in looking at how this changes with respect to the number of rooms, bedrooms and bathrooms. Is it always the case that apartments with more rooms cost more?
I scrape the data from the web using Selenium which is a great tool for automating data scraping from websites.
2. **Data Cleaning :**
Next I use pandas and numpy libraries in python to clean the data
3. **Data storage :**
Where is the data stored? I believe local csv files will do the job in this case. However I will look at how to store this data in a PostgreSQL database. I will look at how to create data model in a postgresql database and write a csv file into the database. From the database, we can start writing queries to generate summaries and distributions.
4. **Data Visualization :**
The fun part - I will look at trends across major towns. How do prices for instance in Mombasa compare to those in Nairobi? I will use different visualization tools such as matplotlib, seaborn and dash plotly. Dash plotly is a cool tool for generating interractive plots. I will also look at how dash plotly can be intergrated into a flask app for deployment on Heroku.