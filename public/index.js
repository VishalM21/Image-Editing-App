
const image =  document.querySelector(".file-input");

const imgbtn = document.querySelector(".choose-img");

const previewimage = document.querySelector(".imge");

const op = document.querySelectorAll(".filter button");

var filterslider = document.querySelector(".slider input");

const rotateoptions = document.querySelectorAll(".rotate .options button");

const resetbtn = document.querySelector(".reset-filter");

const savebtn = document.querySelector(".save-img");


var brighness =100;
var saturation =100;
var inversion =0;
var grayscale =0;

var rotate = 0;
var fliphorizontal=1;
var flipvertical=1;



function applyfilter(){
    previewimage.style.transform=`rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`;
    previewimage.style.filter=`brightness(${brighness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

op.forEach(ev=>{
    ev.addEventListener("click",()=>{
        document.querySelector(".options .active").classList.remove("active");
        ev.classList.add("active");
        document.querySelector(".filterinfo .name").innerHTML= ev.innerHTML;
         
        if(ev.id ==="brighness"){
            filterslider.max="200";
           filterslider.value = brighness;
           document.querySelector(".filterinfo .value").innerHTML=brighness+"%";
        }else if(ev.id ==="saturation"){
            filterslider.max="200";
            filterslider.value = saturation;
            document.querySelector(".filterinfo .value").innerHTML=saturation+"%";
        }else if(ev.id ==="inversion"){
            filterslider.max="100";
            filterslider.value = inversion;

            document.querySelector(".filterinfo .value").innerHTML=inversion+"%";
        }
        else if(ev.id ==="grayscale"){
            filterslider.max="100";
            filterslider.value = grayscale;
            document.querySelector(".filterinfo .value").innerHTML=grayscale+"%";
        }

    });

});


const loadimage=()=>{
      let file = image.files[0];
      if(!file) return;
      previewimage.src = URL.createObjectURL(file);
      document.querySelector(".editpanel").classList.remove("disablefunc");
      document.querySelector(".save-img").classList.remove("disablefunc");

      previewimage.addEventListener("load",()=>{
          resetbtn.click();
          document.querySelector(".container").classList.remove("disable");
      });
}


filterslider.addEventListener("input",()=>{
    document.querySelector(".filterinfo .value").innerHTML=filterslider.value+"%";
    var selectedfilter = document.querySelector(".options .active");
    if(selectedfilter.id ==="brighness"){
        brighness=filterslider.value;
    }else if(selectedfilter.id ==="saturation"){
        saturation = filterslider.value;
    }else if(selectedfilter.id ==="inversion"){
        inversion = filterslider.value;
    }
    else if(selectedfilter.id ==="grayscale"){
          grayscale = filterslider.value;
    }
    applyfilter();
});

image.addEventListener("change",loadimage);


imgbtn.addEventListener("click",function(){
    document.querySelector(".container").classList.add("disable");
    image.click();
});
rotateoptions.forEach(option=>{
   option.addEventListener("click",()=>{
      if(option.id==="left"){
          rotate-=90;
      }
      else if(option.id==="right"){
          rotate+=90;
      }
      else if(option.id==="horizontal"){
        if(fliphorizontal===1) fliphorizontal=-1;
        else fliphorizontal=1;
      }
      else if(option.id==="vertical"){
        if(flipvertical===1) flipvertical=-1;
        else flipvertical=1;
      }
      applyfilter();
   });
});

resetbtn.addEventListener("click",()=>{
    brighness =100;
   saturation =100;
   inversion =0;
   grayscale =0;
    rotate = 0;
    document.querySelector("#brighness").click();
   fliphorizontal=1;flipvertical=1;
   applyfilter();
});

savebtn.addEventListener("click",()=>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewimage.naturalWidth;
    canvas.height = previewimage.naturalHeight;
    ctx.filter=`brightness(${brighness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    
    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate!==0){ 
        ctx.rotate(rotate*Math.PI/180);
    }
   ctx.scale(fliphorizontal,flipvertical);

    ctx.drawImage(previewimage,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
   
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href=canvas.toDataURL();
    console.log(canvas.toDataURL());
    link.click();
});





