<h1 align="center">
  <a href="https://lesreddy.github.io/tw-tetris/" target="_blank"><img src="https://i.ibb.co/gvSqkrw/totallywildtetris.png" alt="TW Tetris main screen"/></a>
</h1>


<div align="center"> 

[Totally Wild Tetris](https://lesreddy.github.io/tw-tetris/) is a colourful animal themed version of the classic brick building game that was first released back in [1984!](https://en.wikipedia.org/wiki/Tetris) 
Features include 10 levels, a realtime score, level and time update all designed in a simple and colourful way.  As a beginner developer the main purpose of this project was to improve my skills in Javascript which whilst I enjoy I currently find very challenging!
<br>

[Play the Game!](https://lesreddy.github.io/tw-tetris/)

</div>

## Table of Contents
1. [**UX**](#ux)
    - [**Goals**](#goals)
    - [**User Stories**](#user-stories)
    - [**Design**](#design)
    - [**Wireframes**](#wireframes)

2. [**Features**](#features)
    - [**Current Features**](#current-features)
    - [**Remaining Features to Create**](#remaining-features-to-create)

3. [**Applied Technologies**](#appplied-technologies)

4. [**Testing**](#testing)
    - [**Validation**](#validation)
    - [**Client Stories**](#client-stories)
    - [**Bugs**](#bugs)

5. [**Deployment**](#deployment)
    - [**From The Browser**](#from-the-browser)
    - [**Branches**](#branches)
    - [**Running Locally**](#running-locally)

6. [**Credits**](#credits)
    - [**Media**](#media)
    - [**Code**](#code)
    - [**Acknowledgements**](#acknowledgements)

7. [**Reflections**](#reflections)


## UX


### Goals

The primary purpose was to build a very recognisable game for the user/player with as much Javascript as possible to expediate the developers (a beginner) learning of it.

### User Stories

1. The game to look as much like a real tetris game as possible.

2.  Ensure that there was a bulk of it made with pure Javascript.

3.  Easy to use with clear menus and instructions.

4.  Small fun learning component to it.

5.  Bright and colourful to resonate and reiterate the fun nature of the game.

6.  Appropriate background music that can be switched on and off.

7.  Create a feature that gives the game a bit of a point of difference.

### Design

**Fonts**

Primary font chosen was **Permanent Marker** to give a jungle feel to the game and ensure a fun theme is created.

Secondary font was **Varela** which contrasts well with the primary choice of font but also allows a clearer 

**Background-Images**

Each image was designed to produce a contrasting vibrant colour linked in to the totally wild theme.  Each image represents a new level and a new animal with the lion being the last level.

**Colour Scheme**

The colour scheme is meant to potray strong bright and colourful images against a contrasting darker background.  I do believe this is achieved.


### Wireframes

[Figma](https://www.figma.com/file/JQ5LJHzOdLoZvROewrwEzDgW/Totally-Wild-Tetris?node-id=14%3A76) was used to create the wireframes. 


## Features

### Existing Features

1.  10 Different Levels:  As the player reaches increments of 250 points then a new level will be shown by the background changing.

2.  Set Player Name:  When you click on this button you can set the name of the player.

3.  Reset Game:  When this is clicked you can start a new game

4.  Level displayed onscreen as the bacground changes.

5.  Score displayed onscreen when the player creates a new line.

6.  Pop up Modal which tells you which level you reached with a fun fact inside that changes dependent on the level.

7.  Transparent Background images.

### Remaining Features to Create

1. High Score Table storing the top 5 scores with corresponding name

2. About screen which gives basic details on the game and how you reach a different level each time you reach 500 points

3. Audio - background music and also sound when the blocks hit each other.

4. Include a navbar for smaller screens.

5. Stopwatch timer to be implemented and triggered when each new game starts and put into the ```Timer``` box.

6. Would like to create a message of some description when the user reaches a new level that flashes up and informs the player of the change of level.  For example it could say 'Congratulations you have reached Frog Level 2'.

## Applied Technologies

The following technologies were used to construct the site:

1. [VSCode](https://code.visualstudio.com/) - a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. 
2. [Bootstrap](https://www.bootstrapcdn.com/) - used to simplify the structure and to make it responsive.
3. [Bootbox](http://bootboxjs.com/getting-started.html) - required in order to get the player name modal to work.
4. [jquery](https://www.jquery.com) - a required library for Bootbox.
5. [PopperJS](https://popper.js.org/) - also a required JS library to run Bootbox

## Testing

### Responsiveness

The game works on all screen sizes but due to the issue I had with the canvas properly re-sizing (see bugs) I had difficulty making it responsive in the way I would like.  Particularly when the screen is at Ipad pro dimensions where width of the screen is relatively close to the height (1024 x 1366).

The end result was spending way too much time to achieve very little and not an overly appealing look, however as it stands the game is responsive.

When I tried to implement the bootstrap ```#playerNameModal``` It unfortunately caused an error which did not keep the name that I had set for local storage with the code that I used. Attempted with javascript, then Jquery with no success.  It also caused a problem with the ```finishGameModal`` where it would not actually initialise and the screen just went dark.  After failing heavily with this process I aborted and then implemented the only thing that worked which was a bootbox modal referenced from my mentor's project.

### Validation


* Ran [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) to validate the css file and also [W3C Markup Validation Service](https://validator.w3.org/) to validate the html markup.

### Client Stories

1. The game to look as much like a real tetris game as possible.

This is achieved and the player can immediately tell this when the game is launched

2.  Ensure that there was a bulk of it made with pure Javascript.

This is the case as the actual game mechanics was built using vanilla javascript, however jquery is used throughout.

3.  Easy to use with clear menus and instructions.

This could be better as there is currently no about screen but the simple nature of it means that it quite easy to use on larger screens and any device with a keyboard.

4.  Small fun learning component to it.

This is achieved using the end game modal which tells a different fun fact at the end of each level.

5.  Bright and colourful to resonate and reiterate the fun nature of the game.

This is achieved with the typography and colorful nature of the game but the overall look could be more appealing

6.  Appropriate background music that can be switched on and off.

This is not yet achieved.


### Bugs

The major flaw with the game is that it only works with a keyboard so on smaller screens its basically redundant.

I also had lots of difficulty creating modal for setting the player name.  I attempted to use bootstrap and the set the name from local storage but for whatever reason this would only put the name up for an instant and then disappear.  I have left the code in that I eventually want to use commented out and hopefully I can return to this project and fix it at some stage.

I think this has something to do with an uncaught reference error "module is not defined" but my debugging skills are basically non-existant so I could not find the cause to this.

I attempted to de-bug by following the W3 Schools guide https://www.w3schools.com/js/js_debugging.asp and also watching the https://www.youtube.com/watch?v=H0XScE08hy8.  It was very frustrating not being able to do this.

In order to get the name to eventually work on the screen I had to reference my mentor Simon Daelins work (https://github.com/Eventyret/tetris-game/blob/master/assets/js/misc.js) and used bootbox to display it.  This was not how I wanted to do it but it does work 

Also I cannot implement a timer.  I wanted to put in a basic stopwatch of the game so that when the game starts it triggers a stopwatch.  However given the amount of time I lost on the other issues I could not get this to work.  I attempted to reference https://www.youtube.com/watch?v=fF-vtP3sjPc in order to construct my own version but again became too frustrated with it and could not get it to work for me.

Also I had issues with changing the size of the canvas element when changing screen sizes and making the game responsive. I did not want the width and height of the canvas to be set in the html mark up but found when I moved it over to css it became a big issue and it would create a blur effect when I attempted it. 
The problem and the solution lies in this article but it was complex for me to interpret. https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da

I believe the overall frustration with this project and the amount of time lost on the bugs is unfortunately directly related to my strategy in producing the project.  By initially attempting to de-construct javascript code that was too far ahead of my understanding it proved to be my undoing.  Whilst I do believe it very much helped me improve my knowledge in Javascript I wasted too much time trying to understand the concepts and when it came to trying to augment the code and put my own stamp on it I went astray.  In hindsight I should have built something that was simple and that I could properly test using jasmine so I could more effectively stay on track and build up from there.  The core engine of this game is very interesting but too advanced for my current coding skill level.

## Deployment

### From the Browser 

This project was developed using the [VS Code](https://code.visualstudio.com/), committed to git and pushed to GitHub.
Totally Wild Tetris can be deployed by going to the developers GitHub Repsitory [GitHub repository](https://github.com/lesreddy/tw-tetris) and taking the following steps:

The easiest way is via this method:

1.  Log into the developors [Github Repository Page](https://github.com/lesreddy/tw-tetris) and choose **lesreddy/tw-tetris**

2.  Then simply click the link which is at the top of the page - (https://github.com/lesreddy/tw-tetris) and it will launch.

Alternatively,

1. Log into the developers [GitHub Repository Page](https://github.com/lesreddy/tw-tetris) and from the list of repositories on the screen choose **lesreddy/tw-tetris**. 

2. Select **Settings** from the menu near the top of the page.

4. Go to the **GitHub Pages** section. (scroll down)

5. Click the drop-down menu labelled **None** and select **Master Branch** which can be found under the **Source** section.

6. After selecting Master Branch the page is automatically refreshed, tw-tetris is now deployed.

7. Scroll back down to the **GitHub Pages** section to retrieve the link to the deployed website.

### Branches

The main branch used by the developer was the master branch.  However during the project in order to assist with debugging I created another branch called ```modals```.  This was done in order to attempt to overcome the many bugs and issues I had with creating my set player name bootstrap modal.  However as seems to be the theme with this project I somehow had another issue which was when merging the two and nearly lost a lot of code.  I then abandoned the idea of using another branch (due to much more lost time trying to recover it) and just maintained the code in the master branch.

### Running locally

To clone this project from GitHub:

1. Follow this link to the developers [Github Repository Page](https://github.com/lesreddy/tw-tetris).

2. Click the big green button which says ```Clone or download```.

3. Copy the clone URL for the repository by highlighting it with the cursor and using ```ctrl c``` or by clicking the little clipboard with an arrow on it.

4. Open your terminal in your IDE.

5. Change the current working directory to the location where you want the cloned directory to be made.

6. Type ```git clone```, and then paste the URL you copied in Step 3.

```console
git clone https://github.com/USERNAME/REPOSITORY
```

7. Press Enter. Your local clone will be created.

## Credits 
 
### Media

Images were taken from [Pexels](https://www.pexels.com/).  

[Tinypng](https://tinypng.com/) was used to compress images from high res state to maintain quality.

[MS Paint](https://ms-paint.en.softonic.com/) was also used to re-size images down for implementing onto [ImgBB](https://imgbb.com) for this readme file.

## Code 

The games engine and core javascript was referenced from developer [meth meth method](https://www.youtube.com/watch?v=H2aW5V46khA).  It took me two weeks to de-construct his 51 minute video and put it into my project so that I understood it.  I also referenced [Code Explained](https://www.youtube.com/watch?v=HEsAr2Yt2do) to further help me understand the concepts I was putting into the project.

My mentor Simen Daelin provided me with his [project](https://eventyret.github.io/tetris-game/) which I also referenced to get the use of bootbox for providing a player name.  This was because I could not get my bootstrap modal to work and I wanted to at least submit the project with a working modal.

### Acknowledgements

I have to thank my mentor Simen Daelin for helping me understand the concepts and for steering me in the right direction when needed.  He was instrumental in getting me where I did actually get to in the project.

## Reflections

This project has been a very frustrating process.  The idea was to utilise and de-construct a purely javascript game engine and re-build it in my own way.  The problem was that it took me two weeks just to de-construct the engine and even after significant analysis I found it very difficult to understand the code.  I therefore lost a lot of time on basically trying to understand someone elses code.  This then gave me less time and confidence to build the other elements of the game.

There are still many elements to implement in order to complete it and I am not happy with the current state. I will go back and fix all the elements once I have built a better knowledge base, experience and time.

Whilst This project gave me a great insight into how frustrating coding can actually be I have come out the other end with a project that I am not overly happy with but with a much better plan on how to approach the next one.  Its time to cut my losses, move on and come back to it later.  On my next project I will be keeping things very simple and building up rather than trying any attempt at deconstruction just so I can product something that has wide recognition.

On the plus side I have still learnt a lot and am motivated more than ever to learn more about javascript and coding in general going forward.