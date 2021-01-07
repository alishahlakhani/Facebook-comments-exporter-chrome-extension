chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "launch":
            window.open(window.location.href.replace("www.facebook.com", "m.facebook.com"), "_blank")
            return;
        case "expand":
            //to click more
            document.querySelector("._108_").click()
            // click on subcomments
            document.querySelectorAll("._2b1h.async_elem > a").forEach(a => a.click())
            // click on loadmore subcomments
            document.querySelectorAll("._2b1l > a.async_elem").forEach(a => a.click())
            
            return;
        case "extract":
            let list = [];
            
            let comments = document.querySelectorAll("._2b04"); //Find all comments on page
            
            for (var i = 0; i < comments.length; ) {
                i += findChildComments(comments[i],list); // Comments processing and hierarchy creation
            }
            

            download(JSON.stringify(list, null, 2), 'report.json', 'text/plain');
            return;

        case "exportFile":
            window.open("https://json-csv.com/", "_blanks")
            return;
        // // var encodedUri = encodeURI(csvContent);
        // var link = document.createElement("a");
        // link.setAttribute("href", JSON.stringify(list, null, 2));
        // link.setAttribute("download", "facebook-comments-report.json");
        // link.target = '_blank';
        // link.style.display = "none";
        // document.body.appendChild(link);
        // link.click();
    }
})

function findChildComments(comment, list){
    let index = 0;
    // Process comment
    let i = comment.querySelector("._2b06");
    
    let newComment = {};

    if(i !== null){
        let name = i.children[0].innerText;
        let link = i.children[0].children[0] && i.children[0].children[0].attributes && (i.children[0].children[0].attributes[i.children[0].children[0].attributes.length - 1].textContent || "ERRORERROR")
        link = `https://www.facebook.com${link}`
        let comment = i.children[1].innerHTML;
        let postedIn = window.location.href;
        newComment = { name, link, comment, postedIn,child:[] };
        list.push(newComment);
    }
    
    let childComments = comment.querySelectorAll("._2b04");

    if (childComments !== 'undefined'){
        childComments.forEach( childComment =>{
            index += findChildComments(childComment, newComment.child);
        });
    }
    
    return index + 1;
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.style.display = "none";
    a.target = '_blank';
    a.click();
}
