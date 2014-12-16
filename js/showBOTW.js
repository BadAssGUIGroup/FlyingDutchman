/**
 * Created by austi_000 on 12/15/2014.
 */

function BeersOfTheWeek(){
    this.htmlImgObj = document.getElementById("beerImage");
    this.imgSources = ["guinness.jpeg","Heineken.png","SAM-ADAMS-BEER.jpg"];
    this.currentImgNmbr = 0;
    this.htmlImgObj.src = this.imgSources[this.currentImgNmbr];
    this.htmlImgObj.className = 'slideInRight';
}

BeersOfTheWeek.prototype.rotateNextBeer = function(){
    console.log("Image Number: " + this.currentImgNmbr);
    this.currentImgNmbr = (this.currentImgNmbr +1) % this.imgSources.length;
    this.htmlImgObj.src = this.imgSources[this.currentImgNmbr];
    //this.htmlImgObj.className = 'slideInRight';
};

