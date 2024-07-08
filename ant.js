let map=[];
let antX=0;
let antY=0;
let antRot=0;

function pad(a,l){
    a=Math.round(a);
    while(a>=l) a-=l;
    while(a<0) a+=l;
    return a;
}
function createMap(width,height){
    //map=[...Array(height)].map(a=>[...Array(width)].map(a=>Math.random()<0.9));
    map=[...Array(height)].map(a=>[...Array(width)].map(a=>true));
    antX=Math.round(width/2);
    antY=Math.round(height/2);
    antRot=0;
};
function updateAnt(){
    if(map[antY][antX]){
        antRot+=90;
    } else {
        antRot-=90;
    }
    map[antY][antX]=!map[antY][antX];
    if(antRot>=360) antRot-=360;
    if(antRot<0) antRot+=360;
    antX+=Math.sin(antRot/180*Math.PI);
    antY+=Math.cos(antRot/180*Math.PI);
    antX=pad(antX,map.length);
    antY=pad(antY,map[0].length);
}