Leo Harb I.FA-P3A-Atapp 20.12.2021

# Atelier Applications Projet Web

**Leo Harb**

**I.FA-P3A**

**20.12.2021**

# **Table des matières**

[Introduction 3](#_Toc90836206)

[Fonctionnalités 3](#_Toc90836207)

[Technologies utilisées 3](#_Toc90836208)

[Base de données 3](#_Toc90836209)

[MLD 3](#_Toc90836210)

[MCD 4](#_Toc90836211)

[Implémentation 4](#_Toc90836212)

[Conclusion 4](#_Toc90836213)

[Références / Sources 5](#_Toc90836214)

# Introduction

Lors de ma formation au CFPT, dans le cadre de notre cours d&#39;atelier application, il nous à été demandé de réaliser un petit projet personnel orienté web ayant pour directives :

« Vous devez réaliser un petit site-web en utilisant les langages de programmation et technologies web utilisées à l&#39;école • Ce site-web peut être un jeu, un site-web orienté gestion, etc. • Vous devez choisir un site-web à réaliser qui vous passionne et qui puisse être réalisé dans le temps imparti ! »

J&#39;ai alors décidé de reprendre un ancien projet personnel que j&#39;avais réalisé l&#39;année précédente. Ce projet étant un petit jeu en Javascript, j&#39;ai eu l&#39;idée de l&#39;amélioré visuellement, créer un système de comptes et créer un système de tableau de scores.

# Fonctionnalités

- Création d&#39;un compte
- Login
- Consultation de son profil
- Consultation des statistiques du joueur
- Jouer connecté
- Jouer en tant qu&#39;inviter
- Consultation des meilleurs joueurs et de leur score

# Technologies utilisées

- HTML / CSS
- PHP
- Framework Bootstrap 5
- Javascript
- MariaDB

# Base de données

## MLD

UTILISATEUR(idUtilisateur, pseudo, mdp, sel)

SCORE(idScore, score, date, idUtilisateur)

## MCD

![](RackMultipart20211220-4-93n8b6_html_6531da666bd47c7d.png)

# Implémentation

Lors de ce projet j&#39;ai dû faire face à plusieurs obstacle par exemple la sauvegarde du score depuis le javascript. Pour cela j&#39;ai utilisé la méthode « fetch » tel que montré si dessous.

![](RackMultipart20211220-4-93n8b6_html_33ca38728488a31b.gif)

Ce genre de problèmes m&#39;ont mené à séparer distinctivement la partie base de donnée de la partie affichage.

# Conclusion

Lors de la réalisation de ce projet, j&#39;ai dû faire face à des problèmes divers et variés. Cependant, certains d&#39;entre eux m&#39;ont donné plus de fil à retordre que d&#39;autres. Notamment, le problème mentionné si dessus.

Pour améliorer ce projet par le futur, il faudrait par exemple renforcer la sécurité ou ajouter d&#39;autres jeux.

# Références / Sources

[https://www.w3schools.com](https://www.w3schools.com/)

[https://stackoverflow.com/questions/](https://stackoverflow.com/questions/)

[https://www.php.net/docs.php](https://www.php.net/docs.php)

[https://getbootstrap.com](https://getbootstrap.com/)

[https://developer.mozilla.org/en-US/docs/Web](https://developer.mozilla.org/en-US/docs/Web)