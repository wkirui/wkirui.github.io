---
layout : default
title : 'Map Data Visualization'
date : '2021-03-15 22:00:00 +0300'
categories: posts
excerpt: In this post I visualize map data using Python.
---
### What is the distribution of Kenya's population data?

#### Introduction
In this analysis, I use Kenya's 2019 data to map the distribution of household sizes and population density in Python. The data is published at [Kenya National Bureau of Statistics website.](https://www.knbs.or.ke/?page_id=3142)

#### Data Extraction
The data is shared as a pdf report and we need apply data mining techniques in order to use it. After careful searching I settled for [tika package](https://pypi.org/project/tika/) to parse the document. Tika preserves the file structure when we parse it. 
From the pdf document, we can see that our target data are in tables 2.6 and 2.7. We can then use text idexing to find these tables as shown below
`Python
household_table_index = raw_content.find('Table 2.6:')
pop_density_table_index = raw_content.find('Table 2.7:')
last_index = raw_content.find("@KNBStats")-400
`
We know that the household table ends where population density table begins. Similarly the population ends before the last index minus extra text added to the end of the document.

Once we have extracted the tables we can start cleaning them. Lucky for us the tables follow a similar structure and we can apply some tricks such as:
- drop rows that contains header text such as Household, Population or Sq.km
- extract integer values
- extract string values 
- remove spaces and punctuation marks
- replace incorrectly spelled county/sub-county names
- replace any outliers with the correct values

The resulting data is a pandas dataframe that we can then merge with the shapefile.

#### Shapefiles
The shapefile that I found [here](https://data.humdata.org/dataset/ken-administrative-boundaries) is for Kenya's sub-counties. In order to get the counties shapefile, we need to apply some tricks. **Geopandas** has a nice function that we use to merge sub-counties shapes into their parent counties. 
```Python

```
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
