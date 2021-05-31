---
seotitle: Wage Inequalities and the Rise in Returns to Skill
title: "Ricardo Rowoldt: Wage Inequalities and the Rise in Returns to Skill"
description: Project in Labor Economics, winter term 2020
author: Ricardo Rowoldt
type: post # Definiert das Layoutformat, Standard ist post.
updated: 2021-04-23T13:23:00+00:00 # Das Update-Datum setzt der Lehrstuhl, bitte nicht ausfüllen.
headerimage: # Bild, welches im Kopfbereich der Seite gezeigt wird.
sitemap:
  lastmod: 2021-04-25T20:35:00+00:00  # Das Lastmod-Datum setzt der Lehrstuhl, bitte nicht ausfüllen.
url: /rowoldt-wage-skill/ # Die URL wird durch den Lehrstuhl erstellt, bitte nicht aufüllen.
tags: # Tags werden durch den lehrstuhl vergeben, bitte nicht ausfüllen.
    - project work
    - inequality
    - wage
    - labor economics
    - Student Master
---

# Project in Labor Economics, winter term 2020/21

### Summary
The paper “Wage Inequalities and the Rise in Returns to Skill” by Juhn, C., Murphy, K. M. and Pierce, B. (1993) states that the majority of the wage inequalities, that can be observed on the labor market, can be explained by differences in the qualifications of workers. Therefore, they analyzed data from the "Current Population Survey (CPS)" between the years 1963 - 1989. In that context they focussed on log hourly and weekly wages of full time workers between the age of 18 and 65. Further the researchers define the ninetieth percentile of the wage distributions as the most skilled workers and the tenth percentile of the wage distribution as the least skilled workers. Subsequently, they analyze the development of the real average wages between those groups of workers. Juhn, C., Murphy, K. M. and Pierce, B. (1993) provide evidence that the “skill-premium” has risen substantially over the considered period of time.

## Original paper
The original paper by Juhn, C., Murphy, K. M. and Pierce, B. (1993) examined the development of wage inequalities between the most and least skilled workers on the labor market. Consequently, they investigated the development of real average wages between the years 1963 - 1989 using data from the "Current Population Survey (CPS)" for males.

### Results
Between 1963 and 1989 the average weekly wage of working men rose by approximately 20 percent. However, those real wage gains were not equally distributed across all workers. While the wages for the least skilled workers declined by about 5 percent, the wages for the most skilled skyrocketed by about 40 percent. This divergence in earnings between the most and least skilled workers results in a significant increase in wage inequality.

## Further Literature
Juhn, C., Murphy, K. M. and Pierce, B. (1993) findings are broadly consistent with the findings of previous research, e.g., Bluestone and Harrison (1988), Levy (1989), or many of the studies cited in Sawhill (1988). Although, Lee (1999), Card and DiNardo (2002), Lemieux (2006) assume that the sharp increase of inequality in the 1980s can be predominantly explained by a decrease in the real value of the minimum wage and by the unobservable components of “skill”.
On the other hand Katz & Autor (1999) and Juhn, Murphy & Pierce (1993) and Autor, Katz & Kearney (2008) presented evidence that the increase of inequality can be traced back to a relative increase in the demand for skilled workers which is driven by a combination of increased international trade and technological change.

## Own Research
Following the approach of Juhn, C., Murphy, K. M. and Pierce, B. (1993) this project investigates the development of wage inequalities and the rise in returns to skill.

### Data
For this purpose CPS data from IPUMS (https://cps.ipums.org/cps/) is used. The sample contains monthly data from 2000 to 2020 including females and males between the age of 18-65 with 35 or more hours worked per week and a minimum wage of $ 7,25. Excluded are voluntary services and self-employed workers. Furthermore, the definition of the most and least skilled workers is based on the original paper. To facilitate a broader perspective women are included in the sample. In addition, the “CPI-U multiplier” is used to enable comparability, hence prices are expressed in constant dollars of the year 2000.

### Regression
To review the findings of Juhn, C., Murphy, K. M. and Pierce, B. (1993) and to receive a general intuition for the selected data a regression is conducted. Therefore variables such as the age, gender and the level of education are included. For this purpose earlier mentioned variables are generated and recoded.

Stata-Code:
```Stata
gen deflate_hourwage = hourwage*cpi
drop if deflate_hourwage == 99

gen college = 0
replace college = 1 if educ > 92
replace college = .m if educ == 1

label define college 0 "no college" 1 "College degree or higher"
label list college
label values college college

gen highschool_n_l = 0

replace highschool_n_l = 1 if educ <= 73
replace highschool_n_l = .m if educ == 1

label define highschool_n_l 0 "no highschool or lower" 1 "Highschool degree or lower"
label list highschool_n_l

label values highschool_n_l highschool_n_l

recode sex (2=0), gen(Male)

regress deflate_hourwage college highschool_n_l male age  
```
The regression yields

![Regression Table](/assets/images/seminar/rowoldt/Tabelle1.png)

Similar to Juhn, C., Murphy, K. M. and Pierce, B. (1993) findings these results imply a strong positive relation between the hourly wage and the level of education. With a significant negative effect on hourly wages for workers with a high school degree or lower and an even stronger positive effect for workers with a college degree or higher. Additionally, it can be shown that gender has a significant effect on the hourly wage.

In the selected sample men receive a higher hourly wage. But this could possibly be related to sector specific characteristics and is content of further research. Those results indicate an increasing income inequality driven by a rise in the “skill-premium”. Furthermore, it is essential to differentiate between a general increase in inequality and an increase in the “skill-premium”. In the 1960s the return of education rose substantially, meanwhile the general inequality remained on a relatively steady level. But between the 1970s and the 1980s disparity increased significantly. Those developments have to be considered as different economic phenomenons. To facilitate a further perspective on the development of wage inequalities and the rise in returns to skill, a graphical analysis is conducted.

### Graphical Analysis
Based on Juhn, C., Murphy, K. M. and Pierce, B. (1993) graphical analysis the tenth and ninetieth percentile of the real weekly income have to be considered. Moreover, the average weekly income has to be included. For ease of comparison, the weekly income of those three groups is indexed to an average of 100 in the year 2000. Firstly the variable d_earnweek is generated by using the “CPI-U multiplier” to express prices in constant dollars of the year 2000. Then the variables hqw (most skilled workers) and lqw (lowest skilled workers) with the previously described percentiles are generated. Subsequently, means of these variables are calculated and sorted by years. Following this, the means of those three groups are indexed and plotted.

Stata-Code:
```Stata
sort year

gen d_earnweek = earnweek*cpi
gen hqw = d_earnweek if d_earnweek >=982.66
gen lqw = d_earnweek if d_earnweek <=291.72

bysort year: egen mean_earnweek = mean(d_earnweek)
bysort year: egen mean_hqw = mean(hqw)
bysort year: egen mean_lqw = mean(lqw)

gen byte baseyear = 1 if year == 2000
gen index_m_hqw = 100 * mean_hqw / mean_hqw[1]
gen index_m_hqw = 100 * mean_hqw / mean_hqw[1]
gen index_m_lqw = 100 * mean_lqw / mean_lqw[1]
gen index_d_earnweek = 100 * mean_earnweek/ mean_earnweek[1]

line index_m_hqw index_m_lqw index_d_earnweek year
```

This yields the following graph:

![Graph](/assets/images/seminar/rowoldt/Figure1.png)

The results of the graphical analysis is broadly consistent with the findings of Juhn, C., Murphy, K. M. and Pierce, B. (1993). Now as before trends in the direction of increasing divergence of income are visible, yet observed effects are not as strong as in the 1960s. Deeply interesting is that the weekly income of the “most skilled workers” seems to have stabilized after the year 2010. However, those workers appear to be the only group with real weekly income growths. After 2015 a slight uptrend for the lesser qualified workers is becoming seeable.
Nevertheless, the most and least skilled workers are exposed to different labor market risks. Especially with regard to technical change and increasing international trade, which tends to increase the demand for qualified workers in highly industrialized countries, a rising “skill-premium” seems to be unavoidable. In addition, unobservable components of “skill”, such as the quality of education or the intrinsic motivation etc., may explain the increasing polarization of the labor market.

## Conclusion
Comparing Juhn, C., Murphy, K. M. and Pierce, B. (1993) results with the implications from the monthly CPS data from 2000 to 2020 reveal similar trends where effects tend to be smaller. Increasing international trade, especially with emerging economies which tend to use low qualified workers intensively, might have caused the less favorable position of the lower qualified workers in industrialized countries. It should be added that the explanatory power of the unobservable components of “skill” are hard to assess and therefore should be investigated more intensively. Additionally, changes in the composition of the working population and different patterns within the employment can be observed.
The wage formation is a complex process which results from institutional circumstances and a variety of additional factors, thus a preferably broad spectrum of possible determinants and their intensities is essential for an understanding of this development to its full extent. Therefore, ongoing research in this context is necessary.  

## Literature
- Autor, D. H., Katz, L. F. and Kearney, M. S. (2008). Trends in U.S. Wage Inequality: Revising the Revisionists. Review of Economics and Statistics, 90(2), 300–323.<br> [https://doi.org/10.1162/rest.90.2.300](https://doi.org/10.1162/rest.90.2.300)

- Card, D. and DiNardo, J. E. (2002). Skill‐Biased Technological Change and Rising Wage Inequality: Some Problems and Puzzles. Journal of Labor Economics, 20(4), 733–783. <br> [https://doi.org/10.1086/342055](https://doi.org/10.1086/342055)

- Katz, L.F. and Autor, D.H. (1999) Changes in the Wage Structure and Earnings Inequality. In Ashenfelter, O. and Card, D. (Ed.), Handbook of Labor Economics, Vol. 3A., pp. 1463-1555. <br> [Available at scholar.harvard.edu](https://scholar.harvard.edu/files/lkatz/files/changes_in_the_wage_structure_and_earnings_inequality.pdf)

- Lee, D. S. (1999). Wage Inequality in the United States During the 1980s: Rising Dispersion or Falling Minimum Wage? The Quarterly Journal of Economics, 114(3), 977–1023. <br>[https://doi.org/10.1162/003355399556197](https://doi.org/10.1162/003355399556197)

- Lemieux, T. (2006). Increasing Residual Wage Inequality: Composition Effects, Noisy Data, or Rising Demand for Skill? American Economic Review, 96(3), 461–498. <br>[https://doi.org/10.1257/aer.96.3.461](https://doi.org/10.1257/aer.96.3.461)

### Further Reading
- Bluestone, B. and Harrison, B. (1988). The Growth of Low-Wage Employment: 1963-86. The American Economic Review, 78(2), 124-128. <br> [Availble at jstor.org](http://www.jstor.org/stable/1818109)

- Levy, F. (1989). Recent Trends in U.S. Earnings and Family Incomes. NBER Macroeconomics Annual, Vol. 4, pp. 73-113. <br>[Available at journals.uchicago.edu](https://www.journals.uchicago.edu/doi/abs/10.1086/654100)

- Sawhill, Isabel V. (1988). Poverty in The U. S.: Why Is It so Persistent? Journal of Economic Literature, 26(3), 1073-1119. <br> [Available at jstor.org](http://www.jstor.org/stable/2726525)
