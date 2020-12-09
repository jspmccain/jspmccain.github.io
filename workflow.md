---
layout: page
title: Workflow
permalink: /workflow/
---
  
I like thinking about workflow - I don't think people talk about it enough. So in an effort to discuss and improve my own workflow, below is a description of tools I'm actively using. If you have any suggestions, please let me know!

## Computing

I use [R Studio](https://www.rstudio.com/) for working in [R](https://www.r-project.org/).  In R, I am a fan of the [tidyverse](http://www.tidyverse.org/), although I typically use a mix of base R and tidyverse packages. Favourite R packages: [beepr](https://cran.r-project.org/web/packages/beepr/index.html), dplyr, ggplot2, and magrittr.

I also do a lot of work in Python. I used to work in [Spyder](https://pythonhosted.org/spyder/), mainly because it was a smooth transition from R Studio. Ultimately though I've landed on a combination of Atom 
and Jupyter notebooks. I like Jupyter because I can set it up using [ssh](https://fizzylogic.nl/2017/11/06/edit-jupyter-notebooks-over-ssh/), so I can work on large datasets and not crash my computer.

I work on a Windows machine (Asus), and run [Windows Subsystem for Linux](https://msdn.microsoft.com/en-us/commandline/wsl/about). For accessing computing resources remotely, I use [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) and [WinSCP](https://winscp.net/eng/download.php).

I use Git and GitHub as version control via Git bash.

For making things fast (enough), I typically rely on the wizardy of [Numba](https://numba.pydata.org/).

## Research

I use [Mendeley](https://www.mendeley.com/) as a reference manager, but [Zotero](https://www.zotero.org/) may be in the cards soon. I mostly write with LateX, and so I export the bibtex file from Mendeley, but Mendeley does most of the organizing information etc.

My favourite way to write is using a Google Doc. I write the text in LateX (as if it were to appear in a LaTeX editor), but edit it as a normal google doc. This makes revisions easy with co-authors. Only until the final stages do I switch it over to compiling in 
LaTeX. I use TeXWorks for editing and compiling just because it's easy, and export the BiBtex document from Mendeley.

I like to write things down, and for that I use [Leuchtturm](https://www.leuchtturm1917.us/notebooks/). Or whiteboards. I love whiteboards and would prefer to have them on all walls.

For posters and presentations I use powerpoint - I know there are alternatives, but these have been sufficient so far! Suggestions very welcome.

This website was made based off of [Jekyll Now](https://github.com/barryclark/jekyll-now) and [GitHub pages](https://pages.github.com/).

## Organizational

I organize all my projects the same way. This is to improve reproducibility, but also it just helps me find things down the road. 

I have a 'Projects' folder that is synced with Google Drive, so everything is backed up as I work (for large datasets I typically back them up separately so they don't take up too much space). Within each project, I have consistent file structure: '/data', '/scripts', '/writing', '/tables', '/figures', '/meetings'. Within '/data', I sometimes put '/intermediate_data', when an analysis takes a long time to reproduce. Within each folder I typically put a '/deprecated' subfolder, as I am a bit of a hoarder. I also really try to put important information (i.e. conda environment names etc.) in the main folder -- it's easy and annoying to forget these things after long pauses and this helps me get back to speed!

