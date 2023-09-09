---
layout: post
title: the journey and lessons from my first bioinformatics tool
permalink: /first-bioinformatics-tool/
---

2019-06-21; Erin and I have recently published a bioinformatics tool (called [*cobia*](https://pubs.acs.org/doi/abs/10.1021/acs.jproteome.9b00144), please 
go check it out!), and then we used this tool to 
examine the consequences of cofragmentation for metaproteomics. This project began around 2.5 years ago (near when I started in Erin's lab!), and has been an insane learning process. When I started this 'toy model', I 
knew pretty much nothing about mass spectrometry. In this post I want to give a brief, under the hood, description of how this project progressed and write out the lessons I've learned during the process.

## The lessons

1) *README in every folder* : The project ended up having around 3500 different files, totalling over 750 gigabytes of previously published data. It's easy to forget where data were downloaded from, or project ID's, so now I keep a README in every folder and record 1) what each file is and 2) where it's from.

2) *Defensible code defends against yourself* : I theoretically learned this lesson a few years ago at a workshop with Tim Poisot, but this really hit home here. Writing code to make sure a parameter input file has appropriate inputs, for example, saved me from frustrating times.

3) *Use an unrealistically simple unit testing dataset* : I made up a fake unit testing dataset so I could do quick testing. Turns out that the fake dataset identified a bug in the code, *because* it was so unlike other expected inputs. (It also really helped with quick testing!).

4) *Write helpfiles for your future self* : The help files should be maintained for your future self. It was a few months later from when originally submitted the paper to getting reviews, and having good help files really made it easier to go back to using the software. I wrote a vignette as well, and now I refer to my own vignette more frequently than you can imagine! (Also, thank you Jackie Zorz for pointing out that 'vignette' is an unnecessary bit of bioinformatics jargon when I should just call it a 'How-To')

5) *Learn languages pragmatically* : I took a mini course on python programming a few years ago. I basically forgot everything afterwards besides some basic syntax. Only once I needed to learn python (based on available tools), did I really learn more about the language. More and more I see programming languages pragmatically (and spoken languages too, for that matter!)

6) *Let dead ends go* : A big chunk of time was spent on versions of the model or different approaches. We had a whole other model that more accurately (but stochastically) represented a mass spec (by including 
something called TopN precursor picking, and dynamic exclusion), that never got into any draft. That specific model took around 2 months of coding. In the end, thousands of lines of code didn't make it into the final 
product. For me this has been super tough, in some ways it feels like so much work was wasted. But in hindsight, each 'wasted' step taught me more about mass spectrometry, modelling, and science.

## The journey

Metaproteomics, almost by definition, is more complex than single-organism proteomics. There are several consequences of this complexity. One of these consequences is messy spectra - when two peptides are selected together and produce overlapping 'fingerprints' (MS/MS spectra). I became interested in the consequences of this additional complexity while writing a review paper on *de novo* peptide sequencing for a class on 'Probabilistic Graphical Models'. Part of the review paper involved a *very* simple simulation, all written in R, where we used a rough proxy for sample complexity and examined theoretically how complexity can be addressed by different liquid chromatography separations (using something called the 'theoretical plate number' for chromatography).

The first road block was computational speed. R is great, but perhaps isn't the speediest programming language. My first solution was to parallelize the simulation in R, which took a bit of reformatting because it's not of the class 'embarrassingly parallelizable'.

So once it was parallelized, we ran into another challenge. We were using a proxy for retention time (the time that a peptide leaves a chromatographic column). But we needed a more explicit retention time prediction. This was the first big shift, the whole simulation had to be re-written in Python to use the retention time prediction method BioLCCC.

Cool! It's now in Python, and we get some peptide specific scores for representing the type of bias we examined. Eek... one run took so long though! And yet another re-formulation, parallelizing the simulation in python. Okay well now it's parallel and in Python, why don't we make it a command line tool and give it a fun name (*cobia* stands for *co* fragmentation *bia* s.).

FEWF! Now we are moving! Start writing up to submit it somewhere?! ...but how have we validated our model. We make these scores, which we hypothesized would represent the type of bias we model, but do the scores actually mean anything in real metaproteomics experiments?

This was when the real challenges came along. Cofragmentation is a tricky phenomenon to predict - there are many reasons why a peptide isn't observed in a sample, and these reasons are mostly difficult to distinguish. 
So we had to come up with a way to validate our 
scores - go see the paper for a more in depth description of how we did this, but the easily the biggest challenge was the re-analysis of previously published datasets. In the end, we have 8 different mass spectrometry experiments used for different validation 
methods, with different retention time prediction methods. It was a lot of digging through supplementary materials of other papers!

Lastly, one of the big parts of the journey was the review process. The reviewers from Journal of Proteome Research did an excellent job of thoroughly reading the paper - in the end, their comments significantly improved the paper content and how it's written. Review processes like these give me some faith in the scientific process!

Throughout, I've tried to actively read How-To guides for building bioinformatics tools. I've thought about: How can we make the tool more defensible? How can we make it accessible to proteomics researchers? What 
makes a bioinformatics tool more successful? (for me, ease of download plays a big role!) How can I write the code so others can adapt it for their use? Should the tool be one function, or a modular set of functions? (ended up doing the latter because of the structure of Anv'io!). All of these questions shaped the current structure and function of *cobia*.

Our tool is by no means perfect! But hopefully people find it useful, and they also find the conclusions we made with our tool helpful for their analyses!
