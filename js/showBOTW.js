/**
 * Created by austi_000 on 12/15/2014.
 */

function BeersOfTheWeek(){
    this.botwHtmlDivObj = document.getElementById("beersOfTheWeekImages");
    this.htmlImgObj = document.getElementById("beerImage");
    this.imgSources = ["guinness.jpeg","Heineken.png","SAM-ADAMS-BEER.jpg"];
    this.currentImgNmbr = 0;
    this.htmlImgObj.src = this.imgSources[this.currentImgNmbr];
    this.htmlImgObj.className = 'slideInRight';
}

BeersOfTheWeek.prototype.rotateNextBeer = function(botw){
    botw.botwHtmlDivObj.style.webkitAnimationName = '';
    setTimeout(function ()
    {
        botw.botwHtmlDivObj.style.webkitAnimationName = 'slideInRight';
    }, 0);
    botw.currentImgNmbr = (botw.currentImgNmbr +1) % botw.imgSources.length;
    botw.htmlImgObj.src = botw.imgSources[botw.currentImgNmbr];

};

