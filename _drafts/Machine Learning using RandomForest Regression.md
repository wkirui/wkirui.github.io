## Introduction
I this project I use Airbnb data to analyze their prices distribution and to create a machine learning model that can be used to predict the price of a given listing.
Airbnb data for major cities and towns is available in the [Inside Airbnb](http://insideairbnb.com/) project. For this analysis, I work with the data for Berlin, Germany.
#### 1. Data Processing
First, we download the data from this [link](http://insideairbnb.com/get-the-data.html). The file **listings.csv.gz** has all the data that we need but the other files are also useful for further analysis and visualization.
Once we have the data we need, we can start our exploratory analysis. First, we import the modules and load the data as shown here.
<script src="https://gist.github.com/wkirui/fa6ecf98dd4cb57dacb2676b2b709c21.js"></script>
In the code above, we import:
- Pandas and Numpy for data processing
- Matplotlib for visualizing our data. [Seaborn](https://seaborn.pydata.org/) is also a great alternative here
- train_test_split for spliting our data into sets for training and testing our model
- RandomForestRegressor for creating a regression model. This is a supervised machine learning task and RandomForest is a good candidate for it. Based on the performance of our model in predicting apartment prices, we might also try other algorithms for comparison
- Mean_squared_error for measuring the performance of our model

Let's take a quick look at the shape and overview of our data. As shown below, we have 20432 listings and 74 columns (features). The first few rows are also shown
![Data Overview](/assets/img/listings_top_rows.png#center)

For instance with this model, one visiting Berlin might have a good sense of the prices in the given borough or residents can also use the algorithm to optimize performance.

## Data Cleaning
## Data Visualization
## Feature Selection
## Model Selection
## Hyperparameter Tuning
## Conclusion
In this analysis, we looked at how our model performs given a set of features. Now we can perform further tweaks by adjusting the features as well as changing the algorithm performance. We can trying using XGBoost to see how the model performs or use other regression techniques. I will also be using PCA analysis to reduce the dimensionality of the data and make the model more generalizable.
