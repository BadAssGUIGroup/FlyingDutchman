/**
 * Created by austi_000 on 12/15/2014.
 */

function BeersOfTheWeek(){
    this.botwHtmlDivObj = document.getElementById("beersOfTheWeekImages");
    this.imgSources = ["guinness.jpeg","Heineken.png","SAM-ADAMS-BEER.jpg"];
    this.currentImgNmbr = 0;
    $(this.botwHtmlDivObj).append("<img src='" + this.imgSources[0] + "' id='beerImage' class='slideInRight'/>");
}

BeersOfTheWeek.prototype.rotateNextBeer = function(botw){
    botw.currentImgNmbr = (botw.currentImgNmbr +1) % botw.imgSources.length;
    var newImgDiv = botw.botwHtmlDivObj.cloneNode(true);
    botw.botwHtmlDivObj.parentNode.replaceChild(newImgDiv,botw.botwHtmlDivObj);
    botw.botwHtmlDivObj = newImgDiv;
    while(botw.botwHtmlDivObj.firstChild){
        botw.botwHtmlDivObj.removeChild(botw.botwHtmlDivObj.firstChild);
    }
    $(botw.botwHtmlDivObj).append("<img src='" + this.imgSources[botw.currentImgNmbr] + "' id='beerImage' class='slideInRight'/>");

};

