var total_claimed = "-";
var total_unclaimed = "-";
var unclaimed_bulls = [];
var unclaimed_bulls_map = {};
var intervalId;


var div=document.createElement("div"); 
document.body.appendChild(div); 
div.innerText="test123";

function revealBulls(){
    intervalId  = setInterval(function(){
        var img = document.getElementsByClassName("Image--image");
        for (var i = 0; i < img.length; i++) {
            var element = img[i];
            
            if(element.alt != null){
                if(element.alt.startsWith("Crypto bull #")){
                    var a = element.alt.split("#")[1];
                    
                    if(!unclaimed_bulls_map[a]){
                        element.classList.add("claimed");      
                    }else{
                        element.classList.add("unclaimed");   
                    }
                        
                }
            }
         }    
        console.log("done");
    }, 1000);
    
    
}

console.log("Start-query");
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://cryptobull-claim-server.herokuapp.com/api/v1/getUnclaimedBullsList", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(this.responseText);    
    total_claimed = resp["total_claimed"];
    total_unclaimed = resp["total_unclaimed"];
    unclaimed_bulls = resp["unclaimed_bulls"];

    for (var i = 0; i < unclaimed_bulls.length; i++) {
        var element = unclaimed_bulls[i];
        unclaimed_bulls_map[element] = true;
    }
    
    /// Set unclaimed header
    document.getElementsByClassName("Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoContainerreact__InfoContainer-sc-15x3z7c-0 CollectionStatsBarreact__Container-sc-8gdi9o-0 elqhCm jYqxGr fprnFG cWlCaZ")[0].innerHTML = 
    document.getElementsByClassName("Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoContainerreact__InfoContainer-sc-15x3z7c-0 CollectionStatsBarreact__Container-sc-8gdi9o-0 elqhCm jYqxGr fprnFG cWlCaZ")[0].innerHTML +
    '<div class="Blockreact__Block-sc-1xf18x6-0 InfoItemreact__BlockContainer-sc-gubhmc-0 elqhCm iePaOU"><a href="https://cryptobull-claim-server.herokuapp.com/" class="styles__StyledLink-sc-l6elh8-0 ekTmzq"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 InfoItemreact__Container-sc-gubhmc-1 elqhCm jYqxGr dLEHkN CollectionStatsBar--info CollectionStatsBar--bottom-bordered"><div class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 elqhCm jYqxGr Info--icon"><div width="100%" class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 jibrYh jYqxGr"><span class="Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 cLsBvb kscHgv"><div class="Overflowreact__OverflowContainer-sc-7qr9y8-0 jPSCbX" tabindex="-1">'+total_unclaimed+'</div></span></div></div><div font-size="14px" class="Blockreact__Block-sc-1xf18x6-0 iYAsis">Unclaimed bulls</div></div></a></div>';
    revealBulls();
  }
}
xhr.send();