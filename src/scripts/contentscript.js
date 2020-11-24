chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "launch":
            window.open(window.location.href.replace("www.facebook.com", "m.facebook.com"), "_blank")
            return;
        case "expand":
            //to click more
            document.querySelector("._108_").click()
            return;
        case "extract":
            let list = [];
            document.querySelectorAll("._2b06").forEach(i => {
                let name = i.children[0].innerText;
                let link = i.children[0].children[0] && i.children[0].children[0].attributes && (i.children[0].children[0].attributes[i.children[0].children[0].attributes.length - 1].textContent || "ERRORERROR")
                link = `https://www.facebook.com${link}`
                let comment = i.children[1].innerHTML
                let postedIn = window.location.href
                list.push({ name, link, comment, postedIn })
            })


            let csvContent = "data:text/csv;charset=utf-8,";
            let header = `User Name, Profile Link, Comment, Posted in Group`;
            csvContent += header + "\n";

            list.forEach(item => {
                let row = `${item.name.replace(/,/g, "")}, ${item.link.replace(/,/g, "")}, ${item.comment.replace(/,/g, "").replace(/<[^>]*>?/gm, '')}, ${item.postedIn.replace(/,/g, "")}\n`;
                csvContent += row;
            })

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

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.style.display = "none";
    a.target = '_blank';
    a.click();
}
