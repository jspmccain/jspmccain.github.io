I had a an interesting conversation about why there seems to be lots of volatility in player rankings for tennis (compared to hockey/soccer/etc.). We wondered is it all just a function of the number of players involved? Can the good hockey players average out the bad ones in a game, leading to more consistency? Given that I'm a fake statistician, I thought this question could be answered with some quick simulations.

How about a team is made up of players, whose athletic ability can be summarized in a number (aka 'fitness' - thanks Sarah for the evolutionary terminology). This number is drawn from a distribution of average ability within the team and some deviation. The difference in the means of two teams governs who wins the game. In the following there is a distribution of players from two teams - red/blue:

    ## `stat_bin()` using `bins = 30`. Pick better value with `binwidth`.
    ## `stat_bin()` using `bins = 30`. Pick better value with `binwidth`.

![](2017-10-07-single-player-sports-volatility_files/figure-markdown_github/unnamed-chunk-1-1.png)

So in this one example it seems that the blue one wins and the red one loses. But we really wanted to know about volatility - on average, how often does the *better* team win?

To make this easier, how about we assume the teams are equally "good". If they play 100 games, how close is it to 50 wins each team?

``` r
winner_winner_chicken_dinner <- function(team_average_1,
                                         team_average_2,
                                         std_dev,
                                         number_players,
                                         number_games){
  
  team_1_vec <- vector()

  for(game in 1:number_games){
    team_1 <- rnorm(n = number_players, 
                    mean = team_average_1, 
                    sd = std_dev)
    team_2 <- rnorm(n = number_players, 
                    mean = team_average_2, 
                    sd = std_dev)
    if(mean(team_1) > mean(team_2)){
      team_1_vec <- c(team_1_vec, 1)
      } 
  }
  
  conclusion <- paste('Team 1 won ', 
                      sum(team_1_vec), 
                      " games, and Team 2 won ",
                      (number_games - sum(team_1_vec)),
                      ".", 
                      sep = "")
  
  return(conclusion)
}

set.seed(12345)
tournament_1 <- winner_winner_chicken_dinner(team_average_1 = 50, 
                                             team_average_2 = 50, 
                                             std_dev = 10, 
                                             number_players = 20, 
                                             number_games = 100)
print(tournament_1)
```

    ## [1] "Team 1 won 53 games, and Team 2 won 47."

So it's about even - makes sense! What if we drop this down to only 1 player per team (ie. Tennis):

    ## [1] "Team 1 won 53 games, and Team 2 won 47."

So that seems like I was wrong! If we assume that the one player score, where just if one score is greater than the other, indicates a win, then it doesn't matter how many players!

### But before I admit defeat...

What about the difference in magnitude of a win. Is the average difference between games higher when there are only two players?

![](2017-10-07-single-player-sports-volatility_files/figure-markdown_github/unnamed-chunk-4-1.png)

Aha! So the spread is way bigger for the tennis tournament. Maybe the simplification of assuming that if one score is larger than another leads to a win was a bad one. Or, maybe I don't like losing arguments and have gone down a serious [garden of forking paths](https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&cad=rja&uact=8&ved=0ahUKEwigkMXl8N_WAhVp7IMKHRq5B4oQFghEMAQ&url=http%3A%2F%2Fwww.stat.columbia.edu%2F~gelman%2Fresearch%2Funpublished%2Fp_hacking.pdf&usg=AOvVaw2yEx0yUehouqzqgpoRKtTO). Or better yet, maybe all of this is could be explained by some variation of the [central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem). Who knows?

![tennis gif](/images/tennis.gif)
