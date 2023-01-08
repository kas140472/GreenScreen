var frontImg = null;
var backImg = null;
var cv2 = document.getElementById("cv2");
var cv1 = document.getElementById("cv1");
    
function loadFgImage()
{
    var cv3 = document.getElementById("cv3");
    var ctx3 = cv3.getContext("2d");
    ctx3.clearRect(0, 0, cv3.width, cv3.height);

    var fgImg = document.getElementById("fgImg");
    frontImg = new SimpleImage(fgImg);
    frontImg.drawTo(cv1);
}

function loadBgImage()
{
    var cv3 = document.getElementById("cv3");
    var ctx3 = cv3.getContext("2d");
    ctx3.clearRect(0, 0, cv3.width, cv3.height);

    var bgImg = document.getElementById("bgImg");
    backImg = new SimpleImage(bgImg);
    //backImg.setSize(frontImg.getWidth(),frontImg.getHeight());
    backImg.drawTo(cv2);
}

function greenScreen()
{
    if(frontImg==null || !frontImg.complete())
    {
        alert("foreground image not loaded");
        return;
    }
    if(backImg==null || !backImg.complete())
    {
        alert("background image not loaded");
        return;
    }

    if(frontImg.getWidth()!=backImg.getWidth() || frontImg.getHeight()!=backImg.getHeight())
    {
        alert('Error: Foreground and background images must be of the same size.');
        return;
    }

    var compImg = new SimpleImage(frontImg.getWidth(), frontImg.getHeight());
    for(var pixel of frontImg.values())
    {
        if(pixel.getX()<backImg.getWidth() && pixel.getY()<backImg.getHeight())
        {
            if(pixel.getGreen()>pixel.getRed()+pixel.getBlue())
            {
                compImg.setPixel(pixel.getX(),pixel.getY(),backImg.getPixel(pixel.getX(),pixel.getY()))
            }
            else
            {
                compImg.setPixel(pixel.getX(),pixel.getY(),pixel);
            }
        }
        else
        {
            compImg.setPixel(pixel.getX(),pixel.getY(),pixel);
        }
    }
    var cv3 = document.getElementById("cv3");
    compImg.drawTo(cv3);
}

function clearCanvas()
{
    var cv1 = document.getElementById("cv1");
    var ctx1 = cv1.getContext("2d");
    ctx1.clearRect(0, 0, cv1.width, cv1.height);

    var cv2 = document.getElementById("cv2");
    var ctx2 = cv2.getContext("2d");
    ctx2.clearRect(0, 0, cv2.width, cv2.height);

    var cv3 = document.getElementById("cv3");
    var ctx3 = cv3.getContext("2d");
    ctx3.clearRect(0, 0, cv3.width, cv3.height);
}

function overlayImage1() 
{
    var fgImg = document.getElementById("overlayImg1");
    frontImg = new SimpleImage(fgImg);
    var cv1 = document.getElementById("cv1");
    //frontImg.drawTo(cv1);

    var ctx = cv1.getContext("2d");
    var overlayImg = document.getElementById("overlayImg1");
    ctx.drawImage(overlayImg,0,0);
}

function overlayImage2() 
{alert('0')
    //var obgImg = document.getElementById("https://raw.githubusercontent.com/kas140472/GreenScreen/main/dinos.png");
    backImg = new SimpleImage("https://raw.githubusercontent.com/kas140472/GreenScreen/main/dinos.png");
    alert('1');
    backImg.drawTo(cv2);
    alert('2');
}

function isImageLoaded(imgCheck)
{
    if(imgCheck==null || !imgCheck.complete())
    {
        alert("Image not loaded.");
        return false;
    }
    return true;
}




