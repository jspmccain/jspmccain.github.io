---
layout: post
title: why is there so much volatility in single-player sport rankings?
permalink: /single-player-ranking-volatility/
---

tl;dr: maybe just sampling error in small samples

I had an interesting conversation about why there seems to be a lot of volatility in player rankings for tennis (compared to hockey/soccer/etc.). We wondered: is it all just a function of the number of players involved? Can the good hockey players average out the bad ones on a team, leading to more consistency of a teams performance? Given that I'm a fake statistician, I thought this question could be answered with some quick simulations.

How about a team is made up of players, whose athletic ability can be summarized in a number (aka 'fitness' - thanks Sarah for the evolutionary terminology). This number is drawn from a distribution of average ability within the team and some deviation. The difference in the means of two teams governs who wins the game. In the following there is a distribution of players from two teams - red/blue. (All code is available at this website source, but the main function `winner_winner_chicken_dinner()` is below.)


![first plot](/images/first-plot.png)

So in this one example it seems that the blue one wins and the red one loses. (Blue team had a mean = 55, and red had mean = 50). But we really wanted to know about *volatility* - on average, how often does the *better* team win?

To make this easier, how about we assume the teams are equally "good". If they play 100 games, how close is it to 50 wins each team?

     "Team 1 won 53 games, and Team 2 won 47."

So it's about even - makes sense! What if we drop this down to only 1 player per team (ie. Tennis):

     "Team 1 won 53 games, and Team 2 won 47."

So that seems like I was wrong! If we assume that the one player score, where just if one score is greater than the other, indicates a win, then it doesn't matter how many players!

### But before I admit defeat...

What about the difference in magnitude of a win. Is the average difference between games higher when there are only two players?

![second plot](/images/second-plot.png)

Aha! So the spread is way bigger for the tennis tournament. Maybe the simplification of assuming that if one score is larger than another leads to a win was a bad one. Or, maybe I don't like losing arguments and have gone down a serious [garden of forking paths](https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&cad=rja&uact=8&ved=0ahUKEwigkMXl8N_WAhVp7IMKHRq5B4oQFghEMAQ&url=http%3A%2F%2Fwww.stat.columbia.edu%2F~gelman%2Fresearch%2Funpublished%2Fp_hacking.pdf&usg=AOvVaw2yEx0yUehouqzqgpoRKtTO). Or better yet, maybe all of this is could be explained by some variation of the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). Who knows?

![tennis gif](/images/tennis.gif)

    ## function(team_average_1,
    ##          team_average_2,
    ##          std_dev,
    ##          number_players,
    ##          number_games){
    ##   
    ##   team_1_vec <- vector()
    ##   team_1_minus_2 <- vector()
    ##   
    ##   for(game in 1:number_games){
    ##     team_1 <- rnorm(n = number_players, 
    ##                     mean = team_average_1, 
    ##                     sd = std_dev)
    ##     team_2 <- rnorm(n = number_players, 
    ##                     mean = team_average_2, 
    ##                     sd = std_dev)
    ##     if(mean(team_1) > mean(team_2)){
    ##       team_1_vec <- c(team_1_vec, 1)
    ##     } 
    ##     team_1_minus_2 <- c(team_1_minus_2, mean(team_1) - mean(team_2))
    ##   }
    ##   
    ##   if(number_players > 1){
    ##     unit_team <- "Team"
    ##   } else {
    ##     unit_team <- "Player"
    ##   }
    ##
    ##   conclusion <- paste(unit_team,
    ##                       '1 won ', 
    ##                       sum(team_1_vec), 
    ##                       " games, and ",
    ##                       unit_team,
    ##                       " 2 won ",
    ##                       (number_games - sum(team_1_vec)),
    ##                       ".", 
    ##                       sep = "")
    ##
    ##   finale <- list(conclusion, team_1_minus_2)
    ##   return(finale)
    ## }
