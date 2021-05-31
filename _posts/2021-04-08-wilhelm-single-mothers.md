---
seotitle: Welfare, the Earned Income Tax Credit, and the Labor Supply of Single Mothers
title: "Stefan Wilhelm: Welfare, the Earned Income Tax Credit, and the Labor Supply of Single Mothers"
description: Project in Labor Economics, winter term 2020
author: Stefan Wilhelm
type: post # Definiert das Layoutformat, Standard ist post.
updated: 2021-04-08T15:39:00+00:00 # Das Update-Datum setzt der Lehrstuhl, bitte nicht ausfüllen.
headerimage: # Bild, welches im Kopfbereich der Seite gezeigt wird.
sitemap:
  lastmod: 2021-04-08T15:39:00+00:00  # Das Lastmod-Datum setzt der Lehrstuhl, bitte nicht ausfüllen.
url: /wilhelm-single-mothers/ # Die URL wird durch den Lehrstuhl erstellt, bitte nicht aufüllen.
tags: # Tags werden durch den lehrstuhl vergeben, bitte nicht ausfüllen.
    - project work
    - welfare
    - labor supply
    - labor economics
    - Student Master
---

# Project in Labor Economics, winter term 2020/21

### Summary
In their paper "Welfare, the Earned Income Tax Credit, and the Labor Supply of Single Mothers" Bruce D. Meyer and Dan T. Rosenbaum (2001) state that tax and welfare reforms between 1984 and 1996 increased labor supply of single mothers by 6-9%. They used childless single women who were not affected by the reforms as the reference group in a difference-in-difference approach to identify these effects. Based on their finding this projects examines the effects of the subsequent welfare reform on the very same groups. The project provides evidence that the newly introduced TANF (Temporary Assistance for Needy Families) stopped the converging trend of unemployment rates of single mothers and single women. Moreover, it is shown that the TANF benefits have merely a minimal impact on the probability of a single women beeing employed.

## Original paper
### Research Subject
The original paper by Bruce D. Meyer and Dan T. Rosenbaum examined the development of employment rates of single mothers compared to childless single women. They exploited tax and welfare reforms that only affected single mothers but not childless single women. Assuming that employment rates of these two groups would follow the same trend without these interventions they interpreted the change in the difference of employment rate as the causal effect of the tax and welfare reforms.
### Context
Between 1984 and 1996 the US government increased the income tax credit for single mothers significantly. For example, in 1992 the difference in the net income between single mothers and childless single women with a gross yearly income of about 13.000$ amounts to 2.500$. Besides, the welfare benefits for single mothers were changed in a way such that benefits were increased if single mothers had a positiv income and decreased if they were not working at all. Both measures increased incentives for single mothers to get into employment but did not affect childless single women.
### Research strategy
As mentioned before the authors used a difference-in-difference approach stating that employment rates of both groups would follow the same trend without the policy interventions. The change in the difference of empolyment rates of the two groups is interpreted as the causal effect of the policy measures. Furthermore, the authors use a probit regression to quantify the effects of the tax and welfare reforms.
### Results
The employment rate of single mothers increased by 6-9% between 1984 and 1996 in comparison to the employment rate of childless single women. The probit regression revealed that the reduction in income taxes had a significant positve effect on the employment rate of single mothers as well as the welfare reform. A higher income tax credit increases the probability of a single mother beeing employed whereas higher welfare benefits decrease the probability. The authors also state that especially the change in the tax credit and the level of the maximum welfare benefit drive the results.
### Further literature
The findings of Meyer and Rosenbaum are consistent with other research. For example Ellwood (2000) or Jaumotte (2003) provide similar results for the US and other OECD members.

## Own Research
Following the approach of Meyer and Rosenbaum this project investigates the effects of the newly introduced welfare program TANF between 2000 and 2010.
### Data
In research project CPS data recieved from IPUMS (https://cps.ipums.org/cps/) is used. I work with monthly data from 2000 to 2010 including only single women between 19-44 years who are not currently visiting school or who are not able to work. The selection is based on the original paper. Further, I wanted to include the maximum TANF benefit into my analysis which is not included in the CPS data. Therefore, I retrived additional data from the Welfare Rules Database (https://wrd.urban.org/wrd/Query/query.cfm). The data includes the maximum TANF benefit by state depending on the size of the household for the observed time period. The data is then merged by an many-to-one merge command since one oberservation from the benefit data is matched with many observations from the CPS data. The data is merged using the variables state, number of children, year and month.

Stata-Code:
```stata
merge m:1 statefip year month nchild using benefitdata.dat
```

### Context
In 1996 the welfare program investigated by the authors of the original paper was replaced by a welfare program called TANF. Under TANF every state can freely choose the qualification criteria and amount of the welfare benfits. TANF is only granted consecutively for 2 years if the recipient does not work more than 30 hours a week. The lifetime limit for TANF benefits is set to 5 years. Moreover, also childless single women are eligible for TANF. It is striking that the TANF benefits in most states have not been adjusted during the observation time. This leads to a decrease in the average benefit when accounting for inflation. Another noticable observation is the continuous decline in TANF recipients. In 2008 the number of reciepients is almost halved compared to 2000.

**Average TANF Benfits (Inflation adjusted):**

![TANF Benefits](/assets/images/seminar/wilhelm/TANF_Benefits.png)

**Average TANF Recipients:**

|Year|Average Number of Recipients|
|:-------:|-------:|
|2000|1.408.427|
|2001|1.285.527|
|2002|1.221.508|
|2003|1.167.657|
|2004|1.110.821|
|2005|1.024.860|
|2006|930.196|
|2007|837.276|
|2008|799.503|
|2009|-|
|2010|-|
|**Total**|1.087.308|

### Hypotheses
Based on the previous oberservations the following hypotheses are put up:

***"The employment rates of childless single women and single mothers will no longer converge but follow the same trend because the benefits are generalised."***

***"Since benefits are decreasing employment in both groups will rise. The decreasing number of recipients is an indicator for this development."***

### Graphical analysis
In order to confirm or reject the hypotheses a graphical analysis is conducted first. I created the variable emp(employed) which equals one if the observed women has been working positve hours last week. Moreover, the same variable is created for the subgroups of childless single women (empsingle) and single mothers (empmother).
```stata
recode ahrsworkt (999=0) (else=1), gen(emp)
```
```stata
gen empsingle=.
replace empsingle = 0 if emp==0 & nchild == 0
replace empsingle = 1 if emp==1 & nchild == 0
```
```stata
gen empmother=.
replace empmother = 0 if emp==0 & nchild > 0
replace empmother = 1 if emp==1 & nchild > 0
```
**Using stata delivers the shown bar diagrams:**
```stata
graph bar empsingle empmother, over(year)
```
![Beschäftigung](/assets/images/seminar/wilhelm/Beschaeftigung.png )

**Employment of black mothers:**
```stata
graph bar empsingle empmother if race==200, over(year)
```
![Afroamericans](/assets/images/seminar/wilhelm/Afroamericans.png)

**Employment of unskilled monthers (no high school degree):**
```stata
graph bar empsingle empmother if educ<73, over(year)
```
![Geringqualifiziert](/assets/images/seminar/wilhelm/Geringqualifiziert.png)

**Employment of monthers with children under 6 years:**
```stata
graph bar empsingle empmother if yngch<6, over(year)
```
![Kleinkind](/assets/images/seminar/wilhelm/Kleinkind.png)

### Results
The graphical analysis provides some evidence for the first hypothesis of a common trend for childless single women and single mothers. The trend is observable through all subgroups of single mothers. Nevertheless, the second hypothesis that the decreasing will raise employment cannot be confirmed by the graphical analysis. That is why in the next step a Probit-Regression is conducted to quantify the effects of the declining benefits on employment.

### Probit Regression
Next to the benefit variable the Probit-Regression includes variables to controll for state and year specific effects. Further, the variables ethnie (1 = black, 0 = not black), bildung (0 = no high school diploma, 1 = high school diploma, 2 = college diploma) and kleinkind(1 = child under 6 in household, 0 = no child under 6 in household) are included. The varibles are recieved by recoding:

```stata
recode race (200=1) (else=0), gen(ethnie)
recode educ (0/72=0) (73/90=1) (91/125=2), gen(bildung)
recode yngch (0/5=1) (else=0), gen(kleinkind)
```
**The probit regression is executed using:**
```stata
probit emp benefit3 i.ethnie i.bildung i.kleinkind i.statefip i.year
```
**The following command provides margins that can be interpreted properly:**
```stata
margins, dydx(benefit3 ethnie bildung kleinkind) atmeans
```
**The Probit-Regression yields:**
![Results](/assets/images/seminar/wilhelm/Results.png)

### Results
Cutting the maximum TANF benefit by 100$ per month increases the probability of a single woman being employed by about 0,7%. Black women have a 5% smaller probability of being employed. Having a high school diploma raises the probability of being employed by 18,4%, a college degree even by 27,8%. Finally, a woman who has a child younger than 6 years has an almost 13% smaller probbility of being employed. The results are highly significant and consistent with the graphical results. However, considering that the average maximum benefit has only declined by 40$ over 10 years the effect of the maximum benefit on emplyment is rather small since a 100$ reduction increases the probability of being employed only slightly. After analysing the Probit-Regression the hypothesis that the decreasing TANF benefits promoted employment cannot be completely rejected. Nevertheless, the effect is rather small which implicates that other forces must be responsible for the development of the unemployment rates.

## Conclusion
The newly introduced TANF benefits stopped the converging trend in employment of childless single women and single mothers. Despite decreasing benefits unemployment grew in both groups. This can be explained by a rather small effect of the maximum TANF benefits on employment meaning that other forces must cause this development. Still, the question raises why the number of recipients declines even if employment does not increase. Robert Moffitt (Johns Hopkins University) offers the explanation that especially single mothers are not able to work the required 30 hours per week. As a consequence, they become ineligible for TANF benefits when reaching the two year time limit without getting into employment. This causes a severe risk for single mothers of being pushed into poverty.

## Literature
- Ellwood, D. T. (2000). The impact of the earned income tax credit and social policy reforms on work, marriage, and living arrangements. National Tax Journal. 53(4), 1063-1105.<br> [Manuscript available at www.researchgate.net](https://www.researchgate.net/profile/David-Ellwood/publication/23551085_The_Impact_of_the_Earned_Income_Tax_Credit_and_Social_Policy_Reforms_on_Work_Marriage_and_Living_Arrangements/links/54f847fa0cf2ccffe9ddebb2/The-Impact-of-the-Earned-Income-Tax-Credit-and-Social-Policy-Reforms-on-Work-Marriage-and-Living-Arrangements.pdf)

- Jaumotte, F. (2003). Female labour force participation: past trends and main determinants in OECD countries. OECD: Economics Department Working Papers No. 376. Available at [www.oecd-ilibrary.org](https://www.oecd-ilibrary.org/economics/female-labour-force-participation_082872464507).

- Meyer, B. D. & Rosenbaum, D. T. (2001). Welfare, the earned income tax credit, and the labor supply of single mothers. The Quarterly Journal of Economics. 116(3), 1063-1114. Available at [www.researchgate.net](https://www.researchgate.net/publication/24091749_Welfare_The_Earned_Income_Tax_Credit_and_the_Labor_Supply_of_Single_Mothers).

- Moffitt, R. A. (2013). The Great Recession and the Social Safety Net. The ANNALS of the American Academy of Political and Social Science. 650(1), 143-166. Available at [journals.sagepub.com](https://journals.sagepub.com/doi/pdf/10.1177/0002716213499532).

## Further reading
- Blank, R. M., Card, D., & Robins, P. K. (1999). Financial incentives for increasing work and income among low-income families. NBER Working Paper Series. No. 6998. Available at [www.nber.org](https://www.nber.org/system/files/working_papers/w6998/w6998.pdf)

- Kahzan, O. (12.05.2014). How Welfare Reform Left Single Moms Behind. The Atlantic. Available at [www.theatlantic.com](https://www.theatlantic.com/business/archive/2014/05/how-welfare-reform-left-single-moms-behind/361964/#:~:text=The%20effect%20was%20that%20thousands,the%20poor%2C%E2%80%9D%20Moffitt%20writes).

- Loprest, P. (2003). Fewer Welfare Leavers Employed in Weak Economy. Urban Institute: Snapshots of America’s Families. 3(7). Available at [webarchive.urban.org](http://webarchive.urban.org/UploadedPDF/310837_snapshots3_no5.pdf).

- Peterson, J., Song, X. & Jones-DeWeever, A. (2002). Life After Welfare Reform: Low-Income Single Parent Families, Pre-and Post-TANF. Institute for Women's Policy Research: Research-in-Brief. #D446. Available at [www.ed.gov/](https://files.eric.ed.gov/fulltext/ED469527.pdf).

- Schoeni, R. F. & Blank, R. M. (2000). What has welfare reform accomplished? Impacts on welfare participation, employment, income, poverty, and family structure. NBER Working Paper Series. No. 7627. Available at [www.nber.org](https://www.nber.org/system/files/working_papers/w7627/w7627.pdf)
