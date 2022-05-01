#################################################
# Parcours : M1 parcours IC
# Etudiants : Ruffieux Mathis & Dugaleix Nereis
# Annee : 2021/2022
#################################################


#Library
library(jsonlite)
library(dplyr)
library (lme4)
library (lmerTest)
library(curl)


#calcul de l'aire
polyarea <- function (x, y) {
  x <- c (x, x [1])
  y <- c (y, y [1])
  n <- length (x)
  return (abs (sum (x [1 : (n - 1)] * y [2 : n] - y [1 : (n - 1)] * x [2 : n])) / 2)
}


#Recuperation des donnees 
{
  p1 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-23-27-58.json")))
  p2 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-23-20-40.json")))
  p3 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-22-41-25.json")))
  p4 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-35-51.json")))
  p5 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-22-20.json")))
  p6 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-14-28.json")))
  p7 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-13-09.json")))
  p8 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-07-13.json")))
  p9 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-21-00-37.json")))
  p10 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-20-42-39.json")))
  p11 <- data.frame(as.list(fromJSON(txt = "https://rafael.laboissiere.net/m1-miashs-2022-s2/booB3ahg/data/2022-04-25-16-46-50.json")))
}

#========== Creation du dataframe ==========

data = rbind(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11)

data = rename(data, "subject" = "nom",
       "congruency" = "ListeMot.type",
       "Mot" = "ListeMot.mot",
       "distractor" = "ListeMot.couleur",
       "RT" = "ListeMot.MT",
       "IT" = "ListeMot.IT",
       "CX" = "ListeMot.coordonneeX",
       "CY" = "ListeMot.coordonneeY",
       "succes" = "ListeMot.score")


#length est la taille des donnees
length <- length(data[,1])

#Creation de la colonne post_error
for(i in 2:length){
  if(data$succes[i-1] == 0){
    data$post_error[i] = 1
  }else{
    data$post_error[i] = 0
  }
}

#Creation de la colonne trial
for(i in 1:length){
  data$trial[i] <- ((i-1)%%40)+1
}

#Creation de la colonne bloc
for(i in 1:length){
  if( data$trial[i] <= 10 ){
    data$block[i] <- 1
  }else if(data$trial[i] <= 20){
    data$block[i] <- 2
  }else if(data$trial[i] <= 30){
    data$block[i] <- 3
  }else{
    data$block[i] <- 4
  }
  
}

#Creation de la colonne prop_congr
for(i in 1:length){
  if( data$trial[i] <= 20 ){
    data$prop_congr[i] <- "80congruent"
  }else{
    data$prop_congr[i] <- "20congruent"
  }
}


table (data$subject)
table (data$trial) #modulo40 - fait
table (data$block) #modulo10 - fait
table (data$distractor) 
table (data$congruency)
table (data$prop_congr) #modulo20 - fait
table (data$succes)
table (data$post_error) # - fait

table (data [, c("subject")])
table (data [, c("subject", "block")])
table (data [, c("congruency", "prop_congr")])
  

#========== Analyse des donnÈes ==========

summary (data$IT)
plot (density (data$IT))
hist(data$IT,breaks=40)

#on va Èliminer les temps de rÈactions >8s car valeurs abhÈrrentes 

summary (data$RT)
plot (density (data$RT))
plot (density (data$RT), log = "x")
hist(data$RT,breaks=40)

#summary (data$AUC)
#plot (density (data$AUC))
#plot (density (data$AUC), log = "x")


#-------- Exercice ---------

#RT avec les variables dependantes congruency et prop_congr
boxplot (RT ~ congruency * prop_congr, data, log="y")
#on observe un temps de r√©action sup√©rieur aux incongruents

boxplot (RT ~ congruency, data, log="y")

boxplot (RT ~ prop_congr, data, log="y")


#anova avec lm
fm <- lm(RT ~ congruency * prop_congr, data)
fm
anova(fm)
#Uniquement le facteur congruency est significatif

#----------IT-----------
boxplot (IT ~ congruency, data, log="y")

boxplot (IT ~ prop_congr, data, log="y")


#anova avec lm
fm <- lm(IT ~ congruency * prop_congr, data)
fm
anova(fm)


#------------------------

#mixed effects model avec lmer
#install.packages('lme4')
#install.packages('lmerTest')
#install.packages('statmod')
library('lme4')
library('lmerTest')

fm2 <- lmer(RT ~ congruency * prop_congr + (1 | subject), data)
fm2
anova(fm2)
ranef(fm2)

##Gerer les erreurs 

#verifier la magnitude
boxplot(RT ~ succes,data,log="y")
boxplot(RT ~ post_error, data, log="y")

#√©viter les donn√©es avec des erreurs
idx <- which(data$post_error == 0)
data.ok <- data [idx,]
data.ok <- subset(data,post_error==0)
boxplot(RT ~ congruency * prop_congr, data.ok, log="y")

#analyser les donn√©es correctes
fm.lmer <- lmer(RT~congruency*prop_congr + (1|subject),data.ok)
fm.lmer
anova(fm.lmer)

#analyser l'AUC (air sous la courbe)

#calculer AUC 


######################################


#extract X and Y mouse coordinates (Par exemple ici pour l'id 81)
id <- 81
X <- as.numeric(unlist(data$CX[id]))
Y <- as.numeric(unlist(data$CY[id]))
plot(X,Y,asp=1)
lines(c(X,X[1]),c(Y,Y[1]))


#Calcule de AUC
source("area-polygon.r")
for(i in 1:length){
  X <- as.numeric(unlist(data$CX[i]))
  Y <- as.numeric(unlist(data$CY[i]))
  data$AUC[i] <- area.polygon(c(X,X[1]),c(Y,Y[1]))
}

summary (data$AUC)
plot (density (data$AUC))
plot (density (data$AUC), log = "x")
hist(data$AUC,breaks=40)

#---------- AUC -----------
boxplot (AUC ~ congruency, data, log="y")

boxplot (AUC ~ prop_congr, data, log="y")


#anova avec lm
fm <- lm(AUC ~ congruency * prop_congr, data)
fm
anova(fm)

#erreurs en fonction de AUC
boxplot(AUC ~ succes,data,log="y")


#eof















