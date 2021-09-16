function myFunction() {
    //insert here your XML file, if you work with Esko AE you can place here your smartname (i suggest a xpath query smartname that target the root node of your XML file)
    var data = ``
    //ALERT: if you find this "&lt;" "&gt;" in your XML you can uncomment below
    //data = data.replaceAll("&lt;", "<")
    //data = data.replaceAll("&gt;", ">")
    //console.log(data)
    //split to the selected tag
    var results = data.split("<tag>")
    //console.log(results)
    var dictionary = [];

    for (var i = 0; i < results.length; i++) {
            const value1 = results[i].match(new RegExp(/"insertCostumRegex"/))
            const value2 = results[i].match(new RegExp(/"insertCostumRegex"/))
            const value3 = results[i].match(new RegExp(/"insertCostumRegex"/))
            const dateValue = results[i].match(new RegExp(/\d{2}\/\d{2}\/\d{4}/))           
        if (value1 != null && value3 != null && dateValue != null)
            dictionary.push({
                'value1': value1[0],
                'value2':value2 ? value2[0]:"value2 is null",  //sometimes my value2 can be null, use ? to set a string in case of null
                'value3':  value3[0],
                'dateValue': dateValue[0]
            })
    }
    //console.log(dictionary)
    var today = new Date();
    //console.log(today) 
    for (let i = 0; i < dictionary.length; i++) {
        const currentDate = dictionary[i].dateValue.split("/")
        const newDate = new Date(currentDate[2], currentDate[1]-1, currentDate[0])
        dictionary[i].daysInBetween = Math.ceil(((newDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
        var alert = ""
        if (dictionary[i].daysInBetween < 0) {
            alert = "costumizable alert1"
        } else if (dictionary[i].daysInBetween < 1) {
            alert = "costumizable alert2"
        } else if (dictionary[i].daysInBetween < 3) {
            alert = "costumizable alert3"
        } else if (dictionary[i].daysInBetween < 7) {
            alert = "costumizable alert4"
        } else if (dictionary[i].daysInBetween < 14) {
            alert = "costumizable alert5"
        } else {
            alert = "costumizable alert6"
        }
        dictionary[i].warning = alert
    }
    //console.log(dictionary)
    dictionary.sort(function (a, b) {
        return a.daysInBetween - b.daysInBetween
    })
    //console.log(dictionary)
    for (let i = 0; i < dictionary.length; i++) {
        const element = dictionary[i];
        document.write("<ul></ul>" + "<li>" + "<b>" + "ARRIVES IN:&nbsp;" + element.daysInBetween + " days" + "</b>" + "</br>" + "<b>" + "value1:&nbsp;" + "</b>" + "<a href='file://path/to/file/'" + element.value1 + ".pdf'>" + element.value1 + "</a>" + "</br>" + "<b>" + "value2:&nbsp;" + "</b>" + element.value2 + "</br>" + "<b>" + "Estimated arrival date:&nbsp;" + "</b>" + element.dateValue + "</br>" + "<b>" + " value3:&nbsp;" + "</b>" + element.value3 + "</li>" + "<br/>");
    }
}
myFunction()
