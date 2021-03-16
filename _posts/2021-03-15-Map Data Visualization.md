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
```python
# get pdf file
file_name = 'VOLUME 1 KPHC 2019.pdf'
raw = parser.from_file(file_name)
raw_content = raw['content']
# text sample
sample_index = np.random.randint(0,len(raw_content))
raw_content[sample_index:sample_index+1000]
```
From the pdf document, we can see that our target data are in tables 2.6 and 2.7. We can then use text idexing to find these tables as shown below
```python
household_table_index = raw_content.find('Table 2.6:')
pop_density_table_index = raw_content.find('Table 2.7:')
last_index = raw_content.find("@KNBStats")-400
```
We know that the households table ends where population density table begins. Similarly the population ends before the last index minus extra text added to the end of the document.
```python
household_table_text = raw_content[household_table_index:pop_density_table_index].split('\n')
population_density_table_text = raw_content[pop_density_table_index:last_index].split('\n')
```
Once we have extracted the tables text we can start cleaning them. Lucky for us the tables follow a similar structure and we can apply some tricks such as:
- drop rows that contains header text such as Household, Population or Sq.km
- extract integer values
- extract string values 
- remove spaces and punctuation marks
- replace incorrectly spelled county/sub-county names
- replace any outliers with the correct values

The resulting data is a pandas dataframe that we can merge with the counties shapefile.

#### Shapefiles
The shapefile that I found [here](https://data.humdata.org/dataset/ken-administrative-boundaries) is for Kenya's sub-counties. **Geopandas** has a nice function that we use to combine sub-counties into counties. 
```Python
sub_county_shapefile = gpd.read_file('../sub-counties/ken_admbnda_adm2_iebc_20191031.shp')
counties_shapefile = sub_county_shapefile.dissolve('ADM1_EN') # ADM1_EN is the county name column
```
The resulting shapefile looks good. We can now go ahead and merge the shapefile with our data.

![](/assets/img/ke_counties_map.png)
#### Data analysis

##### 1. Data overview

Below are the summary statistics using the **describe** function in pandas.

![](/assets/img/census_data_summary.png)
- the least populated county has 143920 people while the most populated county has 4397073 people
- there are fewer outliers in average household size than in population density
- the largest county (Marsabit) covers 12% of Kenya's total land area (580,367 sqkm)
- the smallest county (Mombasa) covers 0.04% of Kenya's total land area

##### 2. Population

The graphs below show the population and population density distribution

- there is only one outlier (Nairobi) in the population sizes
- population density has two outliers (Mombasa & Nairobi)

![](/assets/img/county_population.png)![](/assets/img/county_pop_density.png)

The graph below shows the map distribution

![](/assets/img/county_pop_map.png)|![](/assets/img/county_codes.png)

##### 3. Households

The following graphs shows total households and average household sizes across the counties

- there is only one major outlier in the number of households (Nairobi)
- the average household sizes are skewed to the left with majority at the mean

![](/assets/img/county_households.png)![](/assets/img/county_avg_household_size.png)

The following graphs shows distribution of households in counties

![](/assets/img/county_household_size.png)|![](/assets/img/county_codes.png)

##### 4 Households Size & Population Density Interraction

![](/assets/img/county_density_hhsize_interraction.png)|![](/assets/img/county_codes.png)