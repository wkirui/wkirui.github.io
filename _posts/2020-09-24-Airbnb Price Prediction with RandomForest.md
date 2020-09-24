---
layout : default
title : 'Airbnb Price Prediction with RandomForest'
date : '2020-09-24 10:10:00 +0300'
categories: posts
excerpt: 'Can we create a general model to predict the housing prices for a given city? In this analysis, I look at the prices for listings in Berlin Germany and create a model to predict the results.'
---
# <center>Machine Learning using RandomForestRegression</center>
### Introduction
In this project I use Airbnb data to analyze their price distribution and to create a machine learning model that can be used to predict the price of a given listing.
Airbnb data for major cities and towns around the world is publicly available at [Inside Airbnb](http://insideairbnb.com/) project. For this analysis, I work with the data for Berlin, Germany.

#### 1. Overview
First, we download the data from this [link](http://insideairbnb.com/get-the-data.html). The file **listings.csv.gz** has all the data that we need but the other files are also useful for further analysis and visualization.
Once we have the data we need, we can start our exploratory analysis. First, we import the modules and load the data as shown here.
<script src="https://gist.github.com/wkirui/fa6ecf98dd4cb57dacb2676b2b709c21.js"></script>
In the code above, we imported:
- Pandas and Numpy for data processing
- Matplotlib & [Seaborn](https://seaborn.pydata.org/) for visualizing our data
- Train_test_split for spliting our data into sets for training and testing our model
- RandomForestRegressor for creating a regression model. This is a supervised machine learning task and RandomForest is a good candidate for it. Based on the performance of our model in predicting apartment prices, we might also try other algorithms for comparison
- Mean_squared_error for measuring the performance of our model

Let's take a quick look at the shape and overview of our data.<br>
As shown below, we have 20432 listings and 74 columns (features).
![data overview](/assets/img/listings_top_rows.png#center)

#### 2. Data Processing
Let's remove the currency notation from the prices using this function
<script src="https://gist.github.com/wkirui/af998d2711e12cf9687244e493d019c5.js"></script>
Once prices are cleaned up we can look at their distribution
![price summary](/assets/img/airbnb_prices_stats.png)

We can make the following observations:
- The average cost cost of renting an apartment is $68 and the median price is $50
- Prices range from $0 to $8000
- 75% of the listings cost $80 or less per night
- Only 4.98% of the listings cost more than the 95th percentile price ($155)
- Only 0.4% of the listings cost $500 or more

#### 3. Exploratory Data Analysis
Let's plot the price distribution
<script src="https://gist.github.com/wkirui/e32867aceddf89a61428b6823f3ce5f6.js"></script>
![price distribution](/assets/img/airbnb_price_distribution.png) | ![price less than $500](/assets/img/airbnb_prices_less_than_500.png)

- In the second graph we zoom in on apartments that cost less than $500

#### 3.1 Price Comparison
Let's take a look at how some of the features such as distance from the city center, number of bedrooms, room type and neighbourhood affect prices

##### a) Distance from city center
Let's calculate the distance from the city center. For Berlin we will use [Alexendarplatz square](https://en.wikipedia.org/wiki/Alexanderplatz) in Central Mitte District as the center.
Using the following function, we calculate the [Great-circle Distance](https://en.wikipedia.org/wiki/Great-circle_distance#:~:text=The%20great%2Dcircle%20distance%2C%20orthodromic,line%20through%20the%20sphere's%20interior) in kilometers for all the apartment listings using the harvesine formula.
<script src="https://gist.github.com/wkirui/6b2c68f6392c5cde48b495c17d7ac3bd.js"></script>

- Based on the following distribution, we can see that prices generally decrease as you move away from the city center<br>
![price v distance](/assets/img/price_distance_dist.png)

##### b) Number of bedrooms
- One bedrooms apartments are the cheapest on average
- The average prices linearly increases for apartments with 1-5 bedrooms but fluctuates for apartments with 6 or more bedrooms. This could be a sign of anormalies or outliers pricing for apartments with the highest number of bedrooms
![price v bedrooms](/assets/img/price_bedrooms_dist.png)

##### c) Maximum number of guests
- As expected, price increases with the number of guests
![price v guests](/assets/img/price_guest_dist.png)

##### d) Room Type
- It's cheaper if you shared the room with the host
- Hotel rooms are the most expensive on average
![price v room type](/assets/img/price_room_type_dist.png)

##### e) Neighbourhood
- Apartments in Charlottenburg ($81) are the most expensive followed by Mitte boroughs ($71)
- Reinickendorf has the the cheapest apartments
![price v neighbourhood](/assets/img/price_neighbourhood_dist.png)

#### 4. Feature Selection
We have looked at how some of the features affect pices. In this section, we are going to determine which other features in our dataset greatly affect the price of renting an Airbnb apartment.
##### i) Missing Values
First let's check which columns have the highest number of values missing
<script src="https://gist.github.com/wkirui/8b1d62af16ebab2964176e6c67c8723e.js"></script>

This table shows the top ten columns with the highest number of missing values<br>
![missing values table](/assets/img/pct_missing_values.png)
- We have another column named *bathrooms_text* so we shouldn't worry about *bathrooms*
- We have 9 columns with more than 30% values missing. We'll drop these columns
- We also have 14 columns with between 5% and 30% values missing
- For integer columns with missing values, we impute the missing values using the median strategy. In this case, we fill the missing values in a column with the calculated median for that column
- For categorical columns, we will add an 'Uknown' class to the data

##### ii) Feature Importance
Now we need to determine the best features to use in our model. We will use a RandomForestRegressor to fit our feaures and the target variable then we calculate the feature importances. The code below shows how to find important features
<script src="https://gist.github.com/wkirui/f1eebb662469a9eaf6bbd34894582094.js"></script>

Here are the top 15 features
![missing values table](/assets/img/pct_missing_values.png)

#### 5. Model Selection
##### a) Fit the model
Using the top features, we can train our final model. We select top **n** features or we select features whose scores are above a certain threshold then we train several models to compare with the results
As shown below, we selected 50 features to the model
<script src="https://gist.github.com/wkirui/e1fbfebdfc82c2dcbfd421bee5eea0ad.js"></script>

##### b) Make predictions
Once our model is trained, we use it to make predictions
<script src="https://gist.github.com/wkirui/4a2b40e9ae8312aeb8b8285bf7bb708a.js"></script>

- Then we score the performance of our model using both the **mean squared errors** & the **mean absolute error**
- The model returned an R^2 of 5.3% which means it's not doing a great job at explaining the variance in our data
- We also have a RMSE (Root Mean Squared Error) of 147.5 which indicates that in a given prediction, our model is missing the prediction by $147
- Similarly our MAE (Mean Absolute Error) is 25.5
- This model needs further tuning in order to improve our prediction results.

Looking at the results however, we can see that our predicted prices closely match the actual prices. 
![final results prediction](/assets/img/actual_v_predicted_prices.png)

#### Conclusion
In this analysis, we looked at how a RandomForestRegession model performs given a set of features. We definitely need to further tweak the model parameters in order to improve performance. We can also try other regression models like XGBoost for comparison.