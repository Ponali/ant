let d=document,Q=a=>d.querySelectorAll(a),q=a=>Q(a)[0],c=a=>d.createElement(a);
let b,cnv,ctx;
let zoom=1,offsetX=0,offsetY=0;

function getXPosition(j){
    return Math.ceil(((j-(map.length+1)/2)*zoom+cnv.width+offsetX)/2);
};
function getYPosition(i){
    return Math.ceil(((i-(map[0].length+1)/2)*zoom+cnv.height+offsetY)/2);
}

function canvasFrame(){
    [cnv.width,cnv.height]=[innerWidth,innerHeight];
    ctx.clearRect(0,0,cnv.width,cnv.height);
    for(let i=0;i<map.length;i++){
        let row = map[i];
        for(let j=0;j<row.length;j++){
            let x=getXPosition(j);
            let y=getYPosition(i);
            if((x>-zoom&&x<cnv.width)&&(y>-zoom&&y<cnv.height)){
                let cell = row[j];
                if(cell){
                    ctx.fillStyle="#ddd";
                } else {
                    ctx.fillStyle="#222";
                };
                ctx.fillRect(x,y,zoom/2,zoom/2);
            }
        }
    };
    ctx.fillStyle="#08f";
    ctx.fillRect(getXPosition(antX),getYPosition(antY),zoom/2,zoom/2);

    requestAnimationFrame(canvasFrame);
}

function setupCanvas(){
    cnv=c("canvas");
    ctx=cnv.getContext("2d");
    canvasFrame();
    return cnv;
}

function mainControls(){
    zoom=2**Math.ceil(Math.log2(Math.max(innerWidth,innerHeight)/map.length*2))
    b.appendChild(setupCanvas());
    cnv.addEventListener("wheel",e=>{
        console.log(e);
        zoom=2**(Math.round(Math.log2(zoom)-(e.deltaY/120)));
        if(zoom<=0){
            zoom=1;
        } else {
            let sign=1//e.deltaY/Math.abs(e.deltaY);
            offsetX+=(e.clientX-(cnv.width+offsetX)/2)
            offsetY+=(e.clientY-(cnv.height+offsetY)/2);
        }
    });
    let curXBef=0;
    let curYBef=0;
    let dragging=false;
    cnv.addEventListener("mousemove",e=>{
        if(dragging){
            offsetX+=(e.clientX-curXBef)*Math.sqrt(zoom);
            offsetY+=(e.clientY-curYBef)*Math.sqrt(zoom);
        }
        curXBef=e.clientX;
        curYBef=e.clientY;
    });
    cnv.addEventListener("mousedown",e=>{
        dragging=true;
    })
    cnv.addEventListener("mouseup",e=>{
        dragging=false;
    });
}

window.onload=(()=>{
    b=d.body;
    createMap(128,128,false);
    mainControls();
    q("#clearMap").addEventListener("click",()=>{createMap(128,128,false);});
    q("#randomMap").addEventListener("click",()=>{createMap(128,128,true);});
});

setInterval(()=>{
    for(let i=0;i<(q("#antSpeed").valueAsNumber)**2;i++) updateAnt();
},1000/30)