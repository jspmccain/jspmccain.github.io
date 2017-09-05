---
layout: post
title: when to tidyverse
permalink: /when-to-tidyverse/
---

tl;dr: default to tidyverse, but don't force it

I gave a talk a few years ago called 'Intro to the Hadleyverse [now the tidyverse]' - so I've been a tidyverse fan for a while. The first book I read in graduate school was the ggplot2 book! I'm writing this to state my biases - I bought into the tidyverse before I understood what it was. Lately, there has been an active discussion about using these tools in R. I'm planning on doing another talk this semester about the tidyverse, and it got me thinking - when should you use the tidyverse and when should you not?

Let's start with the clear winners - exploratory data visualization and data munging. I have always found that exploratory data visualization is way better in ggplot2. You can easily change symbols to reflect factors, very quickly make complex facetting, and have access to a wide range of `geoms`. 

I also find data munging quite a bit easier with `dplyr` and `reshape2`. Not to mention `magrittr` has completely changed how I interact with R code.

I think for many things in R, using tidy tools improves both code readability and efficiency. That being said, I've had some experiences where I was so committed to the tidyverse that it was easily counter productive. For example, making publication-ready plots in `ggplot2` ends up with close to the same amount of code as a base R-made plot. (And in general, I've always preferred making maps in base R).

In a similar thought, when working with data structures that don't clearly lend themselves to the tidy data format. For example, working with high resolution time series. I think it's a waste of memory to have a variable name in a separate column just repeated over and over again. Jeff Leek wrote a really nice [blog post](https://simplystatistics.org/2016/02/17/non-tidy-data/) about 'non-tidy' data, those data that don't lend themselves easily to this format.

Ultimately, I think in the choice for a specific project, it's good to default to tidyverse tools. But for these three questions if you answer yes, I'd go with base R!

- Do I have to make a map?
- Do I have to facet panels of unequal sizes?
- DO I have to represent a novel type of model fit/parameter on the plot?



