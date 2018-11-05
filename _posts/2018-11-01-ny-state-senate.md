---
title: Visualizing the state of New York State Senate 2018 Midterm Elections
author: Rapi Castillo
layout: post
categories:
- visualization
- new-york-state
- universal-healthcare
image: assets/images/posts/2018-01-01-nys.jpg
interactive: interactives/2018-11-01-state-senate.html
description: I was interested in visualizing the state of the State Senate elections. Some times, it's hard to understand the state senate map of New York, but I tried to simplify it using a hex map.
twitter:
  title: Visualizing the state of New York State Senate 2018 Midterm Elections
  description: I was interested in visualizing the state of the State Senate elections. Some times, it's hard to understand the state senate map of New York, but I tried to simplify it using a hex map.
---

According to City & State, there are 14 senate districts in play in the 2018 midterm elections. Four senate districts are considered tossups, three senate districts lean republican,  one leans democratic, and six are strongly Republican. 29 are solid Ds and 19 solid R. With 14 senate districts in play, Democrats in New York has a pathway of gaining control of the state senate.

There is a clear path for Democrats to gain control of both chambers. With a Democratic governor, progressive legislations (which have been consistently blocked by a republican State Senate) now have the possibility to be passed.

One of these legislations is the  **New York Health Act**. If passed — NYHA will provide comprehensive universal health care for all New Yorkers. It [has passed the state assembly five times](http://gothamist.com/2018/08/22/nyc_universal_healthcare.php) including the last four years in a row. However, because of Republicans and renegade Democrats (IDC), the bill has been consistently blocked in the state senate. [More information at Campaign for New York Health](https://www.nyhcampaign.org/)

I was interested in visualizing the state of the State Senate elections. Some times, it's hard to understand the state senate map of New York, but I tried to simplify it using a hex map. It shows districts from rural NY with large areas having the same representation as the more compact senate districts in New York City.

These visualizations are based on City and State's [preview of the 2018 state Senate elections](https://www.cityandstateny.com/articles/politics/campaigns-elections/2018-new-york-senate-elections-guide.html){:target='\_blank'} and Ross Barkan's article on the "[Six most important elections outside NYC](http://gothamist.com/2018/11/01/ny_midterm_elections_upstate.php){:target="\_blank"}".

I used `hexbin` to render the hexes, visualization done in `d3`.

** _Note: Simcha Felder is marked as a "Wildcard" by City and State._
