
$(document).ready(function(){
    $("#openHist").click(function(){
        if($('#backlog').attr('class') == "backlog"){
            $("#backlog").toggleClass("backlog slidein");
        }else{
            $("#backlog").toggleClass("slidein slideout");
        }

        if ($('#imgHist').attr('class') == "") {
            $("#imgHist").toggleClass("spinIn");
        }else{
            $("#imgHist").toggleClass("spinIn spinOut");
        }
    });
});
