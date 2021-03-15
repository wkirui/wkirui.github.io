---
layout : default
title : 'Map Data Visualization'
date : '2021-03-15 22:00:00 +0300'
categories: posts
excerpt: In this post I visualize map data using Python.
---
### What is the distribution of Kenya's population data?

#### Introduction
In this analysis, I used Kenya's 2019 data to map the distribution of household sizes and population density using Python. The data is published at [Kenya National Bereau of Statistics website.](https://www.knbs.or.ke/?page_id=3142)

#### Data Extraction
The data is available in a pdf format and we need to extract the data in order to use it. After careful searching I settled for tika package to read the document.
Using text extraction techniques, we can now look for the tables that we need to extract the data that we  need to see. 
We also need to do a bit of data cleaning in order to separate the county and sub-county data. 
Once the data is clean, we can now use the shapefile to merge the data. Looking at

#### Shapefiles
The shapefile I found was split into sub-counties. In order to clean the data, we need to apply some tricks. Geopandas has a neat trick that combines the different shapes based on a given column. We dissolve the shapefile using the data given.
Dissolving the subcounties into counties makes it possible to now go ahead and merge the shapefile with out data. 

#### Data analysis
We merge the data using pandas functions. The resulting dataframe is a geopandas dataframe that has both household size and population size.
Using this data, we can go ahead and start the analysis.
##### 1. Population overview
We generate the summary statistics for the population and household sizes as shown below.

With the data in place, we can create a summary of the counties with the highest number of people. The graph below shows the top 10 counties.
We also add the bottom population numbers by county as shown below

#### Map Visualization
We then use geopandas to plot the data as shown below. The graph makes it easy to visualize the data and identify how the distribution looks accross counties.

We also see the interraction between household size and population density as shown below. 
